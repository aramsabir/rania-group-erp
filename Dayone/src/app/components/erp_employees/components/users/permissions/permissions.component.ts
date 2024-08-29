import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
// import { ToastService } from 'ng-uikit-pro-standard';
import { environment } from 'src/environments/environment';
// import { prefillHostVars } from '@angular/core/src/render3/instructions';
// import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class BasPermissionsComponent implements OnInit {
  url: any = 'user_companies';
  actionRoute: any = 'user_company';
  titlePage: any = 'User per companies';
  actions: any = [];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
  ];
  columns: any = [
    {
      header: '#',
      cell: (el: any) => el._id,
      type: 'text',
      value: '_id',
    },
    {
      header: 'User',
      cell: (el: any) => el?.user_id?.full_name,
      type: 'text',
      value: 'name',
    },
    {
      header: 'Company name',
      cell: (el: any) => el?.company_id?.name,
      type: 'text',
      value: 'name',
    },
    {
      header: 'Actions',
      actions: [{ value: 'detail',url:'/settings/users/update-user-sources/detail' }, { value: 'delete' }],
    },
  ];

  modalForm = {
    width: '300px',
    type: 'modal',
    data: {
      dialogType: 'update',
      url: 'user_company',
      header: 'Update user company',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
        {
          type: 'text',
          name: 'admin_email',
          title: 'Admin Email',
          required: true,
        },
      ],
    },
  };
  insertForm: any = {
    width: '300px',
    type: 'modal',
    data: {
      dialogType: 'create',
      url: 'user_company',
      header: 'Create user company',
      fields: [],
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

  dataSource: any = [];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'companies';
  length: any;
  queryParams: any = {};
  pg_header: any = [];

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private metaService: SeoService
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);

    this.routes.queryParams.subscribe((params: any) => {
      this.params._id = params._id ? params._id : '';
      this.params.skip = params.skip ? params.skip : 0;
      this.params.limit = params.limit ? params.limit : 10;
      this.params.sort = params.sort ? params.sort : 'created_at';
      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.insertForm = {
        width: '300px',
        type: 'modal',
        data: {
          dialogType: 'create',
          url: 'user_company',
          header: 'Create user company',
          fields: [
            {
              type: 'selectUrl',
              name: 'company_id',
              title: 'Company',
              val_name: 'company_id',
              cap_name: 'name',
              disabled: false,
              required: true,
              url: 'available_companies',
              params: { skip: 0, limit: 1000, sort: 'name' },
            },
            {
              type: 'selectUrl',
              name: 'user_id',
              title: 'User',
              value: this.params._id,
              val_name: 'user_id',
              cap_name: 'full_name',
              disabled: true,
              required: true,
              url: 'available_employees',
              params: { skip: 0, limit: 1000, sort: 'full_name' },
            },
       
          ],
        },
      };
    });
    // routes.queryParams.subscribe(() => {
    // });
  }

  ngOnInit(): void {}
}
