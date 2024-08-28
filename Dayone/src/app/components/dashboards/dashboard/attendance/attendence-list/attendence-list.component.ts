import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../attendence-by-user/attendanceByUserSelectDropdown.service';


@Component({
  selector: 'app-attendence-list',
  templateUrl: './attendence-list.component.html',
  styleUrls: ['./attendence-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendenceListComponent implements OnInit {
  constructor(private modalService: NgbModal, private dataService: DataAttendanceByUserService) { 
    // this.modalService.activeInstances.subscribe((list) => {
    //   console.log(list);
    //  });
  }

  month$!: Observable<PersonAttendanceByUser[]>;
  year$!: Observable<PersonAttendanceByUser[]>;
  empName$!: Observable<PersonAttendanceByUser[]>;
  selectedMonthId:any = "January";
  selectedYearId:any = "2021";
  selectedEmpName:any = "10";

  ngOnInit() {
    this.month$ = this.dataService.getMonth();
    this.year$ = this.dataService.getYear();
    this.empName$ = this.dataService.getEmpName();
  }

  fullDay() {
	this.modalService.open(NgbdModal1Content);
  }
  halfDay(){
	this.modalService.open(NgbdModalHalfDayContent);
  }
  
}

// Fullday modal content
@Component({
  template: `
    <div class="modal-header">
    <h5 class="modal-title">Attendance Details</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="row mb-5 mt-4">
								<div class="col-md-4">
									<div class="pt-5 text-center">
										<h6 class="mb-1 fs-16 font-weight-semibold">09:30 AM</h6>
										<small class="text-muted fs-14">Clock In</small>
									</div>
								</div>
								<div class="col-md-4">
									<circle-progress [percent]="100" [radius]="32" [space]="-5" [outerStrokeWidth]="5" [innerStrokeWidth]="5" [showInnerStroke]="true" 
									[outerStrokeColor]="'#0dcd94'" [innerStrokeColor]="'#87e9cb'" [title]="'09:00 hrs'" titleFontSize=10 [showUnits]="false" [showSubtitle]="false"
									[animation]="true" [animationDuration]="300"></circle-progress>
								</div>
								<div class="col-md-4">
									<div class="pt-5 text-center">
										<h6 class="mb-1 fs-16 font-weight-semibold"> 06:30 PM</h6>
										<small class="text-muted fs-14">Clock Out</small>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="form-label">IP Address</label>
								<input type="text" class="form-control" placeholder="225.192.145.1" disabled>
							</div>
							<div class="form-group">
								<label class="form-label">Working From</label>
								<ng-select name="projects"  class="form-control custom-select select2" disabled data-placeholder="Select">
									<ng-option value="1" selected>Office</ng-option>
									<ng-option value="2">Home</ng-option>
									<ng-option value="3">Others</ng-option>
								</ng-select>
							</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Close</button>
              <p><button class="btn btn-primary" (click)="second()">Edit</button></p>
    </div>
  `
})
export class NgbdModal1Content {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  second() {
    this.modalService.open(NgbdModal2Content, {
      size: 'lg'
    });
  }
}

@Component({
  template: `
    <div class="modal-header">
    <h5 class="modal-title">Attendance Details</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="row">
			<div class="col-md-8">
				<div class="form-group">
					<label class="form-label">Clock In</label>
					<div class="input-group">
						<input class="form-control timepicker" placeholder="9:30 AM" aria-label="Append to input"
							[ngxTimepicker]="appendedToInput" readonly>
						<ngx-material-timepicker #appendedToInput [appendToInput]="true"></ngx-material-timepicker>
						<div class="input-group-text">
							<i class="fa fa-clock-o"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<label class="custom-switch mt-md-6">
					<input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input orange">
					<span class="custom-switch-indicator "></span>
					<span class="custom-switch-description text-dark">Late</span>
				</label>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<div class="form-group">
					<label class="form-label">Clock Out</label>
					<div class="input-group">
					<input class="form-control timepicker" placeholder="6:30 AM" aria-label="Append to input"
							[ngxTimepicker]="appendedToInput1" readonly>
						<ngx-material-timepicker #appendedToInput1 [appendToInput]="true"></ngx-material-timepicker>
						<div class="input-group-text">
							<i class="fa fa-clock-o"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<label class="custom-switch mt-md-6">
					<input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input  orange">
					<span class="custom-switch-indicator"></span>
					<span class="custom-switch-description text-dark">half Day</span>
				</label>
			</div>
		</div>
		<div class="form-group">
			<label class="form-label">IP Address</label>
			<input type="text" class="form-control" placeholder="225.192.145.1" disabled>
		</div>
		<div class="form-group">
			<label class="form-label">Working From</label>
			<ng-select name="projects"  class="form-control custom-select select2" disabled data-placeholder="Select">
				<ng-option value="1" selected>Office</ng-option>
				<ng-option value="2">Home</ng-option>
				<ng-option value="3">Others</ng-option>
			</ng-select>
		</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Close</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Save</button>
    </div>
  `
})
export class NgbdModal2Content {
  constructor(public activeModal: NgbActiveModal) {}
}


// Half Day modal content
@Component({
	template: `
	  <div class="modal-header">
	  <h5 class="modal-title">Attendance Details <span class="badge badge-orange">Half Day</span></h5>
		<button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
		  <span aria-hidden="true">&times;</span>
		</button>
	  </div>
	  <div class="modal-body">
	  <div class="row mb-5 mt-4">
								  <div class="col-md-4">
									  <div class="pt-5 text-center">
										  <h6 class="mb-1 fs-16 font-weight-semibold">09:30 AM</h6>
										  <small class="text-muted fs-14">Clock In</small>
									  </div>
								  </div>
								  <div class="col-md-4">
									  <circle-progress [percent]="100" [radius]="32" [space]="-5" [outerStrokeWidth]="5" [innerStrokeWidth]="5" [showInnerStroke]="true" 
									  [outerStrokeColor]="'#0dcd94'" [innerStrokeColor]="'#87e9cb'" [title]="'09:00 hrs'" titleFontSize=10 [showUnits]="false" [showSubtitle]="false"
									  [animation]="true" [animationDuration]="300"></circle-progress>
								  </div>
								  <div class="col-md-4">
									  <div class="pt-5 text-center">
										  <h6 class="mb-1 fs-16 font-weight-semibold"> 06:30 PM</h6>
										  <small class="text-muted fs-14">Clock Out</small>
									  </div>
								  </div>
							  </div>
							  <div class="form-group">
								  <label class="form-label">IP Address</label>
								  <input type="text" class="form-control" placeholder="225.192.145.1" disabled>
							  </div>
							  <div class="form-group">
								  <label class="form-label">Working From</label>
								  <ng-select name="projects"  class="form-control custom-select select2" disabled data-placeholder="Select">
									  <ng-option value="1" selected>Office</ng-option>
									  <ng-option value="2">Home</ng-option>
									  <ng-option value="3">Others</ng-option>
								  </ng-select>
							  </div>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Close</button>
				<p><button class="btn btn-primary" (click)="second()">Edit</button></p>
	  </div>
	`
  })
  export class NgbdModalHalfDayContent {
	constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}
  
	second() {
	  this.modalService.open(NgbdModalHalfDaySecondContent, {
		size: 'lg'
	  });
	}
  }
  
@Component({
	template: `
	  <div class="modal-header">
	  <h5 class="modal-title">Attendance Details <span class="badge badge-orange">Half Day</span></h5>
		<button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
		  <span aria-hidden="true">&times;</span>
		</button>
	  </div>
	  <div class="modal-body">
	  <div class="row">
			  <div class="col-md-8">
				  <div class="form-group">
					  <label class="form-label">Clock In</label>
					  <div class="input-group">
						  <input class="form-control timepicker" placeholder="9:30 AM" aria-label="Append to input"
							  [ngxTimepicker]="appendedToInput" readonly>
						  <ngx-material-timepicker #appendedToInput [appendToInput]="true"></ngx-material-timepicker>
						  <div class="input-group-text">
							  <i class="fa fa-clock-o"></i>
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="col-md-4">
				  <label class="custom-switch mt-md-6">
					  <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input orange">
					  <span class="custom-switch-indicator "></span>
					  <span class="custom-switch-description text-dark">Late</span>
				  </label>
			  </div>
		  </div>
		  <div class="row">
			  <div class="col-md-8">
				  <div class="form-group">
					  <label class="form-label">Clock Out</label>
					  <div class="input-group">
					  <input class="form-control timepicker" placeholder="1:30 AM" aria-label="Append to input"
							  [ngxTimepicker]="appendedToInput1" readonly>
						  <ngx-material-timepicker #appendedToInput1 [appendToInput]="true"></ngx-material-timepicker>
						  <div class="input-group-text">
							  <i class="fa fa-clock-o"></i>
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="col-md-4">
				  <label class="custom-switch mt-md-6">
					  <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input  orange" checked>
					  <span class="custom-switch-indicator"></span>
					  <span class="custom-switch-description text-dark">half Day</span>
				  </label>
			  </div>
		  </div>
		  <div class="form-group">
			  <label class="form-label">IP Address</label>
			  <input type="text" class="form-control" placeholder="225.192.145.1" disabled>
		  </div>
		  <div class="form-group">
			  <label class="form-label">Working From</label>
			  <ng-select name="projects"  class="form-control custom-select select2" disabled data-placeholder="Select">
				  <ng-option value="1" selected>Office</ng-option>
				  <ng-option value="2">Home</ng-option>
				  <ng-option value="3">Others</ng-option>
			  </ng-select>
		  </div>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Close</button>
		<button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Save</button>
	  </div>
	`
  })
  export class NgbdModalHalfDaySecondContent {
	constructor(public activeModal: NgbActiveModal) {}
  }