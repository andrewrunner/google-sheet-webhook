import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { NotifyEmail } from "./entities/notify-email.entity";


@Injectable()
export class NotifyEmailRepository extends Repository<NotifyEmail> {

    constructor(private dataSource: DataSource) {
        super(NotifyEmail, dataSource.createEntityManager());
    }

    async getEmails () {
        return this.find();
    }

    async addEmail(emailAddress:string) {
        return this.insert({
            email: emailAddress
        })
    }
}