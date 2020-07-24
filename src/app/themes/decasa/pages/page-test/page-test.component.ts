import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.css']
})
export class PageTestComponent {

  public nome;
  public avaliacao;


  constructor(private http: HttpClient) {

  }

  submit() {
    this.http.post('http://localhost:3000/submit', {
      nome: this.nome,
      avaliacao: this.avaliacao,
    }).subscribe(
      (data) => {
        console.log(data);
        this.nome = '';
        this.avaliacao = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
