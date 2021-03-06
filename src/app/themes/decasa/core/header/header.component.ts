import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  btnContratar = true;
  isDisplay = true;
  href = '';
  displayTemplate = false;
  navBarServico = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (isPlatformBrowser) {
      this.router.events
        .subscribe(() => {
          this.href = this.router.routerState.snapshot.url;
          console.log('Rota' + this.href);
          this.displayBtnContratar();
          document.body.classList.add('overflow-page');
          this.pages();
        });
    }
    // console.log('Nav horizontal');
    // this.href = this.router.url;
    // console.log('Rota' + this.href);
    // this.displayBtnContratar();

    // Retirar a barra de rolagem
    document.body.classList.add('overflow-page');
  }

  ngOnDestroy() {
    // Colocar a barra de rolagem
    this.removeOverflowHidden();
  }

  removeOverflowHidden() {
    document.body.classList.remove('overflow-page');
  }

  displayBtnContratar() {
    if (this.href === '/pagamento') {
      this.btnContratar = false;
    } else {
      this.btnContratar = true;
    }
  }

  // Ir para próxima tela
  // goTo(stepper: MatStepper) {
  //   switch (this.href) {
  //     case '/orcamento':
  //       this.router.navigate(['/quantidade']);
  //       stepper.next();
  //       break;
  //     case '/quantidade':
  //       this.router.navigate(['/proposta']);
  //       stepper.next();
  //       break;
  //     case '/proposta':
  //       this.router.navigate(['/pagamento']);
  //       stepper.next();
  //       break;
  //   }
  // }

  pages() {
    console.log('page ' + this.href);
    if (this.href === '/orcamento' || this.href === '/quantidade' || this.href === '/proposta' || this.href === '/pagamento' || this.href === '/escolher' || this.href === '/agendados' || this.href === '/andamento' || this.href === '/finalizados' || this.href === '/dados-pessoais' || this.href === '/senha' || this.href === '/dados-cadastrais' || this.href === '/outros-membros' || this.href === '/endereco' || this.href === '/meios-de-pagamento' || this.href === '/boletos-notas') {
      this.displayTemplate = false;
    } else {
      this.displayTemplate = true;
      this.removeOverflowHidden();
    }
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }
}
