import { Municipio } from './../../../../../model/municipio.module';
import { UfService } from './../../../../../services/uf.service';
import { Uf } from './../../../../../model/uf.module';
import { MunicipioService } from './../../../../../services/municipio.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-dialog-localizacao',
  templateUrl: './dialog-localizacao.component.html',
  styleUrls: ['./dialog-localizacao.component.css']
})
export class DialogLocalizacaoComponent implements OnInit {

  municipio: Municipio;
  estados: Uf[];

  municipios: Municipio[];

  constructor(public dialogRef: MatDialogRef<DialogLocalizacaoComponent>, private municipioService: MunicipioService, private ufService: UfService, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    // this.getEstados();
    this.getMunicipiosUf(10);
  }

  // this.municipios = data;
  getMunicipiosUf(idUf: number) {
    console.log('Id do uf' + idUf);
    this.municipioService.buscarMunicipiosUfAtivos(idUf).subscribe(
      (data) => { (this.municipios = data); },
    );
  }
  getEstados() {
    this.ufService.getAllUf().subscribe(
      (data) => { (this.estados = data); }
    );
  }

  close(): void {
    this.dialogRef.close({ data: false });
  }

  selecionar(): void {
    this.dialogRef.close({ data: this.municipio });
    localStorage.setItem('municipioId', this.municipio.id.toString());
  }

}
