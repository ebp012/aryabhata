// Scientific Calculator
function tetOld(x,y) {
    if (y == 2) {
    return x ** y;
    }
    else if (y == 1) {return x;}
    else {
    var r = BigInt(x); // r = result of exponentiation
    for (var i=0n; i <= BigInt(y-2); i++) {
        r = BigInt(x ** r);
    }
    if (y == 0) {return 1;}
    return r;
    }
}
function tet(x, a, precision = 100) {
    x = math.complex(x);
    a = math.complex(a);

    // Handle base cases
    if (math.equal(a, 0)) return math.complex(1);
    if (math.equal(a, 1)) return x;

    // Use an approximation method:
    // f_{n+1}(x) = x^f_n(x), start with initial guess
    let z = math.complex(1); // initial guess

    for (let i = 0; i < precision; i++) {
    z = math.pow(x, z);
    if (!z.isFinite()) break;
    }

    // If a is integer, we can iterate normally
    if (math.isInteger(a.re) && a.im === 0 && a.re > 0) {
    let result = x;
    for (let i = 1; i < a.re; i++) {
        result = math.pow(x, result);
    }
    return result;
    }

    // For fractional/complex heights, return fixed point approximation
    return z;
}
function nrt(exp, num) {
    Math.pow(exp, 1/num);
}
function factorial (a) {
    var i = 1;
    while (i <= a) {
    r = BigInt(r * i); // Multiply result by the current iteration i
    i = BigInt(i + 1);           // Increment the iteration counter
    }
    return r;
}
var hyperMode = false; // Initially not in hyper mode
function toggleHyperMode () {
    hyperMode = !hyperMode;
    toggleHyperMode1();
    toggleHyperMode2();
}
function logBase (a, b) {
    return Math.log(y) / Math.log(x);
}
function triangle (a, d) {
    return acc = (a * (a + 1)) / 2;
}
function toggleHyperMode1() {
    var hyperButton = document.querySelector('.calb[value="⇧"]');
    if (hyperMode == true) {
        console.log("Hypermode is active")
        // Toggle the functionality of the buttons based on hyper mode
        var buttonsToUpdate = [
            { value: "^^", replacementValue: "ln", onclick: function() { appendText('ln('); } },
            { value: "^", replacementValue: "n√", onclick: function() { appendText('nthRoot('); } },
            { value: "1", replacementValue: "i", onclick: function() { document.calculator.ans.value+="sqrt(-1)";document.calculator.ansTwo.value+='i'; } },
            { value: "2", replacementValue: "²", onclick: function() { document.calculator.ans.value+="** 2";document.calculator.ansTwo.value+='²'; } },
            { value: "3", replacementValue: "³", onclick: function() { document.calculator.ans.value+="** 3";document.calculator.ansTwo.value+='³'; } },
            { value: "4", replacementValue: "ⁿ√", onclick: function() { document.calculator.ans.value+="nrt(";document.calculator.ansTwo.value+='nrt('; } },
            { value: "5", replacementValue: "√", onclick: function() { document.calculator.ans.value+="sqrt(";document.calculator.ansTwo.value+='√('; } },
            { value: "6", replacementValue: "∛", onclick: function() { appendText('cbrt('); } },
            { value: "7", replacementValue: "!", onclick: function() { appendText('!'); } },
            { value: "9", replacementValue: "ᵀ√", onclick: function() { appendText('ᵀ√', 'triangleRoot'); } },
            { value: "aⁿ", replacementValue: "Tₙ", onclick: function() { appendText('Tₙ(', 'triangle('); } },
            { value: "(-)", replacementValue: "%", onclick: function() { appendText('%'); } },
            { value: "ln", replacementValue: "log₁₀", onclick: function() { appendText('log₁₀(', 'log('); } },
            { value: "mod", replacementValue: "log₂", onclick: function() { appendText('log₂(', 'log₂('); } },
        ];
    
        buttonsToUpdate.forEach(button => {
            var buttonElement = document.querySelector(`input[type="button"][value="qs{button.value}"].calb`);
            if (buttonElement) {
                if (hyperMode) {
                    buttonElement.value = button.replacementValue;
                    buttonElement.onclick = button.onclick;
                } else {
                    buttonElement.value = button.value;
                    buttonElement.onclick = function() { appendText(button.value); };
                }
            }
        });
    }
    else {
        // Revert the buttons to their original values and functionalities
        var buttonsToRevert = [
        { value: "i", originalValue: "1", onclick: function() { appendText('1'); } },
        { value: "²", originalValue: "2", onclick: function() { appendText('2'); } },
        { value: "³", originalValue: "3", onclick: function() { appendText('3'); } },
        { value: "ⁿ√", originalValue: "4", onclick: function() { appendText('4'); } },
        { value: "√", originalValue: "5", onclick: function() { appendText('5'); } },
        { value: "∛", originalValue: "6", onclick: function() { appendText('6'); } },
        { value: "!", originalValue: "7", onclick: function() { appendText('7'); } },
        { value: "ᵀ√", originalValue: "9", onclick: function() { appendText('9'); } },
        { value: "Tₙ", originalValue: "aⁿ", onclick: function() { appendText('^'); } },
        { value: "log₁₀", originalValue: "ln", onclick: function() { appendText('ln('); } },
        { value: "log₂", originalValue: "mod", onclick: function() { appendText(' mod ', '%'); } },
        ];
    
        buttonsToRevert.forEach(button => {
            var buttonElement = document.querySelector(`input[type="button"][value="qs{button.value}"].calb`);
            if (buttonElement) {
                buttonElement.value = button.originalValue;
                buttonElement.onclick = button.onclick;
            }
        });
    }
    console.log("Task completed successfully");
}
function toggleHyperMode2() {
    var hyperButton = document.querySelector('.calo[value="⇧"]');
    if (hyperMode == true) {
        console.log("Hypermode is active")
        // Toggle the functionality of the buttons based on hyper mode
        var buttonsToUpdate = [
            { value: "^^", replacementValue: "ln", onclick: function() { appendText('ln('); } },
            { value: "^", replacementValue: "n√", onclick: function() { appendText('nthRoot('); } },
        ];
    
        buttonsToUpdate.forEach(button => {
            var buttonElement = document.querySelector(`input[type="button"][value="qs{button.value}"].calb`);
            if (buttonElement) {
                if (hyperMode) {
                    buttonElement.value = button.replacementValue;
                    buttonElement.onclick = button.onclick;
                } else {
                    buttonElement.value = button.value;
                    buttonElement.onclick = function() { appendText(button.value); };
                }
            }
        });
    }
    else {
        // Revert the buttons to their original values and functionalities
        var buttonsToRevert = [
        { value: "^^", originalValue: "ln", onclick: function() { appendText('^^'); } },
        { value: "^", originalValue: "n√", onclick: function() { appendText('**'); } },
        ];
    
        buttonsToRevert.forEach(button => {
            var buttonElement = document.querySelector(`input[type="button"][value="qs{button.value}"].calo`);
            if (buttonElement) {
                buttonElement.value = button.originalValue;
                buttonElement.onclick = button.onclick;
            }
        });
    }
    console.log("Task completed successfully");
}
function evaluateExpression() {
    var ansField = document.calculator.ans;
    var ansTwoField = document.calculator.ansTwo.replace(/([\d\w\)\.]+)\s*\^\^\s*([\d\w\(\)\.]+)/g, 'tet(qs1,qs2)').replace(/\|([^|]+)\|/g, 'abs(qs1)').replace('{','(').replace('}', ')');;
    let scope = {
        x: math.complex(x, i),
        tet: tet,
    };
    
    ansField.value = eval(ansField.value);
    ansTwoField.value = math.evaluate(ansTwoField.value);
}

function appendText(text, text2=text) {
    var ansField = document.calculator.ans;
    var ansTwoField = document.calculator.ansTwo;
    
    ansField.innerHTML += text;
    ansTwoField.value += text;
}


var fakeResult = document.getElementById('resultFake');
document.addEventListener("keydown", function (event) {
    if (event.key === "Shift") {
    toggleHyperMode();
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "Shift") {
    toggleHyperMode();
    }
});