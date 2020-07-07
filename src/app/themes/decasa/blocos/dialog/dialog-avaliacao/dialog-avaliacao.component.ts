import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ItemService} from '../../../../../services/item.service';
import {ClienteOrcamento} from '../../../../../model/response/cliente-orcamento.module';
import {ItemAvaliacao} from '../../../../../model/item-avaliacao.module';
import {Avaliacao} from '../../../../../model/avalicao.module';
import {Orcamento} from '../../../../../model/orcamento.module';
import {AuthService} from '../../../../../services/auth.service';

@Component({
  selector: 'app-dialog-avaliacao',
  templateUrl: './dialog-avaliacao.component.html',
  styleUrls: ['./dialog-avaliacao.component.css']
})
export class DialogAvaliacaoComponent implements OnInit {

  itensAvalicao: ItemAvaliacao[] = [];
  rating;
  comentario = '';

  comentarios = [
    {texto: 'Fornecedor super pontual.'},
    {texto: 'Me senti super seguro.'},
    {texto: 'Ele é muito cordial e educado.'},
    {texto: 'Atendimento exclente.'}
  ];

  constructor(public dialogRef: MatDialogRef<DialogAvaliacaoComponent>, private authService: AuthService,
              private itemService: ItemService, @Inject(MAT_DIALOG_DATA) public orcamento: ClienteOrcamento) {
  }

  ngOnInit(): void {
    this.getItens();
    console.log(this.orcamento);
  }

  close(): void {
    this.dialogRef.close();
  }

  getItens() {
    this.itemService.getItens(2).subscribe(
      (data) => {
        data.forEach(value => {
          const a = new ItemAvaliacao(value);
          this.itensAvalicao.push(a);
          console.log(a);
        });
        console.log(this.itensAvalicao);
      }
    );
  }

  avaliar() {
    console.log(this.itensAvalicao);
    const avaliacao: Avaliacao = new Avaliacao();
    const orcamento = new Orcamento();

    orcamento.id = this.orcamento.id;
    avaliacao.orcamento = orcamento;
    avaliacao.itensAvaliacao = this.itensAvalicao;
    avaliacao.codigoAvaliado = this.authService.getUser().id;
    avaliacao.observacao = this.comentario;
    console.log(avaliacao);
  }

  onRatingSet(e, a: ItemAvaliacao) {
    a.nota = e;
    console.log(e);
    console.log(a);
  }

  adicionar(comentario: string) {
    this.comentario += ' ' + comentario;
  }

}
