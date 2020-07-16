import {MatDialog} from '@angular/material/dialog';
import {DialogCartaoComponent} from '../../../../../blocos/dialog/dialog-cartao/dialog-cartao.component';
import {CartaoCliente} from '../../../../../../../model/cartao-cliente.module';
import {CartaoClienteService} from '../../../../../../../services/cartao-cliente.service';
import {AuthService} from '../../../../../../../services/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {CreditCardValidators} from 'angular-cc-library';
import {Orcamento} from '../../../../../../../model/orcamento.module';
import {PrestadorOrcamento} from '../../../../../../../model/prestador-orcamento.module';
import {Cliente} from '../../../../../../../model/cliente.module';
import {OrcamentoService} from '../../../../../../../services/orcamento.service';
import {Pagamento} from '../../../../../../../model/pagamento.module';
import {Financeira} from '../../../../../../../model/financeira.module';
import {FormaPagamento} from '../../../../../../../model/forma-pagamento.module';
import {PagamentoService} from '../../../../../../../services/pagamento.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {EnderecoCliente} from '../../../../../../../model/endereco-cliente.module';
import {EnderecoService} from '../../../../../../../services/endereco.service';


@Component({
  selector: 'app-nav-pagamento',
  templateUrl: './nav-pagamento.component.html',
  styleUrls: ['./nav-pagamento.component.css']
})
export class NavPagamentoComponent implements OnInit {

  form: FormGroup;
  cartao: CartaoCliente = new CartaoCliente();
  orcamento: Orcamento = new Orcamento();
  cvc = null;
  visiblePagar = true;

  // tslint:disable-next-line:variable-name
  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar,
              private cartaoClienteService: CartaoClienteService, public dialog: MatDialog, private router: Router,
              private orcamentoService: OrcamentoService, private pagamentoService: PagamentoService, private enderecoService: EnderecoService) {
  }

  ngOnInit() {
    // this.form = this.fb.group(
    //   {
    //     cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    //   });
    if (this.authService.check()) {
      this.getCartaoPrincipal();
      this.getOrcamento();
    }
  }

  getCartaoPrincipal() {
    this.cartaoClienteService.buscarCartaoPrincipal(this.authService.getUser().id).subscribe(
      (data) => {
        this.cartao = data;
      },
      (error) => {
        this.openModal();
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogCartaoComponent, {
      width: '50%',
      data: {cartao: this.cartao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.cartao = result;
      }
    });
  }

  getExistAddress() {
    console.log('Entrou no getExistaddress');
    let endereco: EnderecoCliente = null;
    if (localStorage.hasOwnProperty('enderecoCliente')) {
      endereco = JSON.parse(atob(localStorage.getItem('enderecoCliente')));
      endereco.clienteId = this.authService.getUser().id;
      if (endereco.id == null) {
        this.enderecoService.getExisteEnderecoCliente(endereco).subscribe(
          (data) => {
            this.orcamento.enderecoCliente = data;
            console.log('Endereco salvo');
            console.log(data);
            localStorage.setItem('orcamento', btoa(JSON.stringify(this.orcamento)));
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getOrcamento() {
    // TODO: criptografar
    if (localStorage.getItem('orcamento')) {
      this.orcamento = JSON.parse(atob(localStorage.getItem('orcamento')));
    }
    if (this.authService.check()) {
      this.orcamento.cliente = new Cliente(this.authService.getUser().id);
      this.orcamento.origemWeb = true;
      console.log('orcamento ---');
      // tslint:disable-next-line:no-console
      console.info(this.orcamento);

      console.log(this.orcamento.enderecoCliente.id);
      if (this.orcamento.enderecoCliente.id == null) {
        this.getExistAddress();
      }
      localStorage.setItem('orcamento', btoa(JSON.stringify(this.orcamento)));
    }
  }

  saveOrcamento() {
    this.visiblePagar = false;
    console.log(JSON.stringify(this.orcamento));
    console.log(this.orcamento);
    // if (this.orcamento.id == null) {
    //   this.orcamentoService.salvarOrcamento(this.orcamento).subscribe(
    //     (data) => {
    //       console.log(data);
    //       if (data.id === 200) {
    //         this.orcamento = data.orcamento;
    //         console.log('Salvou Orcamento' + this.orcamento);
    //         localStorage.setItem('orcamento', btoa(JSON.stringify(this.orcamento)));
    //         this.savepayment();
    //       }
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.showSnackBar('Erro ao cadastrar orçamento!!!', 'orange-snackbar');
    //       this.visiblePagar = true;
    //     }
    //   );
    // } else {
    //   this.savepayment();
    // }
  }

  savepayment() {
    console.log(this.cvc);
    const pagamento: Pagamento = new Pagamento();
    this.cartao.codigoSegurancaCartao = Number(this.cvc);
    // Orcamento
    pagamento.orcamento = this.orcamento;
    pagamento.cartaoCliente = this.cartao;
    pagamento.formaPagamento = new FormaPagamento(1);
    pagamento.numeroParcela = 1;
    // TODO: mudar o valor para this.orcamento.valor
    pagamento.valorParcela = 1;
    pagamento.financeira = new Financeira(2);
    console.log(JSON.stringify(pagamento));

    this.pagamentoService.savePay(pagamento).subscribe(
      (data) => {
        if (data.id === 200) {
          console.log('Salvou Cartao' + data);
          localStorage.removeItem('orcamento');
          localStorage.removeItem('servicosSelecionados');
          this.showSnackBar('Pagamento Realizado com sucesso!!!', 'blue-snackbar');
          this.router.navigate(['/escolher']);
        } else {
          this.visiblePagar = true;
          this.showSnackBar('Erro ao realizar o pagamento!', 'orange-snackbar');
        }
      },
      (error) => {
        console.log(error);
        this.visiblePagar = true;
        this.showSnackBar('Erro ao realizar o pagamento!', 'orange-snackbar');
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
