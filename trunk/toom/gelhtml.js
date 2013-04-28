// - ------------------------------------------------------------------------------------------ - //
// Internet Explorer Sucks { //
if ( ! window.console ) console = { log: function(){} };
// } //
// - ------------------------------------------------------------------------------------------ - //
var IntervalHandle = 0;
var FrameRate = 1000/60;
// - ------------------------------------------------------------------------------------------ - //
var Art = {};
// - ------------------------------------------------------------------------------------------ - //
var BaseX = 0;
var BaseY = 0;

var Camera = new Vector2D(0,0);
var FCamera = new Vector2D(0,0);
// - ------------------------------------------------------------------------------------------ - //
var canvas;
var ctx;
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function RGB( r, g, b ) {
	return "rgb("+r+","+g+","+b+")";
}
// - ------------------------------------------------------------------------------------------ - //
function gfxClear( color ) {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);	
}
// - ------------------------------------------------------------------------------------------ - //
function gfxDraw( Img, x, y, Index, FlipX, FlipY ) {
	ctx.save();
	
	if ( typeof Index != "number" ) {
		var anchor_x;
		if ( Img.hasOwnProperty('anchor_x') )
			anchor_x = Img.anchor_x;
		else
			anchor_x = Img.width>>1;
	
		var anchor_y;
		if ( Img.hasOwnProperty('anchor_y') )
			anchor_y = Img.anchor_y;
		else
			anchor_y = Img.height>>1;

//	ctx.translate( FlipX ? Img.width : 0, FlipY ? Img.height : 0 );
//	ctx.scale( FlipX ? -1 : 1, FlipY ? -1 : 1 );

		ctx.translate( BaseX+x-anchor_x, BaseY+y-anchor_y );
		ctx.translate( FlipX ? Img.width : 0, FlipY ? Img.height : 0 );
		ctx.scale( FlipX ? -1 : 1, FlipY ? -1 : 1 );

		ctx.drawImage( Img, 0, 0 );
//		ctx.drawImage( Img, BaseX+x-anchor_x, BaseY+y-anchor_y );
	}
	else {
		var tile_w;
		if ( Img.hasOwnProperty('tile_w') )
			tile_w = Img.tile_w;
		else
			tile_w = Img.width;
	
		var tile_h;
		if ( Img.hasOwnProperty('tile_h') )
			tile_h = Img.tile_h;
		else
			tile_h = Img.height;

		var anchor_x;
		if ( Img.hasOwnProperty('anchor_x') )
			anchor_x = Img.anchor_x;
		else
			anchor_x = tile_w>>1;
	
		var anchor_y;
		if ( Img.hasOwnProperty('anchor_y') )
			anchor_y = Img.anchor_y;
		else
			anchor_y = tile_h>>1;
			
		var x_steps = Img.width / tile_w;
//		var y_steps = Img.height / tile_h;

		var x_step = Math.floor(Index % x_steps);
		var y_step = Math.floor(Index / x_steps);

		ctx.translate( BaseX+x-anchor_x, BaseY+y-anchor_y );
		ctx.translate( FlipX ? Img.tile_w : 0, FlipY ? Img.tile_h : 0 );
		ctx.scale( FlipX ? -1 : 1, FlipY ? -1 : 1 );

		ctx.drawImage( Img,
			x_step*tile_w,
			y_step*tile_h,
			tile_w,
			tile_h,
			0,
			0,
			tile_w,
			tile_h
			);
		
//		ctx.drawImage( Img,
//			x_step*tile_w,
//			y_step*tile_h,
//			tile_w,
//			tile_h,
//			BaseX+x-anchor_x,
//			BaseY+y-anchor_y,
//			tile_w,
//			tile_h
//			);
	}
	
	ctx.restore();
}
// - ------------------------------------------------------------------------------------------ - //
function gfxDrawLayer( layer ) {
	for ( var idx = 0; idx < layer.length; idx++ ) {
		gfxDraw( 
			Art[layer[idx].img], 
			Math.floor(-FCamera.x * layer[idx].scalex) + layer[idx].x, 
			Math.floor(-FCamera.y * layer[idx].scaley) + layer[idx].y 
			);
	}

}
// - ------------------------------------------------------------------------------------------ - //
function sndPlay( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY );
}
// - ------------------------------------------------------------------------------------------ - //
function sndLooped( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY, 0, 0, -1 );
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function OnComplete() {
	// Copy Properties //
	for ( var idx = 0; idx < ArtFiles.length; idx++ ) {
		if ( ArtFiles[idx].hasOwnProperty('anchor_x') ) {
			Art[ArtFiles[idx].name].anchor_x = ArtFiles[idx].anchor_x;
		}
		if ( ArtFiles[idx].hasOwnProperty('anchor_y') ) {
			Art[ArtFiles[idx].name].anchor_y = ArtFiles[idx].anchor_y;
		}
		if ( ArtFiles[idx].hasOwnProperty('tile_w') ) {
			Art[ArtFiles[idx].name].tile_w = ArtFiles[idx].tile_w;
		}
		if ( ArtFiles[idx].hasOwnProperty('tile_h') ) {
			Art[ArtFiles[idx].name].tile_h = ArtFiles[idx].tile_h;
		}
	}	
	
	console.log("begin game");
	Init();
	IntervalHandle = setInterval( Run, FrameRate );
}
// - ------------------------------------------------------------------------------------------ - //
function Run() {
	Input_MouseUpdate();
	Step();
	Draw();	
}
// - ------------------------------------------------------------------------------------------ - //

