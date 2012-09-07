imageData = null

x0 = 3;
y0 = 3   ;
x1 = 4;
y1 = 4;


	element = document.getElementById("myCanvas");
	c = element.getContext("2d");
	width = element.width;
	height = element.height;
 clicked()

function renderImage(context) {
		if (imageData == null) {	
		imageData = context.createImageData(width, height);
		}
		pos = 0; // index position into imagedata array
 	for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				// calculate sine based on distance
				realx = x0 + x*(x1-x0)/width;
				realy = y0 + y*(y1-y0)/height;

             sum = 0
             value = 0.5
             itercount = 200
             for (i = 0; i < itercount;i++) {
                 if (i % 2 == 0) {
                     r = realx
                 } else r = realy
                 value = value * r* (1-value)
                 sum +=  Math.log (Math.abs(r*(1-2*value)))
             }

             sum = sum /itercount
             if (sum > 0){r = 0 } else {r = -sum*500}

				g = r*2
				b = r

				// set red, green, blue, and alpha:
				imageData.data[pos++] = Math.max(0,Math.min(255, r));
				imageData.data[pos++] = Math.max(0,Math.min(255, g));
				imageData.data[pos++] = Math.max(0,Math.min(255, b));
				imageData.data[pos++] = 255; // opaque alpha
			}
		}

		 // copy the image data back onto the canvas
 	c.putImageData(imageData, 0, 0); // at coords 0,
	}

 
 function clicked() {
		renderImage(c)
	}

