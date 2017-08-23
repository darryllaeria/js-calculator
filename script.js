

// Get elements
function getElement(element) {
    if(element.charAt(0) === "#") { // If ID is passed
        return document.querySelector(element); // Return single element
    } else {
        return document.querySelectorAll(element); // Return node list
    }
}

// Get current number selected when number button is clicked
function setNumberOnClick(btnElement, currentNum, resultNum, viewer) {
    // If result displayed, reset number
    if(resultNum != "0") { 
        currentNum = btnElement.getAttribute("data-num");
        resultNum = "";
    } 
    //If not, add digit to previous number, which is a string
    else {
        currentNum += btnElement.getAttribute("data-num");
    }

    // Display current number
    //return viewer.innerHTML = currentNum;
    alert(currentNum);
}

(function () {
    "use strict";

    // Variables
    var viewer = getElement("#viewer"); // Calculator screen
    var equals = getElement("#btnEqual"); // Equal button
    var nums = getElement(".btnNum"); // List of numbers
    var arith = getElement(".btnArith"); // List of arithmetic operators
    var curNum = ""; // Current number
    var firstNum = ""; // First number
    var resultNum;
    var operator;

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNumberOnClick(this, curNum, resultNum, viewer);
    }
}
);

/*
function test() {
    document.getElementById("viewer").innerHTML = getElement(".btnNum");
}
*/
function test() {
    //alert(getElement(".btnNum:active").getAttribute("data-num"));
    //alert(document.getElementById("btn7").getAttribute("data-num"));
    //alert(getElement(".btnNum").getAttribute("data-num"));
    alert(getElement(".btnNum").length);
}