import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inquiry-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './inquiry-details.component.html',
  styleUrl: './inquiry-details.component.css'
})
export class InquiryDetailsComponent {

  inqueryId: any;
  inquirieData: any;

  constructor(private route: ActivatedRoute, private service: CommonService, private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.inqueryId = params['inqueryId'];
    });
    this.getmyinquiries();
  }

    getmyinquiries() {
    this.service.get(`user/my-inquiries/${this.inqueryId}`).subscribe({
      next: (resp: any) => {
        this.inquirieData = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }


}
