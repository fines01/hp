import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-contact-response',
  templateUrl: './dialog-contact-response.component.html',
  styleUrls: ['./dialog-contact-response.component.scss']
})
export class DialogContactResponseComponent implements OnInit {

  status!: string;
  title!: string;
  message!: string;
  contactSuccess!: boolean;
  formData!: any;

  constructor(private dialogRef: MatDialogRef<DialogContactResponseComponent>) { }

  ngOnInit(): void {
    this.setContent();
  }

  setContent() {
    if (this.status === 'success') {
      this.contactSuccess = true;
      this.title = 'Message sent'
      this.message = 
      ` Thank you for your message: <strong>${this.formData.name}</strong>! <br> 
      I will reply as soon as possible to: <br> <strong>${this.formData.email}</strong>.`;
    }
    else if (this.status === 'error') {
      this.contactSuccess = false;
      this.title = 'Error'
      this.message = 'Oops, something went wrong! Please try again later, <br> or contact me directly at: <a href="mailto:ines.fritsch@gmail.com">ines.fritsch@gmail.com</a>'
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
