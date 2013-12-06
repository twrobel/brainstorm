var newIdeaNode = {};
var canvasDragEvent = {startNodeId: undefined, endNodeId: undefined};

Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
	},
	'click #clearCanvas': function(){
		IdeaNodes.find({}).forEach(
			function(node){ IdeaNodes.remove(node._id);}
		)
		IdeaEdges.find({}).forEach(
			function(edge){ IdeaEdges.remove(edge._id);}
		)
		Shapes.find({}).forEach(
			function(shape){ Shapes.remove(shape._id);}
		)
	}
})

Template.main.events({
	'click #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			var coord = extractClickCoordinates(event);
			toggleModal();
			console.log(coord)
			newIdeaNode = {
				position: [coord.x, coord.y]
			};
		}
	},
	'mousedown #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			console.log('mouseDown');
			var coord = extractClickCoordinates(event);
			var node = getContainingNode(coord);
			console.log("clicked on: ");
			console.log(node);
		}
	}
})

function getContainingNode(coords) {
	console.log(IdeaNodes.findOne({}));
	return IdeaNodes.findOne({
		"rectCoords[0]": {$lte: 1000},
		"rectCoords[1]": {$lte: 1000},
		"rectCoords[2]": {$gte: 0},
		"rectCoords[3]": {$gte: 0}});
	//"rectCoords[0]": {$lte: coords.x},
//		"rectCoords[1]": {$lte: coords.y},
//		"rectCoords[2]": {$gte: coords.x},
//		"rectCoords[3]": {$gte: coords.y}});

}

function closeIdeaModal() {
	toggleModal();
	$('#ideaInputText').val('');
}
Template.ideaInput.events({
	'click #ideaInputSubmit': function(){
		var ideaText = $('#ideaInputText').val();
		if(ideaText){
			newIdeaNode.text = ideaText;
			newIdeaNode.shortText = shortenText(ideaText);
			setIdeaNodeDimensions();
			saveIdeaNode();
			closeIdeaModal();
		}
	},
	'click #ideaInputCancel': function(){
		closeIdeaModal();
	}

})

function shortenText(text){
	return text.length > 20 ? text.substring(0, 20) + " ..." : text;
}

function setIdeaNodeDimensions(){
	newIdeaNode.height = 100;
	newIdeaNode.width = 100;
}

function saveIdeaNode(){
	IdeaNodes.insert(newIdeaNode);
	newIdeaNode = {};
	IdeaNodes.find().forEach(function(idea){
		console.log(idea);
	})
}

function toggleModal(){
	$('#ideaInput').modal('toggle');
}

function extractClickCoordinates(e){
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= e.currentTarget.offsetLeft;
	y -= e.currentTarget.offsetTop;
	return {
		x: x,
		y: y
	}
}