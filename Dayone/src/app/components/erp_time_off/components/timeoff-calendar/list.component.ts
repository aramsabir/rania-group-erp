import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-employee-timeoff-calendar',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeeTimeoffComponent implements OnInit {

 
  titlePage: any = ""
  actions: any = [

  ]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: "Home" },
  ]
  
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



  viewDate: Date = new Date();
  themecolor: any = '#0000ff';
  events: any = []

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private metaService: SeoService,
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);

    this.routes.queryParams.subscribe((params: any) => {
      this.params.employee_name = params.employee_name ? params.employee_name : ''
      this.params._id = params._id
      this.pg_header = [
        { link: '/home', params: {}, value: "Home" },
      ]
      this.titlePage = params.type
     // routes.queryParams.subscribe(() => {
    // });
    })

  }

  ngOnInit(): void {

  }
  actionClicked(action: any) {
    console.log(action);
    
    // if (action.action === 'delete') {
    //   this.selectedIDForDelete = action.event._id;
    //   this.message = 'Are you sure for remove this data';
    //   document.getElementById('deleteModal')!.click();
    // } else {
    //   this.addUserStatus = false;
    //   this.editUserStatus = true;
    //   this.sharedService
    //     .get(environment.apiUrl + `/plan/${action.event._id}`)
    //     .subscribe((ptr: any) => {
    //       if (ptr.status) {
    //         this.newUser = ptr.data;
    //         this.newUser.date = this.datePipe.transform(ptr.data.start, 'yyyy-MM-dd');
    //       } else {
    //         this.message = ptr.message;
    //         document.getElementById('alert')!.click();
    //       }
    //     });
    // }
  }
 

  eventClicked(event: any) {
    console.log(event);
    
    // this.sharedService.get(environment.apiUrl + `/plan/${event._id}`).subscribe((ptr: any) => {
    //   if (ptr.status) {
    //     this.newUser = ptr.data;
    //     this.newUser.date = this.datePipe.transform(ptr.data.start, 'yyyy-MM-dd');
    //   } else {
    //     this.message = ptr.message;
    //     document.getElementById('alert')!.click();
    //   }
    // });
  }

}
