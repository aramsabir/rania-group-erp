import { Component, ViewChild, OnInit, ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataService, Person } from 'src/app/shared/services/hr-dashboard/holidaysSelectDropdown.service';
import { HolidayDialogComponent } from './holiday-dialog/holiday-dialog.component';
import { holiday, holidayList } from './holidayTableData';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  model!: NgbDateStruct;
  displayedColumns: string[] = ['id', 'day', 'date', 'holidays', 'actions'];
  dataSource = new MatTableDataSource<holidayList>(holiday);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(private modalService: NgbModal, private dataService: DataService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
  // holidayList = holiday
  openDialog(dataValue:any) {
    this.dialog.open(HolidayDialogComponent, {
      data: {
        dataValue
      },
    });
  }

  month$!: Observable<Person[]>;
  year$!: Observable<Person[]>;
  selectedMonthId:any = "January";
  selectedYearId:any = "2021";

  ngOnInit() {
    this.month$ = this.dataService.getMonth();
    this.year$ = this.dataService.getYear();
  }

  deleteTicket(item:any){
    const index = this.dataSource.data.indexOf(item);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();   // <-- Refresh the datasource
  }

 
  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter();

  @Output() viewDateChange = new EventEmitter();

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      color: colors.blue,
      start: new Date(),
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
