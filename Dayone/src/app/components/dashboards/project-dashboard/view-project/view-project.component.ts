import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface TasksType {
  No: number;
  task: string;
  client: string;
  AssignTo: string;
  img: string;
  priority: string;
  priorityStatus: string;
  startDate: string;
  deadline: string;
  ProgressText: string;
  ProgressPercentage: number;
  ProgressPercentageStatus: string;
}

interface filesType {
  No: number;
  fileName: string;
  fileSize: string;
  time: string;
  uploadedBy: string;
}
interface mileStonesType {
  No: number;
  mileStoneTitle: string;
  mileStoneCost: string;
  deadline: string;
  statusText: string;
  status: string;
}
interface InvoiveType {
  id: number
  inVoiceId: string;
  amount: string;
  invoiceDate: string;
  dueDate: string;
  Payment: string;
  statusText: string;
  status: string;
}

const Tasks_Data: TasksType[] = [
  {No: 1, task: 'Design Updated', client: 'Julian Walker', AssignTo: 'Melanie Coleman', img:'./assets/images/users/4.jpg', priority: 'High', priorityStatus: 'danger', startDate: '12-02-2021', deadline: '16-06-2021', ProgressText: 'Status', ProgressPercentage : 62, ProgressPercentageStatus : 'success'},
  {No: 2, task: 'Code Updated', client: 'Diane Short', AssignTo: 'Justin Parr', img:'./assets/images/users/15.jpg', priority: 'Low', priorityStatus: 'success', startDate: '01-01-2021', deadline: '22-04-2021', ProgressText: 'Status', ProgressPercentage : 45, ProgressPercentageStatus : 'success'},
  {No: 3, task: 'Issues fixed', client: 'Pippa Welch', AssignTo: 'Amelia Russell', img:'./assets/images/users/5.jpg', priority: 'Medium', priorityStatus: 'warning', startDate: '11-04-2021', deadline: '16-06-2021', ProgressText: 'Status', ProgressPercentage : 50, ProgressPercentageStatus : 'success'},
  {No: 4, task: 'Testing', client: 'Lisa Vance', AssignTo: 'Ryan Young', img:'./assets/images/users/14.jpg', priority: 'Low', priorityStatus: 'success', startDate: '11-04-2021', deadline: '16-06-2021', ProgressText: 'Status', ProgressPercentage : 65, ProgressPercentageStatus : 'success'},
];

const Files_Data: filesType[] = [
  {No: 1, fileName: 'document.pdf', fileSize: '23kb', time:'2 hours ago', uploadedBy:'Client'},
  {No: 2, fileName: 'image.jpg', fileSize: '2.67kb', time:'1 day ago', uploadedBy:'Admin'},
  {No: 3, fileName: 'project', fileSize: '578mb', time:'1 day ago', uploadedBy:'	Team Lead'},
]

const MileStones_Data: mileStonesType[] = [
  {No: 1, mileStoneTitle: 'Responsive issues', mileStoneCost: '$70', deadline:'16-06-2021', statusText:'InCompleted', status: 'danger'},
  {No: 2, mileStoneTitle: 'Updated Design', mileStoneCost: '$30', deadline:'	16-02-2021', statusText:'Completed', status: 'success'},
  {No: 3, mileStoneTitle: 'Add the rating plugin', mileStoneCost: '$80', deadline:'21-04-2021', statusText:'InCompleted', status: 'danger'},
]

