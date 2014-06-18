var preloadHelper = (function() {
	
	var stage,
        manifest,
        callback,
        preloader = new Object(),
		totalLoaded = 0,
		local = false,
        loaderWidth = 800,
        loaderBar,
		bar;
        
        handleProgress = function(e) {
            //console.log(e.loaded);
            bar.scaleX = (e.loaded*100)*(loaderWidth/100);
            stage.update();
            if (bar.scaleX >= (100*(loaderWidth/100))) {
                loaderBar.visible = false;
                stage.update();
            }
        };
         
        handleComplete = function(e) {
            callback();
        };
            
        handleLoadComplete = function(e) {
           totalLoaded++;
           if(totalLoaded == manifest.length) {
               handleComplete();
           }
        };
         
        handleFileLoad = function(e) {            
             switch(e.type) {
                case createjs.PreloadJS.IMAGE:
                    //console.log(event.src);
                    var img = new Image();
                    img.src = e.src;
                    img.onload = handleLoadComplete;
                    window[e.id] = new createjs.Bitmap(img);
                    break;
             }
        };
    
	return {
                         
        //loader stage, manifest, local, callback,
    	init : function(_stage, _manifest, _local, _callback) {
            
            stage = _stage;
            manifest = _manifest;
            callback = _callback;
            local = _local;
            			
			var barHeight = 20,            
                loaderColor = createjs.Graphics.getRGB(0,0,0);
            
            loaderBar = new createjs.Container();
            bar = new createjs.Shape();
            bar.graphics.beginFill(loaderColor);
            bar.graphics.drawRect(0, 0, 1, barHeight);
            bar.graphics.endFill();
            
            var imageContainer = new createjs.Container();
            imageContainer.x = 430;
            imageContainer.y = 200;
            stage.addChild(imageContainer);

            var bgBar = new createjs.Shape(),
                padding = 3;
            
            bgBar.graphics.setStrokeStyle(1);
            bgBar.graphics.beginStroke(loaderColor);
            bgBar.graphics.drawRect(-padding/2, -padding/2, loaderWidth, barHeight+padding);

            loaderBar.addChild(bgBar);
            loaderBar.addChild(bar);
            loaderBar.x = loaderBar.y = 10;

            stage.addChild(loaderBar);

            preloader = new createjs.PreloadJS(local);

			createjs.FlashPlugin.BASE_PATH = "assets/soundjs/";
			if (!createjs.SoundJS.checkPlugin(true)) {
				console.log("soundJS error: " + createjs.SoundJS.checkPlugin(true));
			} else {
                preloader.installPlugin(createjs.SoundJS);
            }
            preloader.onProgress = handleProgress;
            preloader.onComplete = handleComplete;
            preloader.onFileLoad = handleFileLoad;
            preloader.loadManifest(manifest);

            stage.update();
    	}
	};
})();