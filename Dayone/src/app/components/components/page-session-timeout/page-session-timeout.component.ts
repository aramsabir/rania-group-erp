import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-page-session-timeout',
  templateUrl: './page-session-timeout.component.html',
  styleUrls: ['./page-session-timeout.component.scss']
})
export class PageSessionTimeoutComponent implements OnInit {

  @ViewChild('sessionModal') sessionModal: ElementRef | any;

  value = 10;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService : AuthService
  ) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.closeModal();
    }, 10000);

    setInterval(() => {
      if (this.value <= 100) {
        this.value += 10;
      }
    }, 1000);
  }

  ngAfterViewInit() {
    this.openModal();
  }

  openModal() {
    this.modalService.open(this.sessionModal, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll(this.sessionModal)
  }

  logout() {
    this.authService.SignOut();
    this.closeModal();
  }
}
