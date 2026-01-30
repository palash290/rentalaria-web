import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../services/common.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalService } from '../../../services/modal.service';
import { LogInComponent } from '../../auth/log-in/log-in.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';
declare var google: any;

Swiper.use([Navigation]);

@Component({
  selector: 'app-view-property',
  imports: [RouterLink, CommonModule, NzImageModule, ForgotPasswordComponent, LogInComponent, SignUpComponent],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {

  mainSwiper1: any;
  houseRules: any;
  nearbyLocation: any;

  isShortlisted: boolean = false;
  activeVideo: string | null = null;
  currentYear = 2026;
  currentMonth = 0;
  availableFrom = new Date();
  propertyId: any;
  propertyDetails: any;
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendarDays: any[] = [];
  mediaList: string[] = [];
  isLogIn: any;

  constructor(private modalService: ModalService, private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.propertyId = params['propertyId'];
    });


    // initial login state
    this.isLogIn = !!this.service.getToken();

    // listen for login/logout
    this.service.isLoggedIns$.subscribe(state => {
      this.isLogIn = state;
    });

    // call API once
    this.getPropertyDetail();

  }

  openLoginModal() {
    this.modalService.openLoginModal();
    this.service.getToken()
  }


  ngAfterViewInit() {
    this.mainSwiper1 = new Swiper('.mySwiperModal', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  // getAllProperty/27'
  getPropertyDetail() {
    debugger
    this.service.get(this.isLogIn ? `user/getAllTokenProperty/${this.propertyId}` : `user/getAllProperty/${this.propertyId}`).subscribe({
      next: (resp: any) => {
        this.propertyDetails = resp.data;

        // ✅ Parse house rules safely
        this.houseRules = [];

        if (resp.data.house_rules) {
          try {
            this.houseRules = JSON.parse(resp.data.house_rules);
          } catch (e) {
            console.error('Invalid house_rules format');
          }
        }

        // ✅ Parse house rules safely
        this.nearbyLocation = [];

        if (resp.data.nearby_property_location) {
          try {
            this.nearbyLocation = JSON.parse(resp.data.nearby_property_location);
          } catch (e) {
            console.error('Invalid house_rules format');
          }
        }

        const date = this.formatToYMD(resp.data.available_from);
        this.setAvailableFrom(date);
        this.activeVideo = resp.data.videos[0];
        this.isShortlisted = resp.data.isWishlist;

        // ✅ Merge images first, then videos
        this.mediaList = resp.data.images;

        const lat = Number(this.propertyDetails.latitude);
        const lng = Number(this.propertyDetails.longitude);

        const location = { lat: lat, lng: lng };

        const map = new google.maps.Map(
          document.getElementById('map'),
          {
            center: location,
            zoom: 12
          }
        );

        new google.maps.Marker({
          position: location,
          map: map
        });

      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  toggleFavourite() {
    const formURlData = new URLSearchParams();
    formURlData.set('property_id', this.propertyId);

    this.service
      .post(`user/create-Whislist`, formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          this.isShortlisted = !this.isShortlisted; // toggle AFTER success
          this.toastr.success(resp.message);
        },
        error: () => {
          this.toastr.error('Something went wrong');
        }
      });
  }


  formatToYMD(date: any): string {
    const d = this.ensureDate(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  ensureDate(date: any): Date {
    if (date instanceof Date) {
      return date;
    }

    // handles "2026-01-19" and ISO strings
    const [y, m, d] = date.split('T')[0].split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  setAvailableFrom(apiDate: string) {
    debugger
    const [year, month, day] = apiDate.split('-').map(Number);

    this.availableFrom = this.normalizeDate(
      new Date(year, month - 1, day)
    );

    this.currentYear = this.availableFrom.getFullYear();
    this.currentMonth = this.availableFrom.getMonth();

    this.generateCalendar();
  }

  /* -----------------------------
     REMOVE TIME FROM DATE
  ------------------------------ */
  normalizeDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /* -----------------------------
     CALENDAR GENERATION
  ------------------------------ */
  generateCalendar() {
    this.calendarDays = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    const startDayIndex = (firstDay.getDay() + 6) % 7; // Monday start

    // Empty cells
    for (let i = 0; i < startDayIndex; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = this.normalizeDate(
        new Date(this.currentYear, this.currentMonth, day)
      );

      this.calendarDays.push({
        day,
        isAvailable: date >= this.availableFrom
      });
    }
  }

  showFullDescription = false;
  maxLength = 700;

  get shortDescription(): string {
    const desc = this.propertyDetails?.property_description || '';
    return desc.length > this.maxLength
      ? desc.substring(0, this.maxLength) + '...'
      : desc;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }


}
