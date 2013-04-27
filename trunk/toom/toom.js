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
	
	BaseX = canvas.width>>1;
	BaseY = canvas.height>>1;
	
	BaseX -= Math.floor(((Mouse.x-BaseX)/BaseX)*40.0);
	BaseY -= Math.floor(((Mouse.y-BaseY)/BaseY)*40.0);
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function Draw() {
//	gfxClear( RGB(0,0,0) );
	
	gfxDrawLayer( BGLayer );
	gfxDraw( Art.Man, 0, 78, 4 );//(Stepper>>3)&3 );
	gfxDrawLayer( FGLayer );
	
	if ( Mouse.Visible ) {
		ctx.fillStyle = RGB(255,255,255);
		ctx.fillRect( Mouse.x-10,Mouse.y-10,20,20 );
	}
	
	ctx.fillStyle = RGB(255,255,255);
	ctx.font = '20px Pixel';
	var Text = 'Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BaseX-(TD.width>>1), BaseY-78+48-20);

	Text = "Why are you ignoring me?";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = "Why are you ignoring me?_";
	}
	ctx.fillText(Text, BaseX-(TD.width>>1), BaseY-78+48);

}
// - ------------------------------------------------------------------------------------------ - //
