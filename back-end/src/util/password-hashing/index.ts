import * as bcrypt from 'bcrypt';
import { SALT } from 'src/environments';

const  generateHash = async (password:string) : Promise<string>=> {
    return await bcrypt.hash(password, SALT);
}

const  validateHash = async (password:string, hash:string) : Promise<boolean>=> {
    return await bcrypt.compare(password, hash);
}


export{
    generateHash,
    validateHash
}