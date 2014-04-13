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
// ==============================================================


// Durable Constructor Pattern
// Used in secure environment, instance methods on created object don't refer to THIS and constructor not called using NEW
/*
function Person(name, age, job){
=======

function Person(name, age, job) {
    //create object to return
    var o = new Object();
    // optional, define private variables/functions here
    //attach methods
    o.sayName = function () {
        alert(name);
    };
    //return object
    return o;
}

var friend = Person("Nicholas", 29, "Software Engineer");
<<<<<<< HEAD
friend.sayName();
*/
//=======================================================================


// Inheritance - Prototype Chain pattern
/*
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

// New Method
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};
// override existing method
SubType.prototype.getSuperValue = function() {
    return false;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true // "false" after adding overriding existing method


alert(instance instanceof Object);      //true
alert(instance instanceof SuperType);   //true
alert(instance instanceof SubType);     //true
*/
// ==============================================================
// ==============================================================

// breaking prototype chain
/*
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

//Inherit from SuperType
SubType.prototype = new SuperType();

// add new method, overwritting previous line
// breaks prototype chain since now SubType.prototype is now creating an object literal. creates instance of Object instead of SuperType.

SubType.prototype = {
    getSubValue : function() {
        return this.subproperty;
    },

    someOtherMethod : function() {
        return false;
    }
};

var instance = new SubType();
alert(instance.getSuperValue());
*/


// Prototype chain showing issues of sharing same properties across all new instances
/*
function SuperType () {
    this.colors = ["red","blue","green"];
}

function SubType () {
}

// Inherit from SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); // ["red","blue","green"] + "black"

var instance2 = new SubType();
alert(instance2.colors); // ["red","blue","green","black"]
*/
// Cant push arguments into SuperType without affecting all object instances
// Constructor stealing is used to solve above inheritance problem
// using apply() and  call() to execute constructor on new objects
//
/*
function SuperType() {
    this.colors = ["red","blue","green"];
}

function SubType() {
    //inherit from SuperType
    SuperType.call(this); // using .call() or .apply() allows each instance to have own instance of .colors property
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); // ["red","blue","green"] + "black"

var instance2 = new SubType();

// constructor stealing will let you pas arguments into SuperType from within SubType

function SuperType(name) {
    this.name = name;
}

function SubType() {
    //inherit from SuperType passing in an argument
    SuperType.call(this, "Nicholas");

    //instance property
    this.age = 29;
}

var instance = new SubType();
alert(instance.name); // Nicholas
alert(instance.age); // 29
*/
/*
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    alert(this.name);
};

function SubType(name,age){
    //inherit properties from SuperType
    SuperType.call(this,name); //inherit name prop
    this.age = age; // add age prop
}

// inherits methods
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); // red blue green black
instance1.sayName(); // Nicholas
instance1.sayAge();
*/
// if instance2 is created, will hold all initialized values, plus properties as defined

//********************************************************************************************
//********************************************************************************************
//********************************************************************************************
//Prototypal Inheritance
// Using this pattern, any changes to properties are reflected across all new instances
/*
function object(o) {
    function F() {} // create temp constructor
    F.prototype = o; // assigns given object as constructor's prototype
    return new F(); // new instance of temporary type
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
alert(anotherPerson.friends);// Shelby, Court, Van, Rob

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(yetAnotherPerson.friends); // Shelby, Court, Van, Rob, Barbie
alert(person.friends); // Shelby, Court, Van, Rob, Barbie
*/
//ECMAScript5 adds Object.create() to formalize above concept of Prototypal Inheritance
/*
var person = {
    name: "Nicholas",
    friends: ["Greg","Court","Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends);

// Second way to implement prototypal inheritance is to use Object.defineProperties()
// seems more convoluted to define prototype inheritance this way
var person = {
    name: "Nicholas",
    friends: ["Greg","Court","Van"]
};

var anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    }
});
alert(anotherPerson.name); // Greg

*/

// Parasitic Combination Inheritance
// will call functions twice
// basic pattern -->
/*
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); // create object
    prototype.constructor = subType; // augment object
    subType.prototype = prototype; // assign object
}

function SuperType(name) {
    this.name = name;
    this.color = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
    alert(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    alert(this.age);
};
// ---> end basic pattern
// declare new properties in instance1/instance2
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29


var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

*/
