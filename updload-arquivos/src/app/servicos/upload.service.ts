import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(arquivos: File[]): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < arquivos.length; i++) {
      const arquivo = arquivos[i];
      formData.append(arquivo.name, arquivo);
    }
    // Array.from(this.arquivos).forEach(arquivo =>
    //   formData.append(arquivo.name, arquivo));
    return this.http.post(env.apiUrl + 'upload', formData);
  }
  
}
