import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'ya-custom-modal-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventStatus = "";

  constructor(
    private modalService: ModalService,
    private containerReference: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }


  openModal() {
    let randomNo = Math.floor(Math.random() * 2);
    this.modalService.openModel({
      viewContainerRef: this.containerReference,
      title: 'Home Modal',
      height: '100px',
      width: '300px',
      backgroundColor: '#f6ffa9',
      bodyText: 'Opened via home component'
    }).subscribe((res) => {
      this.eventStatus = "OK button clicked"
    });
  }

}
