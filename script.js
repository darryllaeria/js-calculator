/*
Uses the IIEF (Immediately Invoked Function Expression) structure
http://benalman.com/news/2010/11/immediately-invoked-function-expression/

(function () {
    "use strict";
    
})();
*/

(function () {
    "use strict";
    
    // Function to get elements
    var getElement = function (element) {
        if (element.charAt(0) === "#") { // Denotes that an ID is passed in, singular element
            return document.querySelector(element);
        } else { // Denotes a list of items are passed in, a list of items with class=??
            return document.querySelectorAll(element);
        }
    };
    
    // Variable declaration
    var viewer = getElement("#viewer"),     // Calculator display
        equal = getElement("#equal"),       // Equal button
        clear = getElement("#clear"),       // Clear button
        nums = getElement(".btnNum"),       // Number buttons list
        arithOp = getElement(".btnArith"),  // Arithmetic buttons list
        currentNum = "",                    // Current number
        firstNum = "",                      // First input number
        resultNum = "",                     // Final result
        operator,
        maxLength = 15,                     // Maximum length of output on viewer
        dataNumAttr = "data-num",           // Attribute of number button
        dataOpsAttr = "data-ops",           // Attribute of arithmetic ops button
        dataResultAttr = "data-result";     // Attribute of equal button
    
    
    // When number button is clicked, get current number input
    var getNumOnClick = function () {
        if (resultNum !== "") { // Reset number if result is already shown
            currentNum = this.getAttribute(dataNumAttr);
            resultNum = "";
        } else if (currentNum.length < maxLength) { // Add input digit to previous number, as string
            var inputNum = this.getAttribute(dataNumAttr);
            var containsNegative = currentNum.includes("-", 0);

            if (containsNegative && inputNum == "-") {
                currentNum = currentNum.replace("-", ""); // If negative character exist, and negative button is clicked, negative character removed
            } else if (!containsNegative && inputNum == "-") {
                currentNum = "-" + currentNum; // Check if input is from negative button, append to first
            } else {
                currentNum += inputNum;
            }
        }

        // Output current number
        viewer.innerHTML = currentNum;
    };
    
    // Assign click event to number buttons
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = getNumOnClick;
    }
    
    
    // When arithmetic operator button is clicked, store it as first value
    var setNumOnOpsClick = function () {
        if(currentNum !== "") {
            firstNum = currentNum;
            currentNum = "";
        }
        
        arithOp = this.getAttribute(dataOpsAttr);
        //alert(arithOp);
        equal.setAttribute(dataResultAttr, "");
    };
    
    // Assign click event to arithmetic operator buttons
    for(var i = 0, l = arithOp.length; i < l; i++) {
        arithOp[i].onclick = setNumOnOpsClick;
    }
    
    
    // When equal button is clicked, display final result
    var dispResultOnClick = function () {
        
        // Convert string input to numbers
        firstNum = parseFloat(firstNum);
        currentNum = parseFloat(currentNum);
        
        // Perform arithmetic operation
        switch (arithOp) {
            case "plus": 
                resultNum = firstNum + currentNum;
                break;
            case "minus": 
                resultNum = firstNum - currentNum;
                break;
            case "times": 
                resultNum = firstNum * currentNum;
                break;
            case "divide":
                resultNum = firstNum / currentNum;
                break;
            default:
                resultNum = currentNum;
                // If equal is clicked with no operator, keep number and continue
        }
        
        // Check if result is infinite
        if(!isFinite(resultNum)) {
            resultNum = "0";
        }
        
        // Output result to viewer
        viewer.innerHTML = resultNum.toString().substr(0, maxLength);
        equal.setAttribute(dataResultAttr, resultNum);
        
        // Reset first number and store result
        arithOp = "";
        firstNum = 0;
        currentNum = resultNum;

    };
    
    // Assign click event to equal button
    equal.onclick = dispResultOnClick;

    
    // When Clear button is clicked, reset values
    var clearAll = function () {
        firstNum = "";
        currentNum = "";
        arithOp = "";
        viewer.innerHTML = "###############";
        setTimeout(
            function() { 
                viewer.innerHTML = "0"; 
            }, 
            200
        );
        equal.setAttribute(dataResultAttr, resultNum);
    };
    
    // Assign click event to clear button
    clear.onclick = clearAll;
    
})();
            
// Reference base code & modified: https://codepen.io/giana/pen/GJMBEv