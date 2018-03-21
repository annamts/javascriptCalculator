/*
Screen limit
*/

var accumulator = 0;
var previousOp = "none";
var previousFunc = "none";

function getNumber(x) {
    var current = $("#current").html();
    if (previousFunc != "getNumber" && previousFunc != "getPoint") {
        $("#current").html(x);
    } else if (current === "0") {
        $("#current").html(x);
    } else {
        $("#current").html(current+x); 
    } 
    previousFunc = "getNumber";
}

function getPoint() {
    var current = $("#current").html();
    if (previousFunc == "getNumber") {
        $("#current").html(current+"."); 
    } else if (previousFunc != "getPoint") {
        $("#current").html("0.");
    }
    previousFunc = "getPoint";
}

function clearEntry() {
    if (previousFunc == "getNumber" || previousFunc == "getPoint") {
       $("#current").html(0);
       previousFunc = "clearEntry"; 
    }
}

function allClear() {
    $("#current").html(0);
    accumulator = 0;
    previousOp = "none";
    previousFunc = "allClear";
}

function operation(y) {
    if (previousFunc == "getNumber" || previousFunc == "getPoint" || previousFunc == "equal") {
        if (previousOp == "none") {
            accumulator= Number($("#current").html());
        } else {
            runOperation(previousOp);
        }
        previousOp = y;
        $("#current").html(accumulator);
    } else if (previousFunc == "operation" || previousFunc == "clearEntry") {
        previousOp = y;
    }
    previousFunc = "operation";
}

function runOperation(z) {
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
        runOperation(previousOp);
        if (accumulator === 0 && current != 0) {
            $("#current").html(current);
        } else {
            $("#current").html(accumulator);
        }
        previousFunc = "equal";
    }
    previousOp = "none"; 
}
