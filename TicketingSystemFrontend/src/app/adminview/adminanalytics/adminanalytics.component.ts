import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminanalytics',
  templateUrl: './adminanalytics.component.html',
  styleUrls: ['./adminanalytics.component.css']
})
export class AdminanalyticsComponent {
  showFilterForm: boolean = false;

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }
}
