Template.main.doNothing = function() {
	Shapes.find().count();
    return IdeaNodes.find().count();
};

Template.main.getWindowHeight = function() {
	return $(window).height()-60;
};

Template.main.getWindowWidth = function() {
	return $(window).width()-60;
};

Template.main.rendered = function() {
    drawNodes();
    drawEdges();
	drawShapes();
};

function getCanvasContext() {
    var context = $("#mainCanvas")[0].getContext("2d");
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.font = "normal 16px Arial";
    return context;
}

function drawNodes() {
    var nodes = IdeaNodes.find();

    var context = getCanvasContext();
    nodes.forEach(function (node) {

        //render the text within the square
        var boxPadding = 30;
        var textSize = context.measureText(node.text);
        context.fillText(node.text,node.position[0], node.position[1]+((boxPadding/2)+(boxPadding/4)));

        context.rect(node.position[0] - boxPadding/2, node.position[1], textSize.width + boxPadding, boxPadding);
        context.stroke();
    });
}

function drawEdges() {
    var edges = IdeaEdges.find();
    var context = getCanvasContext();

    edges.forEach(function (edge) {
       console.log("render edge");
       var node1 = IdeaNodes.findOne(edge.node1);
       var node2 = IdeaNodes.findOne(edge.node2);

       context.beginPath();
       context.moveTo(node1.position[0], node1.position[1]);
       context.lineTo(node2.position[0], node2.position[1]);
       context.stroke();
    });

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
