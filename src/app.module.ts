import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from 'src/module/contact/contact.entity';
import { ContactModule } from 'src/module/contact/contact.module';
import { ContactRepository } from './module/contact/contact.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cpdjiqlds78s73ejl6r0-a',
      port: 5432,
      username: 'admin',
      password: '23Q1sxP2ESLtMgW5T860bBioRxxenhg9',
      database: 'bitespeed_7ltd',
      entities: [Contact, ContactRepository],
      synchronize: true,
    }),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
