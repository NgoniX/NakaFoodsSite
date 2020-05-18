import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from './../../providers/contact.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmitButton = true;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService,
    private spinner: NgxSpinnerService
  ) {
    this.contactForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.spinner.show();
    this.contactService.sendMessage(this.contactForm.value).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Email sent successfully');
        this.contactForm.reset();
        this.disabledSubmitButton = true;
      },
      (error) => {
        this.spinner.hide();
        console.log('Error', error);
        console.log(this.contactForm.value);
        this.toastr.error('Not sent. Please try again');
      }
    );
  }
}
