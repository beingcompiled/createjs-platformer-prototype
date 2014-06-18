function Box(_id, container, x, y, w, h, r, c_fill) {
	
	this.id = _id;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.rotation = r;
	this.body = {};
	this.skin = {}; 
	
	var fixDef = b2.get_fixDef(1,0,1);
	fixDef.shape = new b2.PolygonShape;
	fixDef.shape.SetAsBox(math.p2m(this.width)/2, math.p2m(this.height)/2);

	this.body = world.physics.CreateBody(b2.get_bodyDef(b2._staticBody, this.x, this.y, this.rotation));
	this.body.CreateFixture(fixDef);
	this.body.SetUserData(this);
	
	this.skin = new createjs.Container();
	this.skin.regX = this.width*.5;
	this.skin.regY = this.height*.5;
    
	var s = new createjs.Shape();
	//this.drawIrregularRect(s, 0, 0, w, h, c_fill, c_fill);
	s.graphics.beginFill(c_fill).drawRect(0, 0, this.width, this.height).endFill();
	this.skin.addChild(s);
	container.addChild(this.skin);
	
	this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
	
	return this;
};

Box.prototype.drawIrregularRect = function(s, x0, y0, w, h, lineColor, fillColor) {
	
		var cornerDrift = 3;
		var drawDriftX = 3;
		var drawDriftY = 3;
		var corner = [];
		var driftVector = [];
		var pointList;
		var i,j;
		var nextCorner;
		var iterates = 8;
		var nextX, nextY;
		var functionPoint;
		var endpointY;
		
		x0 += cornerDrift*(2*Math.random()-1);
		y0 += cornerDrift*(2*Math.random()-1);
		
		for (i = 0; i < 4; i++) {
			corner[i] = {};
		}
		
		corner[0].x = x0 + cornerDrift*(Math.random()*2 - 1);
		corner[0].y = y0 + cornerDrift*(Math.random()*2 - 1);
		
		corner[1].x = x0 + w + cornerDrift*(Math.random()*2 - 1);
		corner[1].y = y0 + cornerDrift*(Math.random()*2 - 1);
		
		corner[2].x = x0 + w + cornerDrift*(Math.random()*2 - 1);
		corner[2].y = y0 + h + cornerDrift*(Math.random()*2 - 1);
		
		corner[3].x = x0 + cornerDrift*(Math.random()*2 - 1);
		corner[3].y = y0 + h + cornerDrift*(Math.random()*2 - 1);
		
		driftVector[0] = {x:0, y:drawDriftY};
		driftVector[1] = {x:drawDriftX, y:0};
		driftVector[2] = {x:0, y:drawDriftY};
		driftVector[3] = {x:drawDriftX, y:0};
		
		s.graphics.beginFill(fillColor).moveTo(corner[0].x, corner[0].y);
		for (i = 0; i < 4; i++) {
			nextCorner = corner[(i + 1) % 4];
			pointList = setLinePoints(iterates);
			functionPoint = pointList.first;
			endpointY = functionPoint.y;
			while (functionPoint != null) {
				nextX = corner[i].x + functionPoint.x*(nextCorner.x - corner[i].x);
				nextY = corner[i].y + functionPoint.x*(nextCorner.y - corner[i].y);
				nextX += driftVector[i].x*(functionPoint.y - endpointY);
				nextY += driftVector[i].y*(functionPoint.y - endpointY);
				s.graphics.lineTo(nextX, nextY);
				functionPoint = functionPoint.next;
			}
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
			var ratio;

			var minRatio = 0.33;

			pointList.first.next = lastPoint;
			for (var i = 0; i < iterations; i++) {
				point = pointList.first;
				while (point.next != null) {
					nextPoint = point.next;

					ratio = minRatio + Math.random()*(1 - 2*minRatio);
					newX = point.x + ratio*(nextPoint.x - point.x);

					//find the smaller interval
					if (ratio < 0.5) {
						dx = newX - point.x;
					}
					else {
						dx = nextPoint.x - newX;
					}

					newY = point.y + ratio*(nextPoint.y - point.y);
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
}

/*
Box.prototype.update = function() {

	this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
};
*/

/*
Box.prototype.setPosition = function(x,y) {

	this.x = x;
	this.y = y;
	this.body.SetPosition(new b2.Vec2(math.p2m(x), math.p2m(y)));
};
*/
