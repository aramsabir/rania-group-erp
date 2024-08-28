import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/shared/validators/passwordMatch'

@Component({
  selector: 'app-forms-wizards',
  templateUrl: './forms-wizards.component.html',
  styleUrls: ['./forms-wizards.component.scss']
})
export class FormsWizardsComponent implements OnInit {

 
   //Archwizard Content
   firstFormGroup!: FormGroup;
   secondFormGroup!: FormGroup;
   thirdFormGroup!: FormGroup;
   fourthFormGroup!: FormGroup;
   maxDate!: Date | any;
 
   //verticalform wizard
   detailForm!: FormGroup;
   contactForm!: FormGroup;
   paymentForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private toaster: ToastrService) {}

  ngOnInit() {

    //
    //Archwizard Content
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'cnfPassword')
      });
    this.thirdFormGroup = this.fb.group({
      birthdate: ['', Validators.required],
      age: [''],
      hasPassport: ['', Validators.required],
    })
    this.fourthFormGroup = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  public finish() {
    this.toaster.success('Successfully Done!')
  }

}
