import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public selectedDate;
  public datePickerConfig;
  
  model!: NgbDateStruct;
  selected!: {startDate: Moment, endDate: Moment};

  constructor(
    private modalService: NgbModal,
  ) {
    this.datePickerConfig = {
      firstDayOfWeek: 'su',
      monthFormat: 'MMM, YYYY',
      disableKeypress: false,
      allowMultiSelect: false,
      closeOnSelect: undefined,
      closeOnSelectDelay: 100,
      onOpenDelay: 0,
      weekDayFormat: 'ddd',
      appendTo: document.body,
      drops: 'down',
      opens: 'right',
      showNearMonthDays: true,
      showWeekNumbers: false,
      enableMonthSelector: true,
      format: "YYYY-MM-DD HH:mm",
      yearFormat: 'YYYY',
      showGoToCurrent: true,
      dayBtnFormat: 'DD',
      monthBtnFormat: 'MMM',
      hours12Format: 'hh',
      hours24Format: 'HH',
      meridiemFormat: 'A',
      minutesFormat: 'mm',
      minutesInterval: 1,
      secondsFormat: 'ss',
      secondsInterval: 1,
      showSeconds: false,
      showTwentyFourHours: true,
      timeSeparator: ':',
      multipleYearsNavigateBy: 10,
      showMultipleYearsNavigation: false,
    }
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
  }

  BasicOpen(basicmodal:any) {
    this.modalService.open(basicmodal);
  }
  SmallOpen(smallmodal:any) {
    this.modalService.open(smallmodal, { size: 'sm' });
  }
  LargeOpen(largemodal:any) {
    this.modalService.open(largemodal, { size: 'lg' });
  }
  GridOpen(gridmodal:any) {
    this.modalService.open(gridmodal, { size: 'lg' });
  }

  SuccessOpen(successmodal:any) {
    this.modalService.open(successmodal, { centered: true });
  }
  WarningOpen(warningmodal:any) {
    this.modalService.open(warningmodal, { centered: true });
  }

  openScrollableContent(scrolling:any) {
    this.modalService.open(scrolling, { scrollable: true });
  }

  Select2Open(select2modal:any) {
    this.modalService.open(select2modal);
  }
  DatePickerOpen(datepickermodal:any) {
    this.modalService.open(datepickermodal);
  }

}
