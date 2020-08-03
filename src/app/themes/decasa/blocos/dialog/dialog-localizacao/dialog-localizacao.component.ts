import {Municipio} from '../../../../../model/municipio.module';
import {UfService} from '../../../../../services/uf.service';
import {Uf} from '../../../../../model/uf.module';
import {MunicipioService} from '../../../../../services/municipio.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';

export interface MuniciciosFixos {
  nome: string;
  id: number;
}


@Component({
  selector: 'app-dialog-localizacao',
  templateUrl: './dialog-localizacao.component.html',
  styleUrls: ['./dialog-localizacao.component.css']
})
export class DialogLocalizacaoComponent implements OnInit {

  municipiosFixo: MuniciciosFixos[] = [
    {nome: 'BARREIRINHAS', id: 21},
    {nome: 'PACO DO LUMIAR', id: 85},
    {nome: 'RAPOSA', id: 5559},
    {nome: 'SAO JOSE DE RIBAMAR', id: 112},
    {nome: 'SAO LUIS', id: 2}
  ];
  municipio: Municipio;
  estados: Uf[];

  municipios: Municipio[];

  constructor(public dialogRef: MatDialogRef<DialogLocalizacaoComponent>, private municipioService: MunicipioService, private ufService: UfService, @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
    // this.getEstados();
    // this.getMunicipiosUf(10);
  }

  // this.municipios = data;
  getMunicipiosUf(idUf: number) {
    console.log('Id do uf' + idUf);
    this.municipioService.buscarMunicipiosUfAtivos(idUf).subscribe(
      (data) => {
        (this.municipios = data);
      },
    );
  }

  getEstados() {
    this.ufService.getAllUf().subscribe(
      (data) => {
        (this.estados = data);
      }
    );
  }

  close(): void {
    this.dialogRef.close({data: false});
  }

  selecionar(): void {
    this.dialogRef.close({data: this.municipio});
    localStorage.setItem('municipioId', this.municipio.id.toString());
  }

  // TODO: alterar posteriormente para o banco
  getMunicipiosFixo() {

  }

}
