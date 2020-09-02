import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PrestadorService} from '../../../../../../services/prestador.service';
import {ValidateBrService} from 'angular-validate-br';
import {PrestadorDTO} from '../../../../../../model/prestador-dto.module';
import {TelefonePrestador} from '../../../../../../model/telefone-prestador.module';
import {Operadora} from '../../../../../../model/operadora.module';
import {Md5} from 'ts-md5';
import {OrigemCadastro} from '../../../../../../model/origem-cadastro.module';
import {TipoPessoa} from '../../../../../../model/tipo-pessoa.module';
import {NivelFormacao} from '../../../../../../model/nivel-formacao.module';
import {Profissao} from '../../../../../../model/profissao.module';
import {NgxSpinnerService} from 'ngx-spinner';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  profissional: FormGroup;
  outraProfissao = false;
  formacoes: NivelFormacao[] = [];
  profissoes: Profissao[] = [];
  showAtendimento = false;
  msgError = '';


  constructor(private prestadorService: PrestadorService,
              private fb: FormBuilder,
              private validateBrService: ValidateBrService,
              private spinner: NgxSpinnerService, private router: Router) {

    this.profissional = fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(5)]],
        apelido: [''],
        cpf: ['', [Validators.required, this.validateBrService.cpf]],
        nascimento: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        celular: ['', [Validators.required, Validators.minLength(14)]],
        telefone: [''],
        domicilio: [false],
        naoDomicilio: [false],
        escolaridade: ['', [Validators.required]],
        profissoes: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(5)]],
        confirmaSenha: ['', [Validators.required, Validators.minLength(5)]],
        termos: ['', [Validators.required]],
      }, {validator: this.checkPasswords}
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.prestadorService.getFormacao().subscribe(
      (data) => {
        console.log(data);
        this.formacoes = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.prestadorService.getProfissoes().subscribe(
      (data) => {
        console.log(data);
        this.profissoes = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }


  checkPasswords(group: FormGroup) {
    const pass = group.controls.senha.value;
    const confirmPass = group.controls.confirmaSenha.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  cadastrarCliente() {
    const prestador = new PrestadorDTO();
    // StepUm
    prestador.nome = this.profissional.controls.nome.value;
    prestador.cpf = this.profissional.controls.cpf.value;
    // prestador.dataNascimento = this.profissional.controls.nascimento.value;
    prestador.dataNascimento = moment(this.profissional.controls.nascimento.value, 'DD/MM/yyyy').format();
    prestador.sexo = Number(this.profissional.controls.sexo.value);
    prestador.email = this.profissional.controls.email.value;
    if (this.profissional.controls.apelido.value !== '') {
      prestador.apelido = this.profissional.controls.apelido.value;
    } else {
      prestador.apelido = null;
    }

    // Lista de telefones
    const telefone: TelefonePrestador[] = [];
    telefone.push(new TelefonePrestador(this.profissional.controls.celular.value, new Operadora(1)));
    if (this.profissional.controls.telefone.value !== '') {
      telefone.push(new TelefonePrestador(this.profissional.controls.telefone.value, new Operadora(1)));
    }
    prestador.telefonePrestadores = telefone;

    // StepDois
    prestador.atendeDomicilio = this.profissional.controls.domicilio.value;
    prestador.naoAtendeDomicilio = this.profissional.controls.naoDomicilio.value;
    prestador.nivelFormacao = new NivelFormacao(Number(this.profissional.controls.escolaridade.value));

    prestador.senha = new Md5().appendStr(this.profissional.controls.senha.value).end();
    prestador.codigoPerfil = 4;
    // Origem Cadastro
    prestador.origemCadastro = new OrigemCadastro(1);
    // TipoPessoa
    prestador.tipoPessoa = new TipoPessoa(1);

    prestador.profissaoPrestador = this.profissional.controls.profissoes.value;

    // tslint:disable-next-line:no-console
    console.info(prestador);
    console.log(JSON.stringify(prestador));
    this.spinner.show();
    this.prestadorService.savePrestador(prestador).subscribe(
      (data) => {
        this.spinner.hide();
        console.log(data);
        this.router.navigateByUrl(`/bem-vindo/profissional`);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.status === 422) {
          console.log('validadacao');
          this.showError(error.error.errors, true);
        } else if (error.status === 400) {
          console.log('validadacao 400');
          this.showError(error.error.mensagem, false);
        } else {
          console.log('Interno');
          this.showError('Ocorreu um erro interno', false);
        }

        window.scrollTo(0, 0);
      }
    );
  }

  checkData() {
    this.router.navigateByUrl(`/bem-vindo/profissional`);
    // const moment1 = moment(this.profissional.controls.nascimento.value);
    const data = moment(this.profissional.controls.nascimento.value, 'DD/MM/yyyy').format();
    // 1995-09-15T15:17:55.249-00:00
    console.log(data);
    // const isoDate = new Date(this.profissional.controls.nascimento.value).toISOString();
    // alert(isoDate);
    // console.log(isoDate);
  }

  validCheckBox() {
    return !(this.profissional.controls.termos.value === true);
  }

  showError(errors, varios: boolean) {
    if (varios) {
      let itemsList = ``;
      errors.map((item) => {
        itemsList += `<li class="color-red">${item.message}</li>`;
      });
      this.msgError = `<ul>${itemsList}</ul>`;
    } else {
      this.msgError = errors;
    }
  }
}
