import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {



  viewDate: Date = new Date();
  themecolor: any = '#0000ff';
  events: any = []



  titlePage: any = "Dashboard" ;
  year =  new Date().getFullYear()
  actions: any = [];
  bercumberRoutes: any = [
    // { icon: 'feather feather-home', route: '/home', name: 'Home' },
  ];

  dataSource: any = [];
  titleModal: string = '';

 
  
  pg_header: any = [];
  params: any = {};
  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private httpService: HttpService,
    private metaService: SeoService,
    private modalService: NgbModal
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);
    // this.user$ = this.authService.currentUserSubject.asObservable();

    // console.log(this.authService.hasPermission('employee:read'));
    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip ? params.skip : 0;
      this.params.limit = params.limit ? params.limit : 30;
      this.params.sort = params.sort ? params.sort : 'created_at';
      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.getData();
    });

    // routes.queryParams.subscribe(() => {
    // });
  }
 

  getData() {
    // this.httpService
    //   .call(`${'employees'}`, ApiMethod.GET, this.params)
    //   .subscribe(
    //     (res: any) => {
    //       if (res.status) {
    //         this.httpService.createToast('success', res.message);
    //         this.dataSource = res.data;
    //         this.length = res.count;
    //       } else {
    //         this.httpService.createToast('error', res.message);
    //       }
    //     },
    //     (error: any) => {
    //       this.httpService.createToast('error', error);
    //     }
    //   );
  }

  modalData:any = {}
  emp_allocations:any = []
  showModalAdd(largemodal: any): void {
    this.modalService.open(largemodal, { size: 'lg' });
  }

  ngOnInit(): void { }


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
