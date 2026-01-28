import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LifestyleSidebarComponent } from './lifestyle-sidebar/lifestyle-sidebar.component';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lifestyle',
  imports: [RouterLink, TranslateModule, NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './lifestyle.component.html',
  styleUrl: './lifestyle.component.css'
})
export class LifestyleComponent {

  allLifestiles: any;
  p: any = 1;
  filteredData: any[] = [];
  searchText: string = '';

  constructor(private service: CommonService, private translate: TranslateService) { }

  ngOnInit() {
    this.getPropertyDetail();
  }

  getPropertyDetail() {
    this.service.get(`user/getAllblog`).subscribe({
      next: (resp: any) => {
        this.allLifestiles = resp.data;
        this.filterTable();
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  filterTable() {
    this.p = 1;
    let filtered = this.allLifestiles;

    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: { title: any; }) =>
        (item.title?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
