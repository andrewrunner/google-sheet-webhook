

export interface EditedRowDto {
    timestamp: string,
    editedRow: number,
    data: {
        orderId: number,
        customer: string,
        orderDate: string,
        status: string,
    } 
}