function Hero(x, y, w, h) {
	
	this.id = "hero";
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.rotation = 0;
	this.skin;
	
	this.maxLife = 10;
	this.life = 10;
	
	this.SPEED = 9;
	this.speed = this.SPEED;
	this.speedWithSword = this.SPEED*.75;
	
	this.jumpHeight = 15;
	this.canJump = false;
	this.canDuck = false;
	this.isDucking = false;
		
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	
	this.density = 1;
	this.restitution = .25;
	this.friction = 0;
	
	this.impulseX = 0;
	this.impulseY = 0;
	
	this.sword = {};
	this.hasSword = false;
	this.maxCrate = 6;
	this.crates = 0;

	
	this.create_body = function(_x,_y,_w,_h) {
				
		var fixDef = b2.get_fixDef(this.density, this.restitution, this.friction);
		fixDef.shape = new b2.PolygonShape;
		fixDef.shape.SetAsBox(_w,_h);
	
		var bodyDef = b2.get_bodyDef(b2._dynamicBody, _x, _y, 0);
		
		var body = world.physics.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		body.SetFixedRotation(true);
		body.SetUserData(this);
		
		return body;
	};
	this.body = this.create_body(
		
		math.p2m(this.x), 
		math.p2m(this.y), 
		math.p2m(this.width*.5), 
		math.p2m(this.height*.5)
	);
	
	this.create_foot = function(b) {

		var fixDef = b2.get_fixDef(1, .35, 1);
		fixDef.shape = new b2.PolygonShape;
		fixDef.shape.SetAsOrientedBox(math.p2m(this.width*.4), math.p2m(this.height*.2), new b2.Vec2(0, 0.8), 0);
		var foot = b.CreateFixture(fixDef);
			foot.SetUserData("foot");
		
		return foot;
	};
	this.foot = this.create_foot(this.body);
	
	this.skin = new BatSkin(this.width, this.height);
	world.level.main.addChild(this.skin.asset);
	
	this.body.ApplyImpulse(new b2.Vec2(0, -this.jumpHeight), this.body.GetPosition());
	
	return this;
};

Hero.prototype.beginContactHandler = function(contact) {
	
	var a = contact.GetFixtureA().GetBody().GetUserData(),
		b = contact.GetFixtureB().GetBody().GetUserData();
 	
	if (a.id == "dwarf") {
		this.life--;
		world.player.body.ApplyImpulse(new b2.Vec2(0, math.rdm(20,50)), this.body.GetPosition());
		this.skin.hit(this.life);
		createjs.SoundJS.play("ouch", createjs.SoundJS.INTERRUPT_NONE);
	}
	if (b.id == "dwarf") {
		this.life--;
		world.player.body.ApplyImpulse(new b2.Vec2(0, math.rdm(20,50)), this.body.GetPosition());
		this.skin.hit(this.life);
		createjs.SoundJS.play("ouch", createjs.SoundJS.INTERRUPT_NONE);
	}
};

Hero.prototype.addLife = function(n) {
	if (this.life + n < this.maxLife) { 
		this.life += n;
	} else {
		this.life = this.maxLife;
	}
	this.skin.hit(this.life);
}


/* 


HERO POWER 


*/


Hero.prototype.sheath = function() {
	
	if (this.hasSword == true) {
		this.speed = this.SPEED;
		this.hasSword = false;
		this.canDuck = true;
		this.sword.destroy();
		this.skin.sheath();
	}
};

Hero.prototype.attack = function() {

	if (this.hasSword == false && this.isDucking == false) {
		this.speed = this.speedWithSword * .85;
		this.hasSword = true;
		this.canDuck = false;
		this.sword = new Sword(this);
		this.skin.shoot(this);
		
		var n = math.rdm(0,1);
		createjs.SoundJS.play("sword"+n, createjs.SoundJS.INTERRUPT_NONE);
	}
};

Hero.prototype.shoot = function(mouseX, mouseY){
	
	var bullet = new Bullet(this.x, this.y);
	world.level.bump.push(bullet);	
	bullet.shoot(mouseX, mouseY, this.x, this.y);
};

