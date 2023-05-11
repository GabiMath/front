import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { WpServiceService } from 'src/app/services/wp-service.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.scss']
})


export class QrLoginComponent implements OnInit {

  constructor(private wpService: WpServiceService) { }

  ngOnInit(): void {
    this.getQr()
    this.startTimer()

  }
  title = 'angular10qrcodegeneration';

  // We can have Canvas/Img/Url as elementType
  elementType = NgxQrcodeElementTypes.CANVAS;

  // We can have High/Low/Medium/Quartile
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  // Need to specify the valid website address
  value = '';
  status = '';
  message = '';
  fileXlsx: File | undefined;
  async getQr() {
    console.log('holi');

    this.value = await this.wpService.getQr();
    console.log(this.value);

  }
  async startTimer() {


    var pivot = await this.wpService.getStatus();

    if (this.status == 'ready' && pivot == 'logout') {
      this.value = await this.wpService.getQr();
    }
    this.status = pivot;
    if (pivot == 'logout' && this.value == '') {
      this.value = await this.wpService.getQr();
    }
    console.log(this.status);
    
    this.startTimer()
  }
  xlsxInputChange(event: any) {
    this.fileXlsx = event.target.files[0];
    const text = document.createTextNode('Has cargado el archivo: ' + this.fileXlsx!.name);
    const pNode = document.getElementById("p");
    pNode!.innerHTML = '';
    pNode!.appendChild(text);
  }

  async sendMesage() {
    console.log('message');
    console.log(await this.wpService.sendFile(this.fileXlsx!, this.message));
    const text = document.createTextNode('Se han enviado ' + await this.wpService.getSent() + ' con éxito y sin exito: ' + await
      this.wpService.getError());
    const pNode = document.getElementById("envio");
    pNode!.innerHTML = '';
    pNode!.appendChild(text);
    var myJsonString = JSON.stringify(await this.wpService.getError());
    console.log(myJsonString)
    var blob = new Blob([myJsonString], {
      type: "application/vnd.ms-excel;charset=utf-8"
    });
    FileSaver.saveAs(blob, "Phones with error.xls");
  }

}


