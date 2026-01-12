import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ValidationErrorService } from '../../../services/validation-error.service';
import { ModalService } from '../../../services/modal.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Router, RouterLink } from "@angular/router";
import { CommonService } from '../../../services/common.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
declare var bootstrap: any;

@Component({
  selector: 'app-log-in',
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, NzSelectModule, FormsModule, SignUpComponent, ForgotPasswordComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  Form!: FormGroup;
  loading: boolean = false;
  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private modalService: ModalService,
    private router: Router, private service: CommonService, private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  open(): void {
    const modal = new bootstrap.Modal(document.getElementById('ct_login_modal') as HTMLElement);
    modal.show();
  }

  openSignUp(): void {
    this.modalService.openSignupModal();
  }

  openFpassword(): void {
    this.modalService.openFpasswordModal();
  }


  login() {
    this.closeModalAdd.nativeElement.click();
    this.router.navigateByUrl('/admin/my-profile')
    return;
    this.Form.markAllAsTouched();

    if (this.Form.valid) {
      this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('email', this.Form.value.email);
      formURlData.set('password', this.Form.value.password);
      formURlData.set('language', 'en');
      this.service.post('login', formURlData.toString()).subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.service.setToken(resp.data.token);
            this.loading = false;
            this.toastr.success(resp.message);
            this.closeModalAdd.nativeElement.click();
            this.router.navigateByUrl('/admin/dashboard');
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

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


}
