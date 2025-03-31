


class MathUtils{

    static square(num:number):number
    {
        return num * num;
    }
    static cube(num:number):number{
        return num * num * num;
    }
    static squareRoot(num:number):number{
        return Math.sqrt(num);
    }
}

class User{
    public name:string;
    public age:number;
    public email:string;
    constructor(name,age,email){
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

//factory methods for creating objects
class UserFactory{
    static createUser(name:string,age:number,email:string):User{
        return new User(name,age,email);
    }
    static createAdmin(name:string,age:number,email:string):User{
        const admin = new User(name,age,email)
        admin.name = "Admin: " + name;
        return admin;
    }

    
}

const admin = UserFactory.createAdmin("alex",33,"@gmail.com");
console.log(admin);