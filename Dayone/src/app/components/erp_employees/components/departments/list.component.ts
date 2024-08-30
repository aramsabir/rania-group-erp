import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-comdepartmentspany',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DepartmentComponent implements OnInit {

  url: any = "departments"
  actionRoute: any = "department"
  titlePage: any = "Departments"
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
      url: 'department',
      header: 'Update department',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
      ]
    },
  };
  insertForm = {
    width: '300px',
    type: "modal",
    data: {
      dialogType: 'create',
      url: 'department',
      header: 'Create department',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
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
      this.params.skip = params.skip ? params.skip :0;
      this.params.limit = params.limit ? params.limit : 10;
      this.params.sort = params.sort ? params.sort : 'created_at'
      this.pg_header = [
        { link: '/home', params: {}, value: "Home" },
      ]

    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
