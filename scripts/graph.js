// Axes and Trace Variables
// test equation: (x+4)/(x-2)^2 OR (19x-3)/(x+2)^2
var xr = 0, xrp = 0; // x real (x axis)
var xi = 0, xip = 0; // x imaginary (z axis)
var yr = 0, yrp = 0; // y real (y axis)
var yi = 0, yip = 0; // y imaginary (t axis)

var xiv = 0, xivp = 0; // x imaginary viewport
var inputs = ['xi', 'xr', 'xiv']; // each instance of the slider setup thing

var logX = [false, 10]; // whether to use log scale for x-axis and what base
var logY = [false, 10]; // whether to use log scale for y-axis and what base


var xrmin = -36, xrmax = 36; // x-real minimum/maximum
var ximin = -36, ximax = 36; // x-imaginary minimum/maximum

var scale = 5; // how zoomed in the graph is
var inputScale = 1;

var fullscreen = false; // est-on plein écran (fullscreen) ou non

var nof = 1; // number of functions


// Canvas Declaration
const canvas = document.getElementById('graph-canvas');
const ctx = canvas.getContext('2d');
var canvasWidth = 360;
var canvasHeight = 360;
ctx.translate(canvas.width/2, canvas.height/2);
var do3D = false;
var toffxr = 0; // total xr-offset
var toffyr = 0; // total yr-offset
var toffyi = 0; // total yi-offset

