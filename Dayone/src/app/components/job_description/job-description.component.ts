import { Component, OnInit } from '@angular/core';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { ApiMethod } from 'src/app/@core/service/apis';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { Chart } from 'src/app/shared/data/chart/chartist';


import * as Highcharts from "highcharts";
import "highcharts/modules/exporting";
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

import HC_exportData from 'highcharts/modules/export-data';
HC_exportData(Highcharts);

import HighchartsMore from "highcharts/highcharts-more";
import { ActivatedRoute, Router } from '@angular/router';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { environment } from 'src/environments/environment';
HighchartsMore(Highcharts);

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class BasJobDescriptionComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    // {
    //   icon: 'fe fe-codepen',
    //   route: '/visits',
    //   queryParams: { skip: 0, limit: 20, sort: 'name', cond: 'my_visits' },
    //   name: 'Visits',
    // },
  ];

  actions: any = [{
    class: 'btn btn-primary',
    icon: 'feather feather-plus',
    ngbTooltip: this.dic.translate('New Ticket'),
    type: 'info',
    url: '/administrator_tickets/new',
  }]

  active: number = 0
  p: any = {}
  pdfSrc: any;
  pageName: any = ""
  tabs: any = [
    {
      name: "Kawan Shwan",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Kawan.pdf'
    },
    {
      name: "Shaho Rostam",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Shaho.pdf'
    },
    {
      name: "Harem Omer",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Harem.pdf'
    },
    {
      name: "Shorsh Nzar",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description shorsh.pdf'
    },
    {
      name: "Shanaz Jalal",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Shanaz.pdf'
    },
    {
      name: "Karzan Star",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Karzan.pdf'
    },
    {
      name: "Aram Sabir",
      pdfSrc: 'assets/pdf/job_sedcriptions/Job Description Aram.pdf'
    },
  ]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dic: DicService,
    private http: HttpService
  ) {


    this.route.queryParams.subscribe((params) => {
      this.p = params
      if (params['type'] == 'network_stractures') {
        this.pageName = "Network stracture"
        this.pdfSrc = "/assets/pdf/data/network_stractures.pdf"
      }
      if (params['type'] == 'overtime') {
        this.pageName = "Overtime guide"
        this.pdfSrc = "/assets/pdf/data/overtime.pdf"
      }
      if (params['type'] == 'azya_archive_guide') {
        this.pageName = "Azya archive guide"
        this.pdfSrc = "/assets/pdf/data/azya_archive_guide.pdf"
      }
      if (params['type'] == 'seen_guide_and_put_in_public_folder') {
        this.pageName = "Seen guide and put in public folder"
        this.pdfSrc = "/assets/pdf/data/seen_guide_and_put_in_public_folder.pdf"
      }
      if (params['type'] == 'it_department_guidelines') {
        this.pageName = "IT Department guides"
        this.pdfSrc = "/assets/pdf/data/it_department_guidelines.pdf"
      }
      if (params['type'] == 'it_department_workbook') {
        this.pageName = "IT Department workbook"
        this.pdfSrc = "/assets/pdf/data/it_department_workbook.pdf"
      }
      if (params['type'] == 'it_department_stracture') {
        this.pageName = "IT Department starcture"
        this.pdfSrc = "/assets/pdf/data/stracture.pdf"
      }
      if (params['type'] == 'cctv_guides') {
        this.pageName = "CCTV guideline"
        this.pdfSrc = "/assets/pdf/data/cctv_guides.pdf"
      }
      if (params['type'] == 'work_book_unit') {
        this.pageName = "IT Department workbook units"
        this.pdfSrc = "/assets/pdf/data/work_book_unit.pdf"
      }

    })
    route.queryParams.subscribe(() => {
      this.ngOnInit();
    });

  }

  ngOnInit() {


    if (this.p.type == 'network_stractures') {
      this.pageName = "Network stracture"
      this.pdfSrc = "/assets/pdf/data/network_stractures.pdf"
    }
    if (this.p.type == 'overtime') {
      this.pageName = "Overtime guide"
      this.pdfSrc = "/assets/pdf/data/overtime.pdf"
    }
    if (this.p.type == 'azya_archive_guide') {
      this.pageName = "Azya archive guide"
      this.pdfSrc = "/assets/pdf/data/azya_archive_guide.pdf"
    }
    if (this.p.type == 'seen_guide_and_put_in_public_folder') {
      this.pageName = "Seen guide and put in public folder"
      this.pdfSrc = "/assets/pdf/data/seen_guide_and_put_in_public_folder.pdf"
    }
    if (this.p.type == 'it_department_guidelines') {
      this.pageName = "IT Department guides"
      this.pdfSrc = "/assets/pdf/data/it_department_guidelines.pdf"
    }
    if (this.p.type == 'it_department_workbook') {
      this.pageName = "IT Department workbook"
      this.pdfSrc = "/assets/pdf/data/it_department_workbook.pdf"
    }
    if (this.p.type == 'it_department_stracture') {
      this.pageName = "IT Department starcture"
      this.pdfSrc = "/assets/pdf/data/stracture.pdf"
    }
    if (this.p.type == 'cctv_guides') {
      this.pageName = "CCTV guideline"
      this.pdfSrc = "/assets/pdf/data/cctv_guides.pdf"
    }
    if (this.p.type == 'work_book_unit') {
      this.pageName = "IT Department workbook units"
      this.pdfSrc = "/assets/pdf/data/work_book_unit.pdf"
    }

  }
  search(event: any) {
    this.router.navigate([], { queryParams: { year: event } })

  }


}
