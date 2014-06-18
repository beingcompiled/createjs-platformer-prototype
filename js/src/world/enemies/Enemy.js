function Enemy(data){
	
	this.id = data.id;
	this.type = data.type;
	this.x = data.x;
	this.y = data.y;
	this.width = data.width;
	this.height = data.height;
	this.color_stroke = data.color_stroke;
	this.color_fill = data.color_fill;
	this.parent = data.parent;
	
	this.rotation = 0;
	this.life = 5;
	this.alpha = 1;
	
	this.speed = 12;
	this.jumpHeight = size*.5;
	
	this.impulseX = 0;
	this.impulseY = 0;
	
	this.skin = new createjs.Container();
};


