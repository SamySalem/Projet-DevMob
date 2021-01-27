export class List {

    id: string;
    name: string;
    
    constructor (name: string){
        this.name = name;
        this.id = Math.random().toString(36).substr(2, 8);
    }

}
