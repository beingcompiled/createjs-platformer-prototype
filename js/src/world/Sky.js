function Sky() {
	
	var num_clouds = math.rdm(0,20),
		num_moons = math.rdm(0,5),
		num_stars = math.rdm(0,100);
		c_stars = palettes.get_random_color();
		
	var sky = new createjs.Container();
	
	for (var i=0; i<num_stars; i++) {
		
		var star= new createjs.Shape(),
			star_size = math.rdm(2.5, 3.5);
			
		star.graphics.beginFill(c_stars).drawRect(0, 0, star_size, star_size).endFill();
		star.x = math.rdm(0, world.WIDTH);
		star.y = math.rdm(0, world.HEIGHT*.25);
		star.alpha = math.rdm(.5,1);
		sky.addChild(star);
	}

	for (var i=0; i<num_moons; i++) {
		
		var moon = new createjs.Shape(),
			moon_size = math.rdm(50, 400);
		
		//drawIrregularCircle(moon, moon_size);
		moon.graphics.beginFill(palettes.get_random_color()).beginStroke(palettes.get_random_color()).drawCircle(moon_size, moon_size, moon_size).endFill();
		moon.x = math.rdm(0, world.WIDTH);
		moon.y = math.rdm(0, world.HEIGHT) - world.HEIGHT*.75;
		sky.addChild(moon);
	}
	
	var color_clouds = palettes.get_random_color();
	for (var i=0; i<num_clouds; i++) {
		var cloud = new createjs.Shape(),
			cloud_height = math.rdm(10,15);
		for (var j=0; j<math.rdm(3,6); j++) {
			var cloud_width = math.rdm(100, app.WIDTH*.25);
			cloud.graphics.beginFill(color_clouds).drawRoundRect(math.rdm(0, cloud_width), (j*cloud_height)+cloud_height, cloud_width, cloud_height, 25).endFill();
		}
		cloud.x = math.rdm(0, world.WIDTH); 
		cloud.y = math.rdm(0, world.HEIGHT*.25);
		cloud.alpha = .5;
		sky.addChild(cloud);
	}
	
	function setLinePoints(iterations) {
		var pointList = {};
		pointList.first = {x:0, y:1};
		var lastPoint = {x:1, y:1}
		var minY = 1;
		var maxY = 1;
		var point;
		var nextPoint;
		var dx, newX, newY;

		pointList.first.next = lastPoint;
		for (var i = 0; i < iterations; i++) {
			point = pointList.first;
			while (point.next != null) {
				nextPoint = point.next;
				
				dx = nextPoint.x - point.x;
				newX = 0.5*(point.x + nextPoint.x);
				newY = 0.5*(point.y + nextPoint.y);
				newY += dx*(Math.random()*2 - 1);
				
				var newPoint = {x:newX, y:newY};
				
				//min, max
				if (newY < minY) {
					minY = newY;
				}
				else if (newY > maxY) {
					maxY = newY;
				}
				
				//put between points
				newPoint.next = nextPoint;
				point.next = newPoint;
				
				point = nextPoint;
			}
		}
		
		//normalize to values between 0 and 1
		if (maxY != minY) {
			var normalizeRate = 1/(maxY - minY);
			point = pointList.first;
			while (point != null) {
				point.y = normalizeRate*(point.y - minY);
				point = point.next;
			}
		}
		//unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
		else {
			point = pointList.first;
			while (point != null) {
				point.y = 1;
				point = point.next;
			}
		}
		
		return pointList;
	}
		//centerX, centerY, minRad, maxRad, phase
	function drawIrregularCircle(s, size) {
		var point;
		var rad, theta;
		var twoPi = 2*Math.PI;
		var x0,y0;
		var minRad = size - 10;
		var maxRad = size + 10;
		var phase = size;
		
		//generate the random function that will be used to vary the radius, 9 iterations of subdivision
		var pointList = setLinePoints(8);
		point = pointList.first;
		theta = phase;
		rad = minRad + point.y*(maxRad - minRad);
		x0 = 0 + rad*Math.cos(theta);
		y0 = 0 + rad*Math.sin(theta);
		s.graphics.beginFill(palettes.get_random_color()).beginStroke(palettes.get_random_color()).lineTo(x0, y0);
		while (point.next != null) {
			point = point.next;
			theta = twoPi*point.x + phase;
			rad = minRad + point.y*(maxRad - minRad);
			x0 = 0 + rad*Math.cos(theta);
			y0 = 0 + rad*Math.sin(theta);
			s.graphics.lineTo(x0, y0);
		}
	}
	
	return sky;
};

