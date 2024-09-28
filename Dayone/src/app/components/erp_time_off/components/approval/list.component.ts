import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { LeaveTypes } from 'src/app/@core/service/constants/cities';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { environment } from 'src/environments/environment';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
// import { HttpService } from 'src/app/@core/service/http/http.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[DatePipe]
})
export class TimeOffApprovalsComponent implements OnInit {
  @ViewChild("modalEditTimeOff") modalContent: TemplateRef<any> | undefined;

  url: any = "time-offs"
  actionRoute: any = "time-off"
  titlePage: any = "Time off approvals"
  actions: any = [

  ]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/time-offs/main', name: "Home" },
  ]

  dataSource: any = [];
  titleModal: string = '';

  pageSizeOptions: number[] = [5, 10, 25, 100];
  page = 0;
  pageSize = 10;
  pageIndex: any;
  params: any = {};
  part: any = 'companies';
  length: any;
  queryParams: any = {};
  pg_header: any = [];
  list_item: string | null;
  endPoint: any = environment.apiIMG + '/images/';
  user$: any;
  emp_allocations: any = [];

  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private httpService: HttpService,
    private metaService: SeoService,
    private router: Router,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.list_item = localStorage.getItem('list_type');
    this.metaService.setTitle(environment.app_title, this.titlePage);
    // this.user$ = this.authService.currentUserSubject.asObservable();

    // console.log(this.authService.hasPermission('employee:read'));
    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip ? params.skip : 0;
      this.params.limit = params.limit ? params.limit : 30;
      this.params.sort = params.sort ? params.sort : 'created_at';
      this.params.status = params.status
      this.page = this.params.skip / this.params.limit + 1;

      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.getData();
    });

    // routes.queryParams.subscribe(() => {
    // });
  }

  setListToStorage(type: string) {
    localStorage.setItem('list_type', type);
  }
  search(){
    this.router.navigate([],{queryParams:this.params})
  }
  getData() {
    this.httpService
      .call(`${'time-offs'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.dataSource = res.data;
            this.length = res.count;
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }

  acceptTimeOff(e:any){
    e.status = 'Approved';
    this.httpService
    .call(`${'time-off-approve'}`, ApiMethod.PUT, this.params,e)
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.httpService.createToast('success', res.message);
          this.getData()
        } else {
          this.httpService.createToast('error', res.message);
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error);
      }
    );
  }

  checkTimeUpdate() {
    this.updateModel.duration_minutes = 0;
    this.updateModel.duration_hours = 0;
    this.updateModel.duration_days = 0;
    if (this.updateModel.type == 'Hours') {
      this.calculateTimeDifferenceUpdate(
        this.updateModel.start_time,
        this.updateModel.end_time
      );
    } else {
      this.updateModel.duration_days = this.calculateDaysDifferenceUpdate(
        this.updateModel.start_date,
        this.updateModel.end_date
      );
      this.updateModel.duration_hours = this.updateModel.duration_days * 8;
    }
  }

  calculateTimeDifference(from_time: string, end_time: string) {
    // Convert string times to Date objects
    const fromDate = new Date(`1970-01-01T${from_time}:00`);
    const toDate = new Date(`1970-01-01T${end_time}:00`);

    // Calculate the difference in milliseconds
    const difference = toDate.getTime() - fromDate.getTime();

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    this.updateModel.duration_hours = hours;
    this.updateModel.duration_minutes = minutes;
  }

  calculateDaysDifference(from_time: string, end_time: string): number {
    // Convert the input strings to Date objects
    const fromDate = new Date(from_time);
    const toDate = new Date(end_time);

    // Calculate the difference in milliseconds
    const difference = toDate.getTime() - fromDate.getTime();

    // Convert the difference from milliseconds to days
    let daysDifference = difference / (1000 * 60 * 60 * 24);
    daysDifference += 1;

    return Math.floor(daysDifference); // Return the floor value to get whole days
  }

  calculateTimeDifferenceUpdate(from_time: string, end_time: string) {
    // Convert string times to Date objects
    const fromDate = new Date(`1970-01-01T${from_time}:00`);
    const toDate = new Date(`1970-01-01T${end_time}:00`);

    // Calculate the difference in milliseconds
    const difference = toDate.getTime() - fromDate.getTime();

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    this.updateModel.duration_hours = hours;
    this.updateModel.duration_minutes = minutes;
  }

  calculateDaysDifferenceUpdate(from_time: string, end_time: string): number {
    // Convert the input strings to Date objects
    const fromDate = new Date(from_time);
    const toDate = new Date(end_time);

    // Calculate the difference in milliseconds
    const difference = toDate.getTime() - fromDate.getTime();

    // Convert the difference from milliseconds to days
    let daysDifference = difference / (1000 * 60 * 60 * 24);
    daysDifference += 1;

    return Math.floor(daysDifference); // Return the floor value to get whole days
  }


  update(){
    this.httpService
    .call(`${'time-off'}`, ApiMethod.PUT, this.params, this.updateModel)
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.httpService.createToast('success', res.message);
          this.getData()
          this.modalService.dismissAll()
        } else {
          this.httpService.createToast('error', res.message);
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error);
      }
    );
  }

  updateModel:any = {}
  editTimeOff(edit:any){

    this.httpService
    .call(`${'employee-grouped-allocations'}`, ApiMethod.GET, {employee_id: edit.employee_id._id})
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.emp_allocations = res.data;
        } else {
          this.httpService.createToast('error', res.message);
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error);
      }
    );
    
    this.httpService
    .call(`${'time-off'}`, ApiMethod.GET, { _id: edit._id })
    .subscribe((ptr: any) => {
      if (ptr.status) {
        this.updateModel = ptr.data;

        this.updateModel.start_date = this.datePipe.transform(ptr.data.start_date,'yyyy-MM-dd');
        this.updateModel.end_date = this.datePipe.transform(ptr.data.end_date,'yyyy-MM-dd');
        if (ptr.data.type == 'Hours') {
          // this.updateModel.start_time = this.datePipe.transform( ptr.data.start_time, 'HH:mm');
          // this.updateModel.end_time = this.datePipe.transform( ptr.data.end_time, 'HH:mm');
        }
        this.modalService.open(this.modalContent, { size: 'lg' });
      } else {
      
      }
    });


  }
  ngOnInit(): void { }
}
