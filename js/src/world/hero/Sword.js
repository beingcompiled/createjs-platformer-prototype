function Sword(hero) {
	
	var x = hero.x,
		y = hero.y,
		w = hero.width,
		h = hero.height,
		density = 1,
		resitution = 1;
	
	this.id = "sword";
	
	this.o = {};
	this.o.w = w*.1;
	this.o.h = h*.5;
	
	if (hero.left == true) {
		//console.log("left");
		this.o.x = -(w*1.25);
		this.o.y = h*.45;
		this.o.r = -90;
	}
	else if (hero.right == true) {
		//console.log("right");
		this.o.x = (w*1.25);
		this.o.y = h*.45;
		this.o.r = 90;
	}
	else if (hero.up == true) {
		//console.log("up");
		this.o.x = 0;
		this.o.y = -h;
		this.o.r = 0;
	} else if (hero.down == true) {
		//console.log("down");
		this.o.x = 0;
		this.o.y = h*1.25;
		this.o.r = 0;
	} else {
		this.o.x = 0;
		this.o.y = -h;
		this.o.r = 0;
	}

	var swordBodyDef = new b2.BodyDef();
    swordBodyDef.type = b2._dynamicBody;
	swordBodyDef.position.x = hero.body.GetPosition().x;
	swordBodyDef.position.y = hero.body.GetPosition().y;
		
	var swordShape = new b2.PolygonShape();
	swordShape.SetAsOrientedBox(math.p2m(this.o.w), math.p2m(this.o.h), new b2.Vec2(math.p2m(this.o.x), math.p2m(this.o.y)), math.d2r(this.o.r));
	
	this.body = world.physics.CreateBody(swordBodyDef);
    this.body.SetUserData(this);

	var swordFixtureDef = new b2.FixtureDef();
	swordFixtureDef.shape = swordShape;
	swordFixtureDef.density = density;
	swordFixtureDef.restitution = resitution;
	//swordFixtureDef.isSensor = true;
	this.body.CreateFixture(swordFixtureDef);
	
	var jointDef = new b2.RevoluteJointDef;
	jointDef.Initialize(this.body, hero.body, hero.body.GetWorldCenter());
	 	jointDef.enableLimit = true;
	  	jointDef.lowerAngle = math.d2r(0);
	  	jointDef.upperAngle = math.d2r(0);
	  	jointDef.collideConnected = true;
	
	this.joint = world.physics.CreateJoint(jointDef);
	
		
	/* 
	//STAFF
	var swordBodyDef = new b2.BodyDef();
    swordBodyDef.type = b2._dynamicBody;
    swordBodyDef.position.x = b.GetPosition().x;
	swordBodyDef.position.y = b.GetPosition().y;
	
    this.body = world.physics.CreateBody(swordBodyDef);
    this.body.SetUserData(this);
	
	var swordShape = new b2.PolygonShape();
	swordShape.SetAsOrientedBox(math.p2m(w*.1), math.p2m(h*1.75), new b2.Vec2(0, 0), angle+math.d2r(90));

	var swordFixtureDef = new b2.FixtureDef();      
	swordFixtureDef.shape = swordShape;
	swordFixtureDef.density = 1; 
	swordFixtureDef.restitution = 1; 
	//swordFixtureDef.isSensor = true;     
	       
	this.body.CreateFixture(swordFixtureDef);

	var jointDef = new b2.RevoluteJointDef;
	jointDef.Initialize(this.body, b, b.GetWorldCenter());
		jointDef.collideConnected = true;
		//jointDef.upperAngle = .6;  
		//jointDef.lowerAngle = -.6;  
		//jointDef.enableLimit = true;
		jointDef.maxMotorTorque = 500;
		jointDef.motorSpeed = speed;
		jointDef.enableMotor = true;
		
	this.joint = world.physics.CreateJoint(jointDef);
	*/
	
	// this.skin = new createjs.Container();
	// var s = new createjs.Shape(),v
	// 	sW = w*.15,
	// 	sH = h*.75;
	// 	s.graphics.beginFill("white").drawRect(0,0, sW, sH);
	// 
	// this.skin.regX = sW*.5;
	// this.skin.regY = sH*.5;
	// this.skin.addChild(s);
	
	//world.level.main.addChild(this.skin);
	//world.level.bump.push(this);
		
	return this;
};

Sword.prototype.beginContactHandler = function(contact) {
	
	var a = contact.GetFixtureA().GetBody().GetUserData(),
		b = contact.GetFixtureB().GetBody().GetUserData();
 	
	if (a.id == "dwarf") {
		a.hit();
	}
	if (b.id == "dwarf") {
		b.hit();
	}
};

Sword.prototype.update = function() {
	
	// this.skin.rotation = this.o.r;
	// this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	// this.skin.y = math.m2p(this.body.GetWorldCenter().y);
};

Sword.prototype.destroy = function() {
	world.level.destroy.push(this);	
};