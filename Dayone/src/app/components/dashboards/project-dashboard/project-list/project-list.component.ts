import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  ID: number;
  projectTitle: string;
  projectTitleStatus: string;
  client: string;
  TeamMemeber : team[];
  priority: string;
  priorityStatus: string;
  startDate: string;
  deadline: string;
  workProgressText: string;
  workProgressPercentage: number;
  workProgressPercentageStatus: string;
  statusText: string;
  status: string;
}

interface team{
  team1? :  string;
  team2? :  string;
  team3? :  string;
  team4? :  string;
  team5? :  string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 67, projectTitle: 'Mobile App', projectTitleStatus: 'primary', client:'Julia Walker', TeamMemeber : [
    {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/15.jpg', team3:'./assets/images/users/5.jpg', team4:'./assets/images/users/14.jpg'}
  ],
  priority:'High', priorityStatus:'danger', startDate:'12-02-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'primary', workProgressPercentage: 80, statusText:'Active', status:'primary'},
  {ID: 45, projectTitle: 'Website Development', projectTitleStatus: 'warning', client:'Diane Short', TeamMemeber : [
    {team1: './assets/images/users/2.jpg', team2:'./assets/images/users/10.jpg', team3:'./assets/images/users/3.jpg'}
  ],
  priority:'High', priorityStatus:'danger', startDate:'01-01-2021', deadline:'22-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'warning', workProgressPercentage: 50, statusText:'On going', status:'warning'},
  {ID: 78, projectTitle: 'Wordpress theme Design', projectTitleStatus: 'success', client:'Pippa Welch', TeamMemeber : [
    {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/11.jpg', team3:'./assets/images/users/5.jpg', team4:'./assets/images/users/6.jpg', team5:'./assets/images/users/7.jpg'}
  ],
  priority:'High', priorityStatus:'danger', startDate:'11-04-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 96, projectTitle: 'Logo Design', projectTitleStatus: 'success', client:'Gabrielle Fisher', TeamMemeber : [
    {team1: './assets/images/users/8.jpg', team2:'./assets/images/users/12.jpg', team3:'./assets/images/users/9.jpg'}
  ],
  priority:'Low', priorityStatus:'success', startDate:'11-04-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 87, projectTitle: 'Logo Design', projectTitleStatus: 'success', client:'Gabrielle Fisher', TeamMemeber : [
    {team1: './assets/images/users/1.jpg', team2:'./assets/images/users/13.jpg', team3:'./assets/images/users/2.jpg', team4: './assets/images/users/4.jpg'}
  ],
  priority:'Medium', priorityStatus:'warning', startDate:'11-03-2021', deadline:'16-06-2021', workProgressText:'Project Status', workProgressPercentageStatus:'orange', workProgressPercentage: 30, statusText:'Pending', status:'success'},
  {ID: 36, projectTitle: 'Website Development', projectTitleStatus: 'info', client:'James Wilson', TeamMemeber : [ {team1: './assets/images/users/3.jpg', team2:'./assets/images/users/4.jpg', team3:'./assets/images/users/12.jpg'} ],
  priority:'Low', priorityStatus:'success', startDate:'05-02-2021', deadline:'21-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'danger', workProgressPercentage: 0, statusText:'Not Started', status:'info'},
  {ID: 86, projectTitle: 'Wordpress Theme Design', projectTitleStatus: 'danger', client:'Ryan Terry', TeamMemeber : [ {team1: './assets/images/users/8.jpg', team2:'./assets/images/users/15.jpg', team3:'./assets/images/users/9.jpg', team4:'./assets/images/users/16.jpg'} ],
  priority:'High', priorityStatus:'danger', startDate:'21-01-2021', deadline:'15-03-2021', workProgressText:'Project Status', workProgressPercentageStatus:'danger', workProgressPercentage: 0, statusText:'Canclled', status:'danger'},
  {ID: 82, projectTitle: 'Laravel Development', projectTitleStatus: 'success', client:'Sam Gray', TeamMemeber : [ {team1: './assets/images/users/4.jpg', team2:'./assets/images/users/11.jpg', team3:'./assets/images/users/7.jpg', team4:'./assets/images/users/13.jpg'} ],
  priority:'High', priorityStatus:'danger', startDate:'21-01-2021', deadline:'15-03-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 39, projectTitle: 'Mobile App', projectTitleStatus: 'success', client:'Lisa Vance', TeamMemeber : [ {team1: './assets/images/users/9.jpg', team2:'./assets/images/users/12.jpg', team3:'./assets/images/users/6.jpg', team4:'./assets/images/users/11.jpg', team5:'./assets/images/users/15.jpg'} ],
  priority:'Medium', priorityStatus:'warning', startDate:'13-03-2021', deadline:'15-05-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 95, projectTitle: 'Website Development', projectTitleStatus: 'success', client:'Joanne Grant', TeamMemeber : [ {team1: './assets/images/users/5.jpg', team2:'./assets/images/users/9.jpg', team3:'./assets/images/users/10.jpg'}],
  priority:'Low', priorityStatus:'success', startDate:'01-01-2021', deadline:'22-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'success', workProgressPercentage: 100, statusText:'Completed', status:'success'},
  {ID: 67, projectTitle: 'Wordpress Theme Design', projectTitleStatus: 'warning', client:'Jason Allan<', TeamMemeber : [ {team1: './assets/images/users/11.jpg', team2:'./assets/images/users/3.jpg', team3:'./assets/images/users/12.jpg', team4:'./assets/images/users/14.jpg'}],
  priority:'High', priorityStatus:'Low', startDate:'05-02-2021', deadline:'21-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'warning', workProgressPercentage: 50, statusText:'On going', status:'warning'},
  {ID: 29, projectTitle: 'Laravel Development', projectTitleStatus: 'orange', client:'Felicity Welch<', TeamMemeber : [ {team1: './assets/images/users/5.jpg', team2:'./assets/images/users/6.jpg', team3:'./assets/images/users/13.jpg'}],
  priority:'Medium', priorityStatus:'warning', startDate:'05-02-2021', deadline:'21-04-2021', workProgressText:'Project Status', workProgressPercentageStatus:'orange', workProgressPercentage: 60, statusText:'Pending', status:'orange'},
  {ID: 72, projectTitle: 'Logo Design', projectTitleStatus: 'primary', client:'David Vance<', TeamMemeber : [ {team1: './assets/images/users/1.jpg', team2:'./assets/images/users/9.jpg', team3:'./assets/images/users/2.jpg', team4:'./assets/images/users/10.jpg', team5:'./assets/images/users/3.jpg'}],
                  priority:'Low', priorityStatus:'success', startDate:'15-02-2021', deadline:'13-03-2021', workProgressText:'Project Status', workProgressPercentageStatus:'primary', workProgressPercentage: 75, statusText:'Active', status:'primary'},
];

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['ID', 'ProjectTitle', 'Client', 'Team', 'Priority', 'StartDate', 'Deadline', 'Progress', 'Status', 'Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  removeData(item) {
    this.dataSource.data.map((el,ind) =>{
      if(el.ID == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }

}