Hero.prototype.duck = function() {
	
	if (this.canDuck == true) {
		if (this.isDucking == false) {
			this.speed = this.SPEED *.25;
			this.isDucking = true;
			world.physics.DestroyBody(this.body);
			this.body = this.create_body(
				this.x, 
				this.y, 
				math.p2m(this.width*.5), 
				math.p2m(this.height*.05)
			);
			this.foot = this.create_foot(this.body);
			this.skin.duck();
		}
	}	
};

Hero.prototype.standup = function() {

	if (this.isDucking == true) {
		this.speed = this.SPEED;
		this.isDucking = false;
		world.physics.DestroyBody(this.body);
		this.body = this.create_body(
			this.x, 
			this.y, 
			math.p2m(this.width*.5), 
			math.p2m(this.height*.5)
		);
		this.foot = this.create_foot(this.body);
		this.skin.standup();
	}
};

Hero.prototype.levitate = function() {
	
	//var powerX = Math.random() < 0.5 ? -1 : 1;
	var	powerY = math.rdm(.5,2) * .1;
	this.body.ApplyImpulse(new b2.Vec2(0, -world.gravity*powerY), this.body.GetPosition());
	createjs.SoundJS.play("levitate", createjs.SoundJS.INTERRUPT_NONE);
};


Hero.prototype.conjureCrate = function(_x, _y) {

	if (this.crates < this.maxCrate) {
		var crate = new Crate("crate", this.x, this.y, 50);
		world.level.bump.push(crate);
		this.crates++;
	}
};

Hero.prototype.teleport = function() {

	var randomY = -(app.HEIGHT + math.rdm(0, app.HEIGHT));
	this.body.SetPosition(new b2.Vec2(math.p2m(Math.random()*world.WIDTH), math.p2m(randomY)));
	createjs.SoundJS.play("teleport", createjs.SoundJS.INTERRUPT_NONE);
};

Hero.prototype.spawn = function() {
	
	console.log("spawn");
	this.life = this.maxLife;
	this.skin.hit(this.life);
	this.body.SetPosition(new b2.Vec2(math.p2m(app.WIDTH*.2), math.p2m(-app.HEIGHT*.5)));
}

Hero.prototype.update = function() {
		
	if (this.y > world.HEIGHT*2) {
		this.body.SetPosition(new b2.Vec2(math.p2m(app.WIDTH*.25), math.p2m(-app.HEIGHT*.5)));
		createjs.SoundJS.play("fall", createjs.SoundJS.INTERRUPT_NONE);
	}
	
	if (this.life <= 0) {
		world.player.spawn();
		createjs.SoundJS.play("fall", createjs.SoundJS.INTERRUPT_NONE);
	}
		
	var vel = this.body.GetLinearVelocity(),
		desiredVel,
		velChange;
	
	if (this.left == true) {
		desiredVel = -this.speed;
		velChange = desiredVel - vel.x;
		this.impulseX = this.body.GetMass() * velChange;
	}
	
	if (this.right == true) {
		desiredVel = this.speed;
		velChange = desiredVel - vel.x;
		this.impulseX = this.body.GetMass() * velChange;
	}
		
	if (this.up == true) {
		if (this.canJump) {
			this.canJump = false;
			this.canDuck = false;
			desiredVel = -this.jumpHeight;
			velChange = desiredVel - vel.y;
			this.impulseY = this.body.GetMass() * velChange;
			
			var n = math.rdm(0,1);
			createjs.SoundJS.play("jump"+n, createjs.SoundJS.INTERRUPT_NONE);
	    }
	}
	
	if (this.canJump && this.isDucking == false) {
		if (this.left == true || this.right == true) {
			createjs.SoundJS.play("run");
		}
	}
	
	this.body.ApplyImpulse(new b2.Vec2(this.impulseX, this.impulseY), this.body.GetPosition());
	this.impulseY = 0;
	this.impulseX = 0;
		
	this.x = this.skin.asset.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.asset.y = math.m2p(this.body.GetWorldCenter().y);
		
	//anim skin
	this.skin.update(this);
};