var accumulator = 0;
var previousOp = "none"; //Last operation button that was hit on the calculator
var previousFunc = "none"; //Last function in the script that was run

function getNumber(x) {
    //is run when user hits a number button, x is the value of the number
    var current = getRidOfCommas($("#current").html()); //is whatever is on the screen at the moment the function is run
    var html = "";
    if (previousFunc != "getNumber" && previousFunc != "getPoint") {
        //1st case: it's the first time user's hitting a button or they've just hit an operation button, the screen displays x
        html = x;
    } else if (current === "0") {
        //2nd case: to avoid zeros on the left, if screen is 0 screen should display x
        html = x;
    } else {
        //In other cases x should be added at the end of what's on the screen
        html = current+x; 
    }
    $("#current").html(addCommas(html));
    previousFunc = "getNumber";
}

function getPoint() {
    //is run when user hits point button
    var current = getRidOfCommas($("#current").html());
    var html = "";
    if (current.indexOf(".") == -1 && previousFunc == "getNumber") {
        //check that there is no point already in the number and that the user was inputing a number, 
        //point is added at the end of what's on the screen
        html = current+".";        
    } else if (previousFunc != "getPoint" && previousFunc != "getNumber") {
        //if the user wasn't inputing a number and didn't just input a point, the screen displays 0.
        html = "0.";
    }
    $("#current").html(addCommas(html));
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
            accumulator= Number(getRidOfCommas($("#current").html()));
        } else {
            //if an operation was hit before, runOperation with that previousOp as a parameter
            runOperation(previousOp);
        }
        previousOp = y;
        $("#current").html(addCommas(accumulator)); //display the accumulator on the screen
    } else if (previousFunc == "operation" || previousFunc == "clearEntry") {
        //in case the user hits an operation button twice or more times, the program will keep the last operation chosen
        //in case user hit CE wanting to rectify the operation as well, we'll keep the last operation
        previousOp = y;
    }
    previousFunc = "operation";
}

function runOperation(z) {
    //modifies accumulator by performing previousOp on it and what's currently on the screen
    var current = Number(getRidOfCommas($("#current").html()));
    switch (z) {
        case "+":
           accumulator += current;
           break;
        case "-":
            accumulator -= current;
            break;
        case "*":
            accumulator *= current;
            break;
        case "/":
            accumulator /= current;
    }
}

function equal() {
    var current = getRidOfCommas(document.getElementById("current"));
    if (previousFunc != "operation") {
        //equal will not do anything if user just hit an operation button, as the accumulator is already in display
        if (previousOp == "none" && current != 0) {
            //if the user hadn't inputed any operation but there is currently something on the screen
            $("#current").html(addCommas(Number(current))); //Number(current) in case current is something like 2.0, equal sets it to 2
        } else {
            //in the other cases, run the last operation and display the accumulator
            runOperation(previousOp);
            console.log(accumulator);
            //$("#current").html(accumulator);
            document.getElementById("current").innerHTML = addCommas(accumulator);
        }
    }
    previousFunc = "equal";
    previousOp = "none"; 
}

window.addEventListener('keydown', function(event) {
/*
Bugs: AC no funciona quan canvies de clicar amb el botó al teclat??
*/
    switch (event.key) {
        case "/":
        case "*":
        case "+":
        case "-":
            event.preventDefault();
            operation(event.key);
            break;
        case ".":
            event.preventDefault();
            getPoint();
            break;
        default:
            $("#" + event.key).click(); 
    }
});


function addCommas (a) {
    a = a.toString();
    var result = "";
    if (a.indexOf(".") !== -1) {
        result = a.substring(a.indexOf("."));
        a = a.substring(0, a.indexOf("."));
    }
    var i = a.length - 3
    result = a.substring(i) + result;
    for (i; i > 0; i -= 3) {
        result = a.substring (i-3, i) + "," + result;
    }
    return result;
}

function getRidOfCommas (b) {
    b = b.toString();
    while (b.indexOf(",") !== -1) {
        var i = b.indexOf(",");
        b = b.substring(0, i)+b.substring(i+1);
    }
    return b;
}