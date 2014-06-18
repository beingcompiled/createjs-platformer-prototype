var manifest = (function() {
	
    var assets = [
		{id:"crate0", src:"assets/sounds/crate0.mp3"},
		{id:"crate1", src:"assets/sounds/crate1.mp3"},
		{id:"ouch", src:"assets/sounds/damage0.mp3"},
		{id:"damage0", src:"assets/sounds/damage1.mp3"},
		{id:"damage1", src:"assets/sounds/damage2.mp3"},
		{id:"damage2", src:"assets/sounds/damage2.mp3"},
		{id:"dieenemy0", src:"assets/sounds/dieenemy0.mp3"},
		{id:"dieenemy1", src:"assets/sounds/dieenemy1.mp3"},
		{id:"fall", src:"assets/sounds/fall.mp3"},
		{id:"jump0", src:"assets/sounds/jump0.mp3"},
		{id:"jump1", src:"assets/sounds/jump1.mp3"},
		{id:"levitate", src:"assets/sounds/levitate.mp3"},
		{id:"run", src:"assets/sounds/run.mp3"},
		{id:"sword0", src:"assets/sounds/sword0.mp3"},
		{id:"sword1", src:"assets/sounds/sword1.mp3"},
		{id:"teleport", src:"assets/sounds/teleport.mp3"},
		{id:"shoot0", src:"assets/sounds/shoot0.mp3"},
		{id:"shoot1", src:"assets/sounds/shoot1.mp3"},
		{id:"drink", src:"assets/sounds/drink.mp3"},
		{id:"portal", src:"assets/sounds/portal.mp3"}
    ];
    
	return {
                        
    	get_assets : function() {
            
            return assets;
    	}
	};
})();