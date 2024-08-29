import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
 
actions: any = [
  
]
 
bercumberRoutes: any = [
  {icon:'feather feather-home',route:'/home',name:"Home"},
]
 
  pg_header:any = []
  titlePage: any = "Roles"
  url: any = "roles"
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
      value:'name'
    },
  
    {
      header: 'Description',
      cell: (el: any) => el.description,
      type: 'text',
      value:'description'
    },
    {
      header: 'Created at',
      cell: (el: any) => el.created_at,
      type: 'date',
      value:'created_at'
    },
    {
      header: 'Actions',
      // actions: [{value:'edit'},{value:'detail',url:'/home/settings/roles/detail'}, {value:'delete'}],
      actions: [{value:'detail',url:'/bas-settings/roles/detail'}, {value:'delete'}],
      value:'none'
    },
  ];

  insertForm = {
    width: '300px',
    type:"modal",
    data: {
      dialogType: 'update',
      url: 'role',
      header: 'Update role',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
        { type: 'text_area', name: 'description', title: 'Description', required: true },
      ]
    },
  };

  modalForm = {
    width: '300px',
    type:"modal",
    data: {
      dialogType: 'create',
      url: 'role',
      header: 'Create role',
      fields: [
        { type: 'text', name: 'name', title: 'Name', required: true },
        { type: 'text_area', name: 'description', title: 'Description', required: true },
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
  length: any;
  queryParams: any = {};

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private metaService: SeoService,
  ) {

    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip;
      this.params.limit = params.limit;
      this.params.sort = params.sort;
      
    this.metaService.setTitle( environment.app_title, this.titlePage);

      this.pg_header = [
        {link:'/home',params:{},value:"Home"},
        // {link:'/home/settings/roles',params:params,value:"Roles"},
      ] 

    });
    // routes.queryParams.subscribe(() => {
    // });

  }

  ngOnInit(): void {

  }
}
