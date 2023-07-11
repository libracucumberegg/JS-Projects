var text = "<h3>Your Order has been placed!</h3>"
text += "<p>Your order number is: " + (Date.now() / 3).toFixed(0) + "</p>" // remove decimal places
text += "<p>Thank you for your order!</p>"

var runningTotal = 0;
var sizePrice = 0;
var size = "Not Specified"; // if different when printing code works

function getReceipt() {
    var sizeArray = document.getElementsByClassName("size");
    for (var i = 0; i < sizeArray.length; i++) { // this is a comment explaining why i need this
        if (sizeArray[i].checked) {
            size = sizeArray[i].value;
            text += "<p>Size: " + sizeArray[i].value + "</p>";
            runningTotal += 5.99 + ((i * 2) + (i > 0 ? 2 : 0)); // add $2 if not personal and you shouldn't get a personal pizza because it's some of the worst value. I have yet to see a personal pizza from any place that wasn't 90% dough I mean it's for 1 person I think I can handle more than 2 tiddlywinks of pepperoni ON MY CRUSTY BREAD
            sizePrice = runningTotal;
        }
    }

    console.log('$' + runningTotal); // make sure math is mathing
    getToppings(); // do all the important stuff
}

function getToppings() {
    var toppingArray = document.getElementsByClassName("topping");
    checkedArray = []; // array for topping list
    text += "<p>Toppings:</p>";
    var toppingPrice = 0;
    var toppingAmount = 0;
    for (var i = 0; i < toppingArray.length; i++) {
        if (toppingArray[i].checked) {
            checkedArray.push(toppingArray[i].value); // push to checkedArray for topping list
            toppingPrice += 0.79;
            toppingAmount++;
            runningTotal += 0.79; // add to 2 variables for later
        }
    }

    // topping list
    for (var i = 0; i < checkedArray.length; i++) {
        text += "<p> &bullet; &nbsp;" + checkedArray[i] + "</p>";
    }

    console.log('$' + runningTotal);
    var pst = parseFloat((runningTotal * 0.07).toFixed(2));
    console.log(pst);
    var gst = parseFloat((runningTotal * 0.05).toFixed(2));
    console.log(gst);
    runningTotal += pst + gst;
    runningTotal = runningTotal.toFixed(2);
    // fun fact, the maximum order total is $23.47 without taxes which I think is actually an amazing price because this is obviously like a local place's website and their pizza is always amazing.
    console.log(parseFloat(runningTotal));
    var text1 = "<p>" + size + ": $" + sizePrice + "</p>"
    text1 += "<p>" + toppingAmount + " toppings &times; $0.79 = $" + humanizeMoney(toppingPrice) + "</p>"; // humanize if they're insane enough to add 9 toppings to a pizza
    text1 += "<p>PST: $" + humanizeMoney(pst) + "</p>";
    text1 += "<p>GST: $" + humanizeMoney(gst) + "</p>";
    text1 += "<p>+ ━━━━━━━━━━━━━━</p>";
    text1 += '<h3>Total: <strong>$' + humanizeMoney(runningTotal) + '</strong></h3>'; // humanize in case taxes made the number 1 decimal place
    document.getElementById("showText").innerHTML = text; // update showText with pizza information
    document.getElementById("totalPrice").innerHTML = text1; // update totalPrice with order information
}

// add decimal places to prevent whole numbers and decimals that don't go to the hundredths place
function humanizeMoney(num) {
    var humanized = num.toString();
    while (num.toString().length < 4) {
        switch (num.toString().length) {
            case 1:
                humanized += ".";
                break;
            case 2: // when can we do instanceof in a switch statement in java :(
            case 3:
                humanized += "0";
                break;
        }
    }

    return humanized;
}