import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
import { AttendanceViewSortColumn } from 'src/app/shared/directives/sortable.directive';
import { attendanceView, attendanceViewType } from './attendenceViewTableData';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  attendanceViewData: attendanceViewType[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: AttendanceViewSortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(attendanceViewData: attendanceViewType[], column: AttendanceViewSortColumn, direction: string): attendanceViewType[] {
  if (direction === '' || column === '') {
    return attendanceViewData;
  } else {
    return [...attendanceViewData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(attendanceView: attendanceViewType, term: string, pipe: PipeTransform) {  
  return attendanceView.name.toLowerCase().includes(term.toLowerCase())
  || attendanceView.lastAbsent.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class AttendanceViewService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _attendanceViewData$ = new BehaviorSubject<attendanceViewType[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._attendanceViewData$.next(result.attendanceViewData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get attendanceViewData$() { return this._attendanceViewData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: AttendanceViewSortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let attendanceViewData = sort(attendanceView, sortColumn, sortDirection);

    // 2. filter
    attendanceViewData = attendanceViewData.filter(attendanceView => matches(attendanceView, searchTerm, this.pipe));
    const total = attendanceViewData.length;

    // 3. paginate
    attendanceViewData = attendanceViewData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({attendanceViewData, total});
  }
}
