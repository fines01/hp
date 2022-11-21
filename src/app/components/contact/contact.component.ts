import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { slideInAnimation, slideUpAnimation } from '../../animations';
import { ContactService } from '../../services/contact.service';
import { DialogContactResponseComponent } from '../dialog-contact-response/dialog-contact-response.component';
import { NavigationService } from '../../services/navigation.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [slideInAnimation, slideUpAnimation, ]
})
export class ContactComponent implements OnInit {

  form!: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private dialog: MatDialog,
    private navService: NavigationService,
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
    if (this.form.valid) this.sendMessage(formData);
  }
  
  sendMessage(formData: any) {
    this.contactService.postMessage(formData).subscribe(
      {
        next: (response) => this.handleSuccess(formData),
        error: (error) => this.handleError(error, formData),
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

  handleSuccess(formData: any) {
    console.log(formData);
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

  onCancelInput(){
    this.form.reset();
  }

  onIntersection(event: any){
    if (event) this.navService.visibleNavSection = 'contact';
  }

}
