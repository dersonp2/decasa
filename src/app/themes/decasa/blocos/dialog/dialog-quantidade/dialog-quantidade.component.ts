import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServicosOrcamento} from '../../../../../model/servico-orcamento.module';
import {CarrinhoEvent} from '../../../../../events/carrinho-event';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-quantidade',
  templateUrl: './dialog-quantidade.component.html',
  styleUrls: ['./dialog-quantidade.component.css']
})
export class DialogQuantidadeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogQuantidadeComponent>, private carrinhoService: CarrinhoEvent,
              @Inject(MAT_DIALOG_DATA) public servico: ServicosOrcamento, private _snackBar: MatSnackBar) {
    console.log(servico);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  insert() {
    console.log(this.servico);
    let servicosSelecionados: ServicosOrcamento[] = [];
    if (localStorage.hasOwnProperty('servicosSelecionados')) {
      servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados'));
    }
    servicosSelecionados.push(this.servico);
    localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
    this.carrinhoService.alteracao();
    this.close();
    this.showSnackBar('Serviço inserido no carrinho', 'blue-snackbar');
  }

  showSnackBar(mensagem, cor) {
    this._snackBar.open(mensagem, '', {
        duration: 3000,
        panelClass: [cor]
      }
    );
  }
}
