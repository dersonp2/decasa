import {Municipio} from '../../../../model/municipio.module';
import {ListaGruposComponent} from './lista-grupos/lista-grupos.component';
import {DialogLocalizacaoComponent} from '../../blocos/dialog/dialog-localizacao/dialog-localizacao.component';
import {MatDialog} from '@angular/material/dialog';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PopoverContentComponent} from 'ngx-smart-popover';
import {MunicipioService} from '../../../../services/municipio.service';
import {AuthService} from '../../../../services/auth.service';
import {NavCarrinhoComponent} from '../../blocos/nav/nav-carrinho/nav-carrinho.component';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  municipio: Municipio;
  isDisplay = true;
  clickuser = false;
  exibirMenu = false;
  badgeContent: number;

  @ViewChild(ListaGruposComponent) listaGrupos: ListaGruposComponent;
  @ViewChild(NavCarrinhoComponent) navCarrinho: NavCarrinhoComponent;
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
    this.badgeCarrinho();
  }

  badgeCarrinho() {
    if (localStorage.hasOwnProperty('servicosSelecionados')) {
      const servicos: [] = JSON.parse(localStorage.getItem('servicosSelecionados'));
      this.badgeContent = servicos.length;
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
    this.clickuser = !this.clickuser;
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

  clickUser() {
    this.clickuser = !this.clickuser;
    if (!this.authService.check()) {
      this.isDisplay = !this.isDisplay;
      this.popoverPerfil.hide();
    } else {
      if (this.clickuser) {
        this.popoverPerfil.hide();
      } else {
        this.popoverPerfil.show();
      }
    }
  }

  showUser() {
    if (!this.authService.check()) {
      // this.toggleDisplay();
      console.log('é para mostrar');
      this.isDisplay = false;
      this.popoverPerfil.hide();
    } else {
      this.popoverPerfil.show();
    }
  }

  hiddenUser() {
    if (!this.authService.check() && this.clickuser === false) {
      // this.toggleDisplay();
      console.log('é para esconder');
      this.isDisplay = true;
      // this.popoverPerfil.hide();
    } else if (this.authService.check() && this.clickuser === false) {
      this.popoverPerfil.hide();
    }
  }

  abrirCarrinho() {
    this.navCarrinho.exibirMenu = true;
  }
}
