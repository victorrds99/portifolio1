import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.module';
import { Ordenacao } from '../utils/ordenacao.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
    
  private readonly TOTAL_ELEM_PAG = 3;
  private readonly gerenciadorTarefa = 'gerenciador-tarefas/';

  constructor(private http: HttpClient) { }

  listarPaginado(ordem = Ordenacao.ASC, filtro = '', pagina = 0): Observable<any> {
    const params = `?pag=${pagina}&ordem=${ordem}&filtro-tarefa=${filtro}`;
    return this.http.get(environment.apiUrlBase + this.gerenciadorTarefa + params);
  }

  adicionar(tarefa: Tarefa): Observable<any> {
        
    return this.http.post(
      environment.apiUrlBase + this.gerenciadorTarefa,
      tarefa
    );
  }

  listarId(id: string): Observable<any> {
    return this.http.get(environment.apiUrlBase + this.gerenciadorTarefa + id);
  }

  editar(tarefa: Tarefa): Observable<any> {
    return this.http.put(environment.apiUrlBase + this.gerenciadorTarefa + tarefa.id,
      { nome: tarefa.nome,  concluido: tarefa.concluido }
    );
  }

  remover(tarefaId: string): Observable<any> {
    return this.http.delete(
      environment.apiUrlBase + this.gerenciadorTarefa + tarefaId
    );
  }

  concluir(id: string): Observable<any> {
    return this.http.put(
      environment.apiUrlBase + this.gerenciadorTarefa + id + '/concluir', {}
    );
  }

  numeroPaginas(totalItens: number) {
    return Math.ceil(totalItens / this.TOTAL_ELEM_PAG);
  }


}
