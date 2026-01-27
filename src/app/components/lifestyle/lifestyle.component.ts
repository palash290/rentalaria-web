import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LifestyleSidebarComponent } from './lifestyle-sidebar/lifestyle-sidebar.component';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-lifestyle',
  imports: [RouterLink, TranslateModule, NgxPaginationModule, CommonModule],
  templateUrl: './lifestyle.component.html',
  styleUrl: './lifestyle.component.css'
})
export class LifestyleComponent {

  allLifestiles: any;
  p: any = 1;

  constructor(private service: CommonService, private translate: TranslateService) { }

  ngOnInit(){
    this.getPropertyDetail();
  }


  getPropertyDetail() {
    this.service.get(`user/getAllblog`).subscribe({
      next: (resp: any) => {
        this.allLifestiles = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

}
