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
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato', 'Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato', 'Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato', 'Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  formacoes: NivelFormacao[] = [];
  profissoes: Profissao[] = [];
  showAtendimento = false;


  constructor(private prestadorService: PrestadorService,
              private fb: FormBuilder,
              private validateBrService: ValidateBrService,
              private spinner: NgxSpinnerService) {

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
    prestador.dataNascimento = this.profissional.controls.nascimento.value;
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
    prestador.nivelFormacao = this.profissional.controls.escolaridade.value;

    prestador.senha = new Md5().appendStr(this.profissional.controls.senha.value).end();
    prestador.codigoPerfil = 4;
    // Origem Cadastro
    prestador.origemCadastro = new OrigemCadastro(1);
    // TipoPessoa
    prestador.tipoPessoa = new TipoPessoa(1);
  }

  validCheckBox() {
    return !(this.profissional.controls.termos.value === true);
  }
}
