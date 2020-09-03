import { ProfissionalComponent } from './themes/decasa/pages/sistema/cadastro/profissional/profissional.component';
import { IndexComponent } from './themes/decasa/pages/index/index.component';
import { BoletosNotasComponent } from './themes/decasa/pages/sistema/boletos-notas/boletos-notas.component';
import { MeioDePagamentoComponent } from './themes/decasa/pages/sistema/perfil-usuario/meio-de-pagamento/meio-de-pagamento.component';
import { EnderecoComponent } from './themes/decasa/pages/sistema/perfil-usuario/endereco/endereco.component';
import { OutrosMembrosComponent } from './themes/decasa/pages/sistema/perfil-usuario/empresa/outros-membros/outros-membros.component';
import { DadosPessoaisComponent } from './themes/decasa/pages/sistema/perfil-usuario/meu-perfil/dados-pessoais/dados-pessoais.component';
import { AndamentoComponent } from './themes/decasa/pages/sistema/servicos/andamento/andamento.component';
import { FinalizadosComponent } from './themes/decasa/pages/sistema/servicos/finalizados/finalizados.component';
import { AgendadoComponent } from './themes/decasa/pages/sistema/servicos/agendado/agendado.component';
import { SenhaComponent } from './themes/decasa/pages/sistema/perfil-usuario/meu-perfil/senha/senha.component';

import { PageTestComponent } from './themes/decasa/pages/page-test/page-test.component';
import { PagamentoComponent } from './themes/decasa/pages/sistema/comprar-servicos/pagamento/pagamento.component';
import { PropostaComponent } from './themes/decasa/pages/sistema/comprar-servicos/proposta/proposta.component';
import { QuantidadeComponent } from './themes/decasa/pages/sistema/comprar-servicos/quantidade/quantidade.component';
import { NotFoundComponent } from './themes/decasa/pages/not-found/not-found.component';
import { NgModule } from '@angular/core';

import { OrcamentoComponent } from './themes/decasa/pages/sistema/comprar-servicos/orcamento/orcamento.component';
import { RouterModule, Routes } from '@angular/router';
import { SelecionarFornecedorComponent } from './themes/decasa/pages/sistema/servicos/selecionar-fornecedor/selecionar-fornecedor.component';
import { DadosCadastraisComponent } from './themes/decasa/pages/sistema/perfil-usuario/empresa/dados-cadastrais/dados-cadastrais.component';
import { ClienteComponent } from './themes/decasa/pages/sistema/cadastro/cliente/cliente.component';
import { BemVindoComponent } from './themes/decasa/pages/sistema/cadastro/profissional/bem-vindo/bem-vindo.component';
import {ManutencaoComponent} from './themes/decasa/pages/manutencao/manutencao.component';
import {TermosComponent} from './themes/decasa/pages/sistema/cadastro/termos/termos.component';
import {PoliticasComponent} from './themes/decasa/pages/sistema/cadastro/politicas/politicas.component';

const appRoutes: Routes = [
  { path: 'home', component: IndexComponent },
  { path: '', component: IndexComponent },
  { path: 'criar-conta/cliente', component: ClienteComponent },
  { path: 'criar-conta/profissional', component: ProfissionalComponent },
  { path: 'criar-conta/termos', component: TermosComponent },
  { path: 'criar-conta/politicas', component: PoliticasComponent },
  { path: 'bem-vindo/profissional', component: BemVindoComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'quantidade', component: QuantidadeComponent },
  { path: 'proposta', component: PropostaComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'escolher', component: SelecionarFornecedorComponent },
  { path: 'agendados', component: AgendadoComponent },
  { path: 'andamento', component: AndamentoComponent },
  { path: 'finalizados', component: FinalizadosComponent },
  { path: 'dados-pessoais', component: DadosPessoaisComponent },
  { path: 'senha', component: SenhaComponent },
  { path: 'dados-cadastrais', component: DadosCadastraisComponent },
  { path: 'outros-membros', component: OutrosMembrosComponent  },
  { path: 'endereco', component: EnderecoComponent  },
  { path: 'meios-de-pagamento', component: MeioDePagamentoComponent},
  { path: 'boletos-notas', component: BoletosNotasComponent},
  { path: 'teste', component: PageTestComponent },
  { path: 'manutencao', component: ManutencaoComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
