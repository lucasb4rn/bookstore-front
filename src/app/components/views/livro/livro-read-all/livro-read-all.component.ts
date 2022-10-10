import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.module';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  livros: Livro[] = []
  
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll();
  }

  findAll(){
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta
    });
  }
  
  navegarParaCriarLivro(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
}
