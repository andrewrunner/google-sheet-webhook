import { DataSource, Repository } from "typeorm";
import { Row } from "./entities/row.entity";
import { Injectable } from "@nestjs/common";
import { EditedRowDto } from "./dto/edited-row.dto";


@Injectable()
export class RowsRepository extends Repository<Row> {

    constructor(private dataSource: DataSource) {
        super(Row, dataSource.createEntityManager());
    }


    async getRows () {
        return this.find();
    }

    async getRow(id:number) {
        return this.find({
            where: {
                id
            }
        });
    } 

    async createRow(dto:EditedRowDto) {
        return this.insert({
            timestamp: dto.timestamp,
            orderId: dto.data.orderId,
            customer: dto.data.customer,
            orderDate: dto.data.orderDate,
            status: dto.data.status,
        })
    }

    async getRowsCount() {
        return this.count
    }
}