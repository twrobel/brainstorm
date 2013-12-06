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

var pencil = {
	drawingStarted: false,
	coords: [],
	startDrawing: function(mouseEvent) {
		this.drawingStarted = true;
		this.addCoord(mouseEvent);
	},
	stopDrawing: function(mouseEvent) {
		this.addCoord(mouseEvent);
		this.drawingStarted = false;
		Shapes.insert({
			coords: this.coords
		});
		this.coords = [];
	},
	addCoord: function(mouseEvent) {
		if(this.drawingStarted) {
			var newCoord = {
				x: mouseEvent.clientX,
				y: mouseEvent.clientY
			};

			this.coords.push(newCoord);
		}
	}
};

