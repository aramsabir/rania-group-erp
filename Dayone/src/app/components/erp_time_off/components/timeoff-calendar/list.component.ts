import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-employee-calendar',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe],
})
export class EmployeeTimeOffComponent implements OnInit {
  viewDate: Date = new Date();
  themecolor: any = '#FF0000';
  events: any = [];
  @ViewChild("modalEditTimeOff") modalContent: TemplateRef<any> | undefined;
  @ViewChild("modalDeleteTimeOff") deleteModal: TemplateRef<any> | undefined;

  titlePage: any = 'Dashboard';
  year = new Date().getFullYear();
  actions: any = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: 'delete',
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: 'edit',
    },
  ];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/time-offs/main', name: "Home" },
  ];

  dataSource: any = [];
  titleModal: string = '';

  pg_header: any = [];
  employee: any = {};
  params: any = {};
  selectedIDForDelete: any;
  message: string = '';
  updateModel: any = {};
  constructor(
    private dic: DicService,
    private location: Location,
    private routes: ActivatedRoute,
    private httpService: HttpService,
    private datePipe: DatePipe,
    private metaService: SeoService,
    private modalService: NgbModal
  ) {
    this.metaService.setTitle(environment.app_title, this.titlePage);
    // this.user$ = this.authService.currentUserSubject.asObservable();

  
    // console.log(this.authService.hasPermission('employee:read'));
    this.routes.queryParams.subscribe((params: any) => {
      this.params.employee_id = params.employee_id ? params.employee_id : null;
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

  back(){
    this.location.back()
  }
  getData() {
    this.httpService
    .call(`${'employee-grouped-allocations'}`, ApiMethod.GET, this.params)
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.httpService.createToast('success', res.message);
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
      .call(`${'employee-time-off-per-year'}`, ApiMethod.GET, { year: this.year, employee_id:this.params.employee_id })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.employee = res.employee
            var data = res.data.map((data) => {
              return {
                start: new Date(data.start),
                end: new Date(data.end),
                title:
                  data.title +
                  ' - ' +
                  data.hours +
                  'H' +
                  ':' +
                  data.minutes +
                  'M',
                _id: data._id,
                color: {
                  primary: data.color,
                  secondary: data.secondary,
                },
                actions: this.actions,
              };
            });

            this.events = data;
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  save() {
    this.httpService
      .call(`${'employee-time-off'}`, ApiMethod.POST, this.params, this.modalData)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.modalService.dismissAll()
            this.httpService.createToast('success', res.message);
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  update() {
    this.httpService
      .call(`${'employee-time-off'}`, ApiMethod.PUT, this.params, this.updateModel)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.modalService.dismissAll()
            this.httpService.createToast('success', res.message);
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  deleteItem() {
    this.httpService
      .call(`${'time-off'}`, ApiMethod.DELETE, {_id: this.selectedIDForDelete})
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.modalService.dismissAll()
            this.httpService.createToast('success', res.message);
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }

  checkTime() {
    this.modalData.duration_minutes = 0;
    this.modalData.duration_hours = 0;
    this.modalData.duration_days = 0;
    if (this.modalData.type == 'Hours') {
      this.calculateTimeDifference(
        this.modalData.start_time,
        this.modalData.end_time
      );
    } else {
      this.modalData.duration_days = this.calculateDaysDifference(
        this.modalData.start_date,
        this.modalData.end_date
      );
      this.modalData.duration_hours = this.modalData.duration_days * 8;
    }
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
    this.modalData.duration_hours = hours;
    this.modalData.duration_minutes = minutes;
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

  modalData: any = {};
  emp_allocations: any = [];
  showModalAdd(largemodal: any): void {
    this.modalService.open(largemodal, { size: 'lg' });
  }

  ngOnInit(): void {}

  actionClicked(action: any) {
 
    if (action.action === 'delete') {
      this.selectedIDForDelete = action.event._id;
      this.message = 'Are you sure for remove this data';
      this.modalService.open(this.deleteModal, { size: 'lg' });

    } else {
      this.httpService
        .call(`${'time-off'}`, ApiMethod.GET, { _id: action.event._id })
        .subscribe((ptr: any) => {
          if (ptr.status) {
            this.updateModel = ptr.data;

            this.updateModel.start_date = this.datePipe.transform(ptr.data.start_date,'yyyy-MM-dd');
            this.updateModel.end_date = this.datePipe.transform(ptr.data.end_date,'yyyy-MM-dd');
            if (ptr.data.type == 'Hours') {
              // this.updateModel.start_time = this.datePipe.transform( ptr.data.start_time, 'yyyy-MM-dd');
              // this.updateModel.end_time = this.datePipe.transform( ptr.data.end_time, 'yyyy-MM-dd');
            }
            this.modalService.open(this.modalContent, { size: 'lg' });
          } else {
            this.message = ptr.message;
            document.getElementById('alert')!.click();
          }
        });
    }
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
