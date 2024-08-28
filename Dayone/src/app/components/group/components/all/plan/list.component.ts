import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';



@Component({
  selector: 'app-plan-report',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PlanReportComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
    // { icon: 'feather feather-home', route: '/group/plan', name: 'Plan' },
  ];
  actions: any = [

  ];
  userData: any = {};
  DataIsLoading: boolean = false;
  p: any = {
    unit: '',
  };
  // Highcharts: typeof Highcharts = Highcharts;

 
  lang: string;
 
  allData:any = []
  active = 0
  show: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dic: DicService,
    private http: HttpService
  ) {
    this.lang = this.dic.lang()
    this.route.queryParams.subscribe((params) => {
      this.p.year = params['year'];
      this.p.month = params['month'];
      this.p.type = params['type'];
      if (this.p.year == undefined || !this.p.year)
        this.p.year = new Date().getFullYear();
      this.getPlanReport();
    });

  }

  clearFilter() {
    this.p = {
      year: '',
      month: '',
      type: '',
    };
    this.router.navigate([this.p.part], {
      relativeTo: this.route,
      queryParams: this.p,
    });
  }
  ngOnInit() {
    if (this.p.year == undefined || !this.p.year) {
      this.router.navigate([], {
        queryParams: { year: new Date().getFullYear() },
      });
    }
  }
  search() {
    this.router.navigate([], {
      queryParams: this.p,
    });
  }
  searchUnit(event: any) {
    this.router.navigate([], {
      queryParams: { year: this.p.year, unit: event },
    });
  }


  getPlanReport() {
    this.show = false
    this.allData = []
    this.http.call('group/it/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:1,total:ptr.total, data:ptr.data,name:"Information technology"});
      }
    });
    this.http.call('group/hr/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:2,total:ptr.total, data:ptr.data,name:"Human resource"});
      }
    });
    this.http.call('group/pmo/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:3,total:ptr.total, data:ptr.data,name:"Project Management Office"});
      }
    });

    this.http.call('group/machines/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:4,total:ptr.total, data:ptr.data,name:"Machin department"});
      }
    });
    this.http.call('group/finance/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:5,total:ptr.total, data:ptr.data,name:"Finance department"});
      }
    });
    this.http.call('group/reporting/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:6,otal:ptr.total, data:ptr.data,name:"Reporting & analysis"});
      }
    });
    this.http.call('group/legal/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:7,total:ptr.total, data:ptr.data,name:"Legal department"});
      }
    });
    this.http.call('group/accounting/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:8,total:ptr.total, data:ptr.data,name:"Accounting and control"});
      }
    });
    this.http.call('group/scd/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:9,total:ptr.total, data:ptr.data,name:"Supplychain"});
      }
    });
    this.http.call('group/landscape/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:10,total:ptr.total, data:ptr.data,name:"Landscape department"});
      }
    });
    this.http.call('group/booking/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:11,total:ptr.total, data:ptr.data,name:"Administration department"});
      }
    });
    this.http.call('group/commercial/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:12,total:ptr.total, data:ptr.data,name:"Commercial department"});
      }
    });
  
    this.http.call('group/safety/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:13,total:ptr.total, data:ptr.data,name:"Safety unit"});
      }
    });
    this.http.call('group/property/plan-report', ApiMethod.GET, this.p).subscribe((ptr: any) => {
      if (ptr.status) {
        this.allData.push({order:14,total:ptr.total, data:ptr.data,name:"Property department"});
      }
    });

  


    setTimeout(() => {
      this.show = true
      this.allData.sort((a:any ,b:any) => a.order-b.order )
    }, 1000);
  }

  sumYearly(item: any, i: any) {
    var total = 0;
    item.forEach((item: any) => {
      total += item.total;
    });

    return total / item.length ;
  }
 

  sumAll(data:any) {
    var total = 0;
    var counter = 0;
    data.forEach((item: any) => {
      item.data.forEach((item2: any) => {
        total += item2.total;
        counter++
      });
    });
    var result = total / counter

    return {
      data: (parseFloat(result + '').toFixed(1)) + '/100',
      color: total / counter >= 50 ? 'success' : 'orange',
    };

  }
}
