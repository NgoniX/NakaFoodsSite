import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  getYear: any;

  constructor() {}

  ngOnInit(): void {
    const d = new Date();
    const year = d.getFullYear();

    this.getYear = year;
  }
}
