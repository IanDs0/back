import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}

  create(createPessoaDto: CreatePessoaDto) {
    return this.prisma.pessoa.create({
      data: createPessoaDto,
      include: {
        cliente: {
          select: {
            id: true,
            cnpj: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.pessoa.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pessoa.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        telefone: true,
        cliente: {
          select: {
            id: true,
            cnpj: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  update(id: string, updatePessoaDto: UpdatePessoaDto) {
    return this.prisma.pessoa.update({
      where: {
        id,
      },
      data: updatePessoaDto,
    });
  }

  remove(id: string) {
    return this.prisma.pessoa.delete({
      where: {
        id,
      },
    });
  }
}
