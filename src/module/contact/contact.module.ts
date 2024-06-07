import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactRepository } from "./contact.repository";
import { Contact } from "./contact.entity";

@Module({ 
    imports: [TypeOrmModule.forFeature([Contact])],
    controllers: [ContactController],
    providers: [ContactService, ContactRepository],
})
export class ContactModule {}