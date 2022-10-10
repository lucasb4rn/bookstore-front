import { Component, OnInit } from '@angular/core';
import { Livro } from './../livro.module';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';


@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  id_cat: String = '';
  
  livro : Livro = {
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  
  constructor(private router: Router, private service: LivroService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById()
  }
  
  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
  
}
