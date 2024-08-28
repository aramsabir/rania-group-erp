import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethod } from '../../service/apis';
import { HttpService } from '../../service/http/http.service';

@Component({
  selector: 'app-bas-page_loader',
  templateUrl: './page_loader.component.html',
  styleUrls: ['./page_loader.component.scss'],
})
export class BasPageLoaderComponent implements OnInit {
  constructor(private httpService: HttpService, private router: Router) { }
  ngOnInit(): void {

  }

}
