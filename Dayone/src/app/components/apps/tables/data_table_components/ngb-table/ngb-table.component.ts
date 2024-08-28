import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { Country } from '../../table-modal/countreies.modal';
import { CountryService } from '../../table-services/counteries.service';


@Component({
  selector: 'app-ngb-table',
  templateUrl: './ngb-table.component.html',
  styleUrls: ['./ngb-table.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class NgbTableComponent implements OnInit {

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  ngOnInit(): void {
  }

}
