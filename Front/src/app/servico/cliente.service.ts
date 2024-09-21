import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscribable} from "rxjs";
import {Cliente} from "../modelo/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string = "http://localhost:8085/";

  //Construtor
  constructor(private http:HttpClient) { }

  //Metodo parar seleionar todos os clientes
  selecionar():Observable<Cliente[]>{
   return this.http.get<Cliente[]>(this.url);
  }

  //Metodo para cadastrar Clientes
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj)
  }

  //Metodo para EDITAR Clientes
  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj)
  }

  //Metodo para REMOVER cliente
  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.url + id);
  }


}
