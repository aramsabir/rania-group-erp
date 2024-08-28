import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface PeriodicElement {
  No: number;
  Task: string;
  badge: string;
  Department: string;
  img: string;
  AssignTo: string;
  Priority: string;
  PriorityStatus: string;
  StartDate: string;
  Deadline: string;
  progress: number;
  progressStatus: string;
  worksStatus: string;
  worksText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {No: 1, Task: 'Design Updated', badge: 'warning', Department:'Designing', img:'./assets/images/users/1.jpg', AssignTo: 'Faith Harris', Priority:'High', PriorityStatus: 'danger', StartDate:'12-02-2021', Deadline:'16-06-2021', progress: 30,  progressStatus: 'primary',worksStatus:'warning', worksText: 'On hold'},
  {No: 2, Task: 'HTML Code Updated', badge: 'danger', Department:'Designing', img:'./assets/images/users/9.jpg', AssignTo: 'Austin Bell', Priority:'Low', PriorityStatus: 'success', StartDate:'01-01-2021', Deadline:'24-04-2021', progress: 50, worksStatus:'danger',  progressStatus: 'primary',worksText: 'Dealy'},
  {No: 3, Task: 'Angular Issues fixed', badge: 'success', Department:'Angular', img:'./assets/images/users/2.jpg', AssignTo: 'Maria Bower', Priority:'Medium', PriorityStatus: 'warning', StartDate:'11-04-2021', Deadline:'16-06-2021', progress: 100,  progressStatus: 'success',worksStatus:'success', worksText: 'Completed'},
  {No: 4, Task: 'Marketing materials Issues', badge: 'primary', Department:'Marketing', img:'./assets/images/users/10.jpg', AssignTo: 'Faith Harris', Priority:'High', PriorityStatus: 'danger', StartDate:'11-03-2021', Deadline:'19-05-2021', progress: 80,  progressStatus: 'warning',worksStatus:'primary', worksText: 'On Progress'},
  {No: 5, Task: 'Logo Design', badge: 'primary', Department:'Designing', img:'./assets/images/users/3.jpg', AssignTo: 'Victoria', Priority:'High', PriorityStatus: 'danger', StartDate:'05-02-2021', Deadline:'21-04-2021', progress: 70,  progressStatus: 'warning',worksStatus:'primary', worksText: 'On Progress'},
  {No: 6, Task: 'Application Bugs fix', badge: 'danger', Department:'Application', img:'./assets/images/users/11.jpg', AssignTo: 'Faith Harris', Priority:'Medium', PriorityStatus: 'warning', StartDate:'21-01-2021', Deadline:'15-03-2021', progress: 40,  progressStatus: 'primary',worksStatus:'danger', worksText: 'Delay'},
  {No: 7, Task: 'Theme update', badge: 'primary', Department:'Designing', img:'./assets/images/users/4.jpg', AssignTo: 'Melanie Coleman', Priority:'Low', PriorityStatus: 'success', StartDate:'23-01-2021', Deadline:'25-02-2021', progress: 40,  progressStatus: 'primary',worksStatus:'primary', worksText: 'On Progress'},
  {No: 8, Task: 'Jquery Issues Fix', badge: 'success', Department:'Development', img:'./assets/images/users/12.jpg', AssignTo: 'Max Wilson', Priority:'High', PriorityStatus: 'danger', StartDate:'13-03-2021', Deadline:'05-05-2021', progress: 10,  progressStatus: 'success',worksStatus:'success', worksText: 'Completed'}
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['No', 'Task', 'Department', 'AssignTo', 'Priority', 'StartDate', 'Deadline', 'Progress', 'WorkStatus', 'Action'];
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
      if(el.No == item){
        this.dataSource.data.splice(ind, 1)
        this.dataSource._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }

}
