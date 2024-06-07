// src/module//contact/contact.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";
import { ContactRepository } from "./contact.repository";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactRepository)
    private readonly contactRepository: ContactRepository
  ) {}

  async identify(email?: string, phoneNumber?: string): Promise<any> {
    const contacts = await this.contactRepository.find({
      where: [{ email }, { phoneNumber }],
    });

    if (contacts.length === 0) {
      // No existing contact, create a new primary contact
      const newContact = this.contactRepository.create({ email, phoneNumber });
      await this.contactRepository.save(newContact);
      return {
        contact: {
          primaryContatctId: newContact.id,
          emails: email ? [email] : [],
          phoneNumbers: phoneNumber ? [phoneNumber] : [],
          secondaryContactIds: [],
        },
      };
    }

    // Existing contacts found, process them
    let primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary');
    if (!primaryContact) {
      primaryContact = contacts[0];
      primaryContact.linkPrecedence = 'primary';
      await this.contactRepository.save(primaryContact);
    }

    const secondaryContacts = contacts.filter(contact => contact.id !== primaryContact.id);

    // Update secondary contacts if new information is provided
    if (!secondaryContacts.find(contact => contact.email === email && contact.phoneNumber === phoneNumber)) {
      const newSecondaryContact = this.contactRepository.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary',
      });
      await this.contactRepository.save(newSecondaryContact);
      secondaryContacts.push(newSecondaryContact);
    }

    return {
      contact: {
        primaryContatctId: primaryContact.id,
        emails: [primaryContact.email, ...secondaryContacts.map(contact => contact.email).filter(Boolean)],
        phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map(contact => contact.phoneNumber).filter(Boolean)],
        secondaryContactIds: secondaryContacts.map(contact => contact.id),
      },
    };
  }
}
