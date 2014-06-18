var keys = (function() {

	return {
		
		init : function() {

			$(document).bind('keydown', function(e) {

				switch(e.keyCode) {
					case 65: //left
						world.player.left = true;
						world.player.right = false;
						break;

					case 68: //right
						world.player.left = false;
						world.player.right = true;
						break;

					case 87: //up
						world.player.up = true;
						break;
						
					case 83: //down
						world.player.down = true;
						world.player.duck();
						break;
					
					case 84: //t
						world.player.teleport();
						break;

					case 76: //l
						world.player.levitate();
						break;
						
					case 66:
						world.player.conjureCrate();
						break;

					case 32: //space
						world.player.attack();
						break;
						
					case 80: 
						app.take_photo();
						break;
				}
			});

			$(document).bind('keyup', function(e) {

				switch(e.keyCode) {	
					case 65: //left
						world.player.left = false;
						break;

					case 68: //right
						world.player.right = false;
						break;

					case 87: //up
						world.player.up = false;
						break;
						
					case 83: //down
						world.player.down = false;
						world.player.standup();
						break;
						
					case 32: //space
						world.player.sheath();
						break;
				}
			});
			
			world.stage.onMouseDown = function(e) {	
				world.player.shoot(e.stageX, e.stageY);
			};
		}
	};
})();