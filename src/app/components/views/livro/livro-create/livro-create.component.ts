import { LivroService } from './../livro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from '../livro.module';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
  
  id_cat: String = '';

  livro : Livro = {
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)])
  nomeAutor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(10)])
  
  constructor(private router: Router, private service: LivroService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }
  
  getMessage(){
    
    if(this.titulo.invalid){
      return 'O campo TITULO deve conter entre 3 e 100 caracteres'
    }
    if(this.nomeAutor.invalid){
      return 'O campo NOME AUTOR deve conter entre 3 e 100 caracteres'
    }
    if(this.texto.invalid){
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres'
    }
    
    return false;
  }
  
  
  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro criado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Erro ao criar novo livro! Tente mais tarde!");
    });
  }
  
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
  
}
