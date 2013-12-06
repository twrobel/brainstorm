Template.toolbar.events({
	'click #pencilModeSelector': function() {
		Session.set('mode', 'pencil');
	}
});

Template.main.events({
	'mousedown #mainCanvas': function(event) {
		if(Session.get('mode')==='pencil') {
			pencil.startDrawing(event);
		}
	},
	'mousemove #mainCanvas': function(event) {
		pencil.addCoord(event);
	},
	'mouseup #mainCanvas': function(event) {
		pencil.stopDrawing(event);
	}
});

pencil = {
	drawingStarted: false,
	coords: [],
	offset: {
		x: 0,
		y: 0
	},
	context: null,

	setupContext: function(ctx) {
		ctx.beginPath();
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'red';
	},

	startDrawing: function(mouseEvent) {
		this.drawingStarted = true;
		var canvasEl = $('#mainCanvas')[0];
		this.offset.x = canvasEl.offsetLeft;
		this.offset.y = canvasEl.offsetTop;
		this.context = canvasEl.getContext("2d");
		this.setupContext(this.context);
		var start = this.getTransformedCoord(mouseEvent);
		this.context.moveTo(start.x, start.y);
		this.addCoord(mouseEvent);
	},
	stopDrawing: function(mouseEvent) {
		if(this.drawingStarted) {
			this.addCoord(mouseEvent);
			this.drawingStarted = false;
			Shapes.insert({
				coords: this.coords
			});
			this.coords = [];
		}
	},
	addCoord: function(mouseEvent) {
		if(this.drawingStarted) {
			
			var newCoord = this.getTransformedCoord(mouseEvent);

			this.coords.push(newCoord);

			this.context.lineTo(newCoord.x, newCoord.y);

			this.context.stroke();
		}
	},
	getTransformedCoord: function(mouseEvent) {
		return util.extractClickCoordinates(mouseEvent);
	}
};

