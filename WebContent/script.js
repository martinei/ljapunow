/*jslint vars: true, plusplus: true */

function Renderer(element) {
	
    var gl = null;

    var shaderProgram;
    var aVertexPosition = 0;

    var baseCorners = [[4.0, 4.0],
                       [2.0, 4.0],
                       [4.0, 2.0],
                       [2.0, 2.0]];
    	

		this.initGL = function(canvas) {
		try {
			gl = canvas.getContext("experimental-webgl");
			gl.viewportWidth = canvas.width;
			gl.viewportHeight = canvas.height;
		} catch (e) {
			alert(e);
		}
		if (!gl) {
			alert("Failed to use webl");
		}
	};
    
	this.getShader = function (gl, id) {
	    var shaderScript = document.getElementById(id);
	    if (!shaderScript) {
	        return null;
	    }
	    var str = $('script#'+id).html();
	    var shader;
	    if (shaderScript.type == "x-shader/x-fragment") {
	        shader = gl.createShader(gl.FRAGMENT_SHADER);
	    } else if (shaderScript.type == "x-shader/x-vertex") {
	        shader = gl.createShader(gl.VERTEX_SHADER);
	    } else {
	        return null;
	    }
	    gl.shaderSource(shader, str);
	    gl.compileShader(shader);
	    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        alert(gl.getShaderInfoLog(shader));
	        return null;
	    }
	    return shader;
	};

	this.initShaders = function () {
		var fragmentShader = this.getShader(gl, "shader-fs");
		var vertexShader =  this.getShader(gl, "shader-vs");
		shaderProgram = gl.createProgram();
	    gl.attachShader(shaderProgram, vertexShader);
	    gl.attachShader(shaderProgram, fragmentShader);
	    gl.linkProgram(shaderProgram);
	    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	        alert("Could not initialise shaders");
	    }
	    gl.useProgram(shaderProgram);
	    aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	    gl.enableVertexAttribArray(aVertexPosition);
	    aPlotPosition = gl.getAttribLocation(shaderProgram, "aPlotPosition");
	    gl.enableVertexAttribArray(aPlotPosition);
	};
	
	var centerOffsetX = 0;
	var centerOffsetY = 0;
	var zoom =1;

	var vertexPositionBuffer = null;

	this.initBuffers = function() {
	    vertexPositionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	    var vertices = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, ];
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	    vertexPositionBuffer.itemSize = 2;
	    vertexPositionBuffer.numItems = 4;
	};

	this.drawScene = function() {
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.vertexAttribPointer(aVertexPosition, vertexPositionBuffer.itemSize,
				gl.FLOAT, false, 0, 0);
		var plotPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, plotPositionBuffer);
		var cornerIx=0;
		corners = [];
		for (cornerIx in baseCorners) {
			x = baseCorners[cornerIx][0];
			y = baseCorners[cornerIx][1];
			corners.push(x / zoom + centerOffsetX);
			corners.push(y / zoom + centerOffsetY);
		}
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(corners),
				gl.STATIC_DRAW);
		gl.vertexAttribPointer(aPlotPosition, 2, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		gl.deleteBuffer(plotPositionBuffer);
		zoom *= 1.02;
	};

    // Start of Constructor Code
    
    this.initGL(element);	
    this.initShaders();
    this.initBuffers();
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	


}


var canvas = document.getElementById("myCanvas");
var myRenderer = new Renderer(canvas);


function clicked() {
    console.log ();
	myRenderer.drawScene();
}
