import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Pessoa } from '../entities/pessoa.entity';

import { Cliente } from 'src/model/cliente/entities/cliente.entity';

export class CreatePessoaDto extends Pessoa {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @IsDateString()
  data_de_nascimento: Date | string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  email: string;

  @IsOptional()
  @IsArray({ message: 'Cliente deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => Cliente)
  cliente?: Cliente[];
}
