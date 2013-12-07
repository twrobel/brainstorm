Template.main.doNothing = function() {
	Shapes.find().count();
	IdeaEdges.find().count();
	IdeaNodes.find().forEach(function(node){})
    return IdeaNodes.find().count();
};

Template.main.getWindowHeight = function() {
	var toolbarHeight = $('#toolbar').outerHeight();
	var windowHeight = $(window).height();
	var height = windowHeight-60-toolbarHeight;
	return height;
};

Template.main.getWindowWidth = function() {
	return $(window).width()-60-200;
};

Template.main.rendered = function() {
    console.log("bar fucking fu");
    var context = getCanvasContext();
    var canvas = context.canvas;
    context.clearRect(0,0,canvas.width, canvas.height);

    drawEdges();
    drawNodes();
    drawNodeText();
    drawShapes();
};

CollabCanvas =
{
    boxPadding: 30
};

deriveNodeCoordinates = function(node) {
	var context = getCanvasContext();
	var textSize = context.measureText(node.text);
	var x1 = node.position[0] - CollabCanvas.boxPadding/2;
	var y1 = node.position[1];
	var width=textSize.width + CollabCanvas.boxPadding;
	var height = CollabCanvas.boxPadding;
	var x2 = x1 + width;
	var y2 = y1 + height;
	return {
		x1:x1,
		y1:y1,
		width:width,
		height:height,
		x2: x2,
		y2: y2,
		midpoint: function() {
			return {
				x: ((this.x1 + this.x2) / 2),
				y: ((this.y1 + this.y2) / 2)
			};
		},
		toString: function(){
			var point = this.midpoint();
			return [this.x1,this.y1,this.x2,this.y2] + "==> (" + point.x + "," + point.y + ")";
		}
	}
}

function getCanvasContext() {
    var context = $("#mainCanvas")[0].getContext("2d");

    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.font = "normal 16px Arial";
    //
    return context;
}

function drawNodes() {
    var nodes = IdeaNodes.find();

    var context = getCanvasContext();
    nodes.forEach(function (node) {
        var coordinates = deriveNodeCoordinates(node);
        context.strokeStyle = 'black';
        context.fillStyle = 'grey';
        context.fillRect(coordinates.x1, coordinates.y1, coordinates.width, coordinates.height);
        context.stroke();
    });
}

function drawNodeText() {
    var nodes = IdeaNodes.find();
    var context = getCanvasContext();
    nodes.forEach(function (node) {
        context.fillStyle = "black";
        context.fillText(node.text,node.position[0], node.position[1]+((CollabCanvas.boxPadding/2)+(CollabCanvas.boxPadding/4)));
    });
}

function drawEdges() {
    console.log("fu fucking bar");
    var edges = IdeaEdges.find();
    var context = getCanvasContext();

    var lastCoord;

    edges.forEach(function (edge) {
       var node1 = IdeaNodes.findOne(edge.node1);
       var node2 = IdeaNodes.findOne(edge.node2);

        //determine start node

        var startPointCoordinate = deriveNodeCoordinates(node1);
        var endPointCoordinate = deriveNodeCoordinates(node2);

        context.beginPath();
        console.log(startPointCoordinate.toString());
        context.moveTo(startPointCoordinate.midpoint().x, startPointCoordinate.midpoint().y);
        context.lineTo(endPointCoordinate.midpoint().x, endPointCoordinate.midpoint().y);

        context.stroke();

        lastCoord = endPointCoordinate.midpoint();
    });

    if(lastCoord) {
		context.beginPath();
		context.moveTo(lastCoord.x, lastCoord.y);
	    context.lineTo(lastCoord.x+1, lastCoord.y+1);
	}

    context.stroke();

}

function drawShapes() {
	var shapes_cursor = Shapes.find();

	shapes_cursor.forEach(function(shape) {
		drawShape(shape.coords);
	});
}

function drawShape(coords) {
	var context = $("#mainCanvas")[0].getContext("2d");

	pencil.setupContext(context);

	context.moveTo(coords[0].x, coords[0].y);

	for(var i=1; i<coords.length; i++) {
		context.lineTo(coords[i].x, coords[i].y);
	}

	context.stroke();
}
