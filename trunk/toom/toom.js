// - ------------------------------------------------------------------------------------------ - //
var Room;
// - ------------------------------------------------------------------------------------------ - //
function cRoom() {
	this.Base = new Vector2D(0,78);
}
// - ------------------------------------------------------------------------------------------ - //


// - ------------------------------------------------------------------------------------------ - //
var Player;
// - ------------------------------------------------------------------------------------------ - //
function cPlayer() {
	this.Pos = new Vector2D(0,0);
	this.TargetPos = new Vector2D(0,0);
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Step = function() {
	this.Pos = Sub(this.Pos,MultScalar(Sub(this.Pos,this.TargetPos),0.1));
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.GetPos = function() {
	return new Vector2D( -FCamera.x+this.Pos.x+Room.Base.x, -FCamera.y+this.Pos.y+Room.Base.y );
}	
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Draw = function() {
	var Pos = this.GetPos();
	gfxDraw( Art.Man, Pos.x, Pos.y, 4 );//(Stepper>>3)&3 );	
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var Music;
// - ------------------------------------------------------------------------------------------ - //
function Init() {
	Music = sndLooped("Music");	
	
	Room = new cRoom();
	Player = new cPlayer();
}
// - ------------------------------------------------------------------------------------------ - //
function GainFocus() {
	Music.resume();
}
// - ------------------------------------------------------------------------------------------ - //
function LoseFocus() {
	Music.pause();
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var Stepper = 0;
function Step() {
	Stepper++;
	
	// Mouse Cursor Part //
	var TargetX = ((Mouse.x-BaseX)/BaseX)*32.0;
	var TargetY = ((Mouse.y-BaseY)/BaseY)*32.0;

	// Player Position Part //
	var Limit = 1010; // 1010 wide, 54 pixels inward //
	TargetX += (Player.Pos.x / Limit) * 90.0; 
	
	Camera.x -= (Camera.x-TargetX)*0.1;
	Camera.y -= (Camera.y-TargetY)*0.1;
	
	FCamera.x = Math.floor(Camera.x);
	FCamera.y = Math.floor(Camera.y);
	
	if ( Input_MouseBits ) {
		Player.TargetPos.x = (Mouse.x+Camera.x-BaseX);

		var HalfLimit = (Limit>>1);

		// Constrain Player Pos //
		if ( Player.TargetPos.x < -(HalfLimit-54-16) )
			Player.TargetPos.x = -(HalfLimit-54-16);
		if ( Player.TargetPos.x > (HalfLimit-54) )
			Player.TargetPos.x = (HalfLimit-54);
	}
	
	Player.Step();
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function Draw() {
//	gfxClear( RGB(0,0,0) );

	BX = BaseX-FCamera.x;
	BY = BaseY-FCamera.y;
	
	gfxDrawLayer( BGLayer );
	Player.Draw();
	gfxDrawLayer( FGLayer );
	
	if ( Mouse.Visible ) {
		ctx.fillStyle = RGB(255,255,255);
		ctx.fillRect( Mouse.x-10,Mouse.y-10,20,20 );
	}
	
	var PlayerPos = Player.GetPos();
	
	ctx.fillStyle = RGB(255,255,255);
	ctx.font = '20px Pixel';
	var Text = 'Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-96-20);

	Text = "Why are you ignoring me?";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = "Why are you ignoring me?_";
	}
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-96);

}
// - ------------------------------------------------------------------------------------------ - //