// - -------------------------------------------------------------------------------------------------------------- - //
var Input_Mouse;
var Input_MouseBits;
var Mouse;

var MOUSE_LMB = 		0x1;
var MOUSE_RMB = 		0x2;
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseInit() {
	Input_Mouse = new Vector2D(0,0);
	Input_Mouse.Visible = false;

	Mouse = new Vector2D(0,0);
	Mouse.Visible = false;
	
	canvas.onmousemove = Input_MouseMove;
	canvas.onmouseup = Input_MouseUp;
	canvas.onmousedown = Input_MouseDown;
	
	canvas.onmouseover = Input_MouseOver;
	canvas.onmouseout = Input_MouseOut;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseExit() { 
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseMove( e ) {
	Input_Mouse.x = (e.clientX - canvas.offsetLeft)// / Canvas_Scale;
	Input_Mouse.y = (e.clientY - canvas.offsetTop)// / Canvas_Scale;
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseOver( e ) {
	Input_Mouse.Visible = true;
	
	console.log( "Mouse Over" );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseOut( e ) {
	Input_Mouse.Visible = false;

	console.log( "Mouse Out" );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseUp( e ) {
	Input_MouseBits &= ~MOUSE_LMB;

	console.log( "Click Up " + Input_Mouse );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseDown( e ) {
	Input_Mouse.x = (e.clientX - canvas.offsetLeft);// / Canvas_Scale;
	Input_Mouse.y = (e.clientY - canvas.offsetTop);// / Canvas_Scale;
	
	Input_MouseBits |= MOUSE_LMB;

	console.log( "Click Down " + Input_Mouse );
}
// - -------------------------------------------------------------------------------------------------------------- - //
function Input_MouseUpdate() {
	Mouse.x = Input_Mouse.x;
	Mouse.y = Input_Mouse.y;
	Mouse.Visible = Input_Mouse.Visible;
}
// - -------------------------------------------------------------------------------------------------------------- - //

// - ------------------------------------------------------------------------------------------ - //
function Main_LoseFocus() {
	// Stop the Clock //
	clearInterval( IntervalHandle );
	IntervalHandle = 0;
	
	if ( typeof LoseFocus != "undefined" ) {
		LoseFocus();
	}
}
// - ------------------------------------------------------------------------------------------ - //
function Main_GainFocus() {
	if ( typeof GainFocus != "undefined" ) {
		GainFocus();
	}

	// Restart the Clock //
	if ( IntervalHandle == 0 ) {
		IntervalHandle = setInterval( Run, FrameRate );
	}
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var ThingsLoaded = 0;
// - ------------------------------------------------------------------------------------------ - //
function ShowProgress() {
	gfxClear( RGB(0,0,0) );

	ctx.fillStyle = RGB(255,255,255);
	for ( var idx = 0; idx < ThingsLoaded; idx++ ) {
		var x = (20*idx)-(20*ThingsLoaded>>1);
		var y = 0;
		
		ctx.fillRect(BaseX+x,BaseY+y,18,18);
	}
}
// - ------------------------------------------------------------------------------------------ - //
function handleFileLoad(event) {
	var item = event.item; // A reference to the item that was passed in
	var type = item.type;
	
	if (type == createjs.LoadQueue.IMAGE) {
		console.log(event);
		Art[event.item.id] = event.result;
	}
	
	ThingsLoaded++;
	ShowProgress();
}
// - ------------------------------------------------------------------------------------------ - //
function OnLoad() {
	console.log("Lets Begin");
	
	canvas = document.getElementById("TheCanvas"),
	ctx = canvas.getContext("2d");
	
	BaseX = canvas.width>>1;
	BaseY = canvas.height>>1;

	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);

	window.onblur = Main_LoseFocus;
	window.onfocus = Main_GainFocus;
	
	Input_MouseInit();
	
	var queue = new createjs.LoadQueue(true); // true 
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete",OnComplete);
	queue.addEventListener("fileload",createjs.proxy(handleFileLoad,(this)));
	
	for ( var idx = 0; idx < ArtFiles.length; idx++ ) {
		queue.loadFile({id:ArtFiles[idx].name, src:ArtFiles[idx].value});
	}
	for ( var idx = 0; idx < AudioFiles.length; idx++ ) {
		queue.loadFile({id:AudioFiles[idx].name, src:AudioFiles[idx].value});
	}
	
	queue.load();
}
// - ------------------------------------------------------------------------------------------ - //
