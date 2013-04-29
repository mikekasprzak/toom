// - ------------------------------------------------------------------------------------------ - //
var Room;
// - ------------------------------------------------------------------------------------------ - //
function cRoom() {
	this.Base = new Vector2D(0,78);
}
// - ------------------------------------------------------------------------------------------ - //


// - ------------------------------------------------------------------------------------------ - //
var ST = {
	NULL:0,
	IDLE:1,
	MOVING:2,
	SIT_PC_CHAIR:3,
	SIT_TABLE_CHAIR:4,
	SIT_COUCH:5,
};
// - ------------------------------------------------------------------------------------------ - //
var StateMap = [];
StateMap[ST.IDLE] = "Idle";
StateMap[ST.MOVING] = "Walk";
StateMap[ST.SIT_PC_CHAIR] = "PC_Sit";
StateMap[ST.SIT_TABLE_CHAIR] = "Table_Sit";
StateMap[ST.SIT_COUCH] = "Couch_Sit";
// - ------------------------------------------------------------------------------------------ - //
var Player;
// - ------------------------------------------------------------------------------------------ - //
function cPlayer() {
	this.Pos = new Vector2D(0,0);
	this.TargetPos = this.Pos.clone();
	this.FacingLeft = false;

	this.State = ST.IDLE;
	this.CurrentFrameStep = 0;
	this.CurrentAnimation = "Idle";
	this.SetState( ST.IDLE );
	
	this.Focus = null;
	
	this.Inventory = [];
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.SetState = function( NewState, FacingLeft ) {
	if ( this.State != NewState ) {
		this.State = NewState;
		this.CurrentFrameStep = 0;
		this.CurrentAnimation = StateMap[this.State];
	}
	
	if ( typeof FacingLeft != "undefined" ) {
		this.FacingLeft = FacingLeft;
	}
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.SetAnimation = function( NewAnim, FacingLeft ) {
	this.CurrentFrameStep = 0;
	this.CurrentAnimation = NewAnim;
	
	if ( typeof FacingLeft != "undefined" ) {
		this.FacingLeft = FacingLeft;
	}	
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.AddItem = function( id ) {
	// TODO: Play Sound Here //
	//sndPlay("Take");
	this.Inventory.push( id );
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.FindItem = function( id ) {
	for ( var idx = 0; idx < this.Inventory.length; idx++ ) {
		if ( this.Inventory[idx] == id )
			return idx;
	}
	return null;
}
// - ------------------------------------------------------------------------------------------ - //
cPlayer.prototype.RemoveItem = function( id ) {
	var Index = this.FindItem( id );
	if ( Index != null ) {
		this.Inventory.splice(Index,1);
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
		var PriorAnim = this.CurrentAnimation;
		if ( ManAnim[this.CurrentAnimation].hasOwnProperty('onloopcall') ) {
			console.log("hey");
			ManAnim[this.CurrentAnimation].onloopcall();
		}
		// Make sure onloopcall didn't change the animation //
		if ( PriorAnim == this.CurrentAnimation ) {
			if ( ManAnim[this.CurrentAnimation].hasOwnProperty('onloop') ) {
				this.CurrentAnimation = ManAnim[this.CurrentAnimation].onloop[ Math.floor(Math.random() * ManAnim[this.CurrentAnimation].onloop.length) ];
			}
		}
	}


	var Diff = Sub(this.Pos,this.TargetPos);
	var Length = Diff.NormalizeRet();

	if ( Length > 2 ) {
		if ( ManAnim[this.CurrentAnimation].hasOwnProperty('onaction') ) {
			this.CurrentFrameStep = 0;
			this.CurrentAnimation = ManAnim[this.CurrentAnimation].onaction[0];
		}
	}
	
	if ( !ManAnim[this.CurrentAnimation].hasOwnProperty('priority') ) {
		if ( Length > 2 ) {
			var Scaled = MultScalar(Diff,2);
			this.Pos = Sub(this.Pos, Diff );
			this.SetState( ST.MOVING );
			this.FacingLeft = Diff.x > 0;
		}
		else {
			this.Pos = this.TargetPos.clone();
			if ( (this.State == ST.MOVING) || (this.State == ST.IDLE) ) {
				this.SetState( ST.IDLE );
				
				if ( Player.Focus != null ) {
					if ( Player.Focus.hasOwnProperty('onaction') ) {
						Player.Focus.onaction();
					}
				}
			
				Player.Focus = null;
			}
		}
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
var MouseFocus = null;
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
var MouseMoveCount = 0;
var MouseClickedCount = 0;
// - ------------------------------------------------------------------------------------------ - //
var Stepper = 0;
function Step() {
	Stepper++;
	
	var BMouse = Mouse.Pos.clone();
	BMouse.x -= BaseX - FCamera.x;
	BMouse.y -= BaseY - FCamera.y;

	MouseFocus = null;
	for ( var layer = 0; layer < ItemLayers.length; layer++ ) {
		for ( var idx = 0; idx < ItemLayers[layer].length; idx++ ) {
			var Item = ItemLayers[layer][idx];
			var ArtFile = Art[Item.img];
			
			if ( Item.hasOwnProperty( 'nice' ) && Item.active && !Item.hidden ) {
				var IX = Item.x-ArtFile.anchor_x-ArtFile.margin_left;
				var IY = Item.y-ArtFile.anchor_y-ArtFile.margin_top;
				var IW = ArtFile.tile_w+ArtFile.margin_left+ArtFile.margin_right;
				var IH = ArtFile.tile_h+ArtFile.margin_top+ArtFile.margin_bottom;
				
				if ( Test_Sphere_vs_AABB(
						BMouse,
						4,
						IX,
						IY,
						IW,
						IH 
					)
				)
				{
					MouseFocus = Item;
//					MouseClickedCount = 128;
				}
			}
		}
	}
	
	// Mouse Cursor Part //
	var TargetX = ((Mouse.Pos.x-BaseX)/BaseX)*32.0;
	var TargetY = ((Mouse.Pos.y-BaseY)/BaseY)*32.0;

	// Player Position Part //
	var Limit = 1010; // 1010 wide, 54 pixels inward //
	TargetX += (Player.Pos.x / Limit) * 90.0; 
	
	Camera.x -= (Camera.x-TargetX)*0.1;
	Camera.y -= (Camera.y-TargetY)*0.1;
	
	FCamera.x = Math.floor(Camera.x);
	FCamera.y = Math.floor(Camera.y);
	
	if ( Mouse.Diff().Magnitude() != 0 ) {
		MouseMoveCount += 16;
		if ( MouseMoveCount > 128 )
			MouseMoveCount = 128;
	}
	else {
		if ( MouseMoveCount )
			MouseMoveCount--;
	}

	if ( MouseClickedCount )
		MouseClickedCount--;
	
	if ( Mouse.GetNew() ) {
		sndPlay( "Click", 0.5 );
		
		if ( MouseFocus == null ) {
			Player.TargetPos.x = (Mouse.Pos.x+Camera.x-BaseX);
		}
		else {
			var Item = MouseFocus;
			var ArtFile = Art[Item.img];

			var IX = Item.x-ArtFile.anchor_x-ArtFile.margin_left;
			var IY = Item.y-ArtFile.anchor_y-ArtFile.margin_top;
			var IW = ArtFile.tile_w+ArtFile.margin_left+ArtFile.margin_right;
			var IH = ArtFile.tile_h+ArtFile.margin_top+ArtFile.margin_bottom;
			
			// TODO: Add properties for adjusting the target position offset //

			Player.TargetPos.x = IX+(IW>>1)+ArtFile.offset_x;
			Player.Focus = MouseFocus;
			MouseClickedCount = 128;
		}
		
		AddCP( Mouse.Pos.x+Camera.x, Mouse.Pos.y+Camera.y );

		var HalfLimit = (Limit>>1);

		// Constrain Player Pos //
		if ( Player.TargetPos.x < -(HalfLimit-54-16) )
			Player.TargetPos.x = -(HalfLimit-54-16);
		if ( Player.TargetPos.x > (HalfLimit-54) )
			Player.TargetPos.x = (HalfLimit-54);


//		BX = BaseX;
//		BY = BaseY;
//
//		MouseTarget = null;
//		for ( var layer = 0; layer < ItemLayers.length; layer++ ) {
//			for ( var idx = 0; idx < ItemLayers[layer].length; idx++ ) {
//				var Item = ItemLayers[layer][idx];
//				var ArtFile = Art[Item.img];
//				
//				if ( Test_Sphere_vs_AABB(
//						Mouse.Pos,
//						0,
//						-BX+Item.x-ArtFile.anchor_x,
//						-BY+Item.y-ArtFile.anchor_y,
//						ArtFile.tile_w,
//						ArtFile.tile_h 
//					)
//				)
//				{
//					MouseTarget = ItemLayers[layer][idx];
//				}
//			}
//		}

		
//		for ( var layer = 0; layer < ItemLayers.length; layer++ ) {
//			for ( var idx = 0; idx < ItemLayers[layer].length; idx++ ) {
//				//Art[ItemLayers[layer][idx].img]
//				if ( 
//			}
//			if ( MouseTarget != null ) 
//				break;
//		}
	}
	
	Player.Step();
	
	// *** //

	StepCP();
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
	
	
	
//	if ( Mouse.Visible ) {
//		ctx.fillStyle = RGB(255,255,255);
//		ctx.fillRect( Mouse.Pos.x-10,Mouse.Pos.y-10,20,20 );
//	}

	if ( MouseFocus != null ) {
		//console.log(MouseFocus);
		var Item = MouseFocus;
		var ArtFile = Art[Item.img];

		var IX = Item.x-ArtFile.anchor_x-ArtFile.margin_left;
		var IY = Item.y-ArtFile.anchor_y-ArtFile.margin_top;
		var IW = ArtFile.tile_w+ArtFile.margin_left+ArtFile.margin_right;
		var IH = ArtFile.tile_h+ArtFile.margin_top+ArtFile.margin_bottom;

		var OldAlpha = ctx.globalAlpha;
		ctx.globalAlpha = MouseMoveCount > 64 ? 1 : MouseMoveCount / 64;

		ctx.fillStyle = RGB(0,255,255);
		ctx.font = '20px Pixel';
		var Text = Item.nice;//Item.img;
		var TD = ctx.measureText(Text);
		ctx.fillText(Text, 
			BX+IX+(IW>>1) - (TD.width>>1),
			BY+IY - 15
			);
//			Mouse.Pos.x-(TD.width>>1), 
//			Mouse.Pos.y-15
//		ctx.fillText(Text, Mouse.Pos.x+Camera.x-(TD.width>>1), Mouse.Pos.y+Camera.y-20);

		ctx.globalAlpha = OldAlpha;
	}

	if ( Player.Focus != null ) {
		var Item = Player.Focus;
		var ArtFile = Art[Item.img];

		var IX = Item.x-ArtFile.anchor_x-ArtFile.margin_left;
		var IY = Item.y-ArtFile.anchor_y-ArtFile.margin_top;
		var IW = ArtFile.tile_w+ArtFile.margin_left+ArtFile.margin_right;
		var IH = ArtFile.tile_h+ArtFile.margin_top+ArtFile.margin_bottom;

		var OldAlpha = ctx.globalAlpha;
		ctx.globalAlpha = MouseClickedCount > 64 ? 1 : MouseClickedCount / 64;

		ctx.fillStyle = RGB(255,255,0);
		ctx.font = '20px Pixel';
		var Text = Item.nice;//Item.img;
		var TD = ctx.measureText(Text);
		ctx.fillText(Text, 
			BX+IX+(IW>>1) - (TD.width>>1),
			BY+IY - 15
			);

		ctx.globalAlpha = OldAlpha;
	}

	if ( ShowDebug ) {
		var OldAlpha = ctx.globalAlpha;
		ctx.globalAlpha = 0.8;
		for ( var layer = 0; layer < ItemLayers.length; layer++ ) {
			for ( var idx = 0; idx < ItemLayers[layer].length; idx++ ) {
				var Item = ItemLayers[layer][idx];
				var ArtFile = Art[Item.img];
				
				var IX = Item.x-ArtFile.anchor_x-ArtFile.margin_left;
				var IY = Item.y-ArtFile.anchor_y-ArtFile.margin_top;
				var IW = ArtFile.tile_w+ArtFile.margin_left+ArtFile.margin_right;
				var IH = ArtFile.tile_h+ArtFile.margin_top+ArtFile.margin_bottom;
				
				// Position //
				ctx.strokeStyle = RGB(255,255,0);
				ctx.strokeRect( 
					BX+Item.x-2,
					BY+Item.y-2,
					4,4 );
				// Rectangle //
				ctx.strokeStyle = RGB(128,0,0);
				ctx.strokeRect( 
					BX+IX,
					BY+IY,
					IW,
					IH );
				// New Center //
				ctx.strokeStyle = RGB(255,255,255);
				ctx.strokeRect( 
					BX+IX+(IW>>1),
					BY+IY+(IH>>1),
					4,
					4 );
			}
		}
		ctx.globalAlpha = OldAlpha;
				
		{
			ctx.fillStyle = RGB(255,255,255);
			ctx.font = '20px Pixel';
			var Text = "Pos: " + Player.Pos.x + "," + Player.Pos.y;
			TD = ctx.measureText(Text);
			ctx.fillText(Text, BaseX-520, BaseY+280);
			
			Text = Player.CurrentAnimation + "(" + Player.CurrentFrameStep + ")";
			TD = ctx.measureText(Text);
			ctx.fillText(Text, BaseX-520, BaseY+280+20);
			Text = Player.State;
			TD = ctx.measureText(Text);
			ctx.fillText(Text, BaseX-520, BaseY+280+40);
		}		
	}
	
//	var PlayerPos = Player.GetPos();
//	
//	ctx.fillStyle = RGB(255,255,255);
//	ctx.font = '20px Pixel';
//	var Text = 'The meat space is';
//	var TD = ctx.measureText(Text);
//	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100-20);
//
//	Text = "haunted Drek. Stay.";
//	TD = ctx.measureText(Text);
//	if ( (Stepper >> 5)&1 ) {
//		Text = Text + "_";
//	}
//	ctx.fillText(Text, BaseX+PlayerPos.x-(TD.width>>1), BaseY+PlayerPos.y-100);

	// *** //

	{
		var BX = 640-100;
		var BY = 360-80;
		var Length = Player.Inventory.length;

		gfxDraw( Art.Inventory, BX+(21<<1), BY, 2 );
		for ( var idx = 0; idx < Length; idx++ ) {
			gfxDraw( Art.Inventory, BX-(idx*Art.Items.tile_w), BY, 1 );
			gfxDraw( Art.Items, BX-(idx*Art.Items.tile_w), BY-(42-35), Player.Inventory[idx] );
		}
		if ( Length == 0 ) {
			gfxDraw( Art.Inventory, BX-(0*Art.Items.tile_w), BY, 1 );
			gfxDraw( Art.Inventory, BX-(0*Art.Items.tile_w)-(21<<1), BY, 0 );
		}
		else
			gfxDraw( Art.Inventory, BX-((Length-1)*Art.Items.tile_w)-(21<<1), BY, 0 );
	}

	// *** //

	DrawCP(-FCamera.x,-FCamera.y);

	// *** //

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
