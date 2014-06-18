function RandomLevel(_stage, _physics) {
		
	this.bump = [];
	this.destroy = [];
	this.parallax = [];
	this.alpha = 1;
	this.main = new createjs.Container();
			
	var stage = _stage,
		physics = _physics,
		numPlatforms = math.rdm(20, 60),
		numDwarves = math.rdm(3, 5),
		numPotions = math.rdm(5, 8);
	
	var bg = new createjs.Shape();
	bg.graphics.beginFill(palettes.get_random_color()).drawRect(0, 0, world.WIDTH, world.HEIGHT);
	bg.alpha = this.alpha;
	stage.addChild(bg);

	var sky = new Sky();
	sky.alpha = this.alpha;
	stage.addChild(sky);
	this.parallax[0] = sky;
	
	//container, width, height, octaves, decay, freq, palette
	var trees = new Landscape(stage, world.WIDTH*.5, world.HEIGHT, math.rdm(2,8), math.rdm(1,2), math.rdm(1,4), palettes.get_random_palette());
	trees.alpha = this.alpha;
	stage.addChild(trees);
	this.parallax[1] = trees;

	//container, width, height, octaves, decay, freq, palette
	var hills = new Landscape(stage, world.WIDTH*.5, world.HEIGHT, math.rdm(2,8), math.rdm(1,2), math.rdm(1,4), palettes.get_random_palette());
	hills.alpha = this.alpha;
	stage.addChild(hills);
	this.parallax[2] = hills;

	this.main.regX = app.WIDTH*.5;
	this.main.regY = app.HEIGHT*.5;
	this.main.alpha = this.alpha;
	stage.addChild(this.main);
		
	var color_platform = palettes.get_random_color();
	//container, x, y, w, h, r, c
	var floor = new Box("floor", this.main, world.WIDTH*.5, app.HEIGHT, world.WIDTH, app.HEIGHT*.75, 0, color_platform);
		
	//container, x, y, w, h, r, c
	var wall = new Box("wall", this.main, app.WIDTH*.22, app.HEIGHT*.5, app.WIDTH*.5, app.HEIGHT, 0, color_platform);
	var wall = new Box("wall", this.main, world.WIDTH-(app.WIDTH*.25), app.HEIGHT*.5, app.WIDTH*.5, app.HEIGHT, 0, color_platform);
			
	//container, physics, x, y, w, h, r, c
	for (var i=0; i<numPlatforms; i++) {
		var posX = math.rdm(world.WIDTH*.1, world.WIDTH*.95),
			posY = math.rdm(0, world.HEIGHT) - (world.HEIGHT*.25),
			pW = math.rdm(25, app.WIDTH*.75),
			pH = math.rdm(25, app.HEIGHT*.35),
			rotation_freq = Math.random(),
			pRotation;
			
			if (rotation_freq < .75 && pW < world.HEIGHT*.4) {
				pRotation = math.rdm(0, 10) 
			} else {
				pRotation = 0;
			}
	
		var platform = new Box("platform", this.main, posX, posY, pW, pH, pRotation, color_platform);
	}
	
	var c_dwarf = "black";
	if (Math.random() > .95) {c_dwarf = palettes.get_random_color();}
	for (var i=0; i<numDwarves; i++) {
		var dwarf_size = math.rdm(20,26);
		var dwarf = new Dwarf("dwarf", this.main, Math.random() * world.WIDTH, -50, dwarf_size, c_dwarf);
		this.bump.push(dwarf);
	}
	
	for (var i=0; i<numPotions; i++) {
		var potion = new Potion("potion", this.main, math.rdm(world.WIDTH*.25, world.WIDTH*.95), -world.HEIGHT*1.5);
		this.bump.push(potion);
	}
	
	var portal = new Portal("portal", this.main, world.WIDTH*.99, -app.HEIGHT*.15);
	this.bump.push(portal);
			
	//container, width, height, octaves, decay, freq, palette
	var fore = new Landscape(stage, world.WIDTH, app.HEIGHT, math.rdm(2,8), math.rdm(1,2), math.rdm(1,2), palettes.get_random_palette());
	fore.y = app.HEIGHT*.75;
	fore.alpha = this.alpha;
	stage.addChild(fore);
	this.parallax[3] = fore;
	
	return this;
};
		
RandomLevel.prototype.update = function(player) {
		
	var i, index;
		
	for (i=0; i<this.bump.length; i++) {
		this.bump[i].update();
	};
	
	for (i=0; i<this.destroy.length; i++) {

		var o = this.destroy[i];
		world.physics.DestroyBody(o.body);
		world.level.main.removeChild(o.skin);
		this.destroy.splice(i, 1);
		
		var index = $.inArray(o, this.bump);
		if (index != -1) { this.bump.splice(index, 1); }
	};
		
	this.parallax[0].x = (this.main.x * .15) - app.WIDTH;
	this.parallax[1].x = (this.main.x * .25) - app.WIDTH;
	this.parallax[2].x = (this.main.x * .75) - app.WIDTH;
	this.parallax[3].x = (this.main.x * 2) - app.WIDTH;
	
	this.parallax[0].y = (this.main.y * .1);
	this.parallax[1].y = (this.main.y * .2);
	this.parallax[2].y = (this.main.y * .3);
	this.parallax[3].y = (this.main.y) + (world.HEIGHT*.1);
	
	this.main.x = app.WIDTH - player.x;
	
	if (player.y < world.HEIGHT * .1) {
		if (this.main) { TweenMax.to(this.main, .4, {y: app.HEIGHT - player.y, ease: Sine.easeOut}); }
	} else {
		if (this.main) { TweenMax.to(this.main, .4, {y: app.HEIGHT * .65, ease: Sine.easeOut}); }
	}
	player.update();
};
