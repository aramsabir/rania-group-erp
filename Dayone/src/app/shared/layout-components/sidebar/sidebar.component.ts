import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  Input,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';
import { Menu, NavService } from '../../services/nav.service';
import { checkHoriMenu, parentNavActive, switcherArrowFn } from './sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  @Input() company: string = 'bas-home';
  public menuItems!: Menu[];
  public url: any;
  public windowSubscribe$!: any;
  userData: any = {};
  userPhoto: any = 'assets/images/users/avatar.png'

  user_read: boolean = false;
  role_read: boolean = false;
  generator_read: boolean = false;

  from: string | null;
  to: string | null;
  prev_year: any;
  arr_years_expence: any = [];
  generator_maintenance: boolean = false;
  constant_values: boolean = false;
  product_read: boolean = false;
  company_read: boolean = false;
  log_read: boolean = false;
  now: any
  hour_before_now: any
  ActivitySubjects_read: boolean = false;
  LetterSubjects_read: boolean = false;
  Visit_read: boolean = false;
  Visit_add: boolean = false;
  Activity_read: boolean = false;
  Activity_add: boolean = false;
  Warning_read: boolean = false;
  Warning_add: boolean = false;
  Accident_read: boolean = false;
  Accident_add: boolean = false;
  Letters_read: boolean = false;
  Letters_add: boolean = false;
  VisitReasons_add: boolean = false;
  AccidentReasons_add: boolean = false;
  WarningReasons_add: boolean = false;
  WarningTypes_add: boolean = false;
  Contractors_add: boolean = false;
  Cases_add: boolean = false;
  Complaint_read: any = false;
  Complaint_add: any = false;
  employee_read: any = false;

  constructor(
    private dic: DicService,
    private router: Router,
    private navServices: NavService,
    private httpService: HttpService,
    public elRef: ElementRef,
    private datePipe: DatePipe,
    private breakpointObserver: BreakpointObserver
  ) {
    this.from = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), "yyyy-MM-dd")
    this.to = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    this.now = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm")
    this.hour_before_now = this.datePipe.transform(new Date().setHours(new Date().getHours() - 1), "yyyy-MM-ddTHH:mm")
    this.prev_year = new Date().getFullYear() - 1
    this.arr_years_expence = [this.prev_year - 1, this.prev_year,]
    this.menuItems = this.navServices.MENUITEMS
    // this.userInfo()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.company = event.url.split('/')[1]
    // console.log(this.company);

        this.checkNavActiveOnLoad();
      }
    })
  }

  userInfo() {
    this.httpService.call('userinfo', ApiMethod.GET, {}).subscribe((res: any) => {
      if (res.status == true) {
        this.userData = res.data
        this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`

      } else {
        this.httpService.createToast('danger', res.message)
      }
    }, () => {
      this.httpService.createToast('danger', 'Network error')
    });
  }


  // To set Active on Load
  checkNavActiveOnLoad() {
    // this.company = this.router.url.split('/')[1]
    // console.log(this.company);



    this.httpService.call('userinfo', ApiMethod.GET, {}).subscribe((res: any) => {
      if (res.status == true) {
        this.userData = res.data
        this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`

        var resources: any = []
        if (res.data.role_id)
        //   resources = res.data.role_id.resource.split(',')

        // if (resources.includes('user:read'))
        //   this.user_read = true
        // if (resources.includes('role:read'))
        //   this.role_read = true
        // if (resources.includes('log:read'))
        //   this.log_read = true
    

    
          this.menuItems = [
            // {
            //   title: this.dic.translate('Home'), status: true, icon: 'fe fe-home', type: 'link', path: '/home', badgeType: 'success', badgeValue: '2', active: false,
            // },
            // {
            //   title: this.dic.translate('Users'), status: this.user_read, icon: 'fe fe-settings', type: 'link', path: `/bas-settings/users?skip=0&limit=50&sort=full_name`, badgeType: 'success', badgeValue: '2', active: false,
            // },
            // {
            //   title: this.dic.translate('Roles'), status: this.role_read, icon: 'fe fe-settings', type: 'link', path: `/bas-settings/roles?skip=0&limit=50&sort=name`, badgeType: 'success', badgeValue: '2', active: false,
            // },
            // {
            //   title: this.dic.translate('Logs'), status: this.log_read, icon: 'fe fe-settings', type: 'link', path: `/bas-settings/logs?skip=0&limit=50&sort=-created_at`, badgeType: 'success', badgeValue: '2', active: false,
            // },
            
            // {
            //   headTitle: 'DASHBOARDS'
            // },
            // {
            //   title: 'Dashboards', status: true, icon: 'fe fe-home', type: 'sub', active: false, children: [
            //     {
            //       title: 'HR Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/hr-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/hr-dashboard/department', title: 'Department', type: 'link' },
            //         {
            //           title: 'Employess', type: 'sub', active: false, status: true, children: [
            //             { path: '/hr-dashboard/employees/employee-list', status: true, title: 'Employee List', type: 'link' },
            //             { path: '/hr-dashboard/employees/view-employee', status: true, title: 'View Employee', type: 'link' },
            //             { path: '/hr-dashboard/employees/add-employee', status: true, title: 'Add Employee', type: 'link' },
            //           ]
            //         },
            //         {
            //           title: 'Attendance', type: 'sub', active: false, status: true, children: [
            //             { path: '/hr-dashboard/attendance/attendence-list', status: true, title: 'Attendence List', type: 'link' },
            //             { path: '/hr-dashboard/attendance/attendence-by-user', status: true, title: 'Attendence By User', type: 'link' },
            //             { path: '/hr-dashboard/attendance/attendence-view', status: true, title: 'Attendence View', type: 'link' },
            //             { path: '/hr-dashboard/attendance/overview-calendar', status: true, title: 'Overview Calendar', type: 'link' },
            //             { path: '/hr-dashboard/attendance/attendence-mark', status: true, title: 'Attendence Mark', type: 'link' },
            //             { path: '/hr-dashboard/attendance/leave-settings', status: true, title: 'Leave Settings', type: 'link' },
            //             { path: '/hr-dashboard/attendance/leave-applications', status: true, title: 'Leave Applications', type: 'link' },
            //             { path: '/hr-dashboard/attendance/recent-leaves', status: true, title: 'Recent Leaves', type: 'link' },
            //           ]
            //         },
            //         { path: '/hr-dashboard/awards', title: 'Awards', type: 'link' },
            //         { path: '/hr-dashboard/holidays', title: 'Holidays', type: 'link' },
            //         { path: '/hr-dashboard/notice-board', title: 'Notice Board', type: 'link' },
            //         { path: '/hr-dashboard/expenses', title: 'Expenses', type: 'link' },
            //         {
            //           title: 'payroll', type: 'sub', active: false, status: true, children: [
            //             { path: '/hr-dashboard/payroll/employee-salary', title: 'Employee Salary', type: 'link' },
            //             { path: '/hr-dashboard/payroll/add-payroll', title: 'Add Payroll', type: 'link' },
            //             { path: '/hr-dashboard/payroll/edit-payroll', title: 'Edit payroll', type: 'link' },
            //           ]
            //         },
            //         { path: '/hr-dashboard/events', title: 'Events', type: 'link' },
            //         { path: '/hr-dashboard/settings', title: 'Settings', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Employee Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/employee-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/employee-dashboard/attendance', title: 'Attendance', type: 'link' },
            //         { path: '/employee-dashboard/apply-leaves', title: 'Apply Leaves', type: 'link' },
            //         { path: '/employee-dashboard/my-leaves', title: 'My Leaves', type: 'link' },
            //         { path: '/employee-dashboard/payslips', title: 'Payslips', type: 'link' },
            //         { path: '/employee-dashboard/expenses', title: 'Expenses', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Task Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/task-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/task-dashboard/task-list', title: 'Task List', type: 'link' },
            //         { path: '/task-dashboard/running-tasks', title: 'Running Tasks', type: 'link' },
            //         { path: '/task-dashboard/onhold-tasks', title: 'OnHold Tasks', type: 'link' },
            //         { path: '/task-dashboard/completed-tasks', title: 'Completed Tasks', type: 'link' },
            //         { path: '/task-dashboard/view-tasks', title: 'View Tasks', type: 'link' },
            //         { path: '/task-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link' },
            //         { path: '/task-dashboard/task-board', title: 'Task Board', type: 'link' },
            //         { path: '/task-dashboard/new-task', title: 'New Tasks', type: 'link' },
            //         { path: '/task-dashboard/user-profile', title: 'User Profile', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Project Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/project-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/project-dashboard/project-list', title: 'Project List', type: 'link' },
            //         { path: '/project-dashboard/view-project', title: 'View Project', type: 'link' },
            //         { path: '/project-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link' },
            //         { path: '/project-dashboard/new-project', title: 'New Project', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Client Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/client-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/client-dashboard/client-list', title: 'Client List', type: 'link' },
            //         { path: '/client-dashboard/view-client', title: 'View Client', type: 'link' },
            //         { path: '/client-dashboard/new-client', title: 'New Client', type: 'link' },
            //         { path: '/client-dashboard/user-profile', title: 'User Profile', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Job Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            //         { path: '/job-dashboard/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/job-dashboard/job-lists', title: 'Job Lists', type: 'link' },
            //         { path: '/job-dashboard/job-view', title: 'Job View', type: 'link' },
            //         { path: '/job-dashboard/job-applications', title: 'Job Applications', type: 'link' },
            //         { path: '/job-dashboard/apply-job', title: 'Apply Job', type: 'link' },
            //         { path: '/job-dashboard/new-job', title: 'New Job', type: 'link' },
            //         { path: '/job-dashboard/user-profile', title: 'User Profile', type: 'link' },
            //       ]
            //     },
            //     {
            //       title: 'Super Admin', type: 'sub', active: false, children: [
            //         { path: '/super-admin/dashboard', title: 'Dashboard', type: 'link' },
            //         { path: '/super-admin/companies', title: 'Companies', type: 'link' },
            //         { path: '/super-admin/subscription-plans', title: 'Subscription Plans', type: 'link' },
            //         { path: '/super-admin/invoices', title: 'Invoices', type: 'link' },
            //         { path: '/super-admin/super-admins', title: 'Super Admins', type: 'link' },
            //         { path: '/super-admin/settings', title: 'Settings', type: 'link' },
            //         { path: '/super-admin/role-access', title: 'Role Access', type: 'link' },
            //       ]
            //     }
            //   ]
            // },
            // {
            // 	title: 'Support System',status:false, icon: 'fe fe-headphones', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 		{
            // 			title: 'Landing Pages', type: 'sub', active: false, children: [
            // 				{ path: '/support-system/landing-pages/landing-page', title: 'Landing Page', type: 'external' },
            // 				{ path: '/support-system/landing-pages/knowledge-page', title: 'Knowledge Page', type: 'external' },
            // 				{ path: '/support-system/landing-pages/knowledge-view', title: 'Knowledge View', type: 'external' },
            // 				{ path: '/support-system/landing-pages/support-contact', title: 'Support Contact', type: 'external' },
            // 				{ path: '/support-system/landing-pages/support-open-ticket', title: 'Support Open Ticket', type: 'external' },
            // 			]
            // 		},
            // 		{
            // 			title: 'User Pages', type: 'sub', active: false, children: [
            // 				{ path: '/support-system/user-pages/dashboard', title: 'Dashboard', type: 'external' },
            // 				{ path: '/support-system/user-pages/profile', title: 'Profile', type: 'external' },
            // 				{
            // 					title: 'Tickets', type: 'sub', active: false, children: [
            // 						{ path: '/support-system/user-pages/tickets/ticket-list', title: 'Ticket List', type: 'external' },
            // 						{ path: '/support-system/user-pages/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
            // 						{ path: '/support-system/user-pages/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
            // 						{ path: '/support-system/user-pages/tickets/create-tickets', title: 'Create Ticket', type: 'external' },
            // 						{ path: '/support-system/user-pages/tickets/view-ticket', title: 'View Ticket', type: 'external' },
            // 					]
            // 				},
            // 			]
            // 		},
            // 		{
            // 			title: 'Admin', type: 'sub', active: false, children: [
            // 				{ path: '/support-system/admin/dashboard', title: 'Dashboard', type: 'external' },
            // 				{ path: '/support-system/admin/edit-profile', title: 'Edit Profile', type: 'external' },
            // 				{
            // 					title: 'Tickets', type: 'sub', active: false, children: [
            // 						{ path: '/support-system/admin/tickets/ticket-list', title: 'Ticket List', type: 'external' },
            // 						{ path: '/support-system/admin/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
            // 						{ path: '/support-system/admin/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
            // 						{ path: '/support-system/admin/tickets/new-tickets', title: 'New Ticket', type: 'external' },
            // 						{ path: '/support-system/admin/tickets/view-ticket', title: 'View Ticket', type: 'external' },
            // 					]
            // 				},
            // 				{ path: '/support-system/admin/customers', title: 'Customers', type: 'external' },
            // 				{ path: '/support-system/admin/categories', title: 'Categories', type: 'external' },
            // 				{ path: '/support-system/admin/articles', title: 'Articles', type: 'external' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Agent', type: 'sub', active: false, children: [
            // 				{ path: '/support-system/agent/dashboard', title: 'Dashboard', type: 'external' },
            // 				{
            // 					title: 'Tickets', type: 'sub', active: false, children: [
            // 						{ path: '/support-system/agent/tickets/ticket-list', title: 'Ticket List', type: 'external' },
            // 						{ path: '/support-system/agent/tickets/active-tickets', title: 'Active Tickets', type: 'external' },
            // 						{ path: '/support-system/agent/tickets/closed-tickets', title: 'Closed Tickets', type: 'external' },
            // 						{ path: '/support-system/agent/tickets/view-ticket', title: 'View Ticket', type: 'external' },
            // 					]
            // 				},
            // 				{ path: '/support-system/agent/assigned-categories', title: 'Assigned Categoreies', type: 'external' },
            // 			]
            // 		},
            // 	]
            // },
            // {
            // 	path: '/chat', title: 'Chat',status:false, icon: 'fe fe-message-square', type: 'link', bookmark: true
            // },
            // {
            // 	title: 'Admin',status:false, icon: 'fe fe-airplay', type: 'sub', active: false, children: [
            // 		{ path: '/admin/general-settings', title: 'General Settings', type: 'link' },
            // 		{ path: '/admin/api-settings', title: 'Api Settings', type: 'link' },
            // 		{ path: '/admin/role-access', title: 'Role Access', type: 'link' },
            // 	]
            // },
            // {
            // 	headTitle: 'APPS'
            // },
            // {
            // 	title: 'Apps',status:false, icon: 'fe fe-codepen', type: 'sub', active: false, children: [
            // 		{
            // 			title: 'Forms', type: 'sub', active: false, children: [
            // 				{ path: '/forms/form-elements', title: 'Form Elements', type: 'link' },
            // 				{ path: '/forms/advanced-forms', title: 'Advanced Elements', type: 'link' },
            // 				{ path: '/forms/form-wizard', title: 'Form Wizard', type: 'link' },
            // 				{ path: '/forms/form-editor', title: 'Form Editor', type: 'link' },
            // 				{ path: '/forms/form-element-sizes', title: 'Form Element-sizes', type: 'link' },
            // 				{ path: '/forms/form-treeview', title: 'Form Treeview', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Charts', type: 'sub', active: false, children: [
            // 				{ path: '/charts/apex-charts', title: 'Apex Charts', type: 'link' },
            // 				{ path: '/charts/echarts', title: 'Echarts', type: 'link' },
            // 				{ path: '/charts/chartist', title: 'Chartist', type: 'link' },
            // 				{ path: '/charts/chartjs', title: 'Chatjs', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Widgets', type: 'sub', active: false, children: [
            // 				{ path: '/widgets/widgets', title: 'Widgets', type: 'link' },
            // 				{ path: '/widgets/chart-widgets', title: 'Chart Widgets', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Maps', type: 'sub', active: false, children: [
            // 				{ path: '/maps/leaflet', title: 'Leaflet', type: 'link' }
            // 			]
            // 		},
            // 		{
            // 			title: 'Tables', type: 'sub', active: false, children: [
            // 				{ path: '/tables/default-table', title: 'Default Table', type: 'link' },
            // 				{ path: '/tables/data-table', title: 'Data Table', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Icons', type: 'sub', active: false, children: [
            // 				{ path: '/icons/font-awsome', title: 'Font Awsome', type: 'link' },
            // 				{ path: '/icons/material-design-icons', title: 'Material Design Icons', type: 'link' },
            // 				{ path: '/icons/simple-line', title: 'Simple Line Icons', type: 'link' },
            // 				{ path: '/icons/feather-icons', title: 'Feather Icons', type: 'link' },
            // 				{ path: '/icons/ionic-icons', title: 'Ionic Icons', type: 'link' },
            // 				{ path: '/icons/flag-icons', title: 'Flag Icons', type: 'link' },
            // 				{ path: '/icons/pe7-icons', title: 'Pe7 Icons', type: 'link' },
            // 				{ path: '/icons/themify-icons', title: 'Themify Icons', type: 'link' },
            // 				{ path: '/icons/typicons', title: 'Typicons Icons', type: 'link' },
            // 				{ path: '/icons/weather-icons', title: 'Weather Icons', type: 'link' },
            // 				{ path: '/icons/material-icons', title: 'Material Icons', type: 'link' },
            // 			]
            // 		},
            // 	]
            // },
            // {
            // 	title: 'Components',status:false, icon: 'fe fe-server', type: 'sub', active: false, children: [
            // 		{
            // 			title: 'Chat', type: 'sub', active: false, children: [
            // 				{ path: '/components/chat/chat01', title: 'Chat 01', type: 'link' },
            // 				{ path: '/components/chat/chat02', title: 'Chat 02', type: 'link' },
            // 				{ path: '/components/chat/chat03', title: 'Chat 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Contact', type: 'sub', active: false, children: [
            // 				{ path: '/components/contact/contact-list01', title: 'Contact List 01', type: 'link' },
            // 				{ path: '/components/contact/contact-list02', title: 'Contact List 02', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'File Manager', type: 'sub', active: false, children: [
            // 				{ path: '/components/file-manager/file-manager01', title: 'File Manager 01', type: 'link' },
            // 				{ path: '/components/file-manager/file-manager02', title: 'File Manager 02', type: 'link' },
            // 				{ path: '/components/file-manager/file-details', title: 'File Details', type: 'link' },
            // 				{ path: '/components/file-manager/file-attachments', title: 'File Attachments', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Todo List', type: 'sub', active: false, children: [
            // 				{ path: '/components/todo-list/todo-list01', title: 'Todo List 01', type: 'link' },
            // 				{ path: '/components/todo-list/todo-list02', title: 'Todo List 02', type: 'link' },
            // 				{ path: '/components/todo-list/todo-list03', title: 'Todo List 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'User List', type: 'sub', active: false, children: [
            // 				{ path: '/components/user-list/user-list01', title: 'User List 01', type: 'link' },
            // 				{ path: '/components/user-list/user-list02', title: 'User List 02', type: 'link' },
            // 				{ path: '/components/user-list/user-list03', title: 'User List 03', type: 'link' },
            // 				{ path: '/components/user-list/user-list04', title: 'User List 04', type: 'link' },
            // 			]
            // 		},
            // 		{ path: '/components/calendar', title: 'Calendar', type: 'link' },
            // 		{ path: '/components/dragula-card', title: 'Dragula Card', type: 'link' },
            // 		{ path: '/components/image-comparsion', title: 'Image Comparsion', type: 'link' },
            // 		{ path: '/components/image-crop', title: 'Image Crop', type: 'link' },
            // 		{ path: '/components/page-sessiontimeout', title: 'Page SessionTimeout', type: 'link' },
            // 		{ path: '/components/notifications', title: 'Notifications', type: 'link' },
            // 		{ path: '/components/sweet-alerts', title: 'Sweet Alerts', type: 'link' },
            // 		{ path: '/components/range-slider', title: 'Range Slider', type: 'link' },
            // 		{ path: '/components/counters', title: 'Counters', type: 'link' },
            // 		{ path: '/components/loaders', title: 'Loaders', type: 'link' },
            // 		{ path: '/components/time-line', title: 'Time Line', type: 'link' },
            // 		{ path: '/components/rating', title: 'Rating', type: 'link' },
            // 	]
            // },
            // {
            // 	title: 'Elements',status:false, icon: 'fe fe-layers', type: 'sub', active: false, children: [
            // 		{ path: '/elements/accordion', title: 'Accordion', type: 'link' },
            // 		{ path: '/elements/alerts', title: 'Alerts', type: 'link' },
            // 		{ path: '/elements/avatars', title: 'Avatars', type: 'link' },
            // 		{ path: '/elements/badges', title: 'Badges', type: 'link' },
            // 		{ path: '/elements/breadcrumb', title: 'Breadcrumb', type: 'link' },
            // 		{ path: '/elements/buttons', title: 'Buttons', type: 'link' },
            // 		{ path: '/elements/cards', title: 'Cards', type: 'link' },
            // 		{ path: '/elements/card-images', title: 'Card Images', type: 'link' },
            // 		{ path: '/elements/carousel', title: 'Carousel', type: 'link' },
            // 		{ path: '/elements/dropdown', title: 'Dropdown', type: 'link' },
            // 		{ path: '/elements/footers', title: 'Footers', type: 'link' },
            // 		{ path: '/elements/headers', title: 'Headers', type: 'link' },
            // 		{ path: '/elements/lists-listgroup', title: 'Lists & List Group', type: 'link' },
            // 		{ path: '/elements/media-object', title: 'Media Object', type: 'link' },
            // 		{ path: '/elements/modal', title: 'Modal', type: 'link' },
            // 		{ path: '/elements/navigation', title: 'Navigation', type: 'link' },
            // 		{ path: '/elements/pagination', title: 'Pagination', type: 'link' },
            // 		{ path: '/elements/panel', title: 'Panel', type: 'link' },
            // 		{ path: '/elements/popover', title: 'Popover', type: 'link' },
            // 		{ path: '/elements/progress', title: 'Progress', type: 'link' },
            // 		{ path: '/elements/tabs', title: 'Tabs', type: 'link' },
            // 		{ path: '/elements/tags', title: 'Tags', type: 'link' },
            // 		{ path: '/elements/tooltips', title: 'Tooltips', type: 'link' },
            // 	]
            // },
            // {
            // 	headTitle: 'PAGES'
            // },
            // {
            // 	title: 'Pages',status:false, icon: 'fe fe-copy', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 		{
            // 			title: 'Profile', type: 'sub', active: false, children: [
            // 				{ path: '/pages/profile/profile01', title: 'Profile 01', type: 'link' },
            // 				{ path: '/pages/profile/profile02', title: 'Profile 02 ', type: 'link' },
            // 				{ path: '/pages/profile/profile03', title: 'Profile 03', type: 'link' },
            // 			]
            // 		},
            // 		{ path: '/pages/edit-profile', title: 'Edit Profile', type: 'link' },
            // 		{
            // 			title: 'Email', type: 'sub', active: false, children: [
            // 				{ path: '/pages/email/email-compose', title: 'Email Compose', type: 'link' },
            // 				{ path: '/pages/email/email-inbox', title: 'Email Inbox', type: 'link' },
            // 				{ path: '/pages/email/email-read', title: 'Email Read', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Invoice', type: 'sub', active: false, children: [
            // 				{ path: '/pages/invoice/invoice-list', title: 'Invoice List', type: 'link' },
            // 				{ path: '/pages/invoice/invoice01', title: 'Invoice 01', type: 'link' },
            // 				{ path: '/pages/invoice/invoice02', title: 'Invoice 02', type: 'link' },
            // 				{ path: '/pages/invoice/invoice03', title: 'Invoice 03', type: 'link' },
            // 				{ path: '/pages/invoice/add-invoice', title: 'Add Invoice', type: 'link' },
            // 				{ path: '/pages/invoice/edit-invoice', title: 'Edit Invoice', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Blog', type: 'sub', active: false, children: [
            // 				{ path: '/pages/blog/blog01', title: 'Blog 01', type: 'link' },
            // 				{ path: '/pages/blog/blog02', title: 'Blog 02', type: 'link' },
            // 				{ path: '/pages/blog/blog03', title: 'Blog 03', type: 'link' },
            // 				{ path: '/pages/blog/blog-styles', title: 'Blog Styles', type: 'link' },
            // 			]
            // 		},
            // 		{ path: '/pages/gallery', title: 'Gallery', type: 'link' },
            // 		{ path: '/pages/faqs', title: 'FAQS', type: 'link' },
            // 		{ path: '/pages/terms', title: 'Terms', type: 'link' },
            // 		{ path: '/pages/empty-pages', title: 'Empty Pages', type: 'link' },
            // 		{ path: '/pages/search', title: 'Search', type: 'link' },
            // 		{ path: '/pages/about', title: 'About', type: 'link' },
            // 		{ path: '/pages/notify-list', title: 'Notify-list', type: 'link' },
            // 		{ path: '/pages/settings', title: 'Settings', type: 'link' },
            // 		{
            // 			title: 'Utils', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 				{ path: '/utils/colors', title: 'Colors', type: 'link' },
            // 				{ path: '/utils/flex-items', title: 'Flex Items', type: 'link' },
            // 				{ path: '/utils/height', title: 'Height', type: 'link' },
            // 				{ path: '/utils/border', title: 'Border', type: 'link' },
            // 				{ path: '/utils/display', title: 'Display', type: 'link' },
            // 				{ path: '/utils/margin', title: 'Margin', type: 'link' },
            // 				{ path: '/utils/padding', title: 'Padding', type: 'link' },
            // 				{ path: '/utils/typhography', title: 'Typhography', type: 'link' },
            // 				{ path: '/utils/width', title: 'Width', type: 'link' },
            // 			]
            // 		},
            // 	]
            // },
            // {
            // 	title: 'Submenus',status:false, icon: 'fe fe-sliders', type: 'sub', active: false, children: [
            // 		{ title: 'level-1', type: 'empty' },
            // 		{
            // 			title: 'level2', type: 'sub', active: false, children: [
            // 				{ title: 'level-2.1', type: 'empty' },
            // 				{ title: 'level-2.2', type: 'empty' },
            // 				{
            // 					title: 'level2.3', type: 'sub', active: false, children: [
            // 						{ title: 'level-2.3.1', type: 'empty' },
            // 						{ title: 'level-2.3.2', type: 'empty' },
            // 					]
            // 				},
            // 			]
            // 		},
            // 	]
            // },
            // {
            // 	title: 'Account',status:false, icon: 'fe fe-lock', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 		{
            // 			title: 'Login', type: 'sub', active: false, children: [
            // 				{ path: '/account/login/login01', title: 'Login 01', type: 'link' },
            // 				{ path: '/account/login/login02', title: 'Login 02 ', type: 'link' },
            // 				{ path: '/account/login/login03', title: 'Login 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Register', type: 'sub', active: false, children: [
            // 				{ path: '/account/register/register01', title: 'Register 01', type: 'link' },
            // 				{ path: '/account/register/register02', title: 'Register 02 ', type: 'link' },
            // 				{ path: '/account/register/register03', title: 'Register 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Forget Password', type: 'sub', active: false, children: [
            // 				{ path: '/account/forget-password/forget-password01', title: 'Forget Password 01', type: 'link' },
            // 				{ path: '/account/forget-password/forget-password02', title: 'Forget Password 02 ', type: 'link' },
            // 				{ path: '/account/forget-password/forget-password03', title: 'Forget Password 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Reset Password', type: 'sub', active: false, children: [
            // 				{ path: '/account/reset-password/reset-password01', title: 'Reset Password 01', type: 'link' },
            // 				{ path: '/account/reset-password/reset-password02', title: 'Reset Password 02 ', type: 'link' },
            // 				{ path: '/account/reset-password/reset-password03', title: 'Reset Password 03', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'Lock Screen', type: 'sub', active: false, children: [
            // 				{ path: '/account/lock-screen/lock-screen01', title: 'Lock Screen 01', type: 'link' },
            // 				{ path: '/account/lock-screen/lock-screen02', title: 'Lock Screen 02 ', type: 'link' },
            // 				{ path: '/account/lock-screen/lock-screen03', title: 'Lock Screen 03', type: 'link' },
            // 			]
            // 		},
            // 		{ path: '/account/under-construction', title: 'Under Construction', type: 'link' },
            // 		{ path: '/account/coming-soon', title: 'Comming Soon', type: 'link' },
            // 		{
            // 			title: 'Alert Messages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 				{ path: '/alert/success-message', title: 'Success Message', type: 'link' },
            // 				{ path: '/alert/warning-message', title: 'Warning Message', type: 'link' },
            // 				{ path: '/alert/danger-message', title: 'Danger Messages', type: 'link' },
            // 			]
            // 		},
            // 		{
            // 			title: 'error-pages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 				{ path: '/error-page/error400', title: '400', type: 'link' },
            // 				{ path: '/error-page/error401', title: '401', type: 'link' },
            // 				{ path: '/error-page/error403', title: '403', type: 'link' },
            // 				{ path: '/error-page/error404', title: '404', type: 'link' },
            // 				{ path: '/error-page/error500', title: '500', type: 'link' },
            // 				{ path: '/error-page/error503', title: '503', type: 'link' },
            // 			]
            // 		},
            // 	]
            // },
            // {
            // 	title: 'Ecommerce',status:false, icon: 'fe fe-shopping-cart', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, children: [
            // 		{ path: '/ecommerce/products', title: 'Products', type: 'link' },
            // 		{ path: '/ecommerce/products-details', title: 'Products Details', type: 'link' },
            // 		{ path: '/ecommerce/shopping-cart', title: 'Shopping Cart', type: 'link' },
            // 	]
            // },
          ];
        // console.log(this.menuItems);

        this.acheckActiveLinkOnLoad()

        this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationStart) {
            let path = location.pathname.split('/');
            let eventUrl = event.url.split('/');
            if (path[path.length - 2] !== eventUrl[eventUrl.length - 2]) {
              this.closeNavActive();
              let sidemenu = document.querySelectorAll('.side-menu__item.active');
              let subSidemenu = document.querySelectorAll('.sub-side-menu__item.active');
              let subSidemenu2 = document.querySelectorAll('.sub-side-menu__item2.active');
              sidemenu.forEach((e) => e.classList.remove('active'));
              subSidemenu.forEach((e) => e.classList.remove('active'));
              subSidemenu2.forEach((e) => e.classList.remove('active'));
            }
          }
          if (event instanceof NavigationEnd) {
            event.url = event.url.split("?")[0]
            // console.log(event.url);
            // this.company = event.url.split('/')[1]
            // if (this.company === 'bas-accidents') {
            //   this.menuItems = [
            //     {
            //       title: this.dic.translate('Home'), status: true, icon: 'fe fe-home', type: 'link', path: '/bas-home', badgeType: 'success', badgeValue: '2', active: false,
            //     },
            //   ]
            //   console.log(this.menuItems);
            // }
            this.menuItems.filter((items: any) => {
              if (items.path === event.url) {
                this.setNavActive(items);
              }
              if (!items.children) {
                return false;
              }
              items.children.filter((subItems: any) => {
                if (subItems.path === event.url) {
                  this.setNavActive(subItems);
                }
                if (!subItems.children) {
                  return false;
                }
                subItems.children.filter((subSubItems: any) => {
                  if (subSubItems.path === event.url) {
                    this.setNavActive(subSubItems);
                  }
                  if (!subSubItems.children) {
                    return false;
                  }
                  subSubItems?.children.filter((subSubItems1: any) => {
                    if (subSubItems1.path === event.url) {
                      this.setNavActive(subSubItems1);
                    }
                    if (!subSubItems1.children) {
                      return false;
                    }
                    return;
                  });
                  return;
                });
                return;
              });
              return;
            });
            setTimeout(() => {
              if (document.querySelector('body')?.classList.contains('horizontal-hover') && window.innerWidth > 992) {
                this.closeNavActive();
                parentNavActive();
              } else {
                parentNavActive();
              }
            }, 200)
          }
        })
      }
    })

  }

  acheckActiveLinkOnLoad() {
    var url = this.router.url
    // if (event instanceof NavigationEnd) {
    url = url.split("?")[0]
    this.menuItems.filter((items: any) => {
      if (items.path === url) {
        this.setNavActive(items);
      }
      if (!items.children) {
        return false;
      }
      items.children.filter((subItems: any) => {
        if (subItems.path === url) {
          this.setNavActive(subItems);
        }
        if (!subItems.children) {
          return false;
        }
        subItems.children.filter((subSubItems: any) => {
          if (subSubItems.path === url) {
            this.setNavActive(subSubItems);
          }
          if (!subSubItems.children) {
            return false;
          }
          subSubItems?.children.filter((subSubItems1: any) => {
            if (subSubItems1.path === url) {
              this.setNavActive(subSubItems1);
            }
            if (!subSubItems1.children) {
              return false;
            }
            return;
          });
          return;
        });
        return;
      });
      return;
    });
    setTimeout(() => {
      if (document.querySelector('body')?.classList.contains('horizontal-hover') && window.innerWidth > 992) {
        this.closeNavActive();
        parentNavActive();
      } else {
        parentNavActive();
      }
    }, 200)
  }
  checkCurrentActive() {
    // this.navServices.items.subscribe((menuItems: any) => {
    // this.menuItems = menuItems;
    let currentUrl = this.router.url;
    // console.log(currentUrl);

    this.menuItems.filter((items: any) => {
      if (items.path === currentUrl) {
        this.setNavActive(items);
      }
      if (!items.children) {
        return false;
      }
      items.children.filter((subItems: any) => {
        if (subItems.path === currentUrl) {
          this.setNavActive(subItems);
        }
        if (!subItems.children) {
          return false;
        }
        subItems.children.filter((subSubItems: any) => {
          if (subSubItems.path === currentUrl) {
            this.setNavActive(subSubItems);
          }
        });
        return;
      });
      return;
    });
    // });
  }
  //Active Nav State
  setNavActive(item: any) {

    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) {
        menuItem.active = false;
        this.navServices.collapseSidebar = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
          if (submenuItems.children) {
            submenuItems.children.forEach((subsubmenuItems) => {
              if (subsubmenuItems.children && subsubmenuItems.children.includes(item)) {
                menuItem.active = true;
                submenuItems.active = true;
                subsubmenuItems.active = true;
              }
            })
          }
        });
      }
      // });
    })
  }

  // Toggle menu
  toggleNavActive(item: any) {
    if (!item.active) {
      this.menuItems.forEach((a: any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) {
            return false;
          }
          b.children.forEach((c: any) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
            if (!c.children) {
              return false;
            }
            return;
          })
          return;
        });
        return;
      });
    }
    item.active = !item.active;
  }

  // Close Nav menu
  closeNavActive() {
    this.menuItems.forEach((a: any) => {
      if (this.menuItems) {
        a.active = false;
      }
      if (!a.children) {
        return false;
      }
      a.children.forEach((b: any) => {
        if (a.children) {
          b.active = false;
        }
      });
      return;
    });
  }

  ngOnInit(): void {
    // switcherArrowFn();

    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth >= 992) {
        document
          .querySelector('body.horizontal')
          ?.classList.remove('sidenav-toggled');
      }
      if (
        document
          .querySelector('body')
          ?.classList.contains('horizontal-hover') &&
        window.innerWidth > 992
      ) {
        let li = document.querySelectorAll('.side-menu li');
        li.forEach((e, i) => {
          e.classList.remove('is-expanded');
        });
      }
    });

    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          // small screen
          this.checkCurrentActive();
        } else {
          // large screen
          document
            .querySelector('body.horizontal')
            ?.classList.remove('sidenav-toggled');
          if (document.querySelector('.horizontal:not(.horizontal-hover)')) {
            this.closeNavActive();
            setTimeout(() => {
              parentNavActive();
            }, 100);
          }
        }
      });

    let vertical: any = document.querySelectorAll('#myonoffswitch34');
    let horizontal: any = document.querySelectorAll('#myonoffswitch35');
    let horizontalHover: any = document.querySelectorAll('#myonoffswitch111');
    fromEvent(vertical, 'click').subscribe(() => {
      this.checkCurrentActive();
    });
    fromEvent(horizontal, 'click').subscribe(() => {
      this.closeNavActive();
    });
    fromEvent(horizontalHover, 'click').subscribe(() => {
      this.closeNavActive();
    });

    const WindowResize = fromEvent(window, 'resize');
    // subscribing the Observable
    this.windowSubscribe$ = WindowResize.subscribe(() => {
      let menuWidth: any = document.querySelector<HTMLElement>('.main-menu');
      let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
      let mainSidemenuWidth: any = document.querySelector<HTMLElement>('.app-sidebar');
      let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
      // let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0]));
      // let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));
      let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
      if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
        document.querySelector('.slide-left')?.classList.add('d-none');
        document.querySelector('.slide-right')?.classList.add('d-none');
      }
      // to check and adjst the menu on screen size change
      // if (document.querySelector('body')?.classList.contains('ltr')) {
      //   if (marginLeftValue > -check == false && menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth) {
      //     menuItems.style.marginLeft = -check + 'px';
      //   } else {
      //     menuItems.style.marginLeft = 0;
      //   }
      // } else {
      //   if (marginRightValue > -check == false && menuWidth?.offsetWidth < menuItems.scrollWidth) {
      //     menuItems.style.marginRight = -check + 'px';
      //   } else {
      //     menuItems.style.marginRight = 0;
      //   }
      // }
      checkHoriMenu();
    });

    let maincontent: any = document.querySelectorAll('.main-content');
    fromEvent(maincontent, 'click').subscribe(() => {
      if (document.querySelector('body')?.classList.contains('horizontal')) {
        this.closeNavActive();
      }
    });
  }

  sidebarClose() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
      this.navServices.collapseSidebar = false;
    }
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }

  ngOnDestroy() {
    // unsubscribing the Observable
    this.windowSubscribe$.unsubscribe();

  }
}
