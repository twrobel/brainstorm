Template.toolbar.events({
	'click #pencilModeSelector': function() {
		Session.set('mode', 'pencil');
	}
});

Template.main.events({
	'mousedown #mainCanvas': function(event) {
		if(Session.get('mode')==='pencil') {
			pencil.drawingStarted = true;
			pencil.addCoord(event);
		}
	},
	'mousemove #mainCanvas': function(event) {
		pencil.addCoord(event);
	},
	'mouseup #mainCanvas': function(event) {
		pencil.addCoord(event);
		pencil.drawingStarted = false;
	}
});

var pencil = {
	drawingStarted: false,
	coords: [],
	addCoord: function(mouseEvent) {
		if(this.drawingStarted) {
			var newCoord = {
				x: mouseEvent.clientX,
				y: mouseEvent.clientY
			};

			this.coords.push(newCoord);

			console.log(newCoord);
		}
	}
};

