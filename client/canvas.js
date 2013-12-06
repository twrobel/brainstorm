Template.main.doNothing = function() {
	Shapes.find().count();
    return IdeaNodes.find().count();
};

Template.main.getWindowHeight = function() {
	return $(window).height();
};

Template.main.getWindowWidth = function() {
	return $(window).width();
};

Template.main.rendered = function() {
    drawNodes();
	drawShapes();
};

function drawNodes() {
    var nodes = IdeaNodes.find();
    var context = $("#mainCanvas")[0].getContext("2d");
    context.lineWidth = 1;
    //context.strokeWeight = 1;
    context.strokeStyle = 'black';

    console.log("nodes:" + nodes.count());
    nodes.forEach(function (node) {
        console.log("render node");

        console.log("x:" + node.position[0]);
        console.log("y:" + node.position[1]);
        console.log("w:" + node.width);
        console.log("h:" + node.height);
        //render the text within the square
        context.font = "normal 16px Arial";
        var boxPadding = 30;
        var textSize = context.measureText(node.text);
        context.fillText(node.text,node.position[0], node.position[1]+((boxPadding/2)+(boxPadding/4)));

        context.rect(node.position[0] - boxPadding/2, node.position[1], textSize.width + boxPadding, boxPadding);
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
