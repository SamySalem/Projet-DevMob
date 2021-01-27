export class Todo {

    id: string;
    name: string;
    description: string;
    isDone: boolean;

    constructor(name: string, description: string){

        this.id = Math.random().toString(36).substr(2, 8);
        this.name = name;
        this.description = description;
        this.isDone = false;

    }
    
}
