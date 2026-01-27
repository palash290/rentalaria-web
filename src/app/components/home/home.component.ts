import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchComponent } from '../search/search.component';

Swiper.use([Navigation]);

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mainSwiper1: any;
  mainSwiper2: any;

  constructor(private translate: TranslateService) { }

  ngAfterViewInit() {

    const videoElement = document.getElementById('videoPreview') as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = 'img/video_banner.mp4';
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.autoplay = true;
      videoElement.play();
    }

    setTimeout(() => {
      this.mainSwiper1 = new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          }
        }
      });
    }, 1000);


    setTimeout(() => {
      this.mainSwiper2 = new Swiper('.ct_testimonial_slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          }
        }
      });
    }, 1000);
  }

  clearStorage() {
    localStorage.removeItem('location');
    localStorage.removeItem('date');
    localStorage.removeItem('date2');
    localStorage.removeItem('locationName');
  }


}
