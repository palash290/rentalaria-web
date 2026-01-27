import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-saved-properties',
  imports: [RouterLink, CommonModule],
  templateUrl: './saved-properties.component.html',
  styleUrl: './saved-properties.component.css'
})
export class SavedPropertiesComponent {

  allProperties: any;
  loading: boolean = false;
  p: any = 1;

  @ViewChild('closeModalDelete') closeModalDelete!: ElementRef;

  constructor(private service: CommonService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getmyproperties();
  }

  getmyproperties() {
    this.service.get('user/get-Whislist').subscribe({
      next: (resp: any) => {
        this.allProperties = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  isShortlisted = true;

  toggleFavourite(item: any) {
    // Optimistic UI update
    item.isWishlist = !item.isWishlist;
    const formURlData = new URLSearchParams();
    formURlData.set('property_id', item.property_id);
    this.service
      .post(`user/create-Whislist`, formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          this.toastr.success(resp.message);
        },
        error: (error) => {
          console.error(error);
          this.isShortlisted = !this.isShortlisted;
        }
      });
  }


  deleteId: any;

  getId(id: any) {
    this.deleteId = id;
  }

  deleteProperty() {
    this.loading = true;
    this.service.delete(`admin/delete-inquiry/${this.deleteId}`).subscribe({
      next: (resp: any) => {
        this.closeModalDelete.nativeElement.click();
        this.toastr.success(resp.message);
        this.getmyproperties();
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        console.log(error.message);
      }
    });
  }


}
