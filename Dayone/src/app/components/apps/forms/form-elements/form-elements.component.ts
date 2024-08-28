import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormElementsService, Month, Year, Days } from './form-elements.service';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent implements OnInit {
  active = 1;
  heroForm!: FormGroup;

  month: Month[] = [];
  year: Year[] = [];
  days: Days[] = [];
  selectedMonth = '6';
  selectedDate = '12';
  selectedYear = '1997';

  selectedSimpleItem = 'Two';
  simpleItems: any[] = [];

  constructor(private FormElementsService: FormElementsService, 
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // Country
    this.heroForm = this.fb.group({
        heroId: 'br',
        agree: null
    });
    // Month
      this.FormElementsService.getMonth().subscribe(items => this.month = items);
    // Year
      this.FormElementsService.getYear().subscribe(items => this.year = items);
    // Days
      this.FormElementsService.getDays().subscribe(items => this.days = items);
      // this.simpleItems = [true, 'Two', 3];

  }

}
