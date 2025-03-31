
class LoggerService {

    log(message:string):void{
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }
}

class UserService{

    constructor(private logger:LoggerService){}

    createUser(name:string,age:number):void{
        this.logger.log(`User created: ${name}, Age: ${age}`);
    }
}

const logger = new LoggerService();
const userService = new UserService(logger);

userService.createUser("alex",34);
