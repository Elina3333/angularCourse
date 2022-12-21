import {Component, OnInit} from '@angular/core'
import {AsyncValidator, AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "./my.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  skill:string = "";

  submit(){
    const formData = {...this.form.value};
    this.form.reset();
  }

  setCapital(){
    const cityMap = {
      ru:'Moscow',
      ua:'Kiev',
      by:'Minsk'
    }
    const cityKey = this.form.controls['address'].get('country');
    // @ts-ignore
    const city = cityMap[cityKey?.value];
    this.form.patchValue({address:{city}});
  }

  addSkill(){
    const control = new FormControl(this.skill,Validators.required);
    // (<FormArray>this.form.controls['skills']).push()
    (this.form.controls['skills'] as FormArray).push(control);
  }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email,MyValidators.restrictedEmails],[MyValidators.uniqEmail]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      address: new FormGroup({
        country : new FormControl('by'),
        city: new FormControl('Minsk',Validators.required)
      }),
      skills : new FormArray([])
    });
  }
}

