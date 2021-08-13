import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  static readonly SOMA: string = "+";
  static readonly SUBTRACAO: string = "-";
  static readonly DIVISAO: string = "/";
  static readonly MULTIPLICACAO: string = "*"

  constructor() { }

  calcular(num1: number, num2: number, operecao: string)  {
    let resultado: number;

    if(operecao === CalculadoraService.SOMA){
        resultado = num1 + num2;
    }else { 
      if (operecao === CalculadoraService.SUBTRACAO) {
        resultado = num1 - num2;
    }else {
      if (operecao ===CalculadoraService.DIVISAO){
        resultado = num1 / num2;
      }
    else {
      if (operecao === CalculadoraService.MULTIPLICACAO) {
        resultado = num1 * num2;
      }
    }
   }
 
    }
  }
}
