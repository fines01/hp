import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-contact-response',
  templateUrl: './dialog-contact-response.component.html',
  styleUrls: ['./dialog-contact-response.component.scss']
})
export class DialogContactResponseComponent implements OnInit {

  status!: string;
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
      this.message = 'Thank you for your message! I will reply as soon as possible!'
    }
    else if (this.status === 'error') {
      this.contactSuccess = false;
      this.message = 'Oops, something went wrong. Please try again later, or contact me directly: ines.fritsch@gmail.com'
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
