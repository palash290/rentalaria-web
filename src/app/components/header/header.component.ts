import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { LogInComponent } from "../auth/log-in/log-in.component";
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LogInComponent, SignUpComponent, ForgotPasswordComponent, TranslateModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedLang: string = 'en'

  constructor(private modalService: ModalService, private translate: TranslateService) { }

  openLoginModal() {
    this.modalService.openLoginModal();
  }

  isCityDropdownOpen = false;

  toggleCityDropdown() {
    this.isCityDropdownOpen = !this.isCityDropdownOpen;
  }

  closeCityDropdown() {
    this.isCityDropdownOpen = false;
  }

  onCustomLangChange(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  // Close dropdown if clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.position-relative')) {
      this.isCityDropdownOpen = false;
    }
  }

  getLanguage(langCode: string) {
    switch (langCode) {
      case 'es':
        return 'German';
      case 'en':
        return 'English';
      default:
        return 'English';
    }
  }

  getImage(langCode: string) {
    switch (langCode) {
      case 'es':
        return 'img/spanish.png';
      case 'en':
        return 'img/USA.png';
      default:
        return 'img/USA.png';
    }
  }


}