// On load actions
window.addEventListener('load', function() {
    

    // Graph at the start
    graphFunction();
    inputsAutoGraphTest();

    // Open the home tab
    qs('#homeTab').click();

    qsa('.graph-adv').forEach(function(element) {
        element.classList.add('hidden');
    });
    inputsAutoGraphTest();
    setInterval(function() {
    // Update whether graph is 2D or 3D
    if (qs('#graph-dimension-3d').checked == true) {
        do3D = true;
    }
    else {
        do3D = false;
    }
    // Update whether to show the graph button
    if (qs('#graph-auto').checked != true) {
        qs('#graph-btn').style.display = 'block';
    }
    else {
        qs('#graph-btn').style.display = 'none';
    }

    }, 37);
    
    function inputsAutoGraphTest () {
    qsa('#graphing input, #graphing select, #graphing button, .modal input').forEach(function(element) {
        element.addEventListener('input', function () {
        if (qs('#graph-auto').checked) graphFunction();
        });
    });
    /*document.querySelectorAll('#graphing input, #graphing button, #graphing select').forEach(input => { // input[type=text], #graphing input[type=number], #graphing input[type=checkbox], #graphing select, #fullscreen-modal input, #xiv-td input
        input.addEventListener('input', function () {
        // if the user selects to graph automatically (resource-consuming)
        if (qs('#graph-auto').checked) graphFunction();
        });
    });*/
    }

    document.querySelectorAll('#graphing input[type=range], #graphing td input[type=number]:first-of-type').forEach(input => {
    input.addEventListener('input', function () {
        // NO MORE ~~~~Continuously (every 37 ms) check for changes in xr,xi,yr,yi and push to span~~~~
        updateTrace();
    });
    });
    
    qs('#lang-select').addEventListener('input', function () {
    lang = this.value;
    translations.applyLang();
    });

    qs('#graphing').addEventListener('mouseover', function () {
    if (pregraphed == false) pregraphed = true;
    graphFunction();
    });

    qs('#xi-input').addEventListener('input', function () {
    xi = Number(this.value);
    qs('#xi-value').innerHTML = xi;
    
    });

    qs('#xr-input').addEventListener('input', function () {
    xr = Number(this.value);
    qs('#xr-value').innerHTML = xr;
    });

    qs('#xiv-input').addEventListener('input', function () {
    xiv = Number(this.value);
    qs('#xiv-value').innerHTML = xiv;
    });

    qs('#graph-minor-step').addEventListener('input', function () {
    qs('#graph-major-step').step = this.value;
    });

    qs('#graph-offset-xr').addEventListener('input', function () {
    toffxr = Number(this.value);
    resetOffset();
    ctx.translate(toffxr, 0);
    graphFunction();
    });

    qs('#graph-offset-yr').addEventListener('input', function () {
    toffyr = Number(this.value);
    resetOffset();
    ctx.translate(0, toffyr);
    graphFunction();
    });

    qs('#graph-centre').addEventListener('click', function () {
    let a = qs('#graph-offset-xr').value;
    let b = qs('#graph-offset-yr').value;
    });

    document.querySelectorAll('#graph-canvas').forEach(fsBtn => {
    fsBtn.addEventListener('click', function() {
        if (!fullscreen) {
            // Create modal if it doesn't exist
            let modal = document.getElementById('graph-fullscreen-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'graph-fullscreen-modal';
                modal.className = 'modal-container';
                modal.innerHTML = `
                    <button class="fa fa-times" id="graph-fullscreen-close"></button>
                `;
                document.body.appendChild(modal);
            }

            // Move canvas to modal
            const modalContent = modal.querySelector('.modal');
            modalContent.appendChild(canvas);
            modal.style.display = 'block';
            fullscreen = true;

            // Handle close button
            document.getElementById('graph-fullscreen-close').onclick = function() {
                const graphingSection = document.querySelector('#graphing .desk-paper');
                graphingSection.appendChild(canvas);
                modal.style.display = 'none';
                fullscreen = false;
                graphFunction();
            };

            graphFunction();
        }
        fullscreen = !fullscreen;
        var modal = qs('#graph-fullscreen-modal');
        var container = qs('#graph-container');
        var scaleContainer = qs('#graph-scale-span-container');
        var scaleContainerSub = qs('#graph-scale-span-sub');
        modal.classList.toggle('hidden');
        modal.parentElement.classList.toggle('hidden');
        if (fullscreen) { // if fullscreen is now entered
        modal.innerHTML = '';
        modal.appendChild(qs('#graph-div'));
        
        }
        else { // when exiting fullscreen
        //container.appendChild(qs('#graph-fullscreen-btn'));
        container.appendChild(qs('#graph-div'));
        qs('#graph-div').appendChild(canvas);
        document.body.style.overflowY = 'scroll';
        //canvas.style.transform = 'scale(1)';
        scaleContainerSub.style.position = 'static';
        //this.style.position = 'static';
        //this.innerHTML = '<i class="fa fa-expand"></i> Fullscreen';
        }
    });
    });

    qs('#graph-scale').addEventListener('input', function () {
    var newScale = this.value;
    if (this.value <= 0) this.value = scale;
    if (newScale <= 0) newScale = scale;
    scale = newScale;
    graphFunction();
    /*var modal = qs('#graph-fullscreen-modal');
    var scaleContainer = qs('#graph-scale-span-container');
    var prevValue = inputScale;
    inputScale = this.value;
    this.max =  round(modal.offsetWidth ** 2, 1);
    this.min = round(1 / qs('#graph-scale').max, 1);
    if (this.min < 0) this.min = 0;
    if (this.max > 2) this.max = 2;
    if (this.value <= this.min) this.value = this.min;
    if (this.value >= this.max) this.value = this.max;
    if (fullscreen) canvas.style.transform = 'scale(' + qs('#graph-scale').value + ')';
    else canvas.style.transform = 'scale(1)';*/
    });

    canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (qs('#graph-scroll-xiv').checked) { // originally fullscreen != true
        // Vertical scrolling
        if (e.deltaY > 0) {
        // Scroll down; ideally decrease y-i viewport
        xiv -= Number(qs('#xiv-step-input').value);
        if (xiv <= qs('#xiv-min-input').value) xiv = Number(qs('#xiv-min-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
        }
        else if (e.deltaY < 0) {
        // Scroll up; ideally increase y-i viewport
        xiv += Number(qs('#xiv-step-input').value);
        if (xiv >= qs('#xiv-max-input').value) xiv = Number(qs('#xiv-max-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
        }
        // Horizontal scrolling
        if (e.deltaX > 0) {
        // Scroll left; decrease x-i viewport
        xiv -= Number(qs('#xiv-step-input').value);
        if (xiv <= qs('#xiv-min-input').value) xiv = Number(qs('#xiv-min-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
        }
        else if (e.deltaX < 0) {
        // Scroll right; increase x-i viewport
        xiv += Number(qs('#xiv-step-input').value);
        if (xiv >= qs('#xiv-max-input').value) xiv = Number(qs('#xiv-max-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
        }
    }
    else if (qs('#graph-scroll-xiv').checked != true) { // originally fullscreen == true
        // Vertical scrolling
        if (e.deltaY > 0) {
        // Scroll down; ideally decrease yr offset
        toffyr -= Number(qs('#graph-offset-yr').step);
        //if (toffyr <= qs('#offset-yr').min) toffyr = Number(qs('#xiv-min-input').value);
        qs('#graph-offset-yr').value = toffyr;
        }
        else if (e.deltaY < 0) {
        // Scroll up; ideally increase yr offset
        toffyr += Number(qs('#graph-offset-yr').step);
        //if (toffyr >= qs('#offset-yr').max) toffyr = Number(qs('#xiv-max-input').value);
        qs('#graph-offset-yr').value = toffyr;
        }
        // Horizontal scrolling
        if (e.deltaX > 0) {
        // Scroll left; ideally decrease xr offset
        toffxr -= Number(qs('#graph-offset-xr').step);
        //if (xiv <= qs('#xiv-min-input').value) xiv = Number(qs('#xiv-min-input').value);
        qs('#graph-offset-xr').value = toffxr;
        }
        else if (e.deltaX < 0) {
        // Scroll right; ideally increase xr offset
        toffxr += Number(qs('#graph-offset-xr').step);
        //if (toffxr >= qs('#xiv-max-input').value) toffxr = Number(qs('#xiv-max-input').value);
        qs('#graph-offset-xr').value = toffxr;
        }
        graphFunction();
    }
    graphFunction();
    });

    qs('#xiv-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xiv -= Number(qs('#xiv-step-input').value);
        if (xiv <= qs('#xiv-min-input').value) xiv = Number(qs('#xiv-min-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xiv += Number(qs('#xiv-step-input').value);
        if (xiv >= qs('#xiv-max-input').value) xiv = Number(qs('#xiv-max-input').value);
        qs('#xiv-input').value = xiv;
        qs('#xiv-value').innerHTML = xiv;
    }
    graphFunction();
    });

    qs('#xr-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xr -= Number(qs('#xr-step-input').value);
        if (xr <= qs('#xr-min-input').value) xr = Number(qs('#xr-min-input').value);
        qs('#xr-input').value = xr;
        qs('#xr-value').innerHTML = xr;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xr += Number(qs('#xr-step-input').value);
        if (xr >= qs('#xr-max-input').value) xr = Number(qs('#xr-max-input').value);
        qs('#xr-input').value = xr;
        qs('#xr-value').innerHTML = xr;
    }
    updateTrace();
    });

    qs('#xi-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xi -= Number(qs('#xi-step-input').value);
        if (xi <= qs('#xi-min-input').value) xi = Number(qs('#xi-min-input').value);
        qs('#xi-input').value = xi;
        qs('#xi-value').innerHTML = xi;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xi += Number(qs('#xi-step-input').value);
        if (xi >= qs('#xi-max-input').value) xi = Number(qs('#xi-max-input').value);
        qs('#xi-input').value = xi;
        qs('#xi-value').innerHTML = xi;
    }
    updateTrace();
    });

    qs('#graph-advanced').addEventListener('input', function () {
    const graphAdvElements = document.querySelectorAll('.graph-adv');
    
    if (!this.checked) {
        graphAdvElements.forEach(function(element) {
            element.classList.add('hidden');
        });
    } else {
        graphAdvElements.forEach(function(element) {
            element.classList.remove('hidden');
        });
    }
});

    function resetOffset () {
    ctx.translate(-toffxr, -toffyr);
    }

    function inputSetup (prefix) {
    // Change xi minimum
    qs('#' + prefix + '-min-input').addEventListener('input', function () {
        qs('#' + prefix + '-input').min = Number(qs('#' + prefix + '-min-input').value);
        qs('#' + prefix + '-max-input').min = qs('#' + prefix + '-input').min;
    });

    // Change xi maximum
    qs('#' + prefix + '-max-input').addEventListener('input', function () {
        qs('#' + prefix + '-input').max = Number(qs('#' + prefix + '-max-input').value);
        qs('#' + prefix + '-min-input').max = qs('#' + prefix + '-input').max;
    });

    // Change xi step
    qs('#' + prefix + '-step-input').addEventListener('input', function () {
        qs('#' + prefix + '-input').step = Number(qs('#' + prefix + '-step-input').value);
    });

    // Change xi input type
    qs('#' + prefix + '-type-input').addEventListener('input', function () {
        if (qs('#' + prefix + '-type-input').checked != true) {
        qs('#' + prefix + '-input').type = 'number';
        qs('#' + prefix + '-input').removeAttribute('min');
        qs('#' + prefix + '-input').removeAttribute('max');
        qs('#' + prefix + '-min-input').disabled = 'disabled';
        qs('#' + prefix + '-max-input').disabled = 'disabled';
        }
        else {
        qs('#' + prefix + '-input').type = 'range';
        qs('#' + prefix + '-min-input').removeAttribute('disabled');
        qs('#' + prefix + '-max-input').removeAttribute('disabled');
        if (Number(qs('#' + prefix + '-input').value) > Number(qs('#' + prefix + '-max-input').value)) {
            qs('#' + prefix + '-max-input').value = qs('#' + prefix + '-input').value;
        }
        if (Number(qs('#' + prefix + '-input').value) < Number(qs('#' + prefix + '-min-input').value)) {
            qs('#' + prefix + '-min-input').value = qs('#' + prefix + '-input').value;
        }
        
        qs('#' + prefix + '-input').max = Number(qs('#' + prefix + '-max-input').value);
        qs('#' + prefix + '-input').min = Number(qs('#' + prefix + '-min-input').value);
        }
    });
    }
    for (var i = 0; i < inputs.length; i++) {
    inputSetup(inputs[i]);
    }
});

// Alphabetical function
function alphabet (index, funcInstead) {
    // get the Latin alphabet in unicode
    index += 96;
    if (funcInstead) index += 5;
    const codePoint = index.toString(16);
    return '&#x' + codePoint + ';';
}

// Add new function
var functionsShown = [true];
function addNewFunction () {
    nof++;
    let char = alphabet(nof, true);
    qs('#function-wrapper').innerHTML += '<p class="equation" id="function-' + nof + '"><span id="function-name-' + nof + '">' + char + '</span>(x) = <input id="function-input-' + nof + '" type="text" style="font-family:times" value="x - ' + nof + '" oninput="graphFunction();"><select id="function-colour-' + nof + '" onclick="graphFunction();"><optgroup label="Mute colours"><option value="#f09393ff">pink<option value="#CB4C4Eff">red<option value="#D25339ff">orange<option value="#CF812Eff">yellow<option value="#4CAB4Eff">green<option value="#4D7C8Dff">teal<option value="#4E4CCBff">blue<option value="#614CC5ff">indigo<option value="#7E4CBCff">violet<option value="#AD4CADff"selected>purple<option value="#808080ff">grey<option value="#9A4CB3ff">maroon<option value="#A16C4Eff">brown<option value="#273236ff">black<option value="#d8cdc9ff">white<optgroup label="Saturated colours"><option value="#ff69b4ff">hot pink<option value="#ff0000ff">hot red<option value="#DD8800ff">hot orange<option value="#66AA00ff">hot yellow<option value="#00ff00ff">hot green<option value="#00c0c0ff">hot teal<option value="#0000ffff">hot blue<option value="#4000EAff">hot indigo<option value="#8000D5ff">hot violet<option value="#c000c0ff">hot purple<option value="#c0c0c0ff">hot grey<option value="#800000ff">hot maroon<option value="#6c3b1cff">hot brown<option value="#000000ff">hot black<option value="#ffffffff">hot white<optgroup label="Pastel colours"><option value="#f2b1b1ff">pastel pink<option value="#FAA0A01ff">pastel red<option value="#FDAA77ff">pastel orange<option value="#FED8B2ff">pastel yellow<option value="#77dd77ff">bright green<option value="#75dad7ff">bright teal<option value="#a7c7e7ff">pastel blue<option value="#8686afff">pastel indigo<option value="#ab9678ff">pastel violet<option value="#ffd2cfff">pastel purple<option value="#f3cfceff">pastel grey<optgroup label="Opacity"><option value="#c0c0c080">translucent<option value="#ffffff00">transparent</select><button class="fa fa-eye" id="function-hide-' + nof + '" onclick="graphFunction();"></button><button class="fa fa-trash" id="function-delete-' + nof + '" onclick="graphFunction();"></button></p><hr/>';
    /*qs('#function-delete-' + nof).addEventListener('click', function () {
    qs('#function-input-' + nof).setAttribute('id', 'function-input-' + nof + 'h');
    qs('#function-' + nof).style.display = 'none';
    });*/
    if (nof > 1) qs('#function-delete-1').removeAttribute('disabled');
    else qs('#function-delete-1').disabled = 'disabled';
    if (qs('#graph-auto').checked) graphFunction();
    inputsAutoGraphTest();
    translations.applyLang();
    qs('#function-hide-' + nof).addEventListener('input', function () {
    qs('#function-input-' + nof).value += '‽';
    });
}

function drawGrid (majorStep, minorStep) {
    var graphOffsetX = -Number(qs('#graph-offset-xr').value) * scale;
    var graphOffsetY = -Number(qs('#graph-offset-yr').value) * scale;
    var mS;
    if (minorStep != undefined) {
        mS = minorStep;
    }
    else {
        mS = 1;
    }
    //ctx.translate(0, 0);
    // Draw the x and y axes
    ctx.lineWidth = 2;
    if (qs('#graph-axes').checked) {
        // xr-axis
        ctx.beginPath();
        ctx.moveTo(-canvas.width/2 + graphOffsetX, 0);
        ctx.lineTo(canvas.width/2 + graphOffsetX, 0);
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        // yr-axis
        ctx.beginPath();
        ctx.moveTo(0, -canvas.height/2 + graphOffsetY);
        ctx.lineTo(0, canvas.height/2 + graphOffsetY);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        qs('#graph-ticks').removeAttribute('disabled');
    }
    else {
        qs('#graph-ticks').disabled = 'disabled';
    }
    // Draw all of the gridlines
    for (var i = -canvas.height/2; i < canvas.height/2; i += scale) {
        ctx.strokeStyle = 'grey';
        // Determine whether to do major or minor lines
        if ((i/scale) % majorStep == 0) ctx.lineWidth = 0.25;
        else if ((i/scale) % mS == 0) ctx.lineWidth = 0.125;
        else ctx.lineWidth = 0.03125;
        if (qs('#graph-grids').checked) {
            // Horizontal
            ctx.beginPath();
            ctx.moveTo(-canvas.width/2 + graphOffsetX, i);
            ctx.lineTo(canvas.width/2 + graphOffsetX, i);
            ctx.stroke();
        }
        // Draw tick marks if selected
        if (qs('#graph-ticks').checked && (i/scale) % mS == 0) {
            ctx.lineWidth = 0.5;
            // Horizontal
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(-Number(qs('#graph-tick-height').value), i);
            ctx.lineTo(Number(qs('#graph-tick-height').value), i);
            ctx.stroke();
        }
    }
    for (var i = -canvas.width/2; i < canvas.width/2; i += scale) {
        ctx.strokeStyle = 'grey';
        // Determine whether to do major or minor lines
        if ((i/scale) % majorStep == 0) ctx.lineWidth = 0.25;
        else if ((i/scale) % mS == 0) ctx.lineWidth = 0.125;
        else ctx.lineWidth = 0.03125;
        if (qs('#graph-grids').checked) {
            // Vertical
            ctx.beginPath();
            ctx.moveTo(i, -canvas.height/2 + graphOffsetY);
            ctx.lineTo(i, canvas.height/2 + graphOffsetY);
            ctx.stroke();
        }
        // Draw tick marks if selected
        if (qs('#graph-ticks').checked && (i/scale) % mS == 0) {
            ctx.lineWidth = 0.5;
            // Vertical
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(i, -Number(qs('#graph-tick-height').value));
            ctx.lineTo(i, Number(qs('#graph-tick-height').value));
            ctx.stroke();
        }
    }

}
function drawGrid3D () {
    // yi-axis
    ctx.beginPath();
    ctx.moveTo(canvas.height/2, canvas.height/4);
    ctx.lineTo(-canvas.height/2, -canvas.height/4);
    ctx.lineWidth = 1.75;
    ctx.strokeStyle = 'green';
    ctx.stroke();
    // c2 = sqrt(a2 + b2)
    const iidiag = Math.sqrt(180**2 + 90**2);
    const iictick = iidiag / 180; // iidiag's calculatory tick
    // make a triangle mathematically similar to iidiag's
    // hypotenuse = iictick
    // find legs (vertical a and horizontal 2a)
    // sqrt(a2 + 4a2) = iictick
    // a^2 + 4a^2 = iictick^2
    // 5a^2 = iictick^2
    // 5a = iictick
    // a = iictick/5
    const a = (iictick * Math.sqrt(5))/5;
    // i is the x position; j is the y position
    var j = 90;
    var k = 0;
    for (var i = -canvas.width/2; i < iidiag; i += (2*a)) {
    if (qs('#graph-ticks').checked) {
        ctx.beginPath()
        if (k % 6 == 0) {
        ctx.moveTo(i, -j + Number(qs('#graph-tick-height').value));
        ctx.lineTo(i, -j - Number(qs('#graph-tick-height').value));
        //ctx.lineTo(i + (2*a), j - a);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        }
    }
    j -= a;
    k ++;
    }
    /*for (var i = -canvas.width/2; i < 180; i += (2 * a)) {
    ctx.beginPath();
    ctx.moveTo(i, -5);
    ctx.lineTo(i + 2 * a, a+5);
    ctx.stroke();
    }*/
}

// Round numbers
function round (num, p=0) {
    if (num == undefined) {
    return 0;
    }
    else {
    return Math.round(num * 10 ** -p) / 10 ** -p;
    }
}
function updateTrace () {
    var textx = '', texty = '';
    // Mirror the value of x
    if (xr != 0) {
    textx += xr.toString();
    }
    if (xi != 0) {
    textx += ' ';
    if (xi < 0) {
        textx += '- ' + ((-1) * xi).toString() + '<i>i</i>';
    }
    else if (xi > 0) {
        if (xr != 0) textx += '+ '
        textx += xi.toString() + '<i>i</i>';
    }
    else {
        //textx += ' ± ?i'
    }
    }
    if (xr == 0 && xi == 0) textx = '0'

    // Solve for y and then store it
    yr = solve(xr, xi, false);
    yi = solve(xr, xi, true);

    // Display the value of y
    if (yr != 0) {
    texty += yr.toString();
    }
    if (yr != 0) {
    texty += ' ';
    if (yi < 0) {
        texty += '- ' + ((-1) * yi).toString() + '<i>i</i>';
    }
    else if (yi > 0) {
        if (yr != 0) texty += '+ '
        texty += yi.toString() + '<i>i</i>';
    }
    else {
        //texty += ' ± ?i'
    }
    }
    if (yr == 0 && yi == 0) texty = '0'
    
    qs('#xri-showcase').innerHTML = textx;
    qs('#yri-showcase').innerHTML = texty;
}
// Solve the function for some X
function countOccurrences(str, search) {
    return str.split(search).length - 1;
}
function solve (x, i, solveComplex, whence, whichFunction = 1, roundTo = Number(qs('#trace-round').value)) {
    if (whence == undefined) whence = 1;
    // Read the function input
    let scope = {
    x: math.complex(x, i),
    tet: tet,
    };
    var functext = qs('#function-input-' + whichFunction).value.toString();
    // Number formatting
    functext = functext.replace(',',''); // Commas into nothings
    // Operations
    functext = functext.replace(/([\d\w\)\.]+)\s*\^\^\s*([\d\w\(\)\.]+)/g, 'tet(qs1,qs2)'); // Tetration
    functext = functext.replace('{','(').replace('}', ')'); // Minimal LaTeX cross-compatibility
    functext = functext.replace(/\|([^|]+)\|/g, 'abs(qs1)'); // Absolute value
    // Constants
    functext = functext.replace(/c/, round('299792458', roundTo)); // Speed of Light (c)
    functext = functext.replace(/pi/, round('3.14159', roundTo)); // Pi
    functext = functext.replace(/tau/, round('6.28319', roundTo)); // Tau
    functext = functext.replace(/e/, round('2.71828', roundTo)); // e
    // Constant Functions
    if (countOccurrences(functext, 'x') == 0) functext = '(' + functext + ')x^0';
    // Finalise the function
    let func = math.evaluate(1 + '(' + functext + ')', scope);
    if (solveComplex == false || solveComplex == undefined) {
    return round(func.re, roundTo);
    }
    else {
    var a = round(func.im, roundTo);
    return round(func.im, roundTo);
    }
}
function isHole(num) {
    if (num == undefined || num == NaN || num == Infinity || num == -Infinity || num == null) return true;
    else return false;
}

function graphFunction () {
    // condition ? true : false

    // Stuff to do before graphing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width/2 + scale * toffxr, canvas.height/2 + scale * toffyr);
    drawGrid(Number(qs('#graph-major-step').value), Number(qs('#graph-minor-step').value));

    // Loop to graph each function
    for (var f = 1; f <= nof; f++) {
    var colour = qs('#function-colour-' + f).value;
    if (do3D) drawGrid3D();
    ctx.strokeStyle = colour;
    var preprecision = Number(qs('#trace-round').value);
    if (preprecision < -4) preprecision = -4;
    var precision = 5 * 10 ** preprecision;
    if (preprecision < -3) precision = 5 * 10 ** preprecision;
    if (preprecision > 0) precision /= 5 * 5 ** (preprecision - 1);
    //if (preprecision <= -1) precision = 2 ** (preprecision + 1);
    
    for (var i = -canvas.width/2 - qs('#graph-offset-xr').value; i < canvas.width/2 - qs('#graph-offset-xr').value; i += precision) {
        let width = 1;
        // The linear graph
        var xrt = i;
        var yrt = -solve(xrt, Number(qs('#xiv-input').value), false, 1, f);
        var yrit = -solve(xrt, Number(qs('#xiv-input').value), true, 1, f)
        var xrtNext = i + precision;
        var yrtNext = -solve(xrtNext, Number(qs('#xiv-input').value), false, 1, f);
        if (qs('#graph-dimension-xi').checked) {
        yrt = -solve(Number(qs('#xiv-input').value), xrt, false, 1, f);
        yrtNext = -solve(Number(qs('#xiv-input').value), xrtNext, false, 1, f)
        }

        // Holes ( test and try (x-1)(x+1)/(x-1) )
        /*if (isHole(yrtNext) == true|| isHole(yrt) == true) {
        var xrtMext = i + 1 / 10 ** Number(qs('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number(qs('#xiv-input').value), false, 1, f);
        
        if (isHole(yrtNext) == true) {
            yrtNext = (yrtMext != undefined) ? yrtMext: 0;
        }
        if (isHole(yrt) == true) {
            yrt = (yrtMext != undefined) ? yrtMext: 0;
            ctx.beginPath();
            ctx.arc(scale * xrt, scale * yrt, 2, 0, 2 * Math.PI);
            ctx.fillStyle = qs('#function-colour').value;
            ctx.fill();
            ctx.lineWidth = 0;
            ctx.stroke();
        }
        }*/
        // Vertical asymptotes
        /*var yrtOext = -solve(xrtNext - 0.0001, Number(qs('#xiv-input').value), false, 1, f, -4)
        var xrtPrev = i - precision;
        var yrtPrev = -solve(xrtPrev, Number(qs('#xiv-input').value), false, 1, f);
        var yrtOrev = -solve(xrtPrev + 0.0001, Number(qs('#xiv-input').value), false, 1, f, -4)
        // Vertical asymptote after
        if (!isFinite(yrtNext) && yrtNext != undefined) {
            if (yrtOext > 0) {
                ctx.beginPath();
                ctx.lineTo(xrtNext - 0.0001 + graphOffsetX, 360 + graphOffsetY);
                ctx.stroke();
            }
            if (yrtOext < 0) {
                ctx.beginPath();
                ctx.lineTo(xrtNext - 0.0001 + graphOffsetX, -360 + graphOffsetY);
                ctx.stroke();
            }
        }
        // Vertical asymptote before
        if (!isFinite(yrtPrev) && yrtPrev != undefined) {
            var currX = canvas.getBoundingClientRect().left;
            var currY = canvas.getBoundingClientRect().top;
            if (yrtOrev > 0) {
                ctx.beginPath();
                ctx.moveTo(currX, currY);
                ctx.lineTo(xrtNext - 0.0001 + graphOffsetX, 360 + graphOffsetY);
                ctx.stroke();
            }
            if (yrtOrev < 0) {
                ctx.beginPath();
                ctx.moveTo(currX, currY);
                ctx.lineTo(xrtNext - 0.0001 + graphOffsetX, -360 + graphOffsetY);
                ctx.stroke();
            }
            ctx.moveTo(currX, currY);
        }*/
        /*if (!isFinite(yrtNext) && yrtNext != undefined) {
        var xrtMext = i + 1 / 10 ** Number(qs('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number(qs('#xiv-input').value), false, 1, f);
        yrtNext = (yrtMext > 0) ? -360 : 360;
        }

        else if (!isFinite(yrt) && yrt != undefined) {
        var xrtMext = i + 1 / 10 ** Number(qs('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number(qs('#xiv-input').value), false, 1, f);
        yrt = (yrtMext > 0) ? 360 : -360;
        }*/
        var yiDiff = Number(qs('#xiv-input').value);
        var silverHex = parseInt('c0c0c0', 16);
        if (-yrit != yiDiff) { // 2025.09.08 add the yrit- to the start of the postequal part of condition (undone)
            if (Math.abs(yiDiff) <= 3 && yiDiff != 0) { // Less silvery if it is closer
                /*let newColourPrePre = parseInt(colour.substring(1), 16); // 3233857791 = silver from hex to decimal
                let newColourPre2 = ((3233857791*2 + newColourPrePre) / 3);
                let newColourPre = newColourPre2.toString(16).split(".")[0].slice(0, 6);
                if (newColourPre2 > 4294967295) newColourPre = 'a' + newColourPre.slice(2);
                let newColour = '#' + newColourPre + 'ff';*/
                let preNewColour = parseInt(colour.slice(1, 7), 16); // slice the alpha channel and the octothorpe
                let avgdColour = (preNewColour + (silverHex * 4)) / 5;
                if (avgdColour > (16 ** 6) - 1048576) avgdColour -= 1048576; // or make it after newColour and just make it efffff
                let newColour = avgdColour.toString().split(".")[0]; // convert colourPre1 to string and remove decimals and add the octothorpe and alpha channel back
                ctx.strokeStyle = newColour;
                colour = newColour;
                ctx.lineWidth = width / 2; //width * 6/1.5; // 4
            }
            else if (Math.abs(yiDiff) <= 6 && yiDiff != 0) { // Less silvery if it is closer
                /*let newColourPrePre = parseInt(colour.substring(1), 16); // 3233857791 = silver from hex to decimal
                let newColourPre2 = ((3233857791*2 + newColourPrePre) / 3);
                let newColourPre = newColourPre2.toString(16).split(".")[0].slice(0, 6);
                if (newColourPre2 > 4294967295) newColourPre = 'a' + newColourPre.slice(2);
                let newColour = '#' + newColourPre + 'ff';*/
                let preNewColour = parseInt(colour.slice(1, 7), 16); // slice the alpha channel and the octothorpe
                let avgdColour = (preNewColour + (silverHex * 6)) / 7;
                if (avgdColour > (16 ** 6) - 1048576) avgdColour -= 1048576; // or make it after newColour and just make it efffff
                let newColour = avgdColour.toString().split(".")[0]; // convert colourPre1 to string and remove decimals and add the octothorpe and alpha channel back
                ctx.strokeStyle = newColour;
                colour = newColour;
                ctx.lineWidth = width / 4; //width * 6/2; // 3
            }
            else {
                ctx.strokeStyle = 'silver';
                ctx.lineWidth = width / 8; //width * 6/3; // 2
            }
        }
        else {
        ctx.strokeStyle = colour;
        ctx.lineWidth = width;
        }
        if (i != -canvas.width/2 - qs('#graph-offset-xr').value) {
        ctx.lineWidth = width;
        ctx.moveTo(scale * xrt, scale * yrt);
        ctx.lineTo(scale * xrtNext, scale * yrtNext);
        ctx.stroke();
        }
        // The pointed graph
        if (i % Number(qs('#graph-minor-step').value) == 0 && qs('#graph-points').checked) {
        // Positive x point
        ctx.beginPath();
        ctx.arc(scale * xrt, scale * yrt, 1.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        // Negative x point
        var xrtNeg = -i;
        var yrtNeg = -solve(xrtNeg, Number(qs('#xiv-input').value), false, 1, f);
        ctx.beginPath();
        ctx.arc(scale * xrtNeg, scale * yrtNeg, 1.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        }
    }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Select home tab
    const gravItems = document.querySelectorAll('.grav-item');
    const grontentSections = document.querySelectorAll('.grontent-section');

    // Function to handle grav item clicks
    function handleGravClick(event) {
        const targetId = this.getAttribute('data-target');
        
        // Hide all content sections
        grontentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the targeted section
        document.querySelector(targetId).classList.add('active');
        
        // Reset all grav items
        gravItems.forEach(item => {
            item.style.transform = '';
            item.style.filter = '';
        });
        
        // Style the clicked grav item
        this.style.transform = 'translateY(-5px)';
        this.style.filter = 'saturate(3)';
        
        // Update URL hash without triggering a page reload
        const hash = targetId.substring(1); // Remove the # symbol
        history.pushState(null, '', `#${hash}`);
    }    // Add click event to each grav item
    gravItems.forEach(item => {
        item.addEventListener('click', handleGravClick);
    });

    // Click the first grav item by default
    document.querySelector('.grav-item').click();
});
