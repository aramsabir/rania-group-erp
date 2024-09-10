import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveTypes } from 'src/app/@core/service/constants/cities';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-allocations',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AllocationsComponent implements OnInit {

  url: any = "allocations"
  actionRoute: any = "allocation"
  titlePage: any = "Allocations"
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
      header: 'Company',
      cell: (el: any) => el?.company_id?.name,
      type: 'text',
      value: 'company_id'
    },
    {
      header: 'Department',
      cell: (el: any) => el?.department_id?.name,
      type: 'text',
      value: 'department_id'
    },
    {
      header: 'Employee',
      cell: (el: any) => el?.employee_id?.full_name,
      type: 'text',
      value: 'employee_id'
    },
    {
      header: 'Leave type',
      cell: (el: any) => el.leave_type,
      type: 'text',
      value: 'leave_type'
    },
    {
      header: 'Hours',
      cell: (el: any) => el.hours,
      type: 'number',
      value: 'hours'
    },
    {
      header: 'Date',
      cell: (el: any) => el.date,
      type: 'date_formal',
      value: 'date'
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
        { type: 'date', name: 'date', title: 'Date', required: true },
        { type: 'number', name: 'hours', title: 'Hours', required: true },
        {
          type: 'selectLocal', name: 'leave_type', title: 'Leave type', required: true,
          list:LeaveTypes
        },
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
        { type: 'date', name: 'date', title: 'Date', required: true },
        { type: 'number', name: 'hours', title: 'Hours', required: true },
        {
          type: 'selectLocal', name: 'leave_type', title: 'Leave type', required: true,
          list:LeaveTypes
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
  part: any = 'allocations';
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
