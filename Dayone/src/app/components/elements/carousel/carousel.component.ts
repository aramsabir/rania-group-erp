import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [
    './assets/images/photos/19.jpg',
    './assets/images/photos/20.jpg',
    './assets/images/photos/21.jpg',
    './assets/images/photos/22.jpg',
    './assets/images/photos/23.jpg',
  ]

  ngOnInit(): void {
  }
  imageObject: Array<object> = [
    {
    image: './assets/images/photos/4.jpg',
    thumbImage: './assets/images/photos/4.jpg',
    alt: 'alt of image',
    title: 'title of image'
    
    },
    {
      image: './assets/images/photos/5.jpg', 
      thumbImage: './assets/images/photos/5.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/6.jpg', 
      thumbImage: './assets/images/photos/6.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/7.jpg', 
      thumbImage: './assets/images/photos/7.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/8.jpg', 
      thumbImage: './assets/images/photos/8.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/9.jpg', 
      thumbImage: './assets/images/photos/9.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/1.jpg', 
      thumbImage: './assets/images/photos/1.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/2.jpg', 
      thumbImage: './assets/images/photos/2.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
    {
      image: './assets/images/photos/3.jpg', 
      thumbImage: './assets/images/photos/3.jpg', 
      title: 'Image title',
      alt: 'Image alt',
      
    },
  ];
  showNavigationArrows = false;
  showNavigationIndicators = false;

  hideNavigationArrows = false;
  hideNavigationIndicators = false;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
