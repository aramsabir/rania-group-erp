import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { noticeBoardList } from './noticaBoardTableData';
import { NoticeBoardDialogComponent } from './notice-board-dialog/notice-board-dialog.component';
import { noticeBoardService } from './noticeBorad.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss'],
  providers: [noticeBoardService, DecimalPipe]
})
export class NoticeBoardComponent implements OnInit {
  noticeBoard$: Observable<noticeBoardList[]>;
  total$: Observable<number>;
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  constructor(private modalService: NgbModal, public service: noticeBoardService, public dialog: MatDialog) {
    this.noticeBoard$ = service.noticeBoardData$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, { backdrop: 'static', windowClass: 'modalCusSty' })
  }
  openDialog(dataValue:any) {
    this.dialog.open(NoticeBoardDialogComponent, {
      data: {
        dataValue
      },
    });
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
  deleteData(d:any){
    this.noticeBoard$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }
}
