import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../../../services/common.service';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-my-property-details',
  imports: [RouterLink, CommonModule, NzImageModule],
  templateUrl: './my-property-details.component.html',
  styleUrl: './my-property-details.component.css'
})
export class MyPropertyDetailsComponent {

  property_id: any;
  propertyDetails: any;
  houseRules: any;
  nearbyLocation: any;
  mediaList: string[] = [];
  activeVideo: string | null = null;

  constructor(private service: CommonService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.property_id = params['property_id'];
    });

    this.getPropertyDetail();
  }


  getPropertyDetail() {
    this.service.get(`user/getAllTokenProperty/${this.property_id}`).subscribe({
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

        if (resp.data.house_rules) {
          try {
            this.nearbyLocation = JSON.parse(resp.data.nearby_property_location);
          } catch (e) {
            console.error('Invalid house_rules format');
          }
        }

        // ✅ Merge images first, then videos
        this.mediaList = resp.data.images;

        this.activeVideo = resp.data.videos[0];

      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }


}
