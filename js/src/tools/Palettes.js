var palettes = (function() {
	    
	var p = {
		green : ["#1B676B", "#519548", "#88C425", "#BEF202", "#EAFDE6"],
		good_earth : ["#A66635","#CFB373","#BD8B4E", "#878262", "#7F523B"],
		adrift_in_dreams : ["#CFF09E","#A8DBA8","#79BD9A","#3B8686","#0B486B"],
		ocean_sky : ["#244499","#22238F","#255782","#248299","#228F87"],
		trablous : ["#52363B","#AB816F","#DCB591","#A6AC78","#546B4B"],
		lazy_purple : ["#2F2D30","#656566","#65537A","#51386E","#2A2333"],
		back_to_basics : ["#3A3F40","#202627","#151B1E","#EFF4FF","#41444C"],
		blue_jeans : ["#2A7A8C","#176273","#063540","#E5D9CF","#403D3A"],
		army_greens : ["#00020D","#052620","#0E402E","#2A5931","#67735C"],
		winter_road : ["#1B1D26","#425955","#778C7A","#F1F2D8","#BFBD9F"]
		//pink : ["#3D0D26","#660A3E","#891C56","#B0276F","#C93482"]
	};
	
	return {
		
		get_palettes : function() {
			
			return p;
		},
	
		get_palette : function(key) {
			
			return p[key];
		},
		
		get_random_palette : function() {
			
			var palettes = [];
			for (var prop in p) {
				palettes.push(p[prop]);
			}
			return palettes[Math.floor(Math.random() * palettes.length)];
		},

        get_random_color_from_palette : function(val) {
            
			var random_palette = val,
				random_color = Math.floor(Math.random()*random_palette.length);
            
			return  String(random_palette[random_color]);
        },

        get_random_color : function(val) {
			
			var palettes = [],
				random_palatte,
				random_color;
			
			for (var prop in p) { palettes.push(p[prop]); }
            random_palatte = palettes[Math.floor(Math.random() * palettes.length)];
            random_color = Math.floor(Math.random()*random_palatte.length);

            return String(random_palatte[random_color]);
        }
	};
})();