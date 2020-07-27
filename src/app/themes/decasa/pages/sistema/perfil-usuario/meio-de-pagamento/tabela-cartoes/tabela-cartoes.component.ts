import {Component, OnInit} from '@angular/core';
import {CartaoClienteService} from '../../../../../../../services/cartao-cliente.service';
import {AuthService} from '../../../../../../../services/auth.service';
import {CartaoCliente} from '../../../../../../../model/cartao-cliente.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogExcluirComponent} from '../../../../../blocos/dialog/dialog-excluir/dialog-excluir.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-tabela-cartoes',
  templateUrl: './tabela-cartoes.component.html',
  styleUrls: ['./tabela-cartoes.component.css']
})
export class TabelaCartoesComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'numero', 'bandeira', 'opc'];
  cartoes: CartaoCliente[] = [];
  selectCard;

  // tslint:disable-next-line:variable-name
  constructor(private cartaoClienteService: CartaoClienteService, public dialog: MatDialog, private authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.buscarCartoes();
  }

  buscarCartoes() {
    this.cartaoClienteService.buscarCartoes(this.authService.getUser().id).subscribe(
      (data) => {
        this.cartoes = data;
        console.log(this.cartoes);
      },
      (error) => {
        console.log(error);
        // this.showSnackBar('Nenhum cartão encontrado!!!', 'orange-snackbar');
      }
    );
  }

  openDialogDelete(cardId) {
    const dialogRef = this.dialog.open(DialogExcluirComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCard(cardId);
      }
    });
  }


  deleteCard(cardId) {
    this.selectCard = cardId;
    this.cartaoClienteService.deleteCard(cardId).subscribe(
      (data) => {
        console.log(data);
        this.showSnackBar('Cartão excluído com sucesso!!!', 'blue-snackbar');
        this.selectCard = 0;
        this.buscarCartoes();
      },
      (error) => {
        if (error.status === 404) {
          this.showSnackBar('Cartão não encontrado!!!', 'orange-snackbar');
        } else {
          this.showSnackBar('Ocorreu um erro!!!', 'orange-snackbar');
        }
        this.selectCard = 0;
      }
    );
  }

  showSnackBar(mensagem, cor) {
    this._snackBar.open(mensagem, '', {
        duration: 3000,
        panelClass: [cor]
      }
    );
  }
}
