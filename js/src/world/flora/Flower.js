function Flower() {
	
	this.container = new createjs.Container();
	this.num_leaves = Math.random()*1;
    
    var rotation = math.rdm(0,100),
        h = math.rdm(25,50),
        w = math.rdm(10,h*Math.random()),
        num_leaves = math.rdm(3,8),
		color_fill = palettes.get_random_color(),
        color_stroke = palettes.get_random_color();
    
    this.create_leaf = function() {
        
        var leaf = new createjs.Container(),
			s = new createjs.Shape();
			
		s.graphics.beginFill(color_fill).beginStroke(color_stroke).moveTo(0,0).lineTo(w,h).lineTo(0,h*2).lineTo(-w,h).lineTo(0,0).lineTo(0,h*2).endFill();
        leaf.addChild(s);
        
        return leaf;
    };
};
    		    
Flower.prototype.draw = function(_x, _y) {
          
	for (var i=0; i<this.num_leaves; i++) {
	    var leaf = this.create_leaf();
	    leaf.rotation = i*math.rdm(0,100);
	    this.container.addChild(leaf);
	}
    this.container.x = _x;
	this.container.y = _y;
	
	return this.container;
};
