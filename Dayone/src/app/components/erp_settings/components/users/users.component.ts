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

  url: any = "employees-settings"
  titlePage: any = "Users"
  actions: any = [

  ]
  bercumberRoutes: any = [
    // { icon: 'feather feather-home', route: '/home', name: "Home" },
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
      header: 'Employee ID',
      cell: (el: any) => el.code,
      type: 'number',
      value: 'code'
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
      header: 'Job title',
      cell: (el: any) => el.job_title_id?.name,
      type: 'text',
      value: 'job_title_id'
    },
    {
      header: 'Department',
      cell: (el: any) => el.department_id?.name,
      type: 'text',
      value: 'department_id'
    },
    {
      header: 'Manager',
      cell: (el: any) => el.manager_id?.full_name,
      type: 'text',
      value: 'manager_id'
    },
    {
      header: 'Coach',
      cell: (el: any) => el.coach_id?.full_name,
      type: 'text',
      value: 'coach_id'
    },
    {
      header: 'Main company',
      cell: (el: any) => el.main_company_id?.name,
      type: 'text',
      value: 'main_company_id'
    },
    {
      header: 'Active',
      cell: (el: any) => el.active,
      type: 'checkbox',
      value: 'active'
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
        { value: 'openPage', tooltip: "Permissions", icon: 'fa fa-key', url: '/settings/users/update-user-sources', queryParams: { _id: '_id' } },
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
        { type: 'number', name: 'code', title: 'Employee ID', required: true },
        { type: 'password', name: 'password', title: 'Password', required: true },
        // {
        //   type: 'selectUrl', name: 'job_title_id', title: 'Job title', val_name: 'job_title_id', cap_name: 'name', required: true,
        //   url: 'available_job_titles', params: { skip: 0, limit: 1000, sort: 'name' }
        // },
        {
          type: 'selectUrl', name: 'main_company_id', title: 'Company', val_name: 'main_company_id', cap_name: 'name', required: true,
          url: 'available_companies', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        {
          type: 'selectUrl', name: 'department_id', title: 'Department', val_name: 'department_id', cap_name: 'name', required: true,
          url: 'available_departments', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        {
          type: 'selectUrl', name: 'manager_id', title: 'manager', val_name: 'manager_id', cap_name: 'full_name', required: true,
          url: 'available_employees', params: { skip: 0, limit: 1000, sort: 'full_name' }
        },
        {
          type: 'selectUrl', name: 'coach_id', title: 'Coach', val_name: 'coach_id', cap_name: 'full_name', required: true,
          url: 'available_employees', params: { skip: 0, limit: 1000, sort: 'full_name' }
        },
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
        { type: 'number', name: 'code', title: 'Employee ID', required: true },
        { type: 'password', name: 'password', title: 'Password', required: true },
        // {
        //   type: 'selectUrl', name: 'job_title_id', title: 'Job title', val_name: 'job_title_id', cap_name: 'name', required: true,
        //   url: 'available_job_titles', params: { skip: 0, limit: 1000, sort: 'name' }
        // },
        {
          type: 'selectUrl', name: 'main_company_id', title: 'Company', val_name: 'main_company_id', cap_name: 'name', required: true,
          url: 'available_companies', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        {
          type: 'selectUrl', name: 'department_id', title: 'Department', val_name: 'department_id', cap_name: 'name', required: true,
          url: 'available_departments', params: { skip: 0, limit: 1000, sort: 'name' }
        },
        {
          type: 'selectUrl', name: 'manager_id', title: 'manager', val_name: 'manager_id', cap_name: 'full_name', required: true,
          url: 'available_employees', params: { skip: 0, limit: 1000, sort: 'full_name' }
        },
        {
          type: 'selectUrl', name: 'coach_id', title: 'Coach', val_name: 'coach_id', cap_name: 'full_name', required: true,
          url: 'available_employees', params: { skip: 0, limit: 1000, sort: 'full_name' }
        },
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
  part: any = '';
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
      this.params.companies = ""
      this.pg_header = [
        // { link: '/home', params: {}, value: "Home" },
      ]

    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
