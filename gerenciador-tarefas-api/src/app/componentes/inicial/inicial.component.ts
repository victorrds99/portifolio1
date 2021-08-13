import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.module';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { Ordenacao } from 'src/app/utils/ordenacao.enum';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  tarefas:Tarefa[]=[];
  tarefa: Tarefa = new Tarefa('', '', false);
  ordem: Ordenacao = Ordenacao.ASC;
  filtro: string = '';
  pagina: number = 0;
  totalItens: number = 0;
  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  concluir(id: string) {
    this.tarefaService.concluir(id).subscribe(
      () => this.carregarTarefas(),
      () => alert('Erro concluindo tarefa')
    );
    this.carregarTarefas();
  }

  removerId(tarefaId: string) {
    this.tarefaService.listarId(tarefaId).subscribe(
      tarefa => {
        this.tarefa = tarefa;
      },
      () => alert('Erro obtendo tarefa')
    );
  }

  remover() {
    this.pagina = 0;
    this.tarefaService.remover(this.tarefa.id).subscribe(
      () => this.carregarTarefas(),
      () => alert('Erro removendo tarefa')
    );
  }

  ordenar() {
    if (this.ordem === Ordenacao.ASC) {
      this.ordem = Ordenacao.DESC;
    } else {
      this.ordem = Ordenacao.ASC;
    }
    this.carregarTarefas();
  }

  ascendente() {
    return this.ordem === Ordenacao.ASC;
  }

  pesquisar($event: any) {
    this.filtro = $event.target.value;
    this.carregarTarefas();
  }
  
  paginar(pagina: number) {
    this.pagina = pagina;
    this.carregarTarefas();
  }

  numeroPaginas() {
    return this.tarefaService.numeroPaginas(this.totalItens);
  }

  obterPaginas() {
    return [...Array(this.numeroPaginas() + 1).keys()];
  }

  private carregarTarefas() {
    this.tarefaService.listarPaginado(this.ordem, this.filtro, this.pagina + 1)
      .subscribe(
        dados => {
          this.tarefas = dados.tarefas;
          this.totalItens = dados.totalItens;
        },
        () => alert('Erro obtendo tarefas')
      );
  }

}
