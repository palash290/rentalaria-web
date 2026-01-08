import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  Form: FormGroup;
  loading: boolean = false;
  passwordMismatch = false;

  constructor(private service: CommonService, private router: Router, private fb: FormBuilder, private toastr: NzMessageService) {
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

  type: string = '';

  ngOnInit() {

  }

  sumbit() {

    if (!this.type) {
      console.warn("Type missing, redirecting to default...");
      return;
    }

    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('fullName', this.Form.value.name);
      if (this.type == 'individual') {
        formURlData.set('role', '1');
      }
      if (this.type == 'team') {
        formURlData.set('role', '2');
      }
      formURlData.set('password', this.Form.value.new_password);
      formURlData.set('email', this.Form.value.email);

      this.service.post('signUp', formURlData.toString()).subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.service.setToken(resp.data);
            this.toastr.success(resp.message);
            this.loading = false;
            // routerLink="/create-team"
            this.router.navigate(['/verify-email'], {
              queryParams: { email: this.Form.value.email, type: this.type }
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
