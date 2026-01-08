import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { endOfMonth } from 'date-fns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [TranslateModule, NzDatePickerModule, FormsModule],
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


}
