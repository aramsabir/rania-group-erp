import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { award } from './awardTableData';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  data:any
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
  edit(editData:any, awarddata:any) {
    this.modalService.open(editData, {backdrop : 'static' , windowClass : 'modalCusSty' })
    this.data = awarddata
  }

  awardList = award

  
  RemoveElementFromRewardArray(key: any) {
    this.awardList.forEach((value:any,index:any)=>{
        if(value.id==key) this.awardList.splice(index,1);
    });
  } 
}
