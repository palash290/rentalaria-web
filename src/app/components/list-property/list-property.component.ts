import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchComponent } from '../search/search.component';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-property',
  imports: [RouterLink, TranslateModule, SearchComponent, CommonModule, NzSliderModule, FormsModule],
  templateUrl: './list-property.component.html',
  styleUrl: './list-property.component.css'
})
export class ListPropertyComponent {

  propertyList: any;
  p: any = 1;
  filteredData: any[] = [];
  searchText: string = '';
  location: any;
  checkInDate: any;
  checkOutDate: any;
  minimum_stay_months: any = '';
  priceRange: any = [0, 1000000];
  selectedAmenityIds: number[] = [];
  propertyId: any = '';
  noOfBathrooms: any = '1';
  noOfBedrooms: any = '1';
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private translate: TranslateService, private service: CommonService, private toastr: NzMessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'];
      this.checkInDate = params['formattedDate'];
      this.checkOutDate = params['formattedDate2'];
      this.applyFilter();
    });
    this.getAmenities();
    this.getPropertyTypes();
  }

  // applyFilter() {
  //   this.service.get(`user/getAllProperties?min_price=${this.priceRange[0]}&max_price=${this.priceRange[1]}&bedrooms=${this.noOfBedrooms}&bathrooms=${this.noOfBathrooms}&location=${this.location}&property_type_id=${this.propertyId}&amenities=${this.selectedAmenityIds.join(',')}&minimum_stay_months=${this.minimum_stay_months}&start_date=${this.checkInDate}&end_date=${this.checkOutDate}`).subscribe({
  //     next: (resp: any) => {
  //       this.propertyList = resp.data;
  //     },
  //     error: (error) => {
  //       console.log(error.message);
  //     }
  //   });
  // }

  applyFilter() {
    const params = new URLSearchParams({
      min_price: this.priceRange[0]?.toString() || '',
      max_price: this.priceRange[1]?.toString() || '',
      bedrooms: this.noOfBedrooms || '',
      bathrooms: this.noOfBathrooms || '',
      city_id: this.location || '',
      property_type_id: this.propertyId || '',
      amenities: this.selectedAmenityIds.join(','),
      minimum_stay_months: this.minimum_stay_months || '',
      start_date: this.checkInDate || '',
      end_date: this.checkOutDate || ''
    });

    this.service.get(`user/getAllProperties?${params.toString()}`)
      .subscribe({
        next: (resp: any) => {
          this.propertyList = resp.data;
          this.closeModal.nativeElement.click();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }


  filterTable() {
    this.p = 1;
    let filtered = this.propertyList;

    if (this.searchText.trim()) {
      const keyword = this.searchText.trim().toLowerCase();
      filtered = filtered.filter((item: { full_name: any; email: any; }) =>
      (item.full_name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }

  allAmenity: any;
  propertyTypes: any;

  getAmenities() {
    this.service.get('user/getAllamenities').subscribe({
      next: (resp: any) => {
        this.allAmenity = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  getPropertyTypes() {
    this.service.get('user/propertyType').subscribe({
      next: (resp: any) => {
        this.propertyTypes = resp.data;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  onAmenityChange(event: Event, amenityId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedAmenityIds.push(amenityId);
    } else {
      this.selectedAmenityIds = this.selectedAmenityIds.filter(
        amenity_id => amenity_id !== amenityId
      );
    }

    console.log('Selected Amenities:', this.selectedAmenityIds);
  }


}
