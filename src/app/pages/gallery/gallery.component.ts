import { Component, OnInit, ViewChild } from '@angular/core';
import { Gallery } from 'angular-gallery';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import AOS from 'aos';
export interface RecordData {
  id: number,
  path: string,
  category: string,
};

interface RecordStore {
  cached?: RecordData[];
  refined?: RecordData[];
  stamp?: Date;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})


export class GalleryComponent implements OnInit {

  @ViewChild(NgxMasonryComponent, { static: false }) masonry: NgxMasonryComponent;
  formHorizontal: boolean = true;
  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.masonry-item',
  };
  categorySelected: string;
  updateMasonryLayout: string;
  images = [
    { path: '../../../assets/images/gallery/img-18.jpg', cat: 'out' },
    { path: '../../../assets/images/gallery/img-19.jpg', cat: 'out' },
    { path: '../../../assets/images/gallery/img-20.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-21.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-22.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-23.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-24.jpg', cat: 'out' },
    { path: '../../../assets/images/gallery/img-25.jpg', cat: 'out' },
    { path: '../../../assets/images/gallery/img-26.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-27.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-28.jpg', cat: 'in' },
    { path: '../../../assets/images/gallery/img-29.jpg', cat: 'out' },
  ]

  portfolioItems: any;

  constructor(private gallery: Gallery) {
    this.categorySelected = 'all';
    this.portfolioItems = this.images;
  }

  ngOnInit(): void {
    AOS.init()
  }
  filter(cat: string) {
    this.portfolioItems = this.images.filter(it => (it.cat === cat || cat === 'all'));
    this.updateMasonryLayout = Date.now().toString();
  }
  showGallery(index: number) {
    let prop = {
      images: [
        { path: '../../../assets/images/gallery/img-18.jpg' },
        { path: '../../../assets/images/gallery/img-19.jpg' },
        { path: '../../../assets/images/gallery/img-20.jpg' },
        { path: '../../../assets/images/gallery/img-21.jpg' },
        { path: '../../../assets/images/gallery/img-22.jpg' },
        { path: '../../../assets/images/gallery/img-23.jpg' },
        { path: '../../../assets/images/gallery/img-24.jpg' },
        { path: '../../../assets/images/gallery/img-25.jpg' },
        { path: '../../../assets/images/gallery/img-26.jpg' },
        { path: '../../../assets/images/gallery/img-27.jpg' },
        { path: '../../../assets/images/gallery/img-28.jpg' },
        { path: '../../../assets/images/gallery/img-29.jpg' },
      ],
      index
    };
    this.gallery.load(prop);
  }



  // public filter(category: string) {
  //   this.store.refined = this.store.cached
  //     .filter(p => p.category == category || category == 'all');
  //   this.store.stamp = new Date();
  //   this.masonry.reloadItems();
  // }

}
