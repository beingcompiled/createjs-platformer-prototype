var b2 = new B2(); 

function B2() {
	  
	this.DebugDraw = Box2D.Dynamics.b2DebugDraw;
	this.World = Box2D.Dynamics.b2World;
	this.Vec2 = Box2D.Common.Math.b2Vec2;
	this.FixtureDef = Box2D.Dynamics.b2FixtureDef;
	this.PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	this.BodyDef = Box2D.Dynamics.b2BodyDef;
	this.ContactListener = Box2D.Dynamics.b2ContactListener;
	this._dynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody;
	this._staticBody = Box2D.Dynamics.b2Body.b2_staticBody;
	this.RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	this.MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
	
	return this;
};

B2.prototype.get_bodyDef = function(_type, _x, _y, _angle) {

	var bodyDef = new b2.BodyDef();
	bodyDef.type = _type;
	bodyDef.position.x = math.p2m(_x);
	bodyDef.position.y = math.p2m(_y);
	bodyDef.angle = math.d2r(_angle);
	
	return bodyDef;
};

B2.prototype.get_fixDef = function(_density, _restitution, _friction) {

	var fixDef = new b2.FixtureDef();
	fixDef.density = _density;
	fixDef.restitution = _restitution;
	fixDef.friction = _friction;
	
	return fixDef;
};

B2.prototype.initDebugDraw = function(physics, canvas) {
	
	var debugDraw = new b2.DebugDraw();
	debugDraw.SetSprite(canvas.getContext("2d"));
	debugDraw.SetDrawScale(world.SCALE);
	debugDraw.SetFillAlpha(.5);
	debugDraw.SetLineThickness(1);
	debugDraw.SetFlags(b2.DebugDraw.e_shapeBit | b2.DebugDraw.e_jointBit);
	physics.SetDebugDraw(debugDraw);
	
	return false;
};