import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DicPipe } from './dic.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../shared_components/pagination/pagination.component';
import { GlobalService } from '../service/global/global.service';
import { DataTableTailwindComponent } from '../shared_components/data-table-tailwind/data-table.component';
import { DicService } from '../service/dic/dic.service';
import { BasPageHeaderComponent } from '../shared_components/bas_page-header/page-header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxNotifierModule } from 'ngx-notifier';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShowDataTableComponent } from '../shared_components/show_data-table/data-table.component';
import { BasPageLoaderComponent } from '../shared_components/bas_page_loader/page_loader.component';


@NgModule({
  declarations: [
    DicPipe,
    DataTableTailwindComponent,
    PaginationComponent,
    BasPageHeaderComponent,
    BasPageLoaderComponent,
    ShowDataTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    NgxNotifierModule,
    NgbModule,
    SweetAlert2Module,
    MatSnackBarModule,
    RouterModule
    // ReactiveFormsModule,
   
  ],
  exports: [
    DicPipe,
    DataTableTailwindComponent,
    ShowDataTableComponent,
    PaginationComponent,
    BasPageHeaderComponent,
    BasPageLoaderComponent,
    CurrencyPipe,
    DatePipe,
  ],
  providers: [
    DatePipe,
    DicService,
    GlobalService,
  ]
})
export class PipesModule { }
