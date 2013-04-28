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
	{ name:"TV", value:"item/item_tv.png", tile_w:104, anchor_y:88 },
	{ name:"Couch", value:"item/item_couch.png", anchor_y:42 },

	{ name:"Table", value:"item/item_table.png", anchor_y:38 },
	{ name:"Chair", value:"item/item_chair.png", anchor_y:48 },

	{ name:"Trash", value:"item/item_trashcan.png", tile_w:64, anchor_y:64 },

	{ name:"Cupboards", value:"item/item_cupboards.png", anchor_y:122 },

	{ name:"Fridge", value:"item/item_fridge.png", anchor_y:128 },

	{ name:"Fishbowl", value:"item/item_fishbowl.png", tile_w:32, tile_h:64, anchor_y:64 },
	{ name:"Desk", value:"item/item_PC.png", tile_w:128, anchor_y:96 },

	{ name:"Teleporter", value:"item/item_teleporter.png", tile_w:128, anchor_y:186 },
];
// - ------------------------------------------------------------------------------------------ - //
var AudioFiles = [
	{ name:"Music", value:"audio/byetone-capturethis.ogg|audio/byetone-capturethis.mp3" },
];
// - ------------------------------------------------------------------------------------------ - //


// - ------------------------------------------------------------------------------------------ - //
var BGLayer = [
	{ img:"BG1",x:0,y:0,scalex:0.5,scaley:0.5 },
	{ img:"BG4",x:0,y:0,scalex:0.7,scaley:0.7 },
	{ img:"BG3",x:0,y:0,scalex:0.8,scaley:0.8 },
	{ img:"BG2",x:0,y:0,scalex:0.9,scaley:0.9 },
	{ img:"Fog",x:0,y:0,scalex:0.9,scaley:0.9 },
];
// - ------------------------------------------------------------------------------------------ - //
var FGLayer = [
	{ img:"FG1",x:0,y:0,scalex:1.1,scaley:1.1 },
	{ img:"FG2",x:0,y:0,scalex:1.2,scaley:1.2 },
];
// - ------------------------------------------------------------------------------------------ - //
var RoomBGLayer = [
	{ img:"Room",x:0,y:0,scalex:1.0,scaley:1.0 },
	{ img:"Couch",x:-320,y:78 },

	{ img:"Table",x:-170,y:78 },
	{ img:"Chair",x:-154,y:78 },

	{ img:"Trash",x:-96,y:78,frame:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1] },

	{ img:"Fridge",x:62,y:78 },
	{ img:"Cupboards",x:-24,y:78 },

	{ img:"Desk",x:230,y:78,frame:[1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0] },
	{ img:"Fishbowl",x:166,y:78,frame:[0,1,2,3,4,5,6,7,8,9,10,11,12,13] },
	{ img:"Chair",x:250,y:78 },
	
	{ img:"Teleporter",x:429,y:78,frame:[0] },
	{ img:"Teleporter",x:429,y:78,frame:[1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1] },
];
// - ------------------------------------------------------------------------------------------ - //
var RoomFGLayer = [
	{ img:"TV",x:-423,y:78,frame:[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0] },
	{ img:"Fan",x:-453,y:78-52,frame:[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5] },
//	{ img:"Fan",x:-453,y:78-52,frame:[0,1,2,1] },
//	{ img:"Fan",x:-453,y:78-52,frame:[0,0,1,1,2,2,1,1,3,3,1,1,2,2,1,1] },
	{ img:"Teleporter",x:429,y:78,frame:[3] },
	{ img:"Teleporter",x:429,y:78,frame:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,2,2,2,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1,2,-1] },
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
	Couch_Sit:{frame:[47,47]},
	Couch_Stand:{frame:[47,47]},
	Couch_Idle:{frame:[48]},
	Couch_WatchTV:{frame:[49,49,50,50,49,49,50,50,50,50,50,50,50,50,50,50,49,50,49,49,50,49,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48]},
	Cupboard1_Open:{frame:[51,51,51,51,51,51,51,51,51,51,52,53,53,53,53,53,54,54,54,54,54,54,54,54,54,54,52,51,51,51,51]},
	Cupboard1_Close:{frame:[51,51,51,51,51,51,51,51,51,51,52,53,53,53,53,53,52,52,52,52,52,51,51,51,51]},
	Cupboard2_Open:{frame:[51,51,51,51,51,51,51,51,51,51,55,56,56,56,56,56,57,57,57,57,57,57,57,57,57,57,55,55,51,51,51,51]},
	Cupboard2_Close:{frame:[51,51,51,51,51,51,51,51,51,51,55,57,57,57,57,57,52,52,52,52,52,55,51,51,51,51]},
	PC_Sit:{frame:[51,51,51,51,51,55,55,59]},
	PC_Stand:{frame:[55,55,51,51]},
	PC_Idle:{frame:[59]},
	PC_Work:{frame:[59,59,59,59,60,59,60,59,60,59,60,59,60,59,60,59,60,59,60,59,9,59,59,59,9,59,59]},
	PC_Coffee:{frame:[61,61,62,62,63,63,64,64,64,64,64,64,64,64,64,64,63,63,62,62]},
};
// - ------------------------------------------------------------------------------------------ - //
