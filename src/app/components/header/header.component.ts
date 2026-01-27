import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { LogInComponent } from "../auth/log-in/log-in.component";
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LogInComponent, SignUpComponent, ForgotPasswordComponent, TranslateModule, RouterLinkActive,
    CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedLang: string = 'en';
  isMenuActive = false;
  isHome = false;
  @ViewChild('closeModalAdd') closeModalAdd!: ElementRef;
  token: any;
  userEmail: any;
  first_name: any;
  profileImg: string | ArrayBuffer | null = null;
  malagaLocations: any[] = [
    {
      "id": 1,
      "name": "Centro Histórico",
      "status": "ACTIVE"
    },
    {
      "id": 3,
      "name": "El Limonar",
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "name": "La Malagueta",
      "status": "ACTIVE"
    },
    {
      "id": 5,
      "name": "Pedregalejo",
      "status": "ACTIVE"
    },
    {
      "id": 4,
      "name": "Soho",
      "status": "ACTIVE"
    },
    {
      "id": 6,
      "name": "Teatinos",
      "status": "ACTIVE"
    }
  ];

  beachLocations: any[] = [
    {
      "id": 9,
      "name": "Centro El Palo",
      "status": "ACTIVE"
    },
    {
      "id": 7,
      "name": "Centro La Malagueta",
      "status": "ACTIVE"
    },
    {
      "id": 8,
      "name": "Centro Pedregalejo",
      "status": "ACTIVE"
    },
    {
      "id": 10,
      "name": "Centro Playa de la Misericordia",
      "status": "ACTIVE"
    }
  ];

  comingSoon = [
    'New neighborhoods',
    '(Coming soon)'
  ];

  constructor(private modalService: ModalService, private translate: TranslateService, private router: Router,
    private service: CommonService
  ) {
    // this.router.events.subscribe(event => {
    //   // this.token = localStorage.getItem('rentalToken');
    //   if (event instanceof NavigationEnd) {
    //     this.isHome = event.urlAfterRedirects == '/view-property' || event.urlAfterRedirects == '/send-inquery';
    //   }
    // });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split('?')[0];

        this.isHome =
          url == '/view-property' ||
          url == '/send-inquery';
      }
    });
  }

  ngOnInit() {
    this.service.token$.subscribe(token => {
      this.token = token;
    });
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.service.get('user/profile').subscribe({
      next: (resp: any) => {
        this.userEmail = resp.data.email;
        this.first_name = resp.data.full_name;
        this.profileImg = resp.data.profile_image;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  openLoginModal() {
    this.modalService.openLoginModal();
  }

  isCityDropdownOpen = false;

  toggleCityDropdown() {
    this.isCityDropdownOpen = !this.isCityDropdownOpen;
  }

  closeCityDropdown(location: any) {
    this.selectedLocationId = location.id;
    this.selectedLocation = location.name;
    this.isCityDropdownOpen = false;
    localStorage.removeItem('date');
    localStorage.removeItem('date2');
    this.searchProperty();
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

  openMenu(isMenuActive: any) {
    this.isMenuActive = isMenuActive;
  }

  closeMenu(isMenuActive: any) {
    this.isMenuActive = isMenuActive;
  }

  logout() {
    this.service.clearToken();
    // localStorage.clear();
    this.closeModalAdd.nativeElement.click();
    // this.router.navigateByUrl('/')
  }

  selectedLocation: any = '';
  selectedLocationId: any = '';
  @Output() searchClicked = new EventEmitter<void>();

  searchProperty(): void {

    const location = this.selectedLocationId;

    const queryParams: any = {
      location,
    };

    localStorage.setItem('location', location);
    localStorage.setItem('locationName', this.selectedLocation);

    this.router.navigate(['/list-property'], {
      queryParams,
      //queryParamsHandling: 'merge'
    });

    this.searchClicked.emit();
  }


}
