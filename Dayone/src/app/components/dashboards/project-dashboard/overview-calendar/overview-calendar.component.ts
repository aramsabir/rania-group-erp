import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { Subject } from 'rxjs';
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
  selector: 'app-overview-calendar',
  templateUrl: './overview-calendar.component.html',
  styleUrls: ['./overview-calendar.component.scss']
})
export class OverviewCalendarComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
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
