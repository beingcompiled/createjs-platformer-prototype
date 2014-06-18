function Potion(_id, _container, _x, _y) {
	
	this.id = _id;
	this.x = _x;
	this.y = _y;
	this.rotation = 0;
	this.life = 2;
	
	var size = 20;
		half = size*.5;
	
	var fixDef = b2.get_fixDef(1,0,1);
	fixDef.shape = new b2.PolygonShape;
	fixDef.shape.SetAsBox(math.p2m(half), math.p2m(half));

	var bodyDef = new b2.BodyDef;
	bodyDef.type = b2._dynamicBody;
	bodyDef.position.x = math.p2m(this.x);
	bodyDef.position.y = math.p2m(this.y);
	
	this.body = world.physics.CreateBody(b2.get_bodyDef(b2._dynamicBody, this.x, this.y, this.rotation));
	this.body.CreateFixture(fixDef);
    this.body.SetFixedRotation(true);
	this.body.SetUserData(this);
	
	this.skin = new createjs.Container();
	var fill = new createjs.Shape();
	fill.graphics.beginFill("red").beginStroke("black").drawRect(-half, -half, half, size).endFill();
	this.skin.addChild(fill);
	
	_container.addChild(this.skin);
	
	return this;
};

Potion.prototype.beginContactHandler = function(contact) {
	
	var a = contact.GetFixtureA().GetBody().GetUserData(),
		b = contact.GetFixtureB().GetBody().GetUserData();
 	
	if (a.id == "hero") {
		a.addLife(this.life);
		a.body.ApplyImpulse(new b2.Vec2(0, math.rdm(10,30)), this.body.GetPosition());
		world.level.destroy.push(this);
		createjs.SoundJS.play("drink", createjs.SoundJS.INTERRUPT_NONE);
	}
	if (b.id == "hero") {
		b.addLife(this.life);
		b.body.ApplyImpulse(new b2.Vec2(0, math.rdm(10,30)), this.body.GetPosition());
		world.level.destroy.push(this);
		createjs.SoundJS.play("drink", createjs.SoundJS.INTERRUPT_NONE);
	}
};

Potion.prototype.update = function() {

	//this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
};