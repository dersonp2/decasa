import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ItemService} from '../../../../../services/item.service';
import {ItemAvaliacao} from '../../../../../model/item-avaliacao.module';
import {Avaliacao} from '../../../../../model/avalicao.module';
import {Orcamento} from '../../../../../model/orcamento.module';
import {AuthService} from '../../../../../services/auth.service';
import {TipoAvaliacao} from '../../../../../model/tipo-avalicao.module';
import {Prestador} from '../../../../../model/prestador.module';
import {OrcamentoService} from '../../../../../services/orcamento.service';

export interface DialogData {
  orcamento: Orcamento;
  prestador: Prestador;
}

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
              private itemService: ItemService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private orcamentoService: OrcamentoService) {
  }

  ngOnInit(): void {
    this.getItens();
    console.log(this.data);
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
    const avaliacao: Avaliacao = new Avaliacao();
    const orcamento = new Orcamento();
    const tipoAvaliacao = new TipoAvaliacao(1);

    orcamento.id = this.data.orcamento.id;
    avaliacao.orcamento = orcamento;
    avaliacao.itensAvaliacao = this.itensAvalicao;
    avaliacao.observacao = this.comentario;
    avaliacao.tipoAvaliacao = tipoAvaliacao;
    avaliacao.codigoAvaliador = this.authService.getUser().id;
    avaliacao.codigoAvaliado = this.data.prestador.id;

    console.log(avaliacao);
    this.orcamentoService.confirmEnd(avaliacao).subscribe(
      (data) => {},
      (error) => {console.log(error);}
    );
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
