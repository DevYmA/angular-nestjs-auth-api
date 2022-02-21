export class User {

    email: string

    firstName: string

    lastName: string

    password: string

    constructor(partial: Partial<User>){
        if(partial){
            Object.assign(this,partial)
        }
    }
}
