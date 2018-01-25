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