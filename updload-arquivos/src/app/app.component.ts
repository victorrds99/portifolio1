import { UploadService } from './servicos/upload.service';

import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arquivos: File[] = [];
  formInvalido = false;
  erroUpload = false;
  urlsUpload: string[] = [];

  constructor(private UploadService: UploadService){};

  armazenarArquivo($event: any) {
   
    this.arquivos = $event.target.files;
    this.formInvalido = false;
  
  }
  enviarArquivo($event: any) {
    $event.preventDefault();
    if (this.arquivos.length === 0) {
      this.formInvalido = true;
      return;
    }
    this.erroUpload = false;
    this.UploadService.upload(this.arquivos).subscribe(
      dados => this.urlsUpload = dados as string[],
      () => this.erroUpload = true
    );
  }
}
