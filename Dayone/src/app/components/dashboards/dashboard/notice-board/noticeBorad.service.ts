import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '@angular/material/sort';
import { SortColumn } from 'src/app/shared/directives/sortable.directive';
import { noticeBoard, noticeBoardList } from './noticaBoardTableData';

interface SearchResult {
  noticeBoardData: noticeBoardList[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(noticeBoardData: noticeBoardList[], column: SortColumn, direction: string): noticeBoardList[] {
  if (direction === '' || column === '') {
    return noticeBoardData;
  } else {
    return [...noticeBoardData].sort((a:any, b:any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(noticeBoard: noticeBoardList, term: string, pipe: PipeTransform) {
  return noticeBoard.title.toLowerCase().includes(term.toLowerCase())
    || noticeBoard.description.toLowerCase().includes(term.toLowerCase())
    || noticeBoard.to.toLowerCase().includes(term.toLowerCase())
    || noticeBoard.createOn.toLowerCase().includes(term.toLowerCase())
    || noticeBoard.status.toLowerCase().includes(term.toLowerCase())
}

@Injectable({providedIn: 'root'})
export class noticeBoardService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _noticeBoardData$ = new BehaviorSubject<noticeBoardList[]>([]);
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
      this._noticeBoardData$.next(result.noticeBoardData);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get noticeBoardData$() { return this._noticeBoardData$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let noticeBoardData = sort(noticeBoard, sortColumn, sortDirection);

    // 2. filter
    noticeBoardData = noticeBoardData.filter(noticeBoard => matches(noticeBoard, searchTerm, this.pipe));
    const total = noticeBoardData.length;

    // 3. paginate
    noticeBoardData = noticeBoardData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({noticeBoardData, total});
  }
}
