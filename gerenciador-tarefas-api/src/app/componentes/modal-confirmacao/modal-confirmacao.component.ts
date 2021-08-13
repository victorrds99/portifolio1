import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() id: string = '';
  @Input() titulo: string = '';
  @Input() conteudo: string = '';
  @Output() confirmar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  executarOperacao(){
    this.confirmar.emit();
  }

}
