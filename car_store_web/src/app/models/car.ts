class Car{
    id: number;
    name: string;
    year: number;
    color: string;
    price: number;
    saleDate: Date;
    constructor(id: number, name: string, year: number, color: string, price: number, saleDate: Date){
        this.id = id;
        this.name = name;
        this.year = year;
        this.color = color;
        this.price = price;
        this.saleDate = saleDate;
    }
}
export {Car};
