// - ------------------------------------------------------------------------------------------ - //
// Specify a 'tile_w' and 'tile_h' to define the size of each tile/frame //
// Specify an 'anchor_x' and 'anchor_y' to describe where his bottom/base point is, if not center //
var ArtFiles = [
	{
		name:"Man",
		value:"art/man.png",
		tile_w:128,
		tile_h:128,
		anchor_y:128
	},
	{ name:"BG1", value:"art/toombg_bg_01.png" },
	{ name:"BG2", value:"art/toombg_para_01.png" },
	{ name:"BG3", value:"art/toombg_para_02.png", anchor_y:560-400 },
	{ name:"BG4", value:"art/toombg_para_03.png", anchor_y:304-400 },

	{ name:"Fog", value:"art/toombg_fx_fog.png", anchor_y:276-400 },

	{ name:"Room", value:"art/toombg_room.png", anchor_y:560-400 },

	{ name:"FG1", value:"art/toombg_fg_01.png" },
	{ name:"FG2", value:"art/toombg_fg_02.png", anchor_y:304-400 }
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
	{ img:"Room",x:0,y:0,scalex:1.0,scaley:1.0 }
];
// - ------------------------------------------------------------------------------------------ - //
var FGLayer = [
	{ img:"FG1",x:0,y:0,scalex:1.1,scaley:1.1 },
	{ img:"FG2",x:0,y:0,scalex:1.2,scaley:1.2 },
];
// - ------------------------------------------------------------------------------------------ - //
