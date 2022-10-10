import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.module';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {
  
  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }
  
  
  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) {
    
  }
  
  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }
  
  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta;
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem("Categoria atualizada com Sucesso!")
    }, err => {
      for(let i =0 ; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    })
  }

  cancel(): void {
    this.router.navigate([`categorias`])
  }
  
  
}
