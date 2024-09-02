import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  url: any = 'companies';
  actionRoute: any = 'company';
  titlePage: any = 'Employees';
  actions: any = [];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
  ];

  dataSource: any = [];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  page = 0;
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'companies';
  length: any;
  queryParams: any = {};
  pg_header: any = [];
  list_item: string | null;
  endPoint: any = environment.apiIMG + '/images/';

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private httpService: HttpService,
    private metaService: SeoService
  ) {
    this.list_item = localStorage.getItem('list_type');
    this.metaService.setTitle(environment.app_title, this.titlePage);

    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip ? params.skip : 0;
      this.params.limit = params.limit ? params.limit : 30;
      this.params.sort = params.sort ? params.sort : 'created_at';
      this.page = this.params.skip / this.params.limit + 1;

      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.getData();
    });

    // routes.queryParams.subscribe(() => {
    // });
  }

  setListToStorage(type: string) {
    localStorage.setItem('list_type', type);
  }

  getData() {
    this.httpService
      .call(`${'employees'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.httpService.createToast('success', res.message);
            this.dataSource = res.data;
            this.length = res.count;
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }

  ngOnInit(): void {}
}
