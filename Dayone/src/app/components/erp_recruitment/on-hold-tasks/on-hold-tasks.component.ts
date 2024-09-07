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
  {No: 1, Task: 'Marketing materials Issues', badge: 'warning', Department:'Marketing', img:'./assets/images/users/10.jpg', AssignTo: 'Peter Hill', Priority:'High', PriorityStatus: 'danger', StartDate:'11-03-2021', Deadline:'19-05-2021', progress: 80, progressStatus: 'success',worksStatus:'warning', worksText: 'On hold'},
  {No: 2, Task: 'Logo Design', badge: 'danger', Department:'Designing', img:'./assets/images/users/3.jpg', AssignTo: 'Victoria Lyman', Priority:'High', PriorityStatus: 'danger', StartDate:'05-02-2021', Deadline:'21-04-2021', progress: 70, progressStatus: 'success', worksStatus:'danger', worksText: 'Dealy'},
  {No: 3, Task: 'Theme Update', badge: 'warning', Department:'Designing', img:'./assets/images/users/4.jpg', AssignTo: 'Melanie Coleman', Priority:'Low', PriorityStatus: 'success', StartDate:'23-01-2021', Deadline:'25-02-2021', progress: 40, progressStatus: 'success',worksStatus:'warning', worksText: 'On hold'},
  {No: 4, Task: 'Design Updated', badge: 'warning', Department:'Designing', img:'./assets/images/users/1.jpg', AssignTo: 'Faith Harris', Priority:'Medium', PriorityStatus: 'warning', StartDate:'12-02-2021', Deadline:'16-06-2021', progress: 50, progressStatus: 'success',worksStatus:'warning', worksText: 'On hold'},
  {No: 5, Task: 'HTML code Updated', badge: 'danger', Department:'Designing', img:'./assets/images/users/9.jpg', AssignTo: 'Austin Bell', Priority:'Low', PriorityStatus: 'success', StartDate:'05-02-2021', Deadline:'22-04-2021	', progress: 50,progressStatus: 'success',worksStatus:'danger', worksText: 'Dealy'},
  {No: 6, Task: 'Angular Issue fixed', badge: 'danger', Department:'Angular', img:'./assets/images/users/2.jpg', AssignTo: 'Maria Bower', Priority:'Medium', PriorityStatus: 'success', StartDate:'11-04-2021', Deadline:'16-06-2021', progress: 80,  progressStatus: 'success',worksStatus:'danger', worksText: 'Dealy'}
];
@Component({
  selector: 'app-on-hold-tasks',
  templateUrl: './on-hold-tasks.component.html',
  styleUrls: ['./on-hold-tasks.component.scss']
})
export class OnHoldTasksComponent implements OnInit {
  model! : NgbDateStruct;
  model1! : NgbDateStruct;
  model2! : NgbDateStruct;
  model3! : NgbDateStruct;
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
