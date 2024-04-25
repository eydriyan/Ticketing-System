import { Component } from '@angular/core';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent {
  showFilterForm: boolean = false;

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }
}
