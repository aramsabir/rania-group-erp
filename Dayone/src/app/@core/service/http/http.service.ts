import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { ApiEndPoints, ApiMethod } from '../apis';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DicService } from '../dic/dic.service';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  response!: Observable<any>;
  lang: any = ''

  constructor(
    private http: HttpClient,
    private dic: DicService,
    private _snackBar: MatSnackBar, private datePipe: DatePipe,
    private _notifications: NotificationsService,) {
    this.lang = this.dic.lang()
  }

  downloadFile(fileSRC: any): any {
    return this.http.get(fileSRC, { responseType: 'blob' });
  }

  createToast(type: any, message: any): void {
    this._snackBar.open(this.dic.translate(message), 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['bas-' + type],
      duration: 4000,
    })
  }
  notification(type: any, message: any): void {
    this._snackBar.open(message, this.dic.translate('Dismiss'), {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      direction: this.lang == 'en' ? 'rtl' : "ltr",
      panelClass: ['bas-' + type],
      duration: 10000,
    })
  }

  call(
    endPoint: ApiEndPoints | string,
    method: ApiMethod,
    params?: any | undefined,
    data?: any
  ): Observable<any> {
    var companies = localStorage.getItem('company')
    
    let url = `${environment.apiUrl}/${endPoint}?`;
    params = params === undefined ? new Object() : params;

    Object.entries(params).forEach((item) => {
      const [key, value]: any = item;
      url = url += key + "=" + value + '&'
      // if (url.indexOf(`{{${key}}}`) !== -1) {
      //   url = url.split(`{{${key}}}`).join(value);
      // }
    });

    url += `&companies=${companies}`
    let options = {};
    if (data !== undefined && method === ApiMethod.DELETE) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          ...data,
        },
      };
    }


    switch (method) {
      case ApiMethod.GET:
        this.response = this.http
          .get(url)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.POST:
        this.response = this.http
          .post(url, data)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.PUT:
        this.response = this.http
          .put(url, data)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.DELETE:
        this.response = this.http
          .delete(url)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      default:
        break;
    }
    return this.response;
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const headers = Object.keys(json[0]);
    const translatedHeaders = headers.map(header => this.dic.translate(header));
    const translatedJson = json.map(item => {
      const obj = {};
      headers.forEach((header, index) => obj[translatedHeaders[index]] = item[header]);
      return obj;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(translatedJson);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportAsExcelFileMultiple(data: any[], excelFileName: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new()
    // const sheets: XLSX.WorkSheet[] = []
    data.forEach(json => {
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(json.data),json.name)
    });
    //     console.log('sheets ', sheets);
    // XLSX.utils.sheet_add_json()
    // XLSX.utils.book_append_sheet()
    // const workbook: XLSX.WorkBook = { Sheets: { sheets }, SheetNames: ['data1', 'data2', 'data3'] };

    
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(
      data,
      fileName +
      ' ' +
      this.datePipe.transform(new Date(), 'MM-dd-yyyy, h_mm_ss a') +
      EXCEL_EXTENSION
    );
  }

  /**
   * this function is used to handle errors
   * //@param error
   */
  // @ts-ignore
  handleError(error: HttpResponse<any>, self: any): ObservableInput<any> {
    // @ts-ignore
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      console.log('Something went wrong: ', error.error.message);
    } else {
      return throwError({
        // @ts-ignore
        error: error.message,
        status: error.status,
      });
    }
  }
}
