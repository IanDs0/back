import {
  ArrayMinSize,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Cliente } from '../entities/cliente.entity';

import { CreatePessoaDto } from 'src/model/pessoa/dto/create-pessoa.dto';

export class CreateClienteDto extends Cliente {
  @IsNotEmpty({ message: 'CNPJ é obrigatório' })
  cnpj: string;

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'Data de fundação é obrigatória' })
  @IsDateString()
  data_de_fundacao: Date | string;

  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  tipo: boolean;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Endereço ID é obrigatório' })
  enderecoId: string;

  @IsNotEmpty({ message: 'Pessoa é obrigatória' })
  @ArrayMinSize(1, { message: 'Pelo mennos uma pessoa é obrigatória' })
  @ValidateNested({ each: true })
  @Type(() => CreatePessoaDto)
  pessoa: CreatePessoaDto[];
}
