import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { Tarefa } from 'src/app/models/tarefa.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cssValidacaoForm } from 'src/app/utils/css.util';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  tarefa: Tarefa = new Tarefa('','', false);
  erro: boolean = false;
  processando: boolean = true;
  
  form: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(5)]]
  });

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    const tarefaId = this.route.snapshot.params['id'];
    this.tarefaService.listarId(tarefaId).subscribe(
      tarefa => {
        this.tarefa = tarefa;
        this.form.controls['nome'].setValue(this.tarefa.nome);
      },
      () => alert('Erro obtendo tarefa')
    );
  }
    
  editar() {
    if (this.form.invalid) {
      return;
    }
    this.tarefa.nome = this.form.value.nome;
    this.processando = true;
    this.tarefaService.editar(this.tarefa).subscribe(
      () => {
        this.erro = false;
        this.processando = false;
      }, //sucesso
      () => {
        this.erro = true;
        this.processando = false;
      } //erro
    );
  }
  cssValidacao(campo: string) {
    return cssValidacaoForm(this.form.controls[campo]);
  }

}
