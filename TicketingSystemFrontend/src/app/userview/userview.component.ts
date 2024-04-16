import { Component } from '@angular/core';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent {
  display = "none";
  ngOnInit() {
   }

  openModal(modalId: string) {
    // Show the modal using its ID
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error(`Modal with ID ${modalId} not found.`);
    }
  }

  
  onCloseHandled() {
    this.display = "none";
  }

  applyFilter(){
;
  }
}
