function Dwarf(_id, container, _x, _y, size, c) {
	
	this.id = _id;
	this.x = _x;
	this.y = _y;
	this.width = size;
	this.height = size;
	this.rotation = 0;
	this.skin = new createjs.Container();
	this.enemy = true;
	this.life = 5;
	this.alpha = 1;
	
	this.speed = 12;
	this.jumpHeight = size*.5;
	
	this.impulseX = 0;
	this.impulseY = 0;
	
	this.anim_counter = 0;
	this.anim_counter_max = 150;
	this.damage_counter = 0;
	this.alternate = true;
	
	var w2 = this.width*.5,
		h2 = this.height*.5,
		c_fill = "black",
		c_stroke = "blue";
	
	this.create_body = function(_x,_y,_w,_h) {
		
		var fixDef = new b2.FixtureDef;
		fixDef.density = 1;
		fixDef.restitution = .5;
		fixDef.friction = .25;
		fixDef.shape = new b2.PolygonShape;
		fixDef.shape.SetAsBox(_w,_h);
	
		var bodyDef = new b2.BodyDef;
		bodyDef.type = b2._dynamicBody;
		bodyDef.position.x = _x;
		bodyDef.position.y = _y;

		var body = world.physics.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		body.SetFixedRotation(true);
		body.SetUserData(this);
		
		return body;
	};
	this.body = this.create_body(
		math.p2m(this.x), 
		math.p2m(this.y), 
		math.p2m(w2), 
		math.p2m(h2)
	);
	
	this.pupil = new createjs.Shape();
	this.damage = new createjs.Shape();
	this.draw_skin = function() {
		
		var coat = new createjs.Shape(),
			face = new createjs.Shape(),
			eye = new createjs.Shape(),
			mouth = new createjs.Shape(),
			ears = new createjs.Shape(),
			foot = new createjs.Shape();

		coat.graphics.beginFill("#330000").moveTo(0,0).lineTo(this.width,0).lineTo(this.width,this.height).lineTo(0,this.height).endFill();
		face.graphics.beginFill(c).moveTo(0,0).lineTo(this.width,0).lineTo(this.width,this.height*.5).lineTo(this.width*.5,this.height).lineTo(0,this.height*.5).lineTo(0,0).endFill();
		//eye.graphics.beginFill("white").drawCircle(this.width*.2,this.width*.1,this.width*.2).endFill();
		//eye.graphics.beginFill("white").drawRect(this.width*.25,this.height*.35,this.width*.5,this.height*.2).endFill();
		this.pupil.graphics.beginFill("red").drawRect(-this.width*.2,0,this.width*.1, this.height*.1).endFill();
		this.pupil.graphics.beginFill("red").drawRect(this.width*.4,0,this.width*.1, this.height*.1).endFill();
		//this.pupil.graphics.beginFill("red").drawCircle(this.width*.05,this.width*.1,0).endFill();
		//eye.x = (this.width*.3);
		//eye.y = (this.height*.3);
		this.pupil.x = (this.width*.38);
		this.pupil.y = (this.height*.33);
		//mouth.graphics.beginFill("red").drawRect(this.width*.2,this.height*.80,this.width*.65,this.height*.05).endFill();
		//mouth.graphics.beginFill("white").drawRect(this.width*.35,this.height*.90,this.width*.3,this.height*.1).endFill();
		ears.graphics.beginFill(c).moveTo(0, math.rdm(-w2*.25, -w2)).lineTo(w2, 0).lineTo(0, math.rdm(0,w2)).lineTo(0,-w2).endFill();
		ears.graphics.beginFill(c).moveTo(this.width, math.rdm(-w2*.25, -w2)).lineTo(this.width, 0).lineTo(w2, 0).lineTo(this.width, math.rdm(-w2*.25, -w2)).endFill();
		//ears.graphics.beginFill("black").moveTo(this.width,0).lineTo(0,-w2).lineTo(-w2,0).lineTo(this.width,0).endFill();
		foot.graphics.beginFill(c).moveTo(0,this.height).lineTo(this.width*.5,this.height*.6).lineTo(this.width,this.height).lineTo(0,this.height).endFill();
		this.damage.graphics.beginFill("red").drawRect(this.width*.5, -this.height*.25, this.width*1.5, this.height*1.5);
		this.damage.regX = (this.width*1.5)*.5;
		this.damage.regY = (this.height*1.5)*.5;
		this.damage.rotation = 90;
		this.damage.alpha = .4;
		this.damage.visible = false;
		
		//this.skin.addChild(noise);
	 	//this.skin.addChild(coat);
		this.skin.addChild(face);
		this.skin.addChild(ears);
		//this.skin.addChild(eye);
		this.skin.addChild(this.pupil);
		//this.skin.addChild(mouth);
		//this.skin.addChild(foot);
		this.skin.addChild(this.damage);
					
		this.skin.regX = this.width*.5;
		this.skin.regY = this.height*.5;
	}
	this.draw_skin();

	container.addChild(this.skin);

	return this;
};

Dwarf.prototype.hit = function() {
	
	this.life--;
	this.damage_counter = 3;
	this.body.ApplyImpulse(new b2.Vec2(math.rdm(0, this.speed*.75), math.rdm(0, -this.jumpHeight)), this.body.GetPosition());

	//TweenLite.from(this.skin, .5, {alpha: .25}, overwrite: 0);
	
	var n = math.rdm(0,2);
	createjs.SoundJS.play("damage"+n, createjs.SoundJS.INTERRUPT_NONE);
};

Dwarf.prototype.update = function() {
	
	if (this.damage_counter > 0) {
		this.damage_counter--;
		this.damage.rotation += Math.random()*10; //this.damage_counter * 10;
		this.damage.visible = true;
	} else {
		this.damage.visible = false;
	}

	if (this.anim_counter > this.anim_counter_max) {
		var num = Math.random();
		if (num > .5) {
			//this.pupil.x = (this.width*.0);
			this.speed = this.speed;
		} else {
			//this.pupil.x = (this.width*.2);
			this.speed = -this.speed;
		}
		this.body.ApplyImpulse(new b2.Vec2(math.rdm(0, this.speed*.5), math.rdm(0, -this.jumpHeight)), this.body.GetPosition());
		this.anim_counter = 0;
	}
	this.anim_counter++;
		
	//this.rotation = this.skin.rotation = math.r2d(this.body.GetAngle());
	this.x = this.skin.x = math.m2p(this.body.GetWorldCenter().x);
	this.y = this.skin.y = math.m2p(this.body.GetWorldCenter().y);
	
	if (this.life < 0) {
	 	world.level.destroy.push(this);
		var n = math.rdm(0,1);
		createjs.SoundJS.play("dieenemy"+n, createjs.SoundJS.INTERRUPT_NONE);
	}
	
	if (this.y > world.HEIGHT*2) {
	 	world.level.destroy.push(this);
	}
	return false;
};