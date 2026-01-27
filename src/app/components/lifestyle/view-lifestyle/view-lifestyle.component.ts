import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LifestyleSidebarComponent } from '../lifestyle-sidebar/lifestyle-sidebar.component';
import { CommonService } from '../../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-lifestyle',
  imports: [RouterLink, TranslateModule, LifestyleSidebarComponent],
  templateUrl: './view-lifestyle.component.html',
  styleUrl: './view-lifestyle.component.css'
})
export class ViewLifestyleComponent {

  blog_id: any;
  blogDetails: any;

  constructor(private translate: TranslateService, private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.blog_id = params['blog_id'];
    });
    this.getPropertyDetail();
  }

  getPropertyDetail() {
    this.service.get(`user/blogs/${this.blog_id}`).subscribe({
      next: (resp: any) => {
        this.blogDetails = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }


}
