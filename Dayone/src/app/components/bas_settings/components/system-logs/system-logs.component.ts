import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.scss']
})
export class BasLogComponent implements OnInit {
  url: any = 'logs';
  titlePage: any = 'Logs';
  actions: any = [];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
  ];
  columns: any = [
    {
      header: '#',
      cell: (el: any) => el._id,
      type: 'number',
      value: '_id',
    },
    {
      header: 'Date',
      cell: (el: any) => el.date,
      type: 'date',
      value: 'date',
    },
    {
      header: 'User',
      cell: (el: any) =>
        el.user_name,
      type: 'text',
      value: 'user_name',
    },
    {
      header: 'IP',
      cell: (el: any) => el.ip,
      type: 'text',
      value: 'ip',
    },

    {
      header: 'Event',
      cell: (el: any) => el.event,
      type: 'text',
      value: 'event',
    },
    // {
    //   header: 'Before',
    //   cell: (el: any) => el.before,
    //   type: 'text',
    //   value: 'before',
    // },
    // {
    //   header: 'Event',
    //   cell: (el: any) => el.event,
    //   type: 'text',
    //   value: 'event',
    // },
    {
      header: 'Actions',
      actions: [
        { value: 'modalDetail' },
      ],
    },
  ];

  modalForm = {
    width: '300px',
    type: 'none',
    data: {
      dialogType: 'update',
      url: 'inventory',
      header: 'Update inventory',
      fields: [
        {
          type: 'selectUrl',
          name: 'product_id',
          title: 'Product',
          val_name: 'product_id', cap_name: 'name', required: true,
          url: 'products', params: { skip: 0, limit: 1000, sort: 'name' },
        },
        {
          type: 'number',
          name: 'qty',
          title: 'Quantity',
          required: true,
        },
        {
          type: 'date',
          name: 'date',
          title: 'Date',
          required: true,
        },

      ],
    },
  };

  insertForm = {
    width: '300px',
    type: 'none',
    data: {
      dialogType: 'create',
      url: 'inventory',
      header: 'Create inventory',
      fields: [
        {
          type: 'selectUrl',
          name: 'product_id',
          title: 'Product',
          val_name: 'product_id', cap_name: 'name', required: true,
          url: 'products', params: { skip: 0, limit: 1000, sort: 'name' },
        },
        {
          type: 'number',
          name: 'qty',
          title: 'Quantity',
          required: true,
        },
        {
          type: 'date',
          name: 'date',
          title: 'Date',
          required: true,
        },

      ],
    },
  };
  modalActions: any = [
    {
      label: 'Save',
      type: 'save',
    },
    {
      label: 'Edit',
      type: 'edit',
      status: false,
    },
    {
      label: 'Cancel',
      type: 'cancel',
    },
  ];
  companies: any = []
  dataSource: any = [];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'logs';
  length: any;
  queryParams: any = {};
  pg_header: any = [];
  searchModel: any = {
    from: null,
    to: null,
  };
  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private router: Router,
    private metaService: SeoService,
    private httpService: HttpService
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);

    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip;
      this.params.limit = params.limit;
      this.params.sort = params.sort;
      this.params.companies = params.companies;
      this.params.cond = params.cond;
      this.params.from = params.from;
      this.params.to = params.to;
      // if (params['companies'] && params['companies'] != 'undefined' && params['companies'] != undefined)
      //   if (typeof params['companies'] == 'string') {
      //     this.searchModel.companies = [params['companies']];
      //   } else 

      // this.searchModel.companies = params['companies'];
      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/users',params:params,value:"Users"},
      ];
    });
    routes.queryParams.subscribe(() => {
      this.search()
    });
  }

  search() {
    if (this.params.companies == null)
      delete this.params.companies
    this.router.navigate([], { queryParams: this.params });
  }
  ngOnInit(): void {

  }
}
