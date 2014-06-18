var contact = (function() {

	return {
		
		init : function(physics) {
	
    		var listener = new b2.ContactListener,
				fixtureUserData,
				bodyUserData;
		
			listener.EndContact = function(contact) {
		        fixtureUserData = contact.GetFixtureA().GetUserData();
		        if (fixtureUserData == "foot") {
					contact.GetFixtureA().GetBody().GetUserData().canJump = false;
					contact.GetFixtureA().GetBody().GetUserData().canDuck = false;
				}
		        fixtureUserData = contact.GetFixtureB().GetUserData();
		        if (fixtureUserData == "foot") {
					contact.GetFixtureB().GetBody().GetUserData().canJump = false;
					contact.GetFixtureA().GetBody().GetUserData().canDuck = false;
				}
		    }

			listener.BeginContact = function(contact) {
		       	fixtureUserData = contact.GetFixtureA().GetUserData();
		       	if (fixtureUserData == "foot") {
					contact.GetFixtureA().GetBody().GetUserData().canJump = true;
					contact.GetFixtureA().GetBody().GetUserData().canDuck = true;
				}
		       	fixtureUserData = contact.GetFixtureB().GetUserData();
		       	if (fixtureUserData == "foot") {
					contact.GetFixtureB().GetBody().GetUserData().canJump = true;
					contact.GetFixtureA().GetBody().GetUserData().canDuck = true;
				}
				bodyUserData = contact.GetFixtureA().GetBody().GetUserData();
				if (bodyUserData.id == "sword") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureB().GetBody().GetUserData();
				if (bodyUserData.id == "sword") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureA().GetBody().GetUserData();
				if (bodyUserData.id == "bullet") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureB().GetBody().GetUserData();
				if (bodyUserData.id == "bullet") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureA().GetBody().GetUserData();
				if (bodyUserData.id == "hero") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureB().GetBody().GetUserData();
				if (bodyUserData.id == "hero") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureA().GetBody().GetUserData();
				if (bodyUserData.id == "potion") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureB().GetBody().GetUserData();
				if (bodyUserData.id == "potion") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureA().GetBody().GetUserData();
				if (bodyUserData.id == "portal") {
					bodyUserData.beginContactHandler(contact);
				}
				bodyUserData = contact.GetFixtureB().GetBody().GetUserData();
				if (bodyUserData.id == "portal") {
					bodyUserData.beginContactHandler(contact);
				}
		    }

			physics.SetContactListener(listener);
		}
	}
})();