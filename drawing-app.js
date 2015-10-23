// init some var
var canvas;
var context;
var padding = 25;
var lineWidth = 8;
var canvasWidth = 290;
var canvasHeight = 220;
var colorPurple = "#cb3594";
var colorRed = "#df4b26";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var curColor = colorRed;
var curSize = 5;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var clickTool = new Array();
var curTool = 1; // Crayon -> 1 | Eraser -> 0 | Marker -> 2
var paint;

function initCanvas() 
{
/** Creation Canvas **/
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");
    $('#canvasDiv').bind('click', function(e){e.stopPropagation(); e.preventDefault();});
    $('#canvasDiv').bind('mousedown', function(e){e.stopPropagation(); e.preventDefault();});
    $('#canvasDiv').bind('mousemove', function(e){e.stopPropagation(); e.preventDefault();});
    $('#canvasDiv').bind('mouseup', function(e){e.stopPropagation(); e.preventDefault();});
    $('#canvasDiv').bind('mouseleave', function(e){e.stopPropagation(); e.preventDefault();});
 /**END INIT CANVAS **/
}

// Function prepareCanvas : Initiation of the canvas & differents events.
function prepareCanvas(eventclick)
{
 		var canvasDiv = document.getElementById('canvasDiv');
    $('#canvasDiv').css({position : 'absolute', left : eventclick.pageX - ($('#wallBox').position().left + (canvasWidth / 2)), top : eventclick.pageY - ($('#wallBox').position().top + (canvasHeight / 2))});
    $('#editGraffitiWindow').dialog();
    $('#canvasDiv').show();

// Event Mouse Down : save mouseX & mouseY in an array via addClick function.
	$('#canvas').mousedown(function(e){
	    var mouseX = e.pageX - $('#wallBox').position().left - $('#canvasDiv').position().left;
	    var mouseY = e.pageY - $('#wallBox').position().top - $('#canvasDiv').position().top;

	  paint = true; // return true 'cause we wanna draw
	    addClick(mouseX, mouseY); // record the position in an array
	    console.log("Mouse X = ", mouseX);
	    console.log("Mouse Y = ", mouseY);
	  redraw(); // update the canvas
	});

// Event Mouse's moving
	$('#canvas').mousemove(function(e){
	    var mouseX = e.pageX - $('#wallBox').position().left - $('#canvasDiv').position().left;
	    var mouseY = e.pageY - $('#wallBox').position().top - $('#canvasDiv').position().top;
		
	    if(paint){ // if paint === true
	    addClick(mouseX, mouseY, true); // record the position in an array
	    redraw(); // update the canvas
	  }
	});


// Event Mouse Up : when u don't press the mouse's button to draw something
	$('#canvas').mouseup(function(e){
	  paint = false;
	});

// Event Mouse Leave : when the mouse's button is press but the cursor is not in the canvas zone.
	$('#canvas').mouseleave(function(e){
	  paint = false;
	});
}

//Function addClick : update differents arrays
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
  clickTool.push(curTool);
}

// Function redraw : clear the canvas zone and redraw. NEED OPTIMISATION !
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.lineJoin = "round";
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     if (clickTool[i] == 0) {
	context.strokeStyle = 'white';
     }else{
     context.strokeStyle = clickColor[i];
     }
    context.lineWidth = clickSize[i]; 
    context.stroke();
  }
}

//Function clearCanvas : clear the canvas.
function clearCanvas()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	clickX.length = 0;
	clickY.length = 0;
	clickDrag.length = 0;
	clickColor.length = 0;
	clickSize.length = 0;
	clickTool.length = 0;
}

// Function SaveCanvas : save the canvas in a img png.
function SaveCanvas()
{
var img2 = canvas.toDataURL("image/png");
	window.location = canvas.toDataURL("image/png");
    $("#editGraffitiWindow").hide();
    $('#canvasDiv').hide();
}

// Function FillCanvas : fill the canvas zone with the color.
function FillCanvasoldversion()
{
	clearCanvas();
	var tmp = 0;
	while (tmp != canvasHeight) {
		for(var i = 0; i != canvasWidth; i++) {
		  clickX.push(i);
	       	  clickY.push(tmp);
	 	 clickDrag.push(true);
	 	 clickColor.push(curColor);
	 	 clickSize.push(5);
	 	 clickTool.push(1);
		}
	tmp++;
	}
redraw();
}

function FillCanvas()
{
    clearCanvas();
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = curColor;
}