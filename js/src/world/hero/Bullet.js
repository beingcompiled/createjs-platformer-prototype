function Bullet(_x, _y) {
	
	this.id = "bullet";
	this.x = _x;
	this.y = _y;
	this.rotation = 0;
	this.life = 120;
	
	var size = 3;

	var fixDef = b2.get_fixDef(.5,.5,.25);
	fixDef.shape = new b2.PolygonShape;
	fixDef.shape.SetAsBox(math.p2m(size), math.p2m(size));

	var bodyDef = new b2.BodyDef;
	bodyDef.type = b2._dynamicBody;
	bodyDef.position.x = math.p2m(this.x);
	bodyDef.position.y = math.p2m(this.y) - 1;

	this.body = world.physics.CreateBody(bodyDef);
	this.body.CreateFixture(fixDef);
	this.body.SetUserData(this);
	this.body.SetBullet(true);
	
	this.skin = new createjs.Shape();
	this.skin.graphics.beginFill("white").beginStroke("black").moveTo(0,0).lineTo(size*2,0).lineTo(size*2,size*2).lineTo(0,size*2).lineTo(0,0).endFill();

	world.level.main.addChild(this.skin);
	
	return this;
};

Bullet.prototype.beginContactHandler = function(contact) {
	
	var a = contact.GetFixtureA().GetBody().GetUserData(),
		b = contact.GetFixtureB().GetBody().GetUserData();
 	
	if	(a.id && b.id != "hero") {
		if (a.id == "bullet") {
			a.destroy();
		}
		if (b.id == "bullet") {
			b.destroy();
		}
	}
	if (a.id == "dwarf") {
		a.hit();
	}
	if (b.id == "dwarf") {
		b.hit();
	}
};

Bullet.prototype.shoot = function(mouseX, mouseY, playerX, playerY) {

	var dx = mouseX - (app.WIDTH*.5),
		//dy = (playerY < world.HEIGHT * .15) ? mouseY - (world.HEIGHT - playerY) : mouseY - (world.HEIGHT*.5),
		dy = mouseY - app.HEIGHT,
		radians = Math.atan2(dy,dx),
		degrees = math.r2d(radians),
		dist = Math.sqrt(dx*dx+dy*dy),
		power = dist*.001,
		vX, vY;
		
	(degrees < -90) ? vX = radians : vX = -radians;
	this.body.ApplyImpulse(new b2.Vec2(Math.cos(vX)*power, Math.sin(radians)*power), this.body.GetWorldCenter());
	
	var n = math.rdm(0,1);
	createjs.SoundJS.play("shoot"+n);
};

Bullet.prototype.update = function() {

	this.rotation = this.skin.rotation = math.d2r(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
		
	this.life--;
	if (this.life < 0) {
	 	world.level.destroy.push(this);
	}
};

Bullet.prototype.destroy = function() {
	world.level.destroy.push(this);	
};