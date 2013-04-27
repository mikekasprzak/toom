
var C_IMG	= 1;
var C_TEXT	= 2;

var Content = [
	{ 
		type:C_IMG,
		value:"art/man.png",
		x:0,
		y:0
	},
	{
		type:C_TEXT,
		value:"Hello Derek",
		x:0,
		y:-64
	}
];

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
	{ name:"BG3", value:"art/toombg_para_02.png" },
	{ name:"BG4", value:"art/toombg_para_03.png" },

	{ name:"Room", value:"art/toombg_room.png" },

	{ name:"FG1", value:"art/toombg_fg_01.png" },
	{ name:"FG2", value:"art/toombg_fg_02.png" }
];

var BGLayer = [
	{ img:"BG1",x:0,y:0 },
	{ img:"BG2",x:0,y:0 },
	{ img:"BG3",x:0,y:0 },
	{ img:"BG4",x:0,y:0 },
	{ img:"Room",x:0,y:96+8 }
];

var FGLayer = [
	{ img:"FG1",x:0,y:0 },
	{ img:"FG2",x:0,y:0 },
];
