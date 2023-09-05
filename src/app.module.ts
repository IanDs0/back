import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './model/pessoa/pessoa.module';
import { ClienteModule } from './model/cliente/cliente.module';

@Module({
  imports: [PessoaModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
