import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompaniesComponent implements OnInit {

  url: any = "companies"
  actionRoute: any = "company"
  titlePage: any = "Companies"
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
      header: 'Admin Email',
      cell: (el: any) => el.admin_email,
      type: 'text',
      value: 'admin_email'
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

  modalForm = {
    width: '300px',
    type: "modal",
    data: {
      dialogType: 'update',
      url: 'company',
      header: 'Update company',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
        { type: 'text', name: 'admin_email', title: 'Admin Email', required: true },
      ]
    },
  };
  insertForm = {
    width: '300px',
    type: "modal",
    data: {
      dialogType: 'create',
      url: 'company',
      header: 'Create company',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
        { type: 'text', name: 'admin_email', title: 'Admin Email', required: true },
      ]
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

  dataSource: any = [
  ];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'companies';
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
      this.params.skip = params.skip;
      this.params.limit = params.limit;
      this.params.sort = params.sort;
      this.pg_header = [
        { link: '/home', params: {}, value: "Home" },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ]

    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
