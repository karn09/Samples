/*
// Dynamic Prototype Function
// Encapsulates Prototype and Constructor Pattern

//Constructor pattern
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

// Check if Prototype needs to be initialized
    if (typeof this.sayName != "function") {
        Person.prototype.sayName = function () {
            alert(this.name);
        }
    }
};

var friend = new Person("Nicholas", 29, "Software Engineer");
var friend2 = new Person("Greg", 27, "Doctor");

friend.sayName();

*/
//========================================================
// Constructor and Prototype Pattern combined
// If both are not combined, then if constructor contains an array (reference value), any changes are reflected in any new constructions
// not as secure as a durable constructor pattern

/*

function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"]; //ref value array
}

Person.prototype = {
    constructor: Person,
    sayName : function () {
        alert(this.name);
    }
};
// declare new objects
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van")
alert(person1.friends); // Shelby, Court, Van
alert(person2.friends); //Shelby, Court
*/
//==============================================================


// Durable Constructor Pattern
// Used in secure environment, instance methods on created object don't refer to THIS and constructor not called using NEW
/*
function Person(name, age, job){
    //create object to return
    var o = new Object();
    // optional, define private variables/functions here
    //attach methods
    o.sayName = function(){
        alert(name);
    };
    //return object
    return o;
}

var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName();
*/
//=======================================================================


// Inheritance - Prototype Chain pattern

function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//Inherit from SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function(){
    return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true


