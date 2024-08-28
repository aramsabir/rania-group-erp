import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface PeriodicElement {
  id: number;
  position : string;
  type: string;
  postedDate: string;
  lastDateToApply : string;
  closedDate: string;
  statusText: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, position:'Senior PHP Developer', type: '	Full-Time', postedDate: '12-01-2021', lastDateToApply: '24-01-2021', closedDate:'	25-01-2021', statusText: 'Active', status: 'success'},
  {id: 2, position:'Fresher Web Designer', type: '	Full-Time', postedDate: '15-02-2021', lastDateToApply: '21-02-2021', closedDate:'23-02-2021', statusText: 'Active', status: 'success'},
  {id: 3, position:'Senior Web Developer', type: '	Full-Time', postedDate: '16-02-2021', lastDateToApply: '03-03-2021', closedDate:'05-03-2021', statusText: 'Active', status: 'success'},
  {id: 4, position:'Fresher UI Designer', type: 'Part-Time', postedDate: '16-01-2021', lastDateToApply: '03-02-2021', closedDate:'05-02-2021', statusText: 'InActive', status: 'danger'},
  {id: 5, position:'SEO Specialist', type: '	Full-Time', postedDate: '16-03-2021', lastDateToApply: '23-03-2021', closedDate:'30-03-2021', statusText: 'Active', status: 'success'},
  {id: 6, position:'Senior Worpress Developer', type: '	Full-Time', postedDate: '16-01-2021', lastDateToApply: '23-01-2021', closedDate:'30-01-2021', statusText: 'InActive', status: 'danger'},
  {id: 7, position:'Senior Accountant', type: '	Full-Time', postedDate: '18-02-2021', lastDateToApply: '25-02-2021', closedDate:'30-02-2021', statusText: 'Active', status: 'success'},
  {id: 8, position:'Senior Software Engineer', type: '	Full-Time', postedDate: '	21-03-2021', lastDateToApply: '15-03-2021', closedDate:'20-03-2021', statusText: 'Active', status: 'success'},
  {id: 9, position:'Fresher Angular Developer', type: '	Full-Time', postedDate: '	21-01-2021', lastDateToApply: '15-02-2021', closedDate:'20-02-2021', statusText: 'InActive', status: 'danger'},
  {id: 10, position:'Senior Angular Developer', type: 'Freelancer', postedDate: '	25-03-2021', lastDateToApply: '	15-04-2021', closedDate:'20-04-2021', statusText: 'Active', status: 'success'},
];

@Component({
  selector: 'app-job-lists',
  templateUrl: './job-lists.component.html',
  styleUrls: ['./job-lists.component.scss']
})
export class JobListsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = ['ID', 'Position', 'Type', 'PostedDate', 'LastDateToApply', 'closeDate', 'Status', 'Action'];
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
  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
}
