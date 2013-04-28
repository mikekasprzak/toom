// - ------------------------------------------------------------------------------------------ - //
var Room;
// - ------------------------------------------------------------------------------------------ - //
function cRoom() {
	this.Base = new Vector2D(0,78);
}
// - ------------------------------------------------------------------------------------------ - //


// - ------------------------------------------------------------------------------------------ - //
var ST_IDLE = 1;
var ST_MOVING = 2;
// - ------------------------------------------------------------------------------------------ - //
var StateMap = [];
StateMap[ST_IDLE] = "Idle";
StateMap[ST_MOVING] = "Walk";
// - ------------------------------------------------------------------------------------------ - //
var Player;
// - ------------------------------------------------------------------------------------------ - //
function cPlayer() {
	this.Pos = new Vector2D(0,0);
	this.TargetPos = this.Pos.clone();
	this.FacingLeft = false;

	this.State = ST_IDLE;
	this.CurrentFrameStep = 0;
	this.CurrentAnimation = "Idle";
	this.SetState( ST_IDLE );
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.SetState = function( NewState ) {
	if ( this.State != NewState ) {
		this.State = NewState;
		this.CurrentFrameStep = 0;
		this.CurrentAnimation = StateMap[this.State];
	}
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.GetCurrentFrame = function() {
	return Math.floor(this.CurrentFrameStep / 6);
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Step = function() {
	this.CurrentFrameStep++;
	if ( this.GetCurrentFrame() >= ManAnim[this.CurrentAnimation].frame.length ) {
		this.CurrentFrameStep = 0;
		if ( typeof ManAnim[this.CurrentAnimation].onloop != "undefined" ) {
			this.CurrentAnimation = ManAnim[this.CurrentAnimation].onloop[ Math.floor(Math.random() * ManAnim[this.CurrentAnimation].onloop.length) ];
		}
	}
	//console.log( this.CurrentFrameStep );
	
	var Diff = Sub(this.Pos,this.TargetPos);
	var Length = Diff.NormalizeRet();
	if ( Length > 2 ) {
		var Scaled = MultScalar(Diff,2);
		this.Pos = Sub(this.Pos, Diff );
		this.SetState( ST_MOVING );
		this.FacingLeft = Diff.x > 0;
	}
	else {
		this.Pos = this.TargetPos.clone();
		this.SetState( ST_IDLE );
	}
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.GetPos = function() {
	return new Vector2D( -FCamera.x+this.Pos.x+Room.Base.x, -FCamera.y+this.Pos.y+Room.Base.y );
}	
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.Draw = function() {
	var Index = 0;
	var CurrentFrame = this.GetCurrentFrame();
	Index = ManAnim[ this.CurrentAnimation ].frame[CurrentFrame];

	var Pos = this.GetPos();
	
	var YTweak = 0;
	if ( this.Pos.x >= 416 ) {
		YTweak = 10;
	}
	else if ( this.Pos.x >= 412 ) {
		YTweak = 8;
	}
	else if ( this.Pos.x >= 403 ) {
		YTweak = 6;
	}
	else if ( this.Pos.x >= 380 ) {
		YTweak = 4;
	}
	
	gfxDraw( Art.Man, Pos.x, Pos.y - YTweak, Index, this.FacingLeft );	
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var Music;
// - ------------------------------------------------------------------------------------------ - //
function Init() {
	Music = sndLooped("Music",0);	
	
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
	gfxDrawLayer( RoomBGLayer );
	Player.Draw();
	gfxDrawLayer( RoomFGLayer );
	gfxDrawLayer( FGLayer );
	
	if ( Mouse.Visible ) {
		ctx.fillStyle = RGB(255,255,255);
		ctx.fillRect( Mouse.x-10,Mouse.y-10,20,20 );
	}
	
	var PlayerPos = Player.GetPos();
	
	ctx.fillStyle = RGB(255,255,255);
	ctx.font = '20px Pixel';
	var Text = 'Whoa Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100-20);

	Text = "I was watching that.";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = Text + "_";
	}
	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100);

	Text = "Pos: " + Player.Pos.x + "," + Player.Pos.y;
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = Text + "_";
	}
	ctx.fillText(Text, BaseX-520, BaseY+280);


	var InvFade = (255-Stepper)/255;
	var Fade = Stepper/255;
	if ( InvFade > 0 ) {
		ctx.globalAlpha = InvFade;
		Music.setVolume(Fade);
		gfxClear( RGB(0,0,0) );
		ctx.globalAlpha = 1.0;
	}
}
// - ------------------------------------------------------------------------------------------ - //
