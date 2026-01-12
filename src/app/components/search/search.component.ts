import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DisabledDateFn, NzDatePickerModule, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { endOfMonth } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [TranslateModule, NzDatePickerModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private translate: TranslateService) { }

  selectedRange: Date[] | null = null;

  ranges: { [key: string]: Date[] } = {
    Today: [new Date(), new Date()],
    'This Month': [new Date(), endOfMonth(new Date())],
  };

  onChange(result: Date[]): void {
    const checkIn = result?.[0];
    const checkOut = result?.[1];

    console.log('Check-in:', checkIn);
    console.log('Check-out:', checkOut);
  }



  isCityDropdownOpen = true;
  selectedLocation: string = '';
  isCalendarOpen = false;

  malagaLocations = [
    'Centro Histórico',
    'La Malagueta',
    'El Limonar',
    'Soho',
    'Pedregalejo',
    'Teatinos'
  ];

  beachLocations = [
    'Centro La Malagueta',
    'Centro Pedregalejo',
    'Centro El Palo',
    'Centro Playa de la Misericordia'
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

  selectLocation(location: string) {
    this.selectedLocation = location;
    this.isCityDropdownOpen = false; // hide after select
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
