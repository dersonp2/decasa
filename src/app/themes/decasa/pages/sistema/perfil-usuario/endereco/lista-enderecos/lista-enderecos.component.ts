import {DialogServicosComponent} from '../../../../../blocos/dialog/dialog-servicos/dialog-servicos.component';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EnderecoCliente} from '../../../../../../../model/endereco-cliente.module';
import {EnderecoService} from '../../../../../../../services/endereco.service';
import {AuthService} from '../../../../../../../services/auth.service';

@Component({
  selector: 'app-lista-enderecos',
  templateUrl: './lista-enderecos.component.html',
  styleUrls: ['./lista-enderecos.component.css']
})
export class ListaEnderecosComponent implements OnInit {

  enderecosCliente: EnderecoCliente[] = [];
  edit = false;
  @Input() displayForm;
  @Output() editOutput = new EventEmitter<EnderecoCliente>();

  constructor(public dialog: MatDialog, private enderecoService: EnderecoService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllAddress();
  }

  openDialogServicos(enderecoId) {
    this.dialog.open(DialogServicosComponent, {
      width: '70%',
      data: {client: this.authService.getUser().id, address: enderecoId}
    });
  }

  getAllAddress() {
    this.enderecoService.getAddressClientId(this.authService.getUser().id).subscribe(
      (data) => {
        this.enderecosCliente = data;
        console.log(data);
      }
    );
  }

  editAddress(enderecoCliente) {
    this.editOutput.emit(enderecoCliente);
  }
}
