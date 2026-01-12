import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, VerifyOtpComponent, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  @ViewChild('closeModal') closeModal!: ElementRef;
  Form!: FormGroup;
  loading: boolean = false;

  constructor(
    private apiSrevice: CommonService,
    private toastr: NzMessageService,
    private router: Router,
    private modalService: ModalService, private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.modalService.openOtpModal();
    return
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.loading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.Form.value.email)
      this.apiSrevice
        .post('user/forgotPassword', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.loading = false;
              this.router.navigateByUrl('/choose-login');
              this.toastr.success(resp.message);
              this.Form.reset();
              this.closeModal.nativeElement.click();
            } else {
              this.loading = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.loading = false;
            const msg =
              error.error?.message ||
              error.error?.error ||
              error.message ||
              "Something went wrong!";
            this.toastr.error(msg);
          }
        })
    }
  }


}
