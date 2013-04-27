function Init() {
	sndLooped("music");	
}

var Stepper = 0;
function Step() {
	Stepper++;
	
}

function Draw() {
	ctx.fillStyle = "#221133";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	imgDraw( Art.Man, 0, 64, (Stepper>>3)&3 );
	
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = '20px Pixel';
	var Text = 'Hello Drek';
	ctx.fillText(Text, BaseX-55, BaseY-64-20);

	Text = "I've been protecting you_";
	if ( (Stepper >> 5)&1 ) {
		Text = "I've been protecting you";
	}
	ctx.fillText(Text, BaseX-120, BaseY-64);

}
