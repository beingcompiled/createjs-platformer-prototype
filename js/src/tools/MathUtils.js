var math = (function() {
	    
	return {
		
		// random number between
		rdm : function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
	
		//pixels to meters
		p2m : function(n) {
			return n / world.SCALE;
		},

		//meters to pixels
		m2p : function(n) {
			return n * world.SCALE;
		},
		
		//degrees to radians
		d2r : function(d) {
			
			return d * (Math.PI / 180);
		},
		
		//radians to degrees
		r2d : function(r) {
			return r * (180 / Math.PI);
		}
	};
})();