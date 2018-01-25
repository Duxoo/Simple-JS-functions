/*

FUNCTIONS FOR STRINGS

*/

//first letter of the string to uppercase
function ucFirst(str) {
 
    if (!str) return str;

  alert(str[0].toUpperCase() + str.slice(1));
}

//check string for spam(words viagra and xxx with any case)
function checkSpam(str) {
    str = str.toLowerCase();
    var check=false;
    var spam = str.indexOf('viagra');
    var spam2 = str.indexOf('xxx');
    if(spam!=-1 || spam2!=-1) {
        check = true;
        alert(check);
    }
    else alert(check);
}
//cut the string with adding '...' to the end if it has lenght more than argument maxlength
function truncate(str,maxlength) {
if(str.length > maxlength)
    {
        alert(str.substring(0,16)+"...")
    }
  else alert(str);  
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
var array = [1,2,3,4,5,6];
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