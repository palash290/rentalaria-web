import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DisabledDateFn, NzDatePickerModule, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { endOfMonth } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [TranslateModule, NzDatePickerModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  checkIn: any = '2026-01-13';
  checkOut: any;
  selectedRange: Date[] | null = null;
  minDate: any;


  constructor(private translate: TranslateService, private router: Router, private toastr: NzMessageService,
    private service: CommonService
  ) { }

  ngOnInit() {
    this.selectedLocationId = localStorage.getItem('location');
    this.checkIn = localStorage.getItem('date');
    this.checkOut = localStorage.getItem('date2');
    this.selectedLocation = localStorage.getItem('locationName');

    // instant updates
    this.service.location$.subscribe(data => {
      if (data) {
        this.selectedLocationId = data.id;
        this.selectedLocation = data.name;
      }
    });

    this.getCities();

    this.dateValidation();
  }

  dateValidation() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  @Output() searchClicked = new EventEmitter<void>();

  searchProperty(): void {

    const location = this.selectedLocationId;
    const date = this.checkIn;
    const date2 = this.checkOut;

    if (!location) {
      this.toastr.warning('Please enter location!');
      return;
    }

    if (!date) {
      this.toastr.warning('Please enter check-in date!');
      return;
    }

    if (!date2) {
      this.toastr.warning('Please select check-out date!');
      return;
    }

    const formattedDate = this.formatDate(date);
    const formattedDate2 = this.formatDate(date2);

    const queryParams: any = {
      location,
      formattedDate,
      formattedDate2
    };

    localStorage.setItem('location', location);
    localStorage.setItem('date', formattedDate);
    localStorage.setItem('date2', formattedDate2);
    localStorage.setItem('locationName', this.selectedLocation);
    // this.selectedLocation = location.name;

    this.router.navigate(['/list-property'], {
      queryParams,
      //queryParamsHandling: 'merge'
    });

    this.searchClicked.emit();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
  }

  ranges: { [key: string]: Date[] } = {
    Today: [new Date(), new Date()],
    'This Month': [new Date(), endOfMonth(new Date())],
  };

  onChange(result: Date[]): void {
    this.checkIn = result?.[0];
    this.checkOut = result?.[1];
  }

  getCities() {
    this.service.get('user/city').subscribe({
      next: (resp: any) => {
        this.malagaLocations = resp.data.Málaga;
        // this.beachLocations = resp.Beach_Areas;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  isCityDropdownOpen = true;
  selectedLocation: any = '';
  selectedLocationId: any = '';
  isCalendarOpen = false;

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

  openCalendar() {
    this.isCalendarOpen = true;
  }

  toggleCityDropdown() {
    this.isCityDropdownOpen = !this.isCityDropdownOpen;
  }

  selectLocation(location: any) {
    this.selectedLocationId = location.id;
    this.selectedLocation = location.name;
    this.isCityDropdownOpen = false;
    setTimeout(() => {
      this.isCalendarOpen = true;
    }, 100);
  }

  disabledDate: DisabledDateFn = (current: Date): boolean => {
    // No start date selected → allow all dates
    if (!this.selectedRange || !this.selectedRange[0]) {
      return false;
    }

    const startDate = this.selectedRange[0];

    // Disable all dates before selected start date
    return current < startDate;
  };


}
