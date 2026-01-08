import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedLang: string = 'en'

  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.use(localStorage.getItem('lang') || 'en');
  }

  logout() {
    this.closeModalAdd.nativeElement.click();
    this.router.navigateByUrl('/')
  }

  onCustomLangChange(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
