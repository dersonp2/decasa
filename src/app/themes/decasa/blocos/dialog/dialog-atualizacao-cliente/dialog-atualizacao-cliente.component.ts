import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../../../../services/cliente.service';
import {AuthService} from '../../../../../services/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-atualizacao-cliente',
  templateUrl: './dialog-atualizacao-cliente.component.html',
  styleUrls: ['./dialog-atualizacao-cliente.component.css']
})
export class DialogAtualizacaoClienteComponent implements OnInit {
  cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  cpf;

  constructor(private clienteService: ClienteService, private authService: AuthService, public dialogRef: MatDialogRef<DialogAtualizacaoClienteComponent>) {
  }

  ngOnInit(): void {
  }

  saveCpf() {
    this.clienteService.updateCpf(this.authService.getUser().id, this.cpf).subscribe(
      (data) => {
        console.log(data);
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
