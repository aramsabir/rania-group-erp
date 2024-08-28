import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
// import { ToastService } from 'ng-uikit-pro-standard';
import { environment } from 'src/environments/environment';
// import { prefillHostVars } from '@angular/core/src/render3/instructions';
// import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class BasPermissionsComponent implements OnInit {
  actions: any = [
    // {
    //   class: 'btn btn-primary',
    //   icon: 'feather feather-plus',
    //   ngbTooltip: this.dic.translate('New Ticket'),
    //   type: 'info',
    //   url: '/administrator_tickets/new',
    // }
  ]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: "Home" },
    { icon: 'feather feather-users', route: '/bas-settings/users', name: "Users" },
  ]
  page = 1;
  count = Number;
  sub: any;
  api: any
  data: any = [];
  data2: any = []

  model: any = [{}]
  public p: any = { _id: "a", sort: 'created_at', skip: 0, limit: 5, str: '', part: 'users/update-user-companies' };
  dataPermission: any = [{}];
  companies: any[] = [];
  headElements = ['Name',]
  selectedValue: any = [];
  tableData: any = [];
  maintainanceTypeList2: any = [];
  name: any;
  stateContract: boolean;
  part: string = '';
  dataC: any = [];
  maintainanceTypeListC: any = [];
  dataPermissionC: any = [{}];
  maintainanceTypeList2C: any = [];
  countC: Number = 0;
  nameC: any;
  contracts: any;
  user: any;
  allIsSelected: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpService,
    private dic: DicService,
    private toastservice: ToastrService
  ) {


    this.stateContract = true

    this.api = environment.apiUrl
    this.sub = this.route.queryParams.subscribe(params => {
      this.p._id = params['_id'];

      this.http.call('user', ApiMethod.GET, { _id: this.p._id }).subscribe((res: any) => {
        if (res.status == true) {
          this.user = res.data
        } else {
          this.http.createToast('danger', res.message)
        }
      }, () => {
        this.http.createToast('danger', 'Network error')
      });
      this.page = this.p.skip / this.p.limit + 1;
    })

  }

  back() {
    this.location.back()
  }
  ngOnInit() {
    this.getCompanies();
    this.getData();
  }

  selectAll(e: any) {
    this.tableData = this.tableData.map(el => {
      return {
        ...el,
        company_status: e.target.checked ? true : false
      }
    })
    if (e.target.checked) {
      this.tableData.forEach(el => {
        this.pushCompany({ _id: el._id })
      });
    } else {
      this.tableData.forEach(el => {
        this.popCompany({ _id: el._id })
      });
    }
  }
  getCompanies() {

    this.http.call('companies', ApiMethod.GET, { skip: 0, limit: 10000, sort: 'name' }).subscribe((ptr: any) => {
      if (ptr.status) {
        this.data = ptr.data;
        this.count = ptr.count;
      }
    })
  }

  change(e: any, type: any, i: any) {

    if (this.tableData[i].company_status)
    {
      this.pushCompany(type)
    }
    else {
      this.popCompany(type)
      this.allIsSelected = false;
    }


    if (this.tableData[i].company_status) {
      this.selectedValue.push(type);
    }
    else {
      let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.maintenancetype);

      let index = this.selectedValue.indexOf(updateItem);

      this.selectedValue.splice(index, 1);
    }
  }




  pushCompany(data: any) {
    var dataModel = { company_id: data._id, _id: this.p._id }
    this.http.call('push_company_for_user', ApiMethod.POST, {}, dataModel).subscribe((ptr: any) => {
      if (ptr.status) {
        this.http.createToast('success', ptr.message)
        this.ngOnInit()
      } else {
        this.http.createToast('error', ptr.message)
        // this.toastservice.warning(ptr.message)

      }
    })
  }


  popCompany(data: any) {
    var dataModel = { company_id: data._id, _id: this.p._id }

    this.http.call('pop_company_for_user', ApiMethod.POST, {}, dataModel).subscribe((ptr: any) => {
      if (ptr.status) {
        this.http.createToast('success', ptr.message)
        this.ngOnInit()
      } else {
        this.http.createToast('error', ptr.message)
        // this.toastservice.warning(ptr.message)

      }
    })
  }


  getData() {
    this.tableData = []
    this.http.call('user_company', ApiMethod.GET, { _id: this.p._id }).subscribe((ptr: any) => {

      if (ptr.status) {
        this.count = ptr.count;
        this.tableData = ptr.data;
        this.tableData.forEach(el => {
          if (!el.company_status) {
            this.allIsSelected = false
          }
        });
      }
    })

  }


  findIndexToUpdate(type: any) {
    return type.maintenancetype === this;
  }

}
