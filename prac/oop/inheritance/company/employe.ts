

class Employee{
    protected employeDetails:{name:string,salary:string,age:number};  

    constructor(
        employeDetails:{name:string,salary:string,age:number}
    ){
        this.employeDetails = employeDetails;
    }
    
}

export default Employee;