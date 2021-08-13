import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa.module';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { cssValidacaoForm } from 'src/app/utils/css.util';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  erro: boolean = false;
  processando: boolean = true;

  form: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb:FormBuilder,
              private tarefaService: TarefaService) { }

  ngOnInit(): void {
  }

  cadastrar() {
    if (this.form.invalid) {
      return;
    }
    const tarefa: Tarefa = this.form.value;
    this.tarefaService.adicionar(tarefa).subscribe(
      () => {
        this.erro = false;
        this.processando = false;
      }, //sucesso
      () => {
        this.erro = true;
        this.processando = false;
      } //erro
    );
    this.form.reset();
  }

  cssValidacao(campo: string) {
    return cssValidacaoForm(this.form.controls[campo]);
  }

}
