import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  url: any = "users"
  titlePage: any = "Users"
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
      header: 'Full name',
      cell: (el: any) => el.full_name,
      type: 'text',
      value: 'full_name'
    },
    {
      header: 'User name',
      cell: (el: any) => el.user_name,
      type: 'text',
      value: 'user_name'
    },
    {
      header: 'Card No.',
      cell: (el: any) => el.code,
      type: 'number',
      value: 'code'
    },
    {
      header: 'Job title',
      cell: (el: any) => el.job_title,
      type: 'text',
      value: 'job_title'
    },
    {
      header: 'E-mail',
      cell: (el: any) => el.email,
      type: 'email',
      value: 'email'
    },
    {
      header: 'Phone',
      cell: (el: any) => el.phone,
      type: 'text',
      value: 'phone'
    },
    {
      header: 'Type',
      cell: (el: any) => this.dic.translate(el.type),
      type: 'text',
      value: 'type'
    },
    {
      header: 'Role',
      cell: (el: any) => el.role_id?.name,
      type: 'text',
      value: 'role_id'
    },
    {
      header: 'Active',
      cell: (el: any) => el.active,
      type: 'checkbox',
      value: 'active'
    },
    {
      header: 'Created at',
      cell: (el: any) => el.craeted_at,
      type: 'date',
      value: 'craeted_at'
    },
    {
      header: 'Actions',
      actions: [
        { value: 'openPage', tooltip: "Permissions", icon: 'fa fa-key', url: '/bas-settings/users/update-user-sources', queryParams: { _id: '_id' } },
        { value: 'edit' },
        { value: 'resetpassword' },
        { value: 'delete' },
      ],
    },
  ];

  modalForm = {
    width: '300px',
    type: "modal",
    data: {
      dialogType: 'update',
      url: 'user',
      header: 'Update user',
      fields: [
        { type: 'text', name: 'full_name', title: 'Full name', required: true },
        { type: 'text', name: 'user_name', title: 'User name', required: true },
        { type: 'text', name: 'email', title: 'E-mail', required: true },
        { type: 'text', name: 'phone', title: 'phone', required: true },
        {
          type: 'selectLocal', name: 'type', title: 'Type', required: true,
          list: [
            {
              value: 'Staff',
              caption: "Staff"
            },
            {
              value: 'Employee',
              caption: "Employee"
            },
            {
              value: 'HR',
              caption: "HR"
            },
          ]
        },
        // {
        //   type: 'selectUrl', name: 'company_id', title: 'Company', val_name: 'company_id', cap_name: 'name', required: true,
        //   url: 'companies', params: { skip: 0, limit: 1000, sort: 'name' }
        // },
        { type: 'text', name: 'job_title', title: 'Job Title', required: true },
        { type: 'number', name: 'card_no', title: 'Card No.', required: true },
        { type: 'password', name: 'password', title: 'Password', required: true },
        {
          type: 'selectUrl', name: 'role_id', title: 'Role', val_name: 'role_id', cap_name: 'name', required: true,
          url: 'roles', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        // {
        //   type: 'selectUrl', name: 'department_id', title:'Department', val_name: 'department_id', cap_name: 'department_id',required: true ,
        //   url: 'departments',params:{skip:0,limit:1000,sort:'name'}
        // },
      ]
    },
  };
  insertForm = {
    width: '300px',
    type: "modal",
    data: {
      dialogType: 'create',
      url: 'user',
      header: 'Create user',
      fields: [
        { type: 'text', name: 'full_name', title: 'Full name', required: true },
        { type: 'text', name: 'user_name', title: 'User name', required: true },
        { type: 'text', name: 'email', title: 'E-mail', required: true },
        { type: 'text', name: 'phone', title: 'phone', required: true },
        {
          type: 'selectLocal', name: 'type', title: 'Type', required: true,
          list: [
            {
              value: 'Staff',
              caption: "Staff"
            },
            {
              value: 'Employee',
              caption: "Employee"
            },
            {
              value: 'HR',
              caption: "HR"
            },
          ]
        },
        // {
        //   type: 'selectUrl', name: 'company_id', title: 'Company', val_name: 'company_id', cap_name: 'name', required: true,
        //   url: 'companies', params: { skip: 0, limit: 1000, sort: 'name' }
        // },
        { type: 'text', name: 'job_title', title: 'Job Title', required: true },
        { type: 'number', name: 'card_no', title: 'Card No.', required: true },
        { type: 'password', name: 'password', title: 'Password', required: true },
        {
          type: 'selectUrl', name: 'role_id', title: 'Role', value: 'role_id', cap_name: 'name', required: true,
          url: 'roles', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        // {
        //   type: 'selectUrl', name: 'department_id', title:'Department', val_name: 'department_id', cap_name: 'department_id',required: true ,
        //   url: 'departments',params:{skip:0,limit:1000,sort:'name'}
        // },
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
  part: any = 'users';
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
        // {link:'/home/settings/users',params:params,value:"Users"},
      ]

    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
