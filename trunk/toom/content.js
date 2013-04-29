// - ------------------------------------------------------------------------------------------ - //
// Specify a 'tile_w' and 'tile_h' to define the size of each tile/frame //
// Specify an 'anchor_x' and 'anchor_y' to describe where his bottom/base point is, if not center //
var ArtFiles = [
	{ name:"Man", value:"art/dude_anims.png", tile_w:128, tile_h:128, anchor_y:128 },
	
	{ name:"BG1", value:"art/toombg_bg_01.png" },
	{ name:"BG2", value:"art/toombg_para_01.png" },
	{ name:"BG3", value:"art/toombg_para_02.png", anchor_y:560-400 },
	{ name:"BG4", value:"art/toombg_para_03.png", anchor_y:304-400 },

	{ name:"Fog", value:"art/toombg_fx_fog.png", anchor_y:276-400 },

	{ name:"Room", value:"art/toombg_room.png", anchor_y:560-400 },

	{ name:"FG1", value:"art/toombg_fg_01.png" },
	{ name:"FG2", value:"art/toombg_fg_02.png", anchor_y:304-400 },
	
	{ name:"Fan", value:"item/item_fan.png", tile_w:8, anchor_y:64 },
	{ name:"TV", value:"item/item_tv.png", tile_w:104, anchor_y:88, margin_left:-24,margin_right:-24,margin_top:-24 },
	{ name:"Couch", value:"item/item_couch.png", anchor_y:42, offset_x:-6 },

	{ name:"Table", value:"item/item_table.png", anchor_y:38 },
	{ name:"Chair", value:"item/item_chair.png", anchor_y:48, offset_x:-7 },
	{ name:"Soda", value:"item/item_soda.png", anchor_y:12 },

	{ name:"Trash", value:"item/item_trashcan.png", tile_w:64, anchor_y:64, margin_left:-16,margin_right:-16,margin_top:-16, offset_x:-20 },

	{ name:"Cupboards", value:"item/item_cupboards.png", anchor_y:122 },
	{ name:"CupboardTop", value:"item/item_cupboards_upper.png", anchor_y:38, offset_x:-6 },
	{ name:"CupboardBot", value:"item/item_cupboards_lowe.png", anchor_y:38, offset_x:-6 },
	{ name:"Oven", value:"item/item_oven_door.png", anchor_y:40 },
	{ name:"Toaster", value:"item/item_toaster.png", anchor_y:14 },
	{ name:"CoffeeMaker", value:"item/item_coffee_maker.png", anchor_y:24 },
	{ name:"CoffeePot", value:"item/item_coffee_pot.png", tile_w:20, anchor_y:12 },

	{ name:"Fridge", value:"item/item_fridge.png", anchor_y:128 },
	{ name:"FridgeTop", value:"item/item_fridge_freezerdoor.png", anchor_y:34, offset_x:-30, margin_right:-24 },
	{ name:"FridgeBot", value:"item/item_fridge_fridgedoor.png", anchor_y:60, offset_x:-30, margin_right:-24 },

	{ name:"Fishbowl", value:"item/item_fishbowl.png", tile_w:32, tile_h:64, anchor_y:64, offset_x:-20 },
	{ name:"Coffee", value:"item/item_coffee_mug.png", anchor_y:10 },
	{ name:"Desk", value:"item/item_PC.png", tile_w:128, anchor_y:96, margin_left:-12,margin_right:-12,margin_top:-24 },

	{ name:"Head", value:"item/item_frozenhead.png", anchor_y:14 },

	{ name:"Teleporter", value:"item/item_teleporter.png", tile_w:128, anchor_y:186, margin_left:-42,margin_right:-18,margin_top:-34 },

	{ name:"Items", value:"item/inventory_items.png", tile_w:42*2, tile_h:35*2 },
	{ name:"Inventory", value:"item/inventory_bar.png", tile_w:42*2, tile_h:42*2 },
];
// - ------------------------------------------------------------------------------------------ - //
var AudioFiles = [
	{ name:"Music", value:"audio/byetone-capturethis.ogg|audio/byetone-capturethis.mp3" },
	{ name:"Click", value:"audio/click.ogg|audio/click.mp3" },
	{ name:"Cab_Open", value:"audio/cab_open.ogg|audio/cab_open.mp3" },
	{ name:"Cab_Close", value:"audio/cab_close.ogg|audio/cab_close.mp3" },
];
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
// Item Enumeration //
var IT = {
	KEY:0,
//	DUPE_POTATO:1,
	REMOTE:2,
	COFFEE:3,
	HEAD:4,
	SODA:5,
	FISH_FOOD:6,
	POISON:7,

	COOKED_MEAT:8,
	MANUAL:9,
	TOAST:10,
	BREAD:11,
	POTATO:12,
	COOKED_POTATO:13,
	MEAT:14,
	DISK:15,
};
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
// Common onaction functions //
// - ------------------------------------------------------------------------------------------ - //
function ToggleState() {
	this.state ^= 1;
}
// - ------------------------------------------------------------------------------------------ - //
function CabToggleState() {
	ToggleState.call(this);
	if ( this.state ) {
		sndPlay("Cab_Open");
		Player.SetState(ST.TURN,true);
//		Player.SetAnimation("Turned",true);
	}
	else {
		sndPlay("Cab_Close");
		Player.SetState(ST.IDLE);
//		Player.SetAnimation("Idle",true);
	}
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var BGLayer = [
	{ img:"BG1",x:0,y:0,scalex:0.5,scaley:0.5 },
	{ img:"BG4",x:0,y:0,scalex:0.7,scaley:0.7 },
	{ img:"BG3",x:0,y:0,scalex:0.8,scaley:0.8 },
	{ img:"BG2",x:0,y:0,scalex:0.9,scaley:0.9 },
	{ img:"Fog",x:0,y:0,scalex:0.9,scaley:0.9 },
	{ img:"Room",x:0,y:0,scalex:1.0,scaley:1.0 },
];
// - ------------------------------------------------------------------------------------------ - //
var FGLayer = [
	{ img:"FG1",x:0,y:0,scalex:1.1,scaley:1.1 },
	{ img:"FG2",x:0,y:0,scalex:1.2,scaley:1.2 },
];
// - ------------------------------------------------------------------------------------------ - //
var RoomBGLayer = [
	{ img:"Couch",nice:"Couch",x:-320,y:78,onactioncall:function(){Player.SetState(ST.SIT_COUCH,true);} },

	{ img:"Table",x:-170,y:78 },
	{ img:"Chair",nice:"Chair",x:-154,y:78,onactioncall:function(){Player.SetState(ST.SIT_TABLE_CHAIR,false);} },
	{ img:"Soda",nice:"Soda",id:"Soda1",x:-190,y:78-38,active:false,
		onactioncall:function(){this.active=false;Player.AddItem(IT.SODA);} },

	{ img:"Soda",id:"Soda2",x:-138,y:78-38,active:false },

	{ img:"Trash",nice:"Trash Can",x:-96,y:78,states:[{frame:[0]},{frame:[1]}],onactioncall:CabToggleState },

	{ img:"Fridge",x:62,y:78 },
	{ img:"FridgeTop",nice:"Freezer",x:62+14,y:78-62-4,states:[{frame:[-1]},{frame:[0]}],
		onactioncall:function(){FindById("Head1").hidden=(this.state==1); CabToggleState.call(this);} },
	{ img:"FridgeBot",nice:"Fridge",x:62+14,y:78-4,states:[{frame:[-1]},{frame:[0]}],onactioncall:CabToggleState },

	{ img:"Head",nice:"Frozen Head",id:"Head1",x:66,y:78-78,hidden:true,
		onactioncall:function(){this.active=false;Player.AddItem(IT.HEAD);} },

	{ img:"Cupboards",x:-24,y:78 },
	{ img:"CupboardTop",nice:"Cupboard",x:-47,y:78-80,states:[{frame:[-1]},{frame:[0]}],onactioncall:CabToggleState },
//		onactioncall:function(){if (this.state == 0) Player.SetAnimation("Cupboard1_Open",true); else Player.SetAnimation("Cupboard1_Close",true); CabToggleState.call(this);} },
	{ img:"CupboardTop",nice:"Cupboard",x:-47+52,y:78-80,states:[{frame:[-1]},{frame:[0]}],onactioncall:CabToggleState },
	{ img:"CupboardBot",nice:"Cupboard",x:-47,y:78-2,states:[{frame:[-1]},{frame:[0]}],onactioncall:CabToggleState },
	{ img:"Oven",nice:"Oven",x:-46+52,y:78,states:[{frame:[-1]},{frame:[0]}],onactioncall:CabToggleState },
	
	{ img:"Toaster",nice:"Toaster",x:-46,y:78-44,onactioncall:function(){var Thing = FindById("Soda1"); Thing.active = !Thing.active;} },
	{ img:"CoffeeMaker",x:13,y:78-44 },
	{ img:"CoffeePot",nice:"Coffee Pot",x:8,y:78-44-6,state:4,states:[{frame:[0]},{frame:[1]},{frame:[2]},{frame:[3]},{frame:[4]}] },

	{ img:"Desk",x:230,y:78,frame:[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0] },
	{ img:"Fishbowl",nice:"Fish Bowl",x:166,y:78,frame:[0,1,2,3,4,5,6,7,8,9,10,11,12,13] },
	{ img:"Coffee",nice:"Mug",x:198,y:78-38 },
	{ img:"Chair",nice:"Chair",x:250,y:78,onactioncall:function(){Player.SetState(ST.SIT_PC_CHAIR,false);} },

	
	// Back //
	{ img:"Teleporter",x:429,y:78,frame:[0] },
	// Screen Light //
	{ img:"Teleporter",x:429,y:78,frame:[1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1] },
];
// - ------------------------------------------------------------------------------------------ - //
var RoomFGLayer = [
	{ img:"TV",nice:"Television",x:-423,y:78,frame:[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0],
		onactioncall:function(){Player.RemoveItem(IT.HEAD);} },
//	{ img:"Fan",nice:"Fan",x:-453,y:78-52,frame:[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5] },
	{ img:"Fan",nice:"Fan",x:-453,y:78-52,frame:[0,1,2,3,4,5] },
	// Front Tube //
	{ img:"Teleporter",nice:"Tube",x:429,y:78,frame:[3] },
	// Glow //
	{ img:"Teleporter",x:429,y:78,frame:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,2,2,2,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1] },
];
// - ------------------------------------------------------------------------------------------ - //
var ItemLayers = [
	RoomBGLayer,
	RoomFGLayer
];
// - ------------------------------------------------------------------------------------------ - //
var AllLayers = [
	BGLayer,
	FGLayer,
	RoomBGLayer,
	RoomFGLayer
];
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var ManAnim = {
	Walk:{frame:[0,0,1,1,2,2,3,3]},
	Idle:{frame:[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],onloop:["Idle0","Idle1","Idle2","Idle3","Idle4"]},
	Idle0:{frame:[4,4,4,4,4,4,4,4,4,4],onloop:["Idle"]},
	Idle1:{frame:[5,5,5,5,5,6,7,8,8,9,9,8,8,9,9,8,8,9,9,8,8,10,10,11,11,12,12],onloop:["Idle"]},
	Idle2:{frame:[13,13,14,14,15,15,16,16,17,17,18,18,17,17,18,18,19,19,20,20,21,21,21,21,22,22,23,23,24,24,25,25,26,26,21,21,21,21,22,22,23,23,24,24,25,25,26,26,21,21,21,21,22,22,23,23,24,24,25,25,26,26],onloop:["Idle"]},
	Idle3:{frame:[27,28,29,29,30,30,31,31,32,32,33,33,33,33,33,33,33,33,33,33,28,28],onloop:["Idle"]},
	Idle4:{frame:[34,35,35,36,36,35,35,36,36,37,38,39,40,41,41,41,41,41,41,41,41,41,41,42,43,44,45,46],onloop:["Idle"]},
	Turn:{frame:[51]},
	Couch_Sit:{frame:[47,47],priority:true,onloop:["Couch_Idle"]},
	Couch_Stand:{frame:[47,47],priority:true,onloop:["Idle"]},
	Couch_Idle:{frame:[48],onaction:["Couch_Stand"]},
	Couch_WatchTV:{frame:[49,49,50,50,49,49,50,50,50,50,50,50,50,50,50,50,49,50,49,49,50,49,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48],onaction:["Couch_Stand"]},
	Cupboard1_Open:{frame:[51,51,51,51,51,51,51,51,51,51,52,53,53,53,53,53,54,54,54,54,54,54,54,54,54,54,52,51,51,51,51],priority:true,onloop:["Idle"]},
	Cupboard1_Close:{frame:[51,51,51,51,51,51,51,51,51,51,52,53,53,53,53,53,52,52,52,52,52,51,51,51,51],priority:true,onloop:["Idle"]},
	Cupboard2_Open:{frame:[51,51,51,51,51,51,51,51,51,51,55,56,56,56,56,56,57,57,57,57,57,57,57,57,57,57,55,55,51,51,51,51],priority:true,onloop:["Idle"]},
	Cupboard2_Close:{frame:[51,51,51,51,51,51,51,51,51,51,55,57,57,57,57,57,52,52,52,52,52,55,51,51,51,51],priority:true,onloop:["Idle"]},
	PC_Sit:{frame:[51,51,51,51,51,55,55],priority:true,onloop:["PC_Idle"]},
	PC_Stand:{frame:[55,55,51,51],priority:true,onloop:["Idle"]},
	PC_Idle:{frame:[59],onaction:["PC_Stand"]},
	PC_Work:{frame:[59,59,59,59,60,59,60,59,60,59,60,59,60,59,60,59,60,59,60,59,9,59,59,59,9,59,59],onaction:["PC_Stand"]},
	PC_Coffee:{frame:[61,61,62,62,63,63,64,64,64,64,64,64,64,64,64,64,63,63,62,62],onaction:["PC_Stand"]},
	PC_Desk:{frame:[51,51,51,51,51,51,74,74,74,74,74,74],priority:true,onloop:["Idle"]},
	Table_Sit:{frame:[51,51,51,51,51,55,55],priority:true,onloop:["Table_Idle"]},
	Table_Stand:{frame:[55,55,51,51],priority:true,onloop:["Idle"],
		onstopcall:function(){ FindById("Soda2").active = false; },
		},
	Table_Idle:{frame:[59,59],onaction:["Table_Stand"],
		onloopcall:function(){if (Player.FindItem(IT.SODA)!=null) Player.SetAnimation("Table_Drink");},
		onstartcall:function(){if (Player.FindItem(IT.SODA)!=null) FindById("Soda2").active = true; },
		},
	Table_Eat:{frame:[59,59,59,59,59,59,59,59,59,59,64,65,65,66,66,67,67,68,67,67,69,69,70],onaction:["Table_Stand"],onloop:["Table_Idle"]},
	Table_Drink:{frame:[59,59,59,59,59,59,71,71,72,72,72,72,72,71,71,71,73,73,73,73,73,73,73,73,73,73,71,71,72,72,72,72,72],onaction:["Table_Stand"],onloop:["Table_Idle"],
		onstartcall:function(){ FindById("Soda2").active = false; },
		onstopcall:function(){if (Player.FindItem(IT.SODA)!=null) FindById("Soda2").active = true; },
		},	
};
// - ------------------------------------------------------------------------------------------ - //
