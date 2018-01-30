/*

FUNCTIONS FOR STRINGS

*/

//first letter of the string to uppercase
function ucFirst(str) {
 
    if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

//check string for spam(words viagra and xxx with any case)
function checkSpam(str) {
    str = str.toLowerCase();
    var check=false;
    var spam = str.indexOf('viagra');
    var spam2 = str.indexOf('xxx');
    if(spam!=-1 || spam2!=-1)
        check = true;
        return check;
    return check;
}
//cut the string with adding '...' to the end if it has lenght more than argument maxlength
function truncate(str,maxlength) {
if(str.length > maxlength)
        return str.substring(0, 16) + "..."
  return (str);  
}
/*

FUNCTIONS FOR OBJECTS

*/

//Is object empty?returns true if object is empty
function isEmpty(obj) {
    for(var key in obj) {    
        return false;
    }
    return true;
}

//Sum of values of every name in object
function salaries(obj) {
    var result=0;
    for(var key in obj)
        result+=obj[key];
    return result;
}

//Max value in object 
function maxValue(obj) {
    var max=0;
    for(var key in obj) {
        if(obj[key] > max) max = obj[key];
    }
     return max;   
}

/*

FUNCTIONS FOR ARRAYS

*/

//random from min to max
function random(min,max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

//returns random value from array
function randomValueInArray(array)
{
    return array[random(0,array.length -1 )];
}

//returns last element from array
function lastElement(arr) {
    return arr[arr.length - 1];
}

//returns the index of value in array if value exists and 0 if not
function findValueInArray(array, value) {
    for(var i=0; i < array.length - 1 ; i++) {
        if(array[i] === value) return i;
    }
    return -1;
}

//return an array that has values that are between a and b
function filterRange(arr,a,b) {
    var array = [];
    for(var i=0; i < arr.length; i++) {
        if((a <= arr[i] && arr[i]<= b) || (a >= arr[i] && arr[i] >= b)) array.push(arr[i]); 
            
    }
    return array;  
}

//adding a new string to the existed one if it doen't have additional string
function addClass(obj,string) {
    if(obj.className.indexOf(string) !== -1) return 0;
    return obj.className = obj.className + ' ' + string;
}

//camelise string with '-' example: 'border-width' = 'BorderWidth'
var string = 'border-width';
function camelise(str) {
    var array = str.split('-');
    for(var i = 0; i < array.length; i++) {
         array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return array.join('');
}

//delete from array values that are <a and >b
function filterRangeInPlace(array, a, b) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] < a || array[i] > b) array.splice(i--, 1);
    }
    return array;
}
//function for method sort() for sorting array in reverse order
function sortReverse(a, b) {
    if(a > b) return -1;
    if(a < b) return 1;
}

//function for method sort() for sorting array
function sorting(a, b) {
    if(a > b) return 1;
    if(a < b) return -1;
}
 //function for method sort() to 'shake'(random) the array
function sortRandom(a, b) {
    return Math.random() - 0.5;
}  

//list
var list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
//function to print list with cycle
function printList(list) {
    var tmp = list;
    while(tmp) {
        alert(tmp.value);
        tmp = tmp.next;
    }
}

//function to print list with recursion
function printListRecursion(list) {
    var tmp = list;
    if(tmp)
        {
            alert(tmp.value);
            return printListRecursion(tmp.next);
        }
}

//function to print reverse list
function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert( list.value );
}

//returns length of each element in array 
function lengtOfhArrayElemnt(arr) {
    var valuesLength = arr.map(function(name) {
        return name.length;
    });
    return valuesLength;
}

//function to check if functions has arguments
function firstArgumentExist(a) {
    if(arguments.length > 0) return true;
    return false;
}

//returns the sum of arguments
function ArgumentsSum() {
    var result = 0;
    for(var i = 0; i < arguments.length; i++)
        result += arguments[i]
    return result;
}

//returns a sum of 2 elements. using Closure
function sum(a) {
    return function sum2(b) {
        return a + b;
    }
}

//function make buffer that makes buffer with clear method
function makeBuffer() {
    var resultStr = '';
    
    function buf(str) {
        if(arguments.length == 0) return resultStr;
        resultStr += str;
    };
    buf.clear = function () {
        resultStr = '';
    }
    return buf;
};

//sort in object
function byField(str) {
    function sort(a,b) {
        return a[str] > b[str] ? 1 : -1;
        
    }
    return sort;
}

//function that filter array using function for filter as argument 
function filter(arr, func) {
    var arr2 = [];//create new array for not editing the existing one
    for (var i = 0; i<arr.length; i++) {
        var tmp = arr[i];
        if(func(tmp))//if function returns true
            arr2.push(tmp);//push arr[i] to new array
    }
    return arr2;
}

//function for filter to filter array between a and b
function inBetween(a,b) {
    return function(x)
    {
        return x >= a && x <= b;
    };
}

//+ and * with 2 variables using this in object
var calculator = {
    a : 0,
    b: 0,
    read : function() {
        this.a = prompt('a?',0);
        this.b = prompt('b?',0);
    },
    sum : function() {
        alert(+this.a + +this.b);
    },
    mul : function(a,b ) {
        alert(+this.a * +this.b);
}
};

//function constructor calculator
function Calculator() {
    var a = 0;
    var b = 0;
    this.read = function() {
        this.a = +prompt('a?',0);
        this.b = +prompt('b?',0);
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };
}
var calculator1 = new Calculator();

//function constructor that add an entered value to a
function Accumulator(a) {
    this.value = a;
    this.read = function() {
        this.b = +prompt('How many will we add?',0);
        return this.value += this.b;
    };
}

var accumulator = new Accumulator(1);

//function constructor that can add math methods and that take as argument string straight like ('1 + 2') and count
function Calculator2() {
    var methods = {
      '-': function(a, b) {
        return a - b;
    },
      '+': function(a, b) {
          return a + b;
      }
    };
    this.calculate = function(str) {
    var split = str.split(' ');
        return methods[split[1]](+split[0],+split[2]);
    };
    this.addMethod = function(method,func) {
        methods[method] = func;
    };
}
var calc = new Calculator2();
calc.calculate('1 + 2');
//example of adding method multiply to function constructor Calculator2
calc.addMethod('*', function(a, b) {
    return (a * b);
});
//example of adding method pow to function constructor Calculator2
calc.addMethod('^', function(a, b) {
    return Math.pow(a, b);
});
