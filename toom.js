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
	var Text = 'Hello Drek';
	ctx.fillText(Text, BaseX-65, BaseY-48-20);

	Text = "I've been protecting you_";
	if ( (Stepper >> 5)&1 ) {
		Text = "I've been protecting you";
	}
	ctx.fillText(Text, BaseX-130, BaseY-48);

}
