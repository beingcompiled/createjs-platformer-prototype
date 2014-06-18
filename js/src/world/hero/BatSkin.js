function BatSkin(w, h) {
	
	this.width = w;
	this.height = h;
	w2 = w*.5;
	h2 = h*.5;
	
	this.anim_counter = 0;
	this.anim_counter_max = 5;
	this.alternate = true;

	this.asset = new createjs.Container();
	this.hat = new createjs.Shape();
	this.cape = new createjs.Shape();
	this.coat = new createjs.Shape();
	this.hand_left = new createjs.Shape();
	this.hand_right = new createjs.Shape();
	this.foot_left = new createjs.Shape();
	this.foot_right = new createjs.Shape();
	
	this.draw_skin = function() {
		
		var block = new createjs.Shape(),
			face = new createjs.Shape(),
			eyes = new createjs.Shape(),
			nose = new createjs.Shape();
		
		/*
		this.hat.graphics.beginFill("black").moveTo(w*.5,0).lineTo(w*.825,h*.45).lineTo(w*.175,h*.45).lineTo(w*.5,0).endFill();
		this.coat.graphics.beginFill("black").moveTo(w*.2,h*.5).lineTo(w*.75,h*.5).lineTo(w,h).lineTo(0,h).endFill();
		this.beard.graphics.beginFill("white").moveTo(w*.5,h*.85).lineTo(0,h*.45).lineTo(w,h*.45).lineTo(w*.5,h*.85).endFill();
		face.graphics.beginFill("AntiqueWhite").drawRect(w*.25,h*.45,w*.5,h*.20);
		eyes.graphics.beginFill("MidnightBlue").drawRect(w*.30,h*.5,w*.1,h*.05).drawRect(w*.6,h*.5,w*.1,h*.05);
		this.hand_left.graphics.beginFill("AntiqueWhite").drawRect(0,h*.7,w*.2,h*.1);
		this.hand_right.graphics.beginFill("AntiqueWhite").drawRect(w*.8,h*.7,w*.2,h*.1);
		this.foot_left.graphics.beginFill("black").drawRect(w*.20,h,w*.2,h*.18);
		this.foot_right.graphics.beginFill("black").drawRect(w*.6,h,w*.2,h*.18);
		*/
		
		//block.graphics.beginFill("pink").drawRect(-w2, -h2, w, h).endFill();
		this.hat.graphics.beginFill("black").moveTo(-w2,-h).lineTo(-w2, -h*.25).lineTo(-w2*.5, -h2).endFill();
		this.hat.graphics.beginFill("black").moveTo(w2,-h).lineTo(w2, -h*.25).lineTo(w2*.5, -h2).endFill();
		this.coat.graphics.beginFill("black").drawRect(-w2,-h2,w,h*.9);
		this.cape.graphics.beginFill("black").moveTo(-w*.75,-h*.2).lineTo(w*.75,-h*.2).lineTo(0,h*.4).endFill();
		face.graphics.beginFill("AntiqueWhite").drawRoundRect(-w2*.8,-h2*.8,w*.8,h*.25,10);
		eyes.graphics.beginFill("MidnightBlue").drawRect(-w2*.6,-h2*.6, w*.1, h*.05).drawRect(w*.2, -h2*.6, w*.1, h*.05);
		nose.graphics.beginStroke("black").moveTo(-w2*.3, -h2*.6).lineTo(0,-5).lineTo(3, -h2*.6).endStroke();
		this.hand_left.graphics.beginFill("AntiqueWhite").beginStroke("black").drawRect(-w*.65, -h2*.1, w*.22, h*.12);
		this.hand_right.graphics.beginFill("AntiqueWhite").beginStroke("black").drawRect(w*.4, -h2*.1, w*.22, h*.12);
		this.foot_left.graphics.beginFill("black").drawRect(-w2*.6, h2*.5, w*.25, h*.5);
		this.foot_left.graphics.beginFill("black").moveTo(-w2*.6, h*.75).lineTo(-w*.6, h*.75).lineTo(-w2*.6, h*.65);
		this.foot_right.graphics.beginFill("black").drawRect(w*.05, h2*.5, w*.25, h*.5);
		this.foot_right.graphics.beginFill("black").moveTo(w*.05, h*.75).lineTo(w*.6, h*.75).lineTo(w*.1, h*.6);

		this.sword = new createjs.Shape();
		var sW = w*.15,
		 	sH = h;	
		this.sword.graphics.beginFill(palettes.get_random_color()).beginStroke("black").drawRect(0, 0, sW, sH).endFill();
		this.sword.graphics.beginFill("AntiqueWhite").drawRect(0, 0, w*.22, h*.12).endFill();
		this.sword.graphics.beginFill("AntiqueWhite").drawRect(0, h*.2, w*.22, h*.12).endFill();
		this.sword.graphics.beginFill("black").drawRect(0, -h*.25, w*.27, h*.25).endFill();
		this.sword.regX = sW*.5;
		this.sword.regY = 0;
		this.sword.visible = false;
		
		this.asset.addChild(block); 	
		this.asset.addChild(this.hat);
		this.asset.addChild(this.cape); 
		this.asset.addChild(this.coat);
		this.asset.addChild(this.beard);
		this.asset.addChild(face);
		this.asset.addChild(eyes);
		this.asset.addChild(nose);
		this.asset.addChild(this.hand_left);
		this.asset.addChild(this.hand_right);
		this.asset.addChild(this.foot_left);
		this.asset.addChild(this.foot_right);
		this.asset.addChild(this.sword);
		this.cape.visible = false;
			
		//this.asset.regX = this.width*.5;
		//this.asset.regY = this.height*.5;
		
		this.meter = new LifeMeter(this, w);

		return this.asset;
	}
	this.draw_skin();
	
	return this;
};

