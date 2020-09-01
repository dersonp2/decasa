import {OrigemCadastro} from './origem-cadastro.module';
import {NivelFormacao} from './nivel-formacao.module';
import {TelefonePrestador} from './telefone-prestador.module';
import {ProfissaoPrestador} from './profissao-prestador.module';
import {TipoPessoa} from './tipo-pessoa.module';


export class PrestadorDTO {
    atendeDomicilio: boolean;
    naoAtendeDomicilio: boolean;
    nome: string;
    email: string;
    dataNascimento: Date;
    senha: string | Int32Array;
    apelido: string;
    sexo: number;
    cpf: string;
    token: string;
    codigoPerfil: number;
    origemCadastro: OrigemCadastro;
    nivelFormacao: NivelFormacao;
    tipoPessoa: TipoPessoa;
    telefonePrestadores: TelefonePrestador[];
    telefones?: TelefonePrestador[];
    profissaoPrestador: ProfissaoPrestador[];
    logadouro: string;
    numero: string;
    bairro: string;
    cep: string;
    nomeMunicipio: string;
    pontoReferencia: string;
}
