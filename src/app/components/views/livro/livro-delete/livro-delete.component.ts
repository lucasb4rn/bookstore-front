import { Livro } from './../livro.module';
import { LivroService } from './../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  
  
  id_cat: String = '';
  
  livro : Livro = {
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  
  constructor(private route: ActivatedRoute, private service: LivroService, private router: Router) { }
  
  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

    
  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro deletado com Sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao atualizar Livro!')
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  
}