const Invoive_Data : InvoiveType[] = [
  {id: 1, inVoiceId: 'INV-0478', amount: '$345.00', invoiceDate: '12-01-2021', dueDate:'14-02-2021', Payment: '$345.000', status: 'success', statusText : 'Paid' },
  {id: 2, inVoiceId: 'INV-1245', amount: '$834.00', invoiceDate: '12-01-2021', dueDate:'14-02-2021', Payment: '$834.000', status: 'danger', statusText : 'UnPaid' },
  {id: 3, inVoiceId: 'INV-5280', amount: '$16,753.00', invoiceDate: '21-01-2021', dueDate:'15-01-2021', Payment: '$16,753.000', status: 'success', statusText : 'Paid' },
  {id: 4, inVoiceId: 'INV-2876', amount: '$297.00', invoiceDate: '05-02-2021', dueDate:'21-02-2021', Payment: '$297.000', status: 'success', statusText : 'Paid' },
  {id: 5, inVoiceId: 'INV-1986', amount: '$12,897.00', invoiceDate: '01-01-2021', dueDate:'24-02-2021', Payment: '	$12,897.00', status: 'danger', statusText : 'UnPaid' },
]

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  active = 1;
  displayedTasksColumns: string[] = ['No', 'Task', 'Client', 'AssignTo', 'Priority', 'StartDate', 'Deadline', 'Progress', 'Action'];
  dataSourceTasks;
  displayedFilesColumns: string[] = ['No', 'FileName', 'UploadedBy', 'Action'];
  dataSourceFiles;
  displayedMileStoneColumns: string[] = ['No', 'MileStoneTitle', 'MileStoneCost', 'Deadline', 'Status', 'Action'];
  dataSourceMileStone;
  displayedInvoiveColumns: string[] = ['InVoiceID', 'Amount', 'InvoiceData', 'DueDate', 'Payment', 'Status', 'Action'];
  dataSourceInvoive;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modalService: NgbModal) {
    // Assign the data to the data source for the table to render
    this.dataSourceTasks = new MatTableDataSource<TasksType>(Tasks_Data); 
    this.dataSourceFiles = new MatTableDataSource<filesType>(Files_Data); 
    this.dataSourceMileStone = new MatTableDataSource<mileStonesType>(MileStones_Data); 
    this.dataSourceInvoive = new MatTableDataSource<InvoiveType>(Invoive_Data); 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSourceTasks.paginator = this.paginator;
    this.dataSourceTasks.sort = this.sort;
    this.dataSourceFiles.paginator = this.paginator;
    this.dataSourceFiles.sort = this.sort;
    this.dataSourceMileStone.paginator = this.paginator;
    this.dataSourceMileStone.sort = this.sort;
    this.dataSourceInvoive.paginator = this.paginator;
    this.dataSourceInvoive.sort = this.sort;
  }




  applyTasksFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTasks.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTasks.paginator) {
      this.dataSourceTasks.paginator.firstPage();
    }
  }
  applyFilesFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFiles.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFiles.paginator) {
      this.dataSourceFiles.paginator.firstPage();
    }
  }
  applyMileStoneFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFiles.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFiles.paginator) {
      this.dataSourceFiles.paginator.firstPage();
    }
  }
  applyInvoiceFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInvoive.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceInvoive.paginator) {
      this.dataSourceInvoive.paginator.firstPage();
    }
  }
  removeData(item) {
    this.dataSourceMileStone.data.map((el,ind) =>{
      if(el.No == item){
        this.dataSourceMileStone.data.splice(ind, 1)
        this.dataSourceMileStone._updateChangeSubscription();
      }
    })    
  }
  removeFilesData(item) {
    this.dataSourceFiles.data.map((el,ind) =>{
      if(el.No == item){
        this.dataSourceFiles.data.splice(ind, 1)
        this.dataSourceFiles._updateChangeSubscription();
      }
    })    
  }
  removeMileStoneData(item) {
    this.dataSourceMileStone.data.map((el,ind) =>{
      if(el.No == item){
        this.dataSourceMileStone.data.splice(ind, 1)
        this.dataSourceMileStone._updateChangeSubscription();
      }
    })    
  }
  removeInvoiceData(item) {
    this.dataSourceInvoive.data.map((el,ind) =>{
      if(el.id == item){
        this.dataSourceInvoive.data.splice(ind, 1)
        this.dataSourceInvoive._updateChangeSubscription();
      }
    })    
  }
  edit(editContent:any) {
    this.modalService.open(editContent, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }

}
