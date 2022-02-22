import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'ya-custom-modal-lib';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

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
      title: 'Team Modal',
      height: '100px',
      width: '300px',
      backgroundColor: '#a9d6ff',
      bodyText: 'Opened via team component'
    }).subscribe((res) => {
      this.eventStatus = "OK button clicked"
    });
  }

}
