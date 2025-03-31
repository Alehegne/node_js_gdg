import Employee from "./employe";


class Developer extends Employee{
    // Properties
    public programmingLanguages:string[];
    public frameworks:string[];
    public projects:string[];
    public experience:number;
    public certifications:string[];
    public role:string;



    constructor(employeeDetails:{name:string,age:number,salary:string},programmingLanguages:string[],frameworks:string[],projects:string[],experience:number,certifications:string[],role:string){
        super(employeeDetails);
        this.programmingLanguages = programmingLanguages;
        this.frameworks = frameworks;
        this.projects = projects;
        this.experience = experience;
        this.certifications = certifications;
        this.role = role;
    }

    //methods
    getDeveloperExperiance():number{
        return this.experience
    }
    getDeveloperProjects():string{
        return this.projects.join(", ");
    }
    consoleAllDetails():void{
        console.log(`Name: ${this.employeDetails.name}, Salary: ${this.employeDetails.salary}, Age: ${this.employeDetails.age}, Programming Languages: ${this.programmingLanguages.join(", ")}, Frameworks: ${this.frameworks.join(", ")}, Projects: ${this.projects.join(", ")}, Experience: ${this.experience}, Certifications: ${this.certifications.join(", ")}, Role: ${this.role}`);
    }

}

const dev = new Developer({name:"alex",salary:"1000",age:25},["JavaScript","Python"],["React","Node.js"],["Project1","Project2"],3,["AWS Certified Developer","Google Cloud Certified"],"Full Stack Developer")
console.log(dev.getDeveloperExperiance()); // 3
console.log(dev.getDeveloperProjects()); // Project1, Project2
dev.consoleAllDetails(); // Name: alex, Salary: 1000, Age: 25, Programming Languages: JavaScript, Python, Frameworks: React, Node.js, Projects: Project1, Project2, Experience: 3, Certifications: AWS Certified Developer, Google Cloud Certified, Role: Full Stack Developer
