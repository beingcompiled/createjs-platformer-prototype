function LifeMeter(p, _size) {
		
	this.skin = new createjs.Container();
	this.fill = new createjs.Shape();
	this.size = _size;

	var	h =  4.5,
		bg = new createjs.Shape(),
		stroke = new createjs.Shape();

	bg.graphics.beginFill("black").drawRect(0, 0, this.size, h).endFill();
	this.fill.graphics.beginFill("red").drawRect(0, 0, this.size, h).endFill();
	stroke.graphics.beginStroke("white").drawRect(0, 0, this.size, h).endFill();
	this.skin.addChild(this.fill);
	this.skin.addChild(stroke);
	this.skin.alpha = 0;
	
	this.skin.x = -p.width*.5;
	this.skin.y = -p.height*1.35;
	p.asset.addChild(this.skin);
	
	return this;
};

LifeMeter.prototype.update = function(n) {
	
	this.fill.scaleX = (n/this.size)*2.5;
	if (this.skin) {
		TweenLite.to(this.skin, .25, {alpha: 1});
		TweenLite.to(this.skin, .5, {alpha: 0, delay: 2.5, overwrite: 0});
	}
};