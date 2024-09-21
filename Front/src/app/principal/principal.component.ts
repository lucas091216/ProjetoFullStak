import { Component } from '@angular/core';
import {JsonPipe, NgFor, NgForOf, NgIf} from "@angular/common";
import {Cliente} from "../modelo/Cliente";
import {ClienteService} from "../servico/cliente.service";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  //obejto do tipo cliente
  cliente = new Cliente();

  //variavel para visibiliade de botoes
  btnCad:boolean = true;

  //Variavel para visibilizdade da tabela
  tabela:boolean= true;


  //Json de Clientes
  clientes:Cliente[] = [];



  //Contrutor
  constructor(private servico:ClienteService) {}


  //Metodo de selecao
  selecionar():void{
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno)
  }

  //Metodo de cadastro
  cadastrar():void{
    this.servico.cadastrar(this.cliente).subscribe(retorno => {this.clientes.push(retorno);});

    //Nova instancia para limpar o formulario no momento do cadastro
    this.cliente = new Cliente();
    alert('Cliente cadastrado com sucesso!');
  }

  //Metodo SELECIONAR (Botao selecionar)
  selecionarCliente(posicao:number):void{
    //selecionar cliente no vetor/banco de dados
    this.cliente = this.clientes[posicao];

    //visibilidade dos botoes
    this.btnCad = false;
    //visibiliadde da tabela
    this.tabela=false;

  }

  //Metodo para Editar clientes
  editarCliente():void{
    this.servico.editar(this.cliente).subscribe(retorno => {let posicao = this.clientes.findIndex(obj =>{return obj.id == retorno.id;});
      this.clientes[posicao] = retorno;

      //Limpar formulario

      this.cliente = new Cliente();

      //visibilidade dos botoes
      this.btnCad = true;

      //visibilidade da tabela
      this.tabela= true;

      alert('Cliente alterado com sucesso! ');
    })
  }

  removerCliente():void{

    this.servico.remover(this.cliente.id).subscribe(retorno => {

      let posicao = this.clientes.findIndex(obj =>{
        return obj.id == this.cliente.id;

      });

      //remover cliente do vetor
      this.clientes.splice(posicao,1);

      //Limpar formulario
      this.cliente = new Cliente();

      //visibilidade dos botoes
      this.btnCad = true;

      //visibilidade da tabela
      this.tabela= true;

      //Mensagem
      alert('Cliente Removido com sucesso! ');
    })
  }

  //Metodo para CANCELAR
  cancelar():void{

    //Limpa form
    this.cliente = new Cliente();

    //visibilidade dos botoes
    this.btnCad = true;

    //visibilidade da tabela
    this.tabela = true;
  }

  //Metodo de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
