import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-basic-data',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BasicDataComponent implements OnInit {

  url: any = "basic_datas"
  actionRoute: any = "basic_data"
  titlePage: any = ""
  actions: any = [

  ]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: "Home" },
  ]
  columns: any = [
    {
      header: '#',
      cell: (el: any) => el._id,
      type: 'text',
      value: '_id'
    },
    {
      header: 'Name',
      cell: (el: any) => el.name,
      type: 'text',
      value: 'name'
    },
    {
      header: 'Order',
      cell: (el: any) => el.order,
      type: 'text',
      value: 'order'
    },
    {
      header: 'Created at',
      cell: (el: any) => el.created_at,
      type: 'date',
      value: 'created_at'
    },
    {
      header: 'Actions',
      actions: [
        { value: 'edit' },
        { value: 'delete' },
      ],
    },
  ];

  modalForm :any = {
   
  };
  insertForm:any = {
  }
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

  dataSource: any = [
  ];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'basic-datas';
  length: any;
  queryParams: any = {};
  pg_header: any = []

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private metaService: SeoService,
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);

    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip ? params.skip :0;
      this.params.limit = params.limit ? params.limit : 10;
      this.params.sort = params.sort ? params.sort : 'created_at'
      this.params.type = params.type
      this.pg_header = [
        { link: '/home', params: {}, value: "Home" },
      ]
      this.titlePage = params.type
      this.modalForm = {
        width: '300px',
        type: "modal",
        data: {
          dialogType: 'update',
          url: 'job_title',
          header: 'Update job_title',
          fields: [
            { type: 'text', name: 'name', title: 'Name', required: true },
            {
              type: 'text',
              name: 'type',
              value: this.params.type,
              title: 'Type',
              disabled: true,
              required: true,
            },
            { type: 'number', name: 'order', title: 'Order',value:1, required: true },
          ]
        },
      }
      this.insertForm = {
        width: '300px',
        type: "modal",
        data: {
          dialogType: 'update',
          url: 'job_title',
          header: 'Update job_title',
          fields: [
            { type: 'text', name: 'name', title: 'Name', required: true },
            {
              type: 'text',
              name: 'type',
              value: this.params.type,
              title: 'Type',
              disabled: true,
              required: true,
            },
            { type: 'number', name: 'order', title: 'Order',value:1,  required: true },
          ]
        },
      }
      
    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
