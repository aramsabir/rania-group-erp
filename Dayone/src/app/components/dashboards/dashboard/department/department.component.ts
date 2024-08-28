import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface departmentList {
  id: number;
  name: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmant:departmentList[] | any;
  departmantname:any
  departmantid:any
  constructor(private modalService: NgbModal) { 
    this.departmant =[
      {id: 1, name: 'Designing Department'},
      {id: 2, name: 'Development Department'},
      {id: 3, name: 'Marketing Department'},
      {id: 4, name: 'Human Resource Department'},
      {id: 5, name: 'Managers Department'},
      {id: 6, name: 'Application Department'},
      {id: 7, name: 'Support Department'},
      {id: 8, name: 'IT Department'},
      {id: 9, name: 'Technical Department'},
      {id: 10, name: 'Accounts Department'},
    ]
  }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }

  edit(editData:any, departmant: any) {
    this.modalService.open(editData, {backdrop : 'static' , windowClass : 'modalCusSty' })
    this.departmantname = departmant.name
    this.departmantid = departmant.id
  }
  saveData(value:any, id:number){    
    this.departmant[id-1].name = value
  }

  RemoveElementFromDepartmentArray(key: any) {
    this.departmant.forEach((value:any,index:any)=>{
        if(value.id==key) this.departmant.splice(index,1);
    });
  } 
}
