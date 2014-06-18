var world = (function() {
			
	update = function() {
		
		//console.log("update");
		world.physics.Step(1/30, 10, 10);
		world.level.update(world.player);
		//world.physics.DrawDebugData();
		world.physics.ClearForces();
		world.stage.update();
		app.stats.update();
    };
	
	return {
		
		WIDTH : 0,
		HEIGHT : 0,
		SCALE : 30,
		gravity : 20,
		physics : {},
		level : {},
		stage : {},
		player : {},
		
		create_new_world : function() {
			
			world.physics = new b2.World(new b2.Vec2(0, world.gravity), true);
			world.level = new RandomLevel(world.stage, world.physics);
			contact.init(world.physics);
			
			//container, physics, x, y, w, h)
			world.player = new Hero(app.WIDTH*.25, -app.HEIGHT*.25, 25, 40);
			world.level.bump.push(world.player);
		},
		
		new_level : function() {
			
			world.stage.removeAllChildren();
			world.level.bump = [];
			world.level.destroy = [];
			
			world.create_new_world();
		},
		
    	init : function(stage, canvas, w, h, scale) {
            
			world.stage = stage;
			world.WIDTH = w*10;
			world.HEIGHT = h*2;
			world.SCALE = scale;

			world.create_new_world();
			
			b2.initDebugDraw(world.physics, canvas);
			keys.init(world.player);
			
			createjs.Ticker.setFPS(60);
			createjs.Ticker.useRAF = true;
			createjs.Ticker.addListener(update);
    	}
	};
})();