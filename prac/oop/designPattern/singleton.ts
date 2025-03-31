
class Logger{
    private static instance:Logger;
    public static logCounter:number = 0;
    public static getInstance():Logger{
        if(!Logger.instance){
            Logger.instance = new Logger();
            Logger.logCounter++;
        }
        return Logger.instance;
    }

    public log(message:string):void{
        console.log(`Log: ${message}`);
    }
}
class Singleton{//used for database connections, logging, etc.
    private static instance:Singleton;
    private constructor(){
        Logger.getInstance().log("Singleton instance created!");
    }

    public static getInstance():Singleton{
        if(!Singleton.instance){
            this.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public showMessage():void{
        Logger.getInstance().log("Hello from Singleton class!");
    }
}

// const singleton1 = Singleton.getInstance();
// const singleton2 = Singleton.getInstance(); // No new instance created, same instance returned
// if(singleton1 === singleton2){
//     console.log("Both instances are the same");
// }
// singleton1.showMessage(); // Hello from Singleton class!

//example for mongodb connection
class MongoDbConnection{
    private static instance:MongoDbConnection;
   static connectionCounter:number = 0;
    private constructor(){
        Logger.getInstance().log("Mongo db connected!");
       
    }

    public static getInstance():MongoDbConnection{
        if(!MongoDbConnection.instance){
            this.instance = new MongoDbConnection();
            MongoDbConnection.connectionCounter++;
        }
        return MongoDbConnection.instance;
    }
}

const mongo1 = MongoDbConnection.getInstance();
const mongo2 = MongoDbConnection.getInstance(); // No new instance created, same instance returnedi
Logger.getInstance().log(`MongoDbConnection instances created: ${MongoDbConnection.connectionCounter}`); // 1
console.log(Logger.logCounter); // 1

//for logging

