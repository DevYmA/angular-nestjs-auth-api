import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from 'ya-custom-modal-lib';
import { ModalConfiguration } from 'ya-custom-modal-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  preDefinedConfig: ModalConfiguration[] = [
    {
      viewContainerRef: this.containerReference,
      title: 'one',
      height: '500px',
      width: '400px',
      backgroundColor: '#f00',
      closeAfter: 1000,
      bodyText: 'working one!'
    },
    {
      viewContainerRef: this.containerReference,
      title: 'two',
      height: '100px',
      width: '300px',
      backgroundColor: '#eeeeee',
      closeAfter: 1000,
      bodyText: 'working two!'
    }
  ];

  constructor(
    private modalService: ModalService,
    private containerReference: ViewContainerRef
  ) {

  }

  ngOnInit(): void {
    this.startRandomOpen();
  }

  startRandomOpen() {
    let obj = this
    var startTime = new Date().getTime();
    var interval = setInterval(function () {
      if (new Date().getTime() - startTime > 40000) {
        clearInterval(interval);
        return;
      }
      obj.openModal();
    }, 1000);
  }

  openModal() {
    let randomNo = Math.floor(Math.random() * 2);
    this.modalService.openModel(this.preDefinedConfig[randomNo]).subscribe((res) => {

    });
  }
}
