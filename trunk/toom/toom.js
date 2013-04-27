// - ------------------------------------------------------------------------------------------ - //
var Music;
// - ------------------------------------------------------------------------------------------ - //
function Init() {
	Music = sndLooped("Music");	
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
	
	var TargetX = ((Mouse.x-BaseX)/BaseX)*32.0;
	var TargetY = ((Mouse.y-BaseY)/BaseY)*32.0;
	
	CameraX -= (CameraX-TargetX)*0.1;
	CameraY -= (CameraY-TargetY)*0.1;
	
	FCameraX = Math.floor(CameraX);
	FCameraY = Math.floor(CameraY);
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function Draw() {
//	gfxClear( RGB(0,0,0) );

	BX = BaseX-FCameraX;
	BY = BaseY-FCameraY;
	
	gfxDrawLayer( BGLayer );
	gfxDraw( Art.Man, -FCameraX+0, -FCameraY+78, 4 );//(Stepper>>3)&3 );
	gfxDrawLayer( FGLayer );
	
	if ( Mouse.Visible ) {
		ctx.fillStyle = RGB(255,255,255);
		ctx.fillRect( Mouse.x-10,Mouse.y-10,20,20 );
	}
	
	ctx.fillStyle = RGB(255,255,255);
	ctx.font = '20px Pixel';
	var Text = 'Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BX-(TD.width>>1), BY-78+48-20);

	Text = "Why are you ignoring me?";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = "Why are you ignoring me?_";
	}
	ctx.fillText(Text, BX-(TD.width>>1), BY-78+48);

}
// - ------------------------------------------------------------------------------------------ - //
