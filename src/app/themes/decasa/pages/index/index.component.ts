import {Municipio} from '../../../../model/municipio.module';
import {ListaGruposComponent} from './lista-grupos/lista-grupos.component';
import {DialogLocalizacaoComponent} from '../../blocos/dialog/dialog-localizacao/dialog-localizacao.component';
import {MatDialog} from '@angular/material/dialog';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PopoverContentComponent} from 'ngx-smart-popover';
import {MunicipioService} from '../../../../services/municipio.service';
import {AuthService} from '../../../../services/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  municipio: Municipio;
  isDisplay = true;
  @ViewChild(ListaGruposComponent) listaGrupos: ListaGruposComponent;

  @ViewChild('popoverLocation') popoverLocation: PopoverContentComponent;
  @ViewChild('popoverPerfil') popoverPerfil: PopoverContentComponent;

  // private gruposService: GruposService
  constructor(public dialog: MatDialog, private municipioService: MunicipioService, public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.showPopover();
  }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty('municipioId')) {
      this.municipioService.buscarMunicipioPorId(localStorage.getItem('municipioId')).subscribe((data) => {
        this.municipio = data;
      });
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogLocalizacaoComponent, {
      width: '50%',
    });
    this.hidePopover();

    dialogRef.afterClosed().subscribe(res => {
      console.log(res.data);
      this.municipio = res.data;    // Recebe o id do município.
      this.listaGrupos.getGruposClassesByMunicipio(this.municipio.id);
    });
  }


  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }

  hidePopover() {
    // console.log('FEchhhoouuu');
    this.popoverLocation.hide();
  }

  showPopover() {
    // console.log('Abriu');
    this.popoverLocation.show();
  }

  reciverFeedback(respostaFilho) {
    console.log('Foi emitido o evento e chegou no pai >>>> ', respostaFilho);
  }

  showUser() {
    if (!this.authService.check()) {
      this.toggleDisplay();
      console.log(this.authService.check());
      this.popoverPerfil.hide();
    }
  }
}
