Template.main.events({
	'mousedown #mainCanvas': function(event) {
		if(Session.get('mode')==='pencil' || Session.get('mode')==='eraser') {
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

	setupContextForPencil: function(ctx) {
		ctx.beginPath();
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'red';
	},

	setupContextForEraser: function(ctx) {
		ctx.beginPath();
		ctx.lineWidth = '20';
		ctx.strokeStyle = 'white';
	},

	startDrawing: function(mouseEvent) {
		this.drawingStarted = true;
		var canvasEl = $('#mainCanvas')[0];
		this.offset.x = canvasEl.offsetLeft;
		this.offset.y = canvasEl.offsetTop;
		this.context = canvasEl.getContext("2d");

		if(Session.get('mode')==='pencil') {
			this.setupContextForPencil(this.context);
		} else {
			this.setupContextForEraser(this.context);
		}

		var start = this.getTransformedCoord(mouseEvent);
		this.context.moveTo(start.x, start.y);
		this.addCoord(mouseEvent);
	},
	stopDrawing: function(mouseEvent) {
		if(this.drawingStarted) {
			this.addCoord(mouseEvent);
			this.drawingStarted = false;
			if(Session.get('mode')==='pencil') {
				Shapes.insert({
					coords: this.coords
				});
			} else {
				Erasers.insert({
					coords: this.coords
				});
			} 
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

