var accumulator = 0;
var previousOp = "none"; //Last operation button that was hit on the calculator
var previousFunc = "none"; //Last function in the script that was run

function getNumber(x) {
    //is run when user hits a number button, x is the value of the number
    var current = $("#current").html(); //is whatever is on the screen at the moment the function is run
    if (previousFunc != "getNumber" && previousFunc != "getPoint") {
        //1st case: it's the first time user's hitting a button or they've just hit an operation button, the screen displays x
        $("#current").html(x);
    } else if (current === "0") {
        //2nd case: to avoid zeros on the left, if screen is 0 screen should display x
        $("#current").html(x);
    } else {
        //In other cases x should be added at the end of what's on the screen
        $("#current").html(current+x); 
    } 
    previousFunc = "getNumber";
}

function getPoint() {
    //is run when user hits point button
    var current = $("#current").html();
    if (current.indexOf(".") == -1 && previousFunc == "getNumber") {
        //check that there is no point already in the number and that the user was inputing a number, 
        //point is added at the end of what's on the screen
        $("#current").html(current+".");        
    } else if (previousFunc != "getPoint" && previousFunc != "getNumber") {
        //if the user wasn't inputing a number and didn't just input a point, the screen displays 0.
        $("#current").html("0.");
    }
    previousFunc = "getPoint";
}

function clearEntry() {
    //runs when user hits CE
    if (previousFunc == "getNumber" || previousFunc == "getPoint") {
       //if the user was entering a number, clear the screen 
       $("#current").html(0);
       previousFunc = "clearEntry"; 
    } else if (previousFunc == "equal") {
        //if the user just hit equal, CE works as AC
        allClear();
    }
}

function allClear() {
    //runs when user hits AC
    //clears screen, accumulator and previousOp
    $("#current").html(0);
    accumulator = 0;
    previousOp = "none";
    previousFunc = "allClear";
}

function operation(y) {
    //runs when user hits +, -, x or /, y is the name of the operation
    if (previousFunc == "getNumber" || previousFunc == "getPoint" || previousFunc == "equal") {
        //if the user was just inputing number or just hit equal and wants to keep operating on the accumulator
        if (previousOp == "none") {
            //if this was the first operation the accumulator will equal the current number
            accumulator= Number($("#current").html());
        } else {
            //if an operation was hit before, runOperation with that previousOp as a parameter
            runOperation(previousOp);
        }
        previousOp = y;
        $("#current").html(accumulator); //display the accumulator on the screen
    } else if (previousFunc == "operation" || previousFunc == "clearEntry") {
        //in case the user hits an operation button twice or more times, the program will keep the last operation chosen
        //in case user hit CE wanting to rectify the operation as well, we'll keep the last operation
        previousOp = y;
    }
    previousFunc = "operation";
}

function runOperation(z) {
    //modifies accumulator by performing previousOp on it and what's currently on the screen
    switch (z) {
        case "add":
           accumulator += Number($("#current").html());
           break;
        case "substract":
            accumulator -= Number($("#current").html());
            break;
        case "multiply":
            accumulator *= Number($("#current").html());
            break;
        case "divide":
            accumulator /= Number($("#current").html());
    }
}

function equal() {
    var current = $("#current").html();
    if (previousFunc != "operation") {
        //equal will not do anything if user just hit an operation button, as the accumulator is already in display
        runOperation(previousOp); //run the last operation
        if (accumulator === 0 && current != 0) {
            //if the user hadn't inputed any operation but there is currently something on the screen
            $("#current").html(Number(current)); //Number(current) in case current is something like 2.0, equal sets it to 2
        } else {
            //in the other cases the creen displays the accumulator
            $("#current").html(accumulator);
        }
    }
    previousFunc = "equal";
    previousOp = "none"; 
}
