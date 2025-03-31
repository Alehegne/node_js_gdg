//factory pattern

class User{
    public name:string;
    public age:number;
    public role:string;
    constructor(name:string,age:number,role:string = "user"){
        this.name = name;
        this.age = age;
        this.role = role;
        }
}

class UserFactory{

    static createUser(name:string,age:number):User{
        return new User(name,age,"user");
    }
    static createAdmin(name:string,age:number):User{
        return new User(name,age,"admin");
    }
}

const user = UserFactory.createUser("alex",25);
const admin = UserFactory.createAdmin("john",30);
console.log(user); // User { name: 'alex', age: 25, role: 'user' }
console.log(admin); // User { name: 'john', age: 30, role: 'admin' }