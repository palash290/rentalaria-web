import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogInComponent } from '../auth/log-in/log-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, RouterLink, LogInComponent, SignUpComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private translate: TranslateService) { }
  
}
