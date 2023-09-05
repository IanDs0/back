import { Pessoa } from 'src/model/pessoa/entities/pessoa.entity';

export class Cliente {
  // id?: string;
  cnpj: string;
  nome: string;
  data_de_fundacao: string | Date;
  tipo: boolean;
  telefone: string;
  email: string;
  enderecoId: string;
  pessoa: Pessoa[];
  // pessoa?: Prisma.PessoaUncheckedCreateNestedManyWithoutClienteInput;
}
