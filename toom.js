function Init() {
	sndLooped("music");	
}

var Stepper = 0;
function Step() {
	Stepper++;
	
}

function DrawLayer( layer ) {
	for ( var idx = 0; idx < layer.length; idx++ ) {
		imgDraw( Art[layer[idx].img], layer[idx].x, layer[idx].y );
	}

}

function Draw() {
	ctx.fillStyle = "#221133";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	DrawLayer( BGLayer );
	imgDraw( Art.Man, 0, 78, (Stepper>>3)&3 );
	DrawLayer( FGLayer );
	
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = '20px Pixel';
	var Text = 'Drek,';
	var TD = ctx.measureText(Text);
	ctx.fillText(Text, BaseX-(TD.width>>1), BaseY-48-20);

	Text = "Why are you ignoring me?";
	TD = ctx.measureText(Text);
	if ( (Stepper >> 5)&1 ) {
		Text = "Why are you ignoring me?_";
	}
	ctx.fillText(Text, BaseX-(TD.width>>1), BaseY-48);

}
