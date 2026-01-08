import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { ValidationErrorService } from '../../../services/validation-error.service';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule, CommonModule,
    NzFlexDirective, NzInputOtpComponent, ResetPasswordComponent],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

  Form: FormGroup;
  atValues: any;
  isLoading: boolean = false;
  isLoadingResend: boolean = false;
  isPasswordVisible: boolean = false;
  userEmail: any;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService,
    private service: CommonService, private modalService: ModalService
  ) {
    this.Form = this.fb.group({
      //email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
    });
  }

  onSubmit() {
    this.modalService.openResetModal();
    return
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.isLoading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.userEmail)
      formURlData.set('otp', this.Form.value.otp)
      formURlData.set('newPassword', this.Form.value.password)
      this.service
        .post('user/reset-password', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.isLoading = false;
              this.toastr.success(resp.message);
            } else {
              this.isLoading = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.isLoading = false;
            this.toastr.warning(error || 'Something went wrong!');
          }
        })
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  resendOtp() {
    this.isLoadingResend = true
    const formURlData = new URLSearchParams()
    formURlData.set('email', this.userEmail)
    this.service
      .post('user/resend-otp', formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.isLoadingResend = false;
            this.toastr.success(resp.message);
          } else {
            this.isLoadingResend = false;
            this.toastr.warning(resp.message);
          }
        },
        error: (error: any) => {
          this.isLoadingResend = false;
          this.toastr.warning(error || 'Something went wrong!');
        }
      })
  }

}
