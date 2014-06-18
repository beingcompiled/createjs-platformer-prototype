function Crate(_id, _x, _y, _size) {
	
	this.id = _id;
	this.x = _x;
	this.y = _y;
	this.rotation = 0;
	this.lifespan = 450;
	this.life = 0;
	this.size = _size;
	var half = _size*.5;
	
	var fixDef = new b2.FixtureDef;
	fixDef.density = .75;
	fixDef.restitution = .85;
	fixDef.friction = .25;
	fixDef.shape = new b2.PolygonShape;
	fixDef.shape.SetAsBox(math.p2m(half), math.p2m(half));

	var bodyDef = new b2.BodyDef;
	bodyDef.type = b2._dynamicBody;
	bodyDef.position.x = math.p2m(this.x);
	bodyDef.position.y = math.p2m(this.y)+1;

	this.body = world.physics.CreateBody(bodyDef);
	this.body.CreateFixture(fixDef);
    this.body.SetFixedRotation(true); //saves tons of calcs?
	this.body.SetUserData(this);
	
	this.skin = new createjs.Container();
	var fill = new createjs.Shape(),
		stroke = new createjs.Shape();
	fill.graphics.beginFill("blue").moveTo(-half,-half).lineTo(half,-half).lineTo(half,half).lineTo(-half,half).endFill();
	stroke.graphics.beginStroke("white").moveTo(-half,-half).lineTo(half,-half).lineTo(half,half).lineTo(-half,half).lineTo(-half,-half);
	fill.alpha = .15;
	stroke.alpha = .4;
	
	this.skin.addChild(fill);
	this.skin.addChild(stroke);
	
	world.level.main.addChild(this.skin);
	
	var n = math.rdm(0,1);
	createjs.SoundJS.play("crate"+n);
	
	return this;
};

Crate.prototype.update = function() {

	this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
	
	this.life++;
	if (this.life > this.lifespan) {
		if (world.player.crates > 0) {
			world.player.crates--;
		};
		world.level.destroy.push(this);
	}
};