import { Pessoa } from 'src/model/pessoa/entities/pessoa.entity';
import { Cliente } from '../entities/cliente.entity';

export class CreateClienteDto extends Cliente {
  constructor(data: {
    cnpj: string;
    nome: string;
    data_de_fundacao: Date | string;
    tipo: boolean;
    telefone: string;
    email: string;
    enderecoId: string;
    pessoa: Pessoa[];
  }) {
    super();
    this.cnpj = data.cnpj;
    this.nome = data.nome;
    this.data_de_fundacao = this.parseDate(data.data_de_fundacao);
    this.tipo = data.tipo;
    this.telefone = data.telefone;
    this.email = data.email;
    this.enderecoId = data.enderecoId;
    this.pessoa = this.parsePessoa(data.pessoa);
  }

  private parseDate(date: Date | string): Date {
    if (date instanceof Date) {
      return date;
    } else if (typeof date === 'string') {
      return new Date(date);
    } else {
      throw new Error('Data inválida');
    }
  }

  private parsePessoa(pessoa: Pessoa[]): Pessoa[] {
    if (pessoa.length < 1) {
      throw new Error('Tem que ter 1 ou mais Pessoas relacionadas');
    }
    return pessoa;
  }
}
