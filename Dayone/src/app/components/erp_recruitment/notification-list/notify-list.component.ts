import { Component, OnInit } from '@angular/core';
import { ApiMethod } from 'src/app/@core/service/apis';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notify-list.component.html',
  styleUrls: ['./notify-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: any=[];
  userPhoto: any = `${environment.apiUrl}/public/profile_photos/`;
  actions: any = []
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    // {
    //   icon: 'fe fe-codepen',
    //   route: '/administrator_transportations',
    //   queryParams: { skip: 0, limit: 20, sort: 'name' },
    //   name: 'Transportations',
    // },
  ];
  constructor(
    private httpService:HttpService
  ) { 
    this.getNotifications()
  }

  ngOnInit(): void {
  }

  getNotifications() {
    this.httpService
      .call('task-notifications', ApiMethod.GET, {limit:1000} )
      .subscribe((res) => {
        if (res.status) {
          this.notifications = res.data;
        }
      });
  }


  statusColor(status: string) {
    if (status == 'Completed') return 'success';
    if (status == 'Canceled') return 'danger';

    if (status == 'In progress') return 'orange';
    return 'warning';
  }

  progressColor(progress: number) {
    if (progress == 100) {
      return 'success';
    } else if (progress > 75) {
      return 'success';
    } else if (progress > 50) {
      return 'warning';
    } else if (progress > 25) {
      return 'orange';
    } else {
      return 'danger';
    }
  }

}
