// src/module/contact/contact.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactRepository extends Repository<Contact> {
    constructor (private datasource: DataSource){
        super(Contact, datasource.createEntityManager());
    }
  async findContacts(email?: string, phoneNumber?: string): Promise<Contact[]> {
    const query = this.createQueryBuilder('contact');

    if (email) {
      query.orWhere('contact.email = :email', { email });
    }

    if (phoneNumber) {
      query.orWhere('contact.phoneNumber = :phoneNumber', { phoneNumber });
    }

    return query.getMany();
  }
}
