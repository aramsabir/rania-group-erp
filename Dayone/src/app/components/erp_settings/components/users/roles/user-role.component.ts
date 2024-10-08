import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
// import { ToastService } from 'ng-uikit-pro-standard';
import { environment } from 'src/environments/environment';
import { allRoleEN } from './roles';
// import { prefillHostVars } from '@angular/core/src/render3/instructions';
// import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserCompanyRoleComponent implements OnInit {
 
  actions: any = []
   
  bercumberRoutes: any = [
    {icon:'feather feather-home',route:'/home',name:"Home"},
    {icon:'feather feather-key',route:'/bas-settings/roles',name:"Roles"},
  ]

  titlePage: any = 'Roles';
  url: any = 'roles';

  allCheckedUser = false;
  allCheckedRole = false;
  indeterminateUser = true;
  indeterminateRole = true;

  roles: any = [];

  params: any = {};
  roleData: any = {
    user_id:{},
    company_id:{},
    resources:""
  };
  resources: any;

  inputValue: string | null = null;
  textValue: string | null = null;
  lang: any;
  updateRoleStruc: any = {
    resources:[]
  };

  constructor(
    private dic: DicService,
    private location: Location,
    private httpService: HttpService,
    private routes: ActivatedRoute
  ) {
    this.lang = localStorage.getItem('language');

    this.roles = allRoleEN;

    

    this.routes.queryParams.subscribe((params: any) => {
      this.params._id = params._id;
      this.getData();
    });
  }

  ngOnInit(): void {}
  getData() {
    for (let index = 0; index < this.roles.length; index++) {
      this.roles[index].indeterminate = false;
      this.roles[index].allChecked = false;
      this.roles[index].counter = 0;
      for (let index2 = 0;index2 < this.roles[index].options.length;index2++ ) {
        this.roles[index].options[index2].checked = false;
      }
    }
    
    this.httpService.call(`${'user_company_one'}`, ApiMethod.GET, this.params).subscribe(
      (res: any) => {
        if (res.status) {
          this.roleData = res.data;
          if (this.roleData.resources) {
            this.resources = this.roleData.resources.split(',');

            for (let index = 0; index < this.roles.length; index++) {
              for (let index2 = 0;index2 < this.roles[index].options.length;index2++) {
                if ( this.resources.includes(this.roles[index].role_value+this.roles[index].options[index2].value) ){
                  this.roles[index].options[index2].checked  = true
                  this.roles[index].counter ++
                }
              }
              if (this.roles[index].counter == this.roles[index].options.length) {
                this.roles[index].allChecked = true;
              } else if (this.roles[index].counter > 0) {
                this.roles[index].indeterminate = true;
              }
            }
            // console.log(this.roles);
            

          }
        } else {
          this.httpService.createToast('error', res.message)
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error)
      }
    );
  }

  back() {
    this.location.back();
  }

  updateAllChecked(item: any,event:any): void {
    if (event.target.checked) {
      item.options.forEach((item: any) => {
        item.checked = true;
      });
    }else{
      item.options.forEach((item: any) => {
        item.checked = false;
      }); 
    }
  }

  updateSingleChecked(item: any): void {
    if (item.options.every((item: any) => !item.checked)) {
      item.allChecked = false;
      item.indeterminate = false;
    } else if (item.options.every((item: any) => item.checked)) {
      item.allChecked = true;
      item.indeterminate = false;
    } else {
      item.indeterminate = true;
    }
  }

  updateRole() {
    var resource = '';

    for (let index = 0; index < this.roles.length; index++) {
      for ( let index2 = 0;index2 < this.roles[index].options.length;index2++) {
        if (this.roles[index].options[index2].checked)
          resource +=  this.roles[index].role_value +  this.roles[index].options[index2].value +  ',';
      }
    }
    this.updateRoleStruc.resources = resource;

    this.updateRoleStruc._id = this.roleData._id;
    this.updateRoleStruc.user_id = this.roleData.user_id._id;
    this.updateRoleStruc.company_id = this.roleData.company_id._id;
    console.log(this.roleData._id);
    
    this.httpService
      .call(`${'user_company_resources'}`, ApiMethod.PUT, this.params, this.updateRoleStruc )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.httpService.createToast('success', res.message)
            this.getData();
          } else {
            this.httpService.createToast('error', res.message)
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error)
        }
      );
  }
}
