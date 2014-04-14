//function declaration format
/*
function functionName (arg0, arg1, arg2) {
    //func body
}

// example of function hoisting
sayHi() // Hi --> function accessible
function sayHi() { //function declared like this is loaded immediately
    alert("Hi");
}

sayHi(); // will throw error
var sayHi = function() { // anonymous / Lambda function
    alert("Hi");         // var must be called before function loaded
}
*/
// proper way to set conditional function (attach function to var sayHi)
/*
var sayHi;
var condition = false;
if(condition) {
    sayHi = function() {
        alert("Hi!");
    };
} else {
    sayHi = function() {
        alert("Yo!");
    };
}
sayHi();
*/
// createComparisonFunction returns an anonymous function using array args as inputs
/*
function createComparisonFunction (propertyName) {

    return function(object1, object2) {
        var value1 = object1 [propertyName];
        var value2 = object2 [propertyName];

        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];

data.sort(createComparisonFunction("name"));
alert(data[0].name);
*/

// recursive function - function calling itself by name
/*
function factorial (num) {
    if (num <=1) {
        return 1;
    } else {
        return num* arguments.callee(num-1); // by using arguments.callee, will allow function always to work, however not available in strict mode
    }
}

var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4));

// use named function expression does same as above
var factorial = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num-1);
    }
});


// compare function

function compare(value1, value2) {
    if (value1<value2) {
        return -1;
    } else if (value1>value2){
        return 1;
    } else {
        return 0;
    }
}
*/
/*
function createComparisonFunction (propertyName) {

    return function(object1, object2) {
        var value1 = object1 [propertyName];
        var value2 = object2 [propertyName];

        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
// create function
var compare = (createComparisonFunction("name"));
// call function
var result = (compare({name: "Nicholas"}, {name: "Greg"}));

*/
/*
var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc : function() {
        var that = this;
        return function() {
            return that.name;
        };
    }
};

alert(object.getNameFunc()());
*/

(function(){
    var now = new Date();
    if (now.getMonth() == 0 && now.getDate() == 1) {
        alert("Happy New Year!");
    }
}) ();
