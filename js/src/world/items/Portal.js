function Portal(_id, _container, _x, _y) {
	
	this.id = _id;
	this.x = _x;
	this.y = _y;
	this.rotation = 0;
	this.life = 2;
	
	var w = 60;
		h = 120;
	
	var fixDef = new b2.FixtureDef;
	fixDef.density = 1;
	fixDef.restitution = 0;
	fixDef.friction = 1;
	fixDef.shape = new b2.PolygonShape;
	fixDef.shape.SetAsBox(math.p2m(w*.5), math.p2m(h*.5));
	fixDef.isSensor = true;

	var bodyDef = new b2.BodyDef;
	bodyDef.type = b2._staticBody;
	bodyDef.position.x = math.p2m(this.x);
	bodyDef.position.y = math.p2m(this.y);

	this.body = world.physics.CreateBody(bodyDef);
	this.body.CreateFixture(fixDef);
    this.body.SetFixedRotation(true);
	this.body.SetUserData(this);
	this.body.mass = 1000;
	
	this.skin = new createjs.Container();
	var fill = new createjs.Shape(),
		stroke = new createjs.Shape();
	fill.graphics.beginFill("black").drawRect(-w*.5, -h*.5, w, h).endFill();
	fill.alpha = .25;
	stroke.graphics.setStrokeStyle(2).beginStroke("white").drawRect(-w*.5, -h*.5, w, h).endFill();
	stroke.alpha = .75;
	this.skin.addChild(fill);
	this.skin.addChild(stroke);
	
	_container.addChild(this.skin);
	
	return this;
};

Portal.prototype.beginContactHandler = function(contact) {
	
	var a = contact.GetFixtureA().GetBody().GetUserData(),
		b = contact.GetFixtureB().GetBody().GetUserData();
 	
	if (a.id == "hero") {
		world.new_level();
		createjs.SoundJS.play("portal", createjs.SoundJS.INTERRUPT_NONE);
	}
	if (b.id == "hero") {
		world.new_level();
		createjs.SoundJS.play("portal", createjs.SoundJS.INTERRUPT_NONE);
	}
};

Portal.prototype.update = function() {

	//this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
};