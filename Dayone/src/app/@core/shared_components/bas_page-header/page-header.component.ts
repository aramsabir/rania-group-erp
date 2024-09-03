import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethod } from '../../service/apis';
import { HttpService } from '../../service/http/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bas-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class BasPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() routes!: any;
  @Input() actions!: any;
  @Input() last_page!: any;
  voucherGroups: any = [];
  constructor(private httpService: HttpService, private router: Router,private location:Location) {}
  elements: any = [];
  ngOnInit(): void {
    for (let index = 0; index < this.actions.length; index++) {
      if (this.actions[index].end_point == 'voucher_groups')
        this.goToVoucherGroup(this.actions[index].end_point);
    }
  }
  goToVoucherGroup(endPoint: any) {
    this.httpService.call(endPoint, ApiMethod.GET, {}).subscribe((res: any) => {
      this.voucherGroups = res.data;
    });
  }

  goTo(url: any, event: any) {
    console.log(url, event);
    this.router.navigate([url], { queryParams: { group: event } });
  }
  back(){
    this.location.back();
  }
}
