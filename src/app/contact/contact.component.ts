import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../contact.service';
import { DialogContactResponseComponent } from '../dialog-contact-response/dialog-contact-response.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form!: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private contact: ContactService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    // generate form controls
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        message: new FormControl('', [Validators.required])
      }
    )
  }

  onSubmit(formData: any){ // this.formData.value
    // TODO: Use EventEmitter with form value?
    if (formData.valid) this.sendMessage(formData);
  }
  
  sendMessage(formData: any) {
    this.contact.postMessage(formData).subscribe( 
      (response) => {
      console.log(response);
      this.handleSuccess(formData);
      },
      (error) => {
        this.handleError(error, formData);
      });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get message() {
    return this.form.get('message');
  }

  showResponseDialog(status: string, formData: any){
    let dialog = this.dialog.open(DialogContactResponseComponent);
    dialog.componentInstance.status = status;
    dialog.componentInstance.formData = formData;
    // formData.reset();
  }

  handleSuccess(formData: any) { // pass formData?
    //location.href = 'https://mailthis.to/confirm'; // in case i want to use the mailthis api
    this.showResponseDialog('success', formData);
    this.form.reset();
  }

  handleError(error: any, formData: any) {
    console.warn(error.message);
    console.log({error});
    this.showResponseDialog('error', formData);
    this.form.reset();
  }

}
