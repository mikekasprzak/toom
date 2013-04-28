// - ------------------------------------------------------------------------------------------ - //
var Room;
// - ------------------------------------------------------------------------------------------ - //
function cRoom() {
	this.Base = new Vector2D(0,78);
}
// - ------------------------------------------------------------------------------------------ - //


var ST_IDLE = 1;
var ST_MOVING = 2;
// - ------------------------------------------------------------------------------------------ - //
var Player;
// - ------------------------------------------------------------------------------------------ - //
function cPlayer() {
	this.Pos = new Vector2D(0,0);
	this.TargetPos = new Vector2D(0,0);
	this.State = ST_IDLE;
	this.FacingLeft = false;
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Step = function() {
	//this.Pos = Sub(this.Pos,MultScalar(Sub(this.Pos,this.TargetPos),0.1));
	
	var Diff = Sub(this.Pos,this.TargetPos);
	var Length = Diff.NormalizeRet();
	if ( Length > 2 ) {
		var Scaled = MultScalar(Diff,2);
		this.Pos = Sub(this.Pos, Diff );
		this.State = ST_MOVING;
		this.FacingLeft = Diff.x > 0;
	}
	else {
		this.Pos = this.TargetPos.clone();
		this.State = ST_IDLE;
	}
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.GetPos = function() {
	return new Vector2D( -FCamera.x+this.Pos.x+Room.Base.x, -FCamera.y+this.Pos.y+Room.Base.y );
}	
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Draw = function() {
	var Pos = this.GetPos();
	var Index = 4;
	if ( this.State == ST_MOVING ) {
		Index = (Stepper>>3)&3;
	}
	gfxDraw( Art.Man, Pos.x, Pos.y, Index, this.FacingLeft );	
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
	var Text = 'Hey Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100-20);

	Text = "Is it really solitude if I'm here?";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = Text + "_";
	}
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100);

	var FadeIn = (255-Stepper)/255;
	if ( FadeIn > 0 ) {
		ctx.globalAlpha = FadeIn;
		gfxClear( RGB(0,0,0) );
		ctx.globalAlpha = 1.0;
	}
}
// - ------------------------------------------------------------------------------------------ - //
