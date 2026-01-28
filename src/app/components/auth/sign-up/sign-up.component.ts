import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
declare const window: any;

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  Form: FormGroup;
  loading: boolean = false;
  passwordMismatch = false;
  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;

  constructor(private service: CommonService, private router: Router, private fb: FormBuilder, private toastr: NzMessageService,
    private translate: TranslateService
  ) {
    this.Form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
    });
    this.Form.get('confirm_password')?.setValidators([
      Validators.required,
      this.passwordMatchValidator()
    ]);
  }

  sumbit() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('full_name', this.Form.value.name);
      formURlData.set('password', this.Form.value.new_password);
      formURlData.set('email', this.Form.value.email);
      formURlData.set('language', 'en');
      this.service.post('public/signup', formURlData.toString()).subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            // this.service.setToken(resp.data);
            this.toastr.success(resp.message);
            this.loading = false;
            this.closeModalAdd.nativeElement.click();
            const signinTab = document.getElementById('signin-tab');
            if (signinTab) {
              const tab = new window.bootstrap.Tab(signinTab);
              tab.show();
            }

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

  isPasswordVisible2: boolean = false;
  isPasswordVisible3: boolean = false;

  togglePasswordVisibility2() {
    this.isPasswordVisible2 = !this.isPasswordVisible2;
  }


  togglePasswordVisibility3() {
    this.isPasswordVisible3 = !this.isPasswordVisible3;
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.Form.get('new_password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return { passwordMismatch: true };
      } else {
        this.passwordMismatch = false;
        return null;
      }
    };
  }


}
