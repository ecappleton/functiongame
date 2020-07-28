var numInputs; //This keeps track of how many inputs have been entered
var myFunction; //The current mystery function

function init () {
    // function to initialize the game
    numInputs = 0;
}

init();

//Class of linear functions. Constructor takes slope and intercept.
class linearFunction {
 constructor (slope, intercept) {
     this.slope = slope;
     this.intercept = intercept;
 }
 
 funcOut (funcIn) {
    return this.slope*funcIn + this.intercept;
 } 
};

/* 
We need a function that creates a random linear function ... I want to call it something like level 1. Maybe either a slope or an intercept. Some ideas:
    First decide whether it's going to be a multiplying function or an adding function... use randomness to decide.
    If it's a multiplying function, pick a whole number between 2 and 10 and set the slope equal to that and the intercept equal to zero.
    If it's an adding function, pick an integer between -10 and 10 (but not zero) and set the intercept equal to that and the slope to zero. (Or maybe do include zero as a possibility... that's still a function.)

Level 2 can be two-step function. Oooh... and we could have a rule that is first add and then multiply.. how will we distinguish between them? 

Level 3 can allow fractions and/or division. (Have to think about how to return the output... fraction or decimal.)

Level 4 can be quadratic functions... maybe one level for quadratic coefficient equaling 1 and one level for it being not equal to 1. 

We need a function that takes an input and gives an output. (I think we already have that.)

We need a function that tells us if our guess is right.

We need a user interface!

*/

function randLinFunc(){  //Generates a random linear function
    var signSlope; //The sign of the slope
    var signInt; //The sign of the y-intercept

    if (Math.random()<0.75){  //assigns a positive slope with a probability of .75 and a negative slope with a probability of .25. It's also possible that the number generated for randSlope will be zero and unaffected by signSlope. 
        signSlope = 1;
    } else {
        signSlope = -1;
    }

    if (Math.random()<0.5){
        signInt = 1;
    } else {
        signInt = -1;
    }

    var randSlope = signSlope*Math.floor(6*Math.random()); //produces slopes of -5 through 5.
    var randInt = signInt*Math.floor(10*Math.random());
    myFunction = new linearFunction(randSlope,randInt);

    document.getElementById("currFunc").innerHTML = 'y = ' + myFunction.slope + 'x + ' + myFunction.intercept; //Displays the function to the web page. We'll get rid of this later.

}

randLinFunc();

function goButtonFunction(){

    // We are getting the input and assigning it to the variable 'input'
    var input;
    input = document.getElementById("input1").value;

    // Check to make sure a number has been entered in the text box
    if (isNaN(input) || input === ''){

        // Clear input field
       
        document.getElementById("input1").value = null;
    
    } else {

   
    // Increment the number of inputs (numInputs)
    numInputs++
    
    
    // Calculate the output and transfer the input and output to the table
    document.getElementById('tableIn-' + numInputs).textContent = input;
    document.getElementById('tableOut-' + numInputs).textContent = myFunction.funcOut(input);

    // Add a new row to the table
    var newRow = document.createElement('div');
    newRow.setAttribute('class', 'Row');

    var newInputCell = document.createElement("div");
    newInputCell.setAttribute('id', 'tableIn-' + (numInputs + 1));
    newInputCell.setAttribute('class', 'Cell');

    var newOutputCell = document.createElement("div")
    newOutputCell.setAttribute('id', 'tableOut-' + (numInputs + 1));
    newOutputCell.setAttribute('class', 'Cell');

    newRow.appendChild(newInputCell);
    newRow.appendChild(newOutputCell);
    document.getElementById('inOutTable').appendChild(newRow)

    
    // Clear input field
       
    document.getElementById("input1").value = null;
    
} // end else statement
}

document.getElementById('goButton').addEventListener('click', goButtonFunction);

// Get the input field
var enterKey = document.getElementById("input1");

// Execute a function when the user releases a key on the keyboard
enterKey.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) goButtonFunction();
});

// Functionality for the "I know the rule!" button - Hide phase 1 table, hide the input box and go button, show phase 2 table, fill the table with 5 rando inputs, show 'check my answers' button, show 'I want to go back and try more inputs' button, show new instructions

function knowRuleBtnFn () {
  
    document.getElementById('inOutTable').setAttribute('style','display:none');
    document.getElementById('topStuff').setAttribute('style','display:none');
    document.querySelector('.TablePhaseTwo').setAttribute('style','display:table');
    document.getElementById('knowRule').setAttribute('style', 'display:none');


    var inputArray = [];

    for (var i = 1; i < 6; i++){
        
        //pick a random integer between 0 and 20
        var randInput = Math.floor(20*Math.random()); 

        //check if we already have the random integer
        while(inputArray.includes(randInput)){
            randInput = Math.floor(20*Math.random());
        } //end while
        
        //add it to the array and put it in the table
        inputArray[i-1] = randInput; 
        document.getElementById('testTableIn-' + i).textContent = randInput;
        
    } // end for loop
}// end knowRuleBtnFn

document.getElementById('knowRule').addEventListener('click', knowRuleBtnFn);