// Axes and Trace Variables
var xr = 0, xrp = 0; // x real (x axis)
var xi = 0, xip = 0; // x imaginary (z axis)
var yr = 0, yrp = 0; // y real (y axis)
var yi = 0, yip = 0; // y imaginary (t axis)

var xiv = 0, xivp = 0; // x imaginary viewport
var inputs = ['xi', 'xr', 'xiv']; // each instance of the slider setup thing

var xrmin = -36, xrmax = 36; // x-real minimum/maximum
var ximin = -36, ximax = 36; // x-imaginary minimum/maximum

var scale = 5; // how zoomed in the graph is
var inputScale = 1;

var fullscreen = false; // est-on plein écran (fullscreen) ou non

var nof = 1; // number of functions

// Convenience stuff
const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);


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
    // Utiliser HTTP en lieu d'HTTPS à cause de l'HTTP est incompatible avec mon domain
    //if (window.location.href.slice(0, 5) !== 'http:') window.location.href = 'http://' + window.location.href.slice(8);
    

    // Graph at the start
    graphFunction();
    inputsAutoGraphTest();

    // Open the home tab
    $('#homeTab').click();

    $all('.graph-adv').forEach(function(element) {
        element.classList.add('hidden');
    });
    inputsAutoGraphTest();
    setInterval(function() {
    // Update whether graph is 2D or 3D
    if ($('#graph-dimension-3d').checked == true) {
        do3D = true;
    }
    else {
        do3D = false;
    }
    // Update whether to show the graph button
    if ($('#graph-auto').checked != true) {
        $('#graph-btn').style.display = 'block';
    }
    else {
        $('#graph-btn').style.display = 'none';
    }

    }, 37);
    
    function inputsAutoGraphTest () {
    $all('#graphing input, #graphing select, #graphing button, .modal input').forEach(function(element) {
        element.addEventListener('input', function () {
        if ($('#graph-auto').checked) graphFunction();
        });
    });
    /*document.querySelectorAll('#graphing input, #graphing button, #graphing select').forEach(input => { // input[type=text], #graphing input[type=number], #graphing input[type=checkbox], #graphing select, #fullscreen-modal input, #xiv-td input
        input.addEventListener('input', function () {
        // if the user selects to graph automatically (resource-consuming)
        if ($('#graph-auto').checked) graphFunction();
        });
    });*/
    }

    document.querySelectorAll('#graphing input[type=range], #graphing td input[type=number]:first-of-type').forEach(input => {
    input.addEventListener('input', function () {
        // NO MORE ~~~~Continuously (every 37 ms) check for changes in xr,xi,yr,yi and push to span~~~~
        updateTrace();
    });
    });
    
    $('#lang-select').addEventListener('input', function () {
    lang = this.value;
    translations.applyLang();
    });

    $('#graphing').addEventListener('mouseover', function () {
    if (pregraphed == false) pregraphed = true;
    graphFunction();
    });

    $('#xi-input').addEventListener('input', function () {
    xi = Number(this.value);
    $('#xi-value').innerHTML = xi;
    
    });

    $('#xr-input').addEventListener('input', function () {
    xr = Number(this.value);
    $('#xr-value').innerHTML = xr;
    });

    $('#xiv-input').addEventListener('input', function () {
    xiv = Number(this.value);
    $('#xiv-value').innerHTML = xiv;
    });

    $('#graph-minor-step').addEventListener('input', function () {
    $('#graph-major-step').step = this.value;
    });

    $('#graph-offset-xr').addEventListener('input', function () {
    toffxr = Number(this.value);
    resetOffset();
    ctx.translate(toffxr, 0);
    graphFunction();
    });

    $('#graph-offset-yr').addEventListener('input', function () {
    toffyr = Number(this.value);
    resetOffset();
    ctx.translate(0, toffyr);
    graphFunction();
    });
    $('#graph-centre').addEventListener('input', function () {
    $('#graph-offset-xr').value = 0;
    $('#graph-offset-yr').value = 0;
    graphFunction();
    });

    document.querySelectorAll('#graph-canvas').forEach(fsBtn => {
    fsBtn.addEventListener('click', function () {
        fullscreen = !fullscreen;
        var modal = $('#graph-fullscreen-modal');
        var container = $('#graph-container');
        var scaleContainer = $('#graph-scale-span-container');
        var scaleContainerSub = $('#graph-scale-span-sub');
        modal.classList.toggle('hidden');
        modal.parentElement.classList.toggle('hidden');
        if (fullscreen) { // if fullscreen is now entered
        modal.innerHTML = '';
        modal.appendChild($('#graph-div'));
        modal.appendChild($('#graph-scale-span'));
        modal.appendChild($('#xiv-td-content'));
        modal.appendChild($('#graph-xryr-offset-div'));
        modal.appendChild(canvas);
        document.body.style.overflowY = 'hidden';
        //this.innerHTML = '<i class="fa fa-compress" style="z-index: 250;"></i> Exit';
        canvas.style.transform = 'scale(' + $('#graph-scale').value + ')';
        /*scaleContainerSub.style.position = 'relative';
        scaleContainerSub.style.top = '-20px';
        scaleContainerSub.style.left = 'calc(' + modal.parentElement.offsetWidth / 2 + ' - ' + this.offsetWidth / 2 + 'px)';
        $('#xiv-td-content').style.position = 'relative';
        $('#xiv-td-content').style.top = '-10px';
        $('#xiv-td-content').style.left = 'calc(' + modal.parentElement.offsetWidth / 2 + ' - ' + this.offsetWidth / 2 + 'px)';
        $('#graph-xryr-offset-div').style.position = 'relative';
        $('#graph-xryr-offset-div').style.bottom = '-10px';
        $('#graph-xryr-offset-div').style.left = 'calc(' + modal.parentElement.offsetWidth / 2 + ' - ' + this.offsetWidth / 2 + 'px)';*/
        /*
        Old Graph Fullscreen Button
        this.style.position = 'fixed';
        this.style.bottom = '10px';
        this.style.marginLeft = 'auto;'
        this.style.marginRight = 'auto;'*/
        }
        else { // when exiting fullscreen
        //container.appendChild($('#graph-fullscreen-btn'));
        container.appendChild($('#graph-div'));
        $('#graph-div').appendChild(canvas);
        scaleContainer.appendChild($('#graph-scale-span'));
        $('#xiv-td').appendChild($('#xiv-td-content'));
        $('#graph-xryr-offset-div-container-span').appendChild($('#graph-xryr-offset-div'));
        document.body.style.overflowY = 'scroll';
        canvas.style.transform = 'scale(1)';
        scaleContainerSub.style.position = 'static';
        //this.style.position = 'static';
        //this.innerHTML = '<i class="fa fa-expand"></i> Fullscreen';
        }
    });
    });

    $('#graph-scale').addEventListener('input', function () {
    var newScale = this.value;
    if (this.value <= 0) this.value = scale;
    if (newScale <= 0) newScale = scale;
    scale = newScale;
    graphFunction();
    /*var modal = $('#graph-fullscreen-modal');
    var scaleContainer = $('#graph-scale-span-container');
    var prevValue = inputScale;
    inputScale = this.value;
    this.max =  round(modal.offsetWidth ** 2, 1);
    this.min = round(1 / $('#graph-scale').max, 1);
    if (this.min < 0) this.min = 0;
    if (this.max > 2) this.max = 2;
    if (this.value <= this.min) this.value = this.min;
    if (this.value >= this.max) this.value = this.max;
    if (fullscreen) canvas.style.transform = 'scale(' + $('#graph-scale').value + ')';
    else canvas.style.transform = 'scale(1)';*/
    });

    canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    if ($('#graph-scroll-xiv').checked) { // originally fullscreen != true
        // Vertical scrolling
        if (e.deltaY > 0) {
        // Scroll down; ideally decrease y-i viewport
        xiv -= Number($('#xiv-step-input').value);
        if (xiv <= $('#xiv-min-input').value) xiv = Number($('#xiv-min-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
        }
        else if (e.deltaY < 0) {
        // Scroll up; ideally increase y-i viewport
        xiv += Number($('#xiv-step-input').value);
        if (xiv >= $('#xiv-max-input').value) xiv = Number($('#xiv-max-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
        }
        // Horizontal scrolling
        if (e.deltaX > 0) {
        // Scroll left; decrease x-i viewport
        xiv -= Number($('#xiv-step-input').value);
        if (xiv <= $('#xiv-min-input').value) xiv = Number($('#xiv-min-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
        }
        else if (e.deltaX < 0) {
        // Scroll right; increase x-i viewport
        xiv += Number($('#xiv-step-input').value);
        if (xiv >= $('#xiv-max-input').value) xiv = Number($('#xiv-max-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
        }
    }
    else if ($('#graph-scroll-xiv').checked != true) { // originally fullscreen == true
        // Vertical scrolling
        if (e.deltaY > 0) {
        // Scroll down; ideally decrease yr offset
        toffyr -= Number($('#graph-offset-yr').step);
        //if (toffyr <= $('#offset-yr').min) toffyr = Number($('#xiv-min-input').value);
        $('#graph-offset-yr').value = toffyr;
        }
        else if (e.deltaY < 0) {
        // Scroll up; ideally increase yr offset
        toffyr += Number($('#graph-offset-yr').step);
        //if (toffyr >= $('#offset-yr').max) toffyr = Number($('#xiv-max-input').value);
        $('#graph-offset-yr').value = toffyr;
        }
        // Horizontal scrolling
        if (e.deltaX > 0) {
        // Scroll left; ideally decrease xr offset
        toffxr -= Number($('#graph-offset-xr').step);
        //if (xiv <= $('#xiv-min-input').value) xiv = Number($('#xiv-min-input').value);
        $('#graph-offset-xr').value = toffxr;
        }
        else if (e.deltaX < 0) {
        // Scroll right; ideally increase xr offset
        toffxr += Number($('#graph-offset-xr').step);
        //if (toffxr >= $('#xiv-max-input').value) toffxr = Number($('#xiv-max-input').value);
        $('#graph-offset-xr').value = toffxr;
        }
        graphFunction();
    }
    graphFunction();
    });

    $('#xiv-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xiv -= Number($('#xiv-step-input').value);
        if (xiv <= $('#xiv-min-input').value) xiv = Number($('#xiv-min-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xiv += Number($('#xiv-step-input').value);
        if (xiv >= $('#xiv-max-input').value) xiv = Number($('#xiv-max-input').value);
        $('#xiv-input').value = xiv;
        $('#xiv-value').innerHTML = xiv;
    }
    graphFunction();
    });

    $('#xr-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xr -= Number($('#xr-step-input').value);
        if (xr <= $('#xr-min-input').value) xr = Number($('#xr-min-input').value);
        $('#xr-input').value = xr;
        $('#xr-value').innerHTML = xr;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xr += Number($('#xr-step-input').value);
        if (xr >= $('#xr-max-input').value) xr = Number($('#xr-max-input').value);
        $('#xr-input').value = xr;
        $('#xr-value').innerHTML = xr;
    }
    updateTrace();
    });

    $('#xi-td').addEventListener('mousewheel', function (e) {
    // Horizontal scrolling
    if (event.deltaX > 0) {
        // Scroll left
        xi -= Number($('#xi-step-input').value);
        if (xi <= $('#xi-min-input').value) xi = Number($('#xi-min-input').value);
        $('#xi-input').value = xi;
        $('#xi-value').innerHTML = xi;
    }
    else if (event.deltaX < 0) {
        // Scroll right
        xi += Number($('#xi-step-input').value);
        if (xi >= $('#xi-max-input').value) xi = Number($('#xi-max-input').value);
        $('#xi-input').value = xi;
        $('#xi-value').innerHTML = xi;
    }
    updateTrace();
    });

    $('#graph-advanced').addEventListener('input', function () {
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
    $('#' + prefix + '-min-input').addEventListener('input', function () {
        $('#' + prefix + '-input').min = Number($('#' + prefix + '-min-input').value);
        $('#' + prefix + '-max-input').min = $('#' + prefix + '-input').min;
    });

    // Change xi maximum
    $('#' + prefix + '-max-input').addEventListener('input', function () {
        $('#' + prefix + '-input').max = Number($('#' + prefix + '-max-input').value);
        $('#' + prefix + '-min-input').max = $('#' + prefix + '-input').max;
    });

    // Change xi step
    $('#' + prefix + '-step-input').addEventListener('input', function () {
        $('#' + prefix + '-input').step = Number($('#' + prefix + '-step-input').value);
    });

    // Change xi input type
    $('#' + prefix + '-type-input').addEventListener('input', function () {
        if ($('#' + prefix + '-type-input').checked != true) {
        $('#' + prefix + '-input').type = 'number';
        $('#' + prefix + '-input').removeAttribute('min');
        $('#' + prefix + '-input').removeAttribute('max');
        $('#' + prefix + '-min-input').disabled = 'disabled';
        $('#' + prefix + '-max-input').disabled = 'disabled';
        }
        else {
        $('#' + prefix + '-input').type = 'range';
        $('#' + prefix + '-min-input').removeAttribute('disabled');
        $('#' + prefix + '-max-input').removeAttribute('disabled');
        if (Number($('#' + prefix + '-input').value) > Number($('#' + prefix + '-max-input').value)) {
            $('#' + prefix + '-max-input').value = $('#' + prefix + '-input').value;
        }
        if (Number($('#' + prefix + '-input').value) < Number($('#' + prefix + '-min-input').value)) {
            $('#' + prefix + '-min-input').value = $('#' + prefix + '-input').value;
        }
        
        $('#' + prefix + '-input').max = Number($('#' + prefix + '-max-input').value);
        $('#' + prefix + '-input').min = Number($('#' + prefix + '-min-input').value);
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
    $('#function-wrapper').innerHTML += '<p class="equation" id="function-' + nof + '"><span id="function-name-' + nof + '">' + char + '</span>(x) = <input id="function-input-' + nof + '" type="text" style="font-family:times" value="x - ' + nof + '" oninput="graphFunction();"><select id="function-colour-' + nof + '" onclick="graphFunction();"><optgroup label="Mute colours"><option value="#f09393ff">pink<option value="#CB4C4Eff">red<option value="#D25339ff">orange<option value="#CF812Eff">yellow<option value="#4CAB4Eff">green<option value="#4D7C8Dff">teal<option value="#4E4CCBff">blue<option value="#614CC5ff">indigo<option value="#7E4CBCff">violet<option value="#AD4CADff"selected>purple<option value="#808080ff">grey<option value="#9A4CB3ff">maroon<option value="#A16C4Eff">brown<option value="#273236ff">black<option value="#d8cdc9ff">white<optgroup label="Saturated colours"><option value="#ff69b4ff">hot pink<option value="#ff0000ff">hot red<option value="#DD8800ff">hot orange<option value="#66AA00ff">hot yellow<option value="#00ff00ff">hot green<option value="#00c0c0ff">hot teal<option value="#0000ffff">hot blue<option value="#4000EAff">hot indigo<option value="#8000D5ff">hot violet<option value="#c000c0ff">hot purple<option value="#c0c0c0ff">hot grey<option value="#800000ff">hot maroon<option value="#6c3b1cff">hot brown<option value="#000000ff">hot black<option value="#ffffffff">hot white<optgroup label="Pastel colours"><option value="#f2b1b1ff">pastel pink<option value="#FAA0A01ff">pastel red<option value="#FDAA77ff">pastel orange<option value="#FED8B2ff">pastel yellow<option value="#77dd77ff">bright green<option value="#75dad7ff">bright teal<option value="#a7c7e7ff">pastel blue<option value="#8686afff">pastel indigo<option value="#ab9678ff">pastel violet<option value="#ffd2cfff">pastel purple<option value="#f3cfceff">pastel grey<optgroup label="Opacity"><option value="#c0c0c080">translucent<option value="#ffffff00">transparent</select><button class="fa fa-eye" id="function-hide-' + nof + '" onclick="graphFunction();"></button><button class="fa fa-trash" id="function-delete-' + nof + '" onclick="graphFunction();"></button></p><hr/>';
    /*$('#function-delete-' + nof).addEventListener('click', function () {
    $('#function-input-' + nof).setAttribute('id', 'function-input-' + nof + 'h');
    $('#function-' + nof).style.display = 'none';
    });*/
    if (nof > 1) $('#function-delete-1').removeAttribute('disabled');
    else $('#function-delete-1').disabled = 'disabled';
    if ($('#graph-auto').checked) graphFunction();
    inputsAutoGraphTest();
    translations.applyLang();
    $('#function-hide-' + nof).addEventListener('input', function () {
    $('#function-input-' + nof).value += '‽';
    });
}

function drawGrid (majorStep, minorStep) {
    var imax = toffxr * 5;
    var imay = toffyr * 5;
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
    var initChecked = $('#graph-ticks').checked;
    if ($('#graph-axes').checked) {
    // xr-axis
    ctx.beginPath();
    ctx.moveTo(-canvas.width - imax, 0);
    ctx.lineTo(canvas.width - imax, 0);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // yr-axis
    ctx.beginPath();
    ctx.moveTo(0, -canvas.height - imay);
    ctx.lineTo(0, canvas.height - imay);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    $('#graph-ticks').removeAttribute('disabled');
    $('#graph-ticks').removeAttribute('checked');
    }
    else {
    $('#graph-ticks').disabled = 'disabled';
    $('#graph-ticks').checked = initChecked;
    }

    // Draw all of the gridlines
    for (var i = -canvas.width/2 - imay; i < canvas.width/2 - imay; i += 5) {
    ctx.strokeStyle = 'grey';
    // Determine whether to do major or minor lines
    if ((i/5) % majorStep == 0) ctx.lineWidth = 0.25;
    else if ((i/5) % mS == 0) ctx.lineWidth = 0.125;
    else ctx.lineWidth = 0.03125;
    if ($('#graph-grids').checked) {
        // Draw quadrants I and IV
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(-canvas.width + toffxr, i);
        ctx.lineTo(canvas.width + toffxr, i);
        ctx.stroke();
        // Draw quadrants II and III
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(-canvas.width - toffxr, i);
        ctx.lineTo(canvas.width - toffxr, i);
        ctx.stroke();
    }
    // Draw tick marks if selected
    if ($('#graph-ticks').checked && (i/5) % mS == 0) {
        // Number($('#graph-tick-height').value)
        ctx.lineWidth = 0.5;
        // Draw quadrants I and IV
        // Horizontal
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(-Number($('#graph-tick-height').value), i);
        ctx.lineTo(Number($('#graph-tick-height').value), i);
        ctx.stroke();
        // Draw quadrants II and III
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(-Number($('#graph-tick-height').value), i);
        ctx.lineTo(Number($('#graph-tick-height').value), i);
        ctx.stroke();
    }
    }
    for (var i = -canvas.height/2 - imax; i < canvas.height/2 - imax; i += 5) {
    ctx.strokeStyle = 'grey';
    // Determine whether to do major or minor lines
    if ((i/5) % majorStep == 0) ctx.lineWidth = 0.25;
    else if ((i/5) % mS == 0) ctx.lineWidth = 0.125;
    else ctx.lineWidth = 0.03125;
    if ($('#graph-grids').checked) {
        // Draw quadrants I and IV
        // Vertical
        ctx.beginPath();
        ctx.moveTo(i, -canvas.height - toffyr);
        ctx.lineTo(i, canvas.height - toffyr);
        ctx.stroke();
        // Draw quadrants II and III
        // Vertical
        ctx.beginPath();
        ctx.moveTo(-1 * i, -canvas.height - toffyr);
        ctx.lineTo(-1 * i, canvas.height - toffyr);
        ctx.stroke();
    }
    // Draw tick marks if selected
    if ($('#graph-ticks').checked && (i/5) % mS == 0) {
        // Number($('#graph-tick-height').value)
        ctx.lineWidth = 0.5;
        // Draw quadrants I and IV
        // Vertical
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(i, -Number($('#graph-tick-height').value));
        ctx.lineTo(i, Number($('#graph-tick-height').value));
        ctx.stroke();
        // Draw quadrants II and III
        // Vertical
        ctx.beginPath();
        ctx.moveTo(-1 * i, -Number($('#graph-tick-height').value));
        ctx.lineTo(-1 * i, Number($('#graph-tick-height').value));
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
    if ($('#graph-ticks').checked) {
        ctx.beginPath()
        if (k % 6 == 0) {
        ctx.moveTo(i, -j + Number($('#graph-tick-height').value));
        ctx.lineTo(i, -j - Number($('#graph-tick-height').value));
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
    
    $('#xri-showcase').innerHTML = textx;
    $('#yri-showcase').innerHTML = texty;
}
// Solve the function for some X
function countOccurrences(str, search) {
    return str.split(search).length - 1;
}
function solve (x, i, solveComplex, whence, whichFunction = 1, roundTo = Number($('#trace-round').value)) {
    if (whence == undefined) whence = 1;
    // Read the function input
    let scope = {
    x: math.complex(x, i),
    tet: tet,
    };
    var functext = $('#function-input-' + whichFunction).value.toString();
    // Number formatting
    functext = functext.replace(',',''); // Commas into nothings
    // Operations
    functext = functext.replace(/([\d\w\)\.]+)\s*\^\^\s*([\d\w\(\)\.]+)/g, 'tet($1,$2)'); // Tetration
    functext = functext.replace('{','(').replace('}', ')'); // Minimal LaTeX cross-compatibility
    functext = functext.replace(/\|([^|]+)\|/g, 'abs($1)'); // Absolute value
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
    drawGrid(Number($('#graph-major-step').value), Number($('#graph-minor-step').value));

    // Loop to graph each function
    for (var f = 1; f <= nof; f++) {
    var colour = $('#function-colour-' + f).value;
    if (do3D) drawGrid3D();
    ctx.strokeStyle = colour;
    var preprecision = Number($('#trace-round').value);
    if (preprecision < -4) preprecision = -1;
    var precision = 5 * 10 ** preprecision;
    if (preprecision > 0) precision /= 5 * 5 ** (preprecision - 1);
    if (preprecision <= -1) precision = 2 ** (preprecision + 1);
    
    for (var i = -canvas.width/2 - $('#graph-offset-xr').value; i < canvas.width/2 - $('#graph-offset-xr').value; i += precision) {
        let width = 1;
        // The linear graph
        var xrt = i;
        var yrt = -solve(xrt, Number($('#xiv-input').value), false, 1, f);
        var yrit = -solve(xrt, Number($('#xiv-input').value), true, 1, f)
        var xrtNext = i + precision;
        var yrtNext = -solve(xrtNext, Number($('#xiv-input').value), false, 1, f);
        if ($('#graph-dimension-xi').checked) {
        yrt = -solve(Number($('#xiv-input').value), xrt, false, 1, f);
        yrtNext = -solve(Number($('#xiv-input').value), xrtNext, false, 1, f)
        }

        // Holes ( test and try (x-1)(x+1)/(x-1) )
        /*if (isHole(yrtNext) == true|| isHole(yrt) == true) {
        var xrtMext = i + 1 / 10 ** Number($('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number($('#xiv-input').value), false, 1, f);
        
        if (isHole(yrtNext) == true) {
            yrtNext = (yrtMext != undefined) ? yrtMext: 0;
        }
        if (isHole(yrt) == true) {
            yrt = (yrtMext != undefined) ? yrtMext: 0;
            ctx.beginPath();
            ctx.arc(scale * xrt, scale * yrt, 2, 0, 2 * Math.PI);
            ctx.fillStyle = $('#function-colour').value;
            ctx.fill();
            ctx.lineWidth = 0;
            ctx.stroke();
        }
        }*/
        // Vertical asymptotes
        if (!isFinite(yrtNext) && yrtNext != undefined) {
        var xrtMext = i + 1 / 10 ** Number($('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number($('#xiv-input').value), false, 1, f);
        yrtNext = (yrtMext > 0) ? -360 : 360;
        }

        else if (!isFinite(yrt) && yrt != undefined) {
        var xrtMext = i + 1 / 10 ** Number($('#trace-round').value);
        var yrtMext = -solve(xrtMext, Number($('#xiv-input').value), false, 1, f);
        yrt = (yrtMext > 0) ? 360 : -360;
        }
        if (yrit != -Number($('#xiv-input').value)) {
        ctx.strokeStyle = 'silver';
        ctx.lineWidth = width * 6;
        }
        else {
        ctx.strokeStyle = colour;
        ctx.lineWidth = width;
        }
        if (i != -canvas.width/2 - $('#graph-offset-xr').value) {
        ctx.lineWidth = width;
        ctx.moveTo(scale * xrt, scale * yrt);
        ctx.lineTo(scale * xrtNext, scale * yrtNext);
        ctx.stroke();
        }
        // The pointed graph
        if (i % Number($('#graph-minor-step').value) == 0 && $('#graph-points').checked) {
        // Positive x point
        ctx.beginPath();
        ctx.arc(scale * xrt, scale * yrt, 1.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        // Negative x point
        var xrtNeg = -i;
        var yrtNeg = -solve(xrtNeg, Number($('#xiv-input').value), false, 1, f);
        ctx.beginPath();
        ctx.arc(scale * xrtNeg, scale * yrtNeg, 1.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        }
    }
    }
}