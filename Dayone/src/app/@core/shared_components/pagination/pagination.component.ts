import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() page: any;
  @Input() count: any;
  @Input() perPage: any;
  @Input() loading: any;
  @Input() pagesToShow: any;
  @Input() pageData: any = {};
  itemPerPages: number = 20;
  pageSizeOptions: any = [5, 10, 20, 50, 100];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getMin(): number {
    return this.perPage * this.page - this.perPage + 1;
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  onPage(n: number): void {
    // this.page = n;

    this.pageData.skip = this.pageData.limit * (n - 1);
    this.router.navigate([], {
      queryParams: this.pageData,
    });
  }
  changeItemPerpage(n: number) {
    // this.page = n;
    this.itemPerPages = n;
    this.router.navigate([], {
      queryParams: {
        ...this.pageData,
        skip: 0,
        limit: n,
        // sort: this.pageData.sort,
        // str: this.pageData.str,
        // _id: this.pageData._id,

      },
    });
  }

  firstPage(): void {
    this.page = 1;
    this.router.navigate([], {
      queryParams: {
        ...this.pageData,
        skip: 0,
        // limit: this.pageData.limit,
        // sort: this.pageData.sort,
        // str: this.pageData.str,
        // _id: this.pageData._id,
      },
    });
    // this.goPrev.emit(true);
  }

  onPrev(): void {
    if (this.page > 1) this.onPage(this.page - 1);
    // this.goPrev.emit(true);
  }

  onNext(_next: boolean): void {
    if (this.perPage * this.page < this.count) this.onPage(this.page + 1);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  lastPage() {
    var total = this.totalPages();
    this.onPage(total);
  }

  getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
