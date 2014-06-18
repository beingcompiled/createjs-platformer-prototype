function Landscape(stage, w, h, octaves, decay, freq, palette) {
	
	var pNoise = perlin.getPerlinNoise_1D(w, octaves, decay);

	var container = new createjs.Container(),
		s = new createjs.Shape();
		
	var c_fill = palette[Math.floor(Math.random()*palette.length)],
		c_stroke = palette[Math.floor(Math.random()*palette.length)];
		
	s.graphics.beginFill(c_fill).beginStroke(c_stroke);
	
	for (var i=0; i<pNoise.length; i++) {
		var a = (pNoise[i]*h) + (h>>1);
		s.graphics.lineTo(i*freq, a);
	}
	s.graphics.lineTo(w*2,h*2).lineTo(0,h*2).lineTo(0,h*2).endFill();
	s.y = -h*.4;
	s.alpha = Math.random();
	
	container.addChild(s);
	
	return container;
};