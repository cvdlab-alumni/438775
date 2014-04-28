/**
what happens hear, answer
the function grets print Hello! when is it call.
and call the functin greets when an argument is found that cause to print hello for every (void) argument
**/

function greets () {
 console.log('Hello!');
 greets = function () {
   console.log('Bye!');
   return greets;
 };
 return greets;
}

greets();

greets()();

greets()()();