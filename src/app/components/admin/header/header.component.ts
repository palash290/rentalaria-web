import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedLang: string = 'en';

  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;

  constructor(private router: Router, private translate: TranslateService, private service: CommonService) {
    this.translate.use(localStorage.getItem('lang') || 'en');
  }

  // logout() {
  //   localStorage.clear();
  //   this.closeModalAdd.nativeElement.click();
  //   this.router.navigateByUrl('/');
  // }

  logout() {
    this.service.clearToken();
    this.router.navigateByUrl('/');
    this.closeModalAdd.nativeElement.click();
    this.service.setLoginState(false);
    localStorage.removeItem('userEmail');
  }

  onCustomLangChange(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage(langCode: string) {
    switch (langCode) {
      case 'es':
        return 'Spanish';
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