BatSkin.prototype.sheath = function() {
	
	this.sword.visible = false;
	this.hand_left.visible = true;
	this.hand_right.visible = true;
};

BatSkin.prototype.shoot = function(hero) {
	
	if (hero.left == true) {
		this.sword.rotation = 90;
		this.sword.x = -this.height*.5;
		this.sword.y = 0;
		//TweenLite.to(this.sword, .1, {x: -this.width*.75, y: 0, rotation: 90});
	}
	else if (hero.right == true) {
		this.sword.rotation = -90;
		this.sword.x = this.width*.75;
		this.sword.y = 0;
		//TweenLite.to(this.sword, .1, {x: this.width*.75, y: 0, rotation: -90});
	} 
	else if (hero.down == true) {
		this.sword.rotation = 0;
		this.sword.x = 0;
		this.sword.y = this.height*.5;
	} 
	else {
		this.sword.rotation = 180;
		this.sword.x = 0;
		this.sword.y = -this.height*.75;
	}
	this.sword.visible = true;
	this.hand_left.visible = false;
	this.hand_right.visible = false;
	this.cape.visible = false;
};

BatSkin.prototype.duck = function() {
	
	this.foot_left.y = -12;
	this.foot_right.y = -12;
	this.hat.y = this.height*.2;
};

BatSkin.prototype.standup = function() {
	
	this.foot_left.visible = true;
	this.foot_right.visible = true;
	this.hat.y = 0;
};

BatSkin.prototype.hit = function(life) {

	this.meter.update(life);
};

BatSkin.prototype.update = function(hero) {
	
	if (hero.left == true || hero.right == true) {
		if (hero.isDucking == false) {
			if (this.anim_counter < this.anim_counter_max) {
				this.anim_counter++;
			} else {
				this.anim_counter = 0;
				(!this.alternate) ? this.alternate = true : this.alternate = false;
			}
			if (this.alternate == true) {
				this.foot_left.y = -5;
				this.foot_right.y = 0;
			} else {
				this.foot_left.y = 0;
				this.foot_right.y = -5;
			}
		}
	} else {
		if (hero.isDucking == false) {
			this.foot_left.y = 0;
			this.foot_right.y = 0;
		}
	}
	
	//jump
	if (!hero.canJump) {
		this.hand_left.x = -5;
		this.hand_left.y = -5;
		this.hand_right.x = +5;
		this.hand_right.y = -5;
		this.foot_left.x = -3;
		this.foot_right.x = 3;
		this.foot_left.y = -5;
		this.foot_right.y = -5;
		
		if (hero.hasSword == false) {
			this.cape.visible = true;
		}
		//this.beard.y = -2;
		//this.coat.y = -2;
		//this.hat.y = -4;
	} else {
		this.hand_left.x = 0;
		this.hand_left.y = 0;
		this.hand_right.x = 0;
		this.hand_right.y = 0;
		this.foot_left.x = 0;
		this.foot_right.x = 0;
		this.cape.visible = false;
		//this.beard.y = 0;
		//this.coat.y = 0;
		//this.hat.y = 0;
	}
	
	return false;
};