import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

@Component({
  selector: 'app-view-property',
  imports: [],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {

  mainSwiper1: any;

  ngAfterViewInit() {
    this.mainSwiper1 = new Swiper('.mySwiperModal', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }


}
