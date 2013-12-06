Template.main.doNothing = function() {
	Shapes.find().count();
	IdeaEdges.find().count();
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
    drawNodes();
    drawEdges();
	drawShapes();
};

CollabCanvas =
{
    boxPadding: 30
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
        var textSize = context.measureText(node.text);
        context.fillText(node.text,node.position[0], node.position[1]+((CollabCanvas.boxPadding/2)+(CollabCanvas.boxPadding/4)));

		var rectX = node.position[0] - CollabCanvas.boxPadding/2;
		var rectY = node.position[1];
		var rectW = textSize.width + CollabCanvas.boxPadding;
		var rectH = CollabCanvas.boxPadding;

		addRectParamsToNode(node, rectX, rectY, rectW, rectH);
		context.rect(rectX, rectY, rectW, rectH);
        context.stroke();
    });
}

function addRectParamsToNode(node, rectX, rectY, rectW, rectH){
	IdeaNodes.update({_id: node._id},
		{ $set: {
			rectCoords: [rectX, rectY, rectX + rectW, rectY + rectH]
		}})
}

function drawEdges() {
    var edges = IdeaEdges.find();
    var context = getCanvasContext();

    edges.forEach(function (edge) {
       var node1 = IdeaNodes.findOne(edge.node1);
       var node2 = IdeaNodes.findOne(edge.node2);

       //determine start node
        var startNode;
        var endNode;
        if(node1.position[1] < node2.position[1]) {
           startNode =  node1;
           endNode = node2;
        } else {
           startNode =  node2;
           endNode = node1;
        }

       context.beginPath();
       context.moveTo(startNode.position[0], startNode.position[1] + CollabCanvas.boxPadding);
       context.lineTo(endNode.position[0], endNode.position[1]);
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
