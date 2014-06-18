var app = (function() {
		    
	return {
		
		WIDTH : 0,
		SH : 0,
		stats : 0,
			
    	preload : function() {
            //console.log("preload");

			loaderCanvas = document.getElementById('loaderCanvas');
			loaderStage = new createjs.Stage(loaderCanvas);
			var assets = manifest.get_assets();
            preloadHelper.init(loaderStage, assets, true, app.init);
    	},

		init : function(hello) {
			// console.log("\n","\n");
			// console.log("hello");
			
			app.stats = new Stats();
			$("#stats").append(app.stats.domElement);
            
            var canvas = document.getElementById('stage'),
				stage = new createjs.Stage(canvas);
            	stage.mouseEventsEnabled = true;

			app.WIDTH = canvas.width,
			app.HEIGHT = canvas.height;
			
			world.init(stage, canvas, app.WIDTH, app.HEIGHT, 30);
		},
		
		take_photo : function() {
			console.log("cheese");
			var canvas = document.getElementById("stage"),
				dataUrl = canvas.toDataURL("image/png");
			window.open(dataUrl, "toDataURL() image", "width=" + app.WIDTH, "height=" + app.HEIGHT);
		}
	};
})();