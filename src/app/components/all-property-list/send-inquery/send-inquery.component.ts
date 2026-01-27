import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-inquery',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './send-inquery.component.html',
  styleUrl: './send-inquery.component.css'
})
export class SendInqueryComponent {

  Form!: FormGroup;
  loading: boolean = false;
  propertyId: any;
  propertyDetails: any;

  constructor(private fb: FormBuilder, private toastr: NzMessageService, private route: ActivatedRoute,
    private router: Router, private service: CommonService, private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.propertyId = params['propertyId'];
    });
    this.Form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      moveInDate: ['', Validators.required],
      moveOutDate: ['', Validators.required],
      message: [''],
    });
    this.getPropertyDetail();
  }

  getPropertyDetail() {
    this.service.get(`user/getProperty/${this.propertyId}`).subscribe({
      next: (resp: any) => {
        this.propertyDetails = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  submit() {
    this.Form.markAllAsTouched();

    if (this.Form.valid) {
      this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('property_id', this.propertyId);
      formURlData.set('full_name', this.Form.value.fullName);
      formURlData.set('email', this.Form.value.email);
      formURlData.set('phone', this.Form.value.number);
      formURlData.set('move_in_date', this.Form.value.moveInDate);
      formURlData.set('move_out_date', this.Form.value.moveOutDate);
      formURlData.set('message', this.Form.value.message);
      this.service.post('user/create-inquiries', formURlData.toString()).subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.loading = false;
            this.toastr.success(resp.message);
            this.router.navigate(['/view-property'], {
              queryParams: { propertyId: this.propertyId }
            });
          } else {
            this.toastr.warning(resp.message);
            this.loading = false;
          }
        },
        error: (error) => {
          this.loading = false;

          const msg =
            error.error?.message ||
            error.error?.error ||
            error.message ||
            "Something went wrong!";

          this.toastr.error(msg);
        }
      });
    }
  }


}
