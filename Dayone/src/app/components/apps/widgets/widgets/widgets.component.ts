import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";


interface widget1Type{
  id: number;
  title: string;
  data: string;
  caption: string;
  status: string;
  statusText: string;
  description: string;
  logo: string;
  logoStatus: string;
}

const widget1Data: widget1Type[]= [
  {id: 1, title: 'Page Views', data: '234k', caption: '43.2', status:'danger', statusText: 'caret-down', description: 'than last month', logo:'mdi-file-outline', logoStatus:'primary'},
  {id: 2, title: 'Time On Site', data: '12m 3s', caption: '19.8', status:'success', statusText: 'caret-up', description: 'than last month', logo:'mdi-clock', logoStatus:'warning'},
  {id: 3, title: 'Impressions', data: '168', caption: '0.8', status:'success', statusText: 'caret-up', description: 'than last month', logo:'mdi-heart-outline', logoStatus:'success'},
  {id: 4, title: 'Total Followers', data: '3456k', caption: '0.8', status:'success', statusText: 'caret-up', description: 'than last month', logo:'mdi-account-multiple-outline', logoStatus:'secondary'},
]

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetsComponent implements OnInit {
  widget1List!: widget1Type[];
  items!: GalleryItem[];

  imageData = data;
  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit(): void {
    this.widget1List = widget1Data

    // Creat gallery items
    this.items = this.imageData.map((item:any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: './assets/images/photos/1.jpg',
    previewUrl: './assets/images/photos/1.jpg'
  },
  {
    srcUrl: './assets/images/photos/2.jpg',
    previewUrl: './assets/images/photos/2.jpg'
  },
  {
    srcUrl: './assets/images/photos/3.jpg',
    previewUrl: './assets/images/photos/3.jpg'
  },
  {
    srcUrl: './assets/images/photos/4.jpg',
    previewUrl: './assets/images/photos/4.jpg'
  },
  {
    srcUrl: './assets/images/photos/5.jpg',
    previewUrl: './assets/images/photos/5.jpg'
  },
  {
    srcUrl: './assets/images/photos/6.jpg',
    previewUrl: './assets/images/photos/6.jpg'
  },
  {
    srcUrl: './assets/images/photos/7.jpg',
    previewUrl: './assets/images/photos/7.jpg'
  },
  {
    srcUrl: './assets/images/photos/8.jpg',
    previewUrl: './assets/images/photos/8.jpg'
  },
  {
    srcUrl: './assets/images/photos/9.jpg',
    previewUrl: './assets/images/photos/9.jpg'
  },
  {
    srcUrl: './assets/images/photos/10.jpg',
    previewUrl: './assets/images/photos/10.jpg'
  },
  {
    srcUrl: './assets/images/photos/11.jpg',
    previewUrl: './assets/images/photos/11.jpg'
  },
  {
    srcUrl: './assets/images/photos/12.jpg',
    previewUrl: './assets/images/photos/12.jpg'
  }
];