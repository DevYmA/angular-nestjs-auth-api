import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'ya-custom-modal-lib';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
      title: 'About Modal',
      height: '100px',
      width: '300px',
      backgroundColor: '#ffa9cd',
      bodyText: 'Opened via about component'
    }).subscribe((res) => {
      this.eventStatus = "OK button clicked"
    });
  }

}
