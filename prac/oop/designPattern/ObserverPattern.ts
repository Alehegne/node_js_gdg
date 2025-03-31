/** 
 * 🔹 The Observer pattern allows multiple objects (subscribers) to react to changes in another object (publisher).
🔹 It's useful for event-driven architectures, such as UI event listeners, notifications, or real-time updates.
 * 
 */


//example : Notification system
interface Observer{
    update:()=>void
}

class User implements Observer{
    constructor(public name:string){}
    update(message:any):void{
        console.log(`${this.name} you have a new message: ${message}`);
    }

}

class NotificationSystem{
    private users:Observer[] = [];
     addUser(user:Observer):void{
        this.users.push(user);
    }
    removeUser(user:Observer):void{
        this.users.filter((u) => u !== user);
    }
    notify(message:any):void{
        this.users.forEach((user)=>user.update(message));
    }
}

const notificationSystem = new NotificationSystem();
notificationSystem.addUser(new User("Alice"));
notificationSystem.addUser(new User("beya"));

notificationSystem.notify("New message received!"); // Observer received message: New message received!