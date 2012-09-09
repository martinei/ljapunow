function Renderer(element) {
	var x0 = 3;
	var y0 = 3;
	var x1 = 4;
	var y1 = 4;

	var context = element.getContext("2d");
	var width = element.width;
	var height = element.height;

	// privileged function
	this.renderImage = function () {
		var imageData = context.createImageData(width, height);
		var pos = 0; // index position into imagedata array
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				// calculate sine based on distance
				var realx = x0 + x*(x1-x0)/width;
				var realy = y0 + y*(y1-y0)/height;

				var sum = 0
				var value = 0.5
				var itercount = 200
				for (i = 0; i < itercount;i++) {
					if (i % 2 == 0) {
						r = realx
					} else r = realy
					value = value * r* (1-value)
					sum +=  Math.log (Math.abs(r*(1-2*value)))
				}

				sum = sum /itercount
				var r
				if (sum > 0){r = 0 } else {r = -sum*500}

				var g = r*2
				var b = r

				// set red, green, blue, and alpha:
				imageData.data[pos++] = Math.max(0,Math.min(255, r));
				imageData.data[pos++] = Math.max(0,Math.min(255, g));
				imageData.data[pos++] = Math.max(0,Math.min(255, b));
				imageData.data[pos++] = 255; // opaque alpha
			}
		}

		// copy the image data back onto the canvas
	context.putImageData(imageData, 0, 0); // at coords 0,
	}
}


	element = document.getElementById("myCanvas");
	myrenderer = new Renderer(element);

function clicked() {
	myrenderer.renderImage()
}
