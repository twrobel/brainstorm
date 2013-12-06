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
			var coord = util.extractClickCoordinates(event);
			toggleModal();
			newIdeaNode = {
				position: [coord.x, coord.y]
			};
		}
	},
	'mousedown #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			var coord = util.extractClickCoordinates(event);
			var node = getContainingNode(coord);
		}
	}
})

function getContainingNode(coords) {
	return IdeaNodes.findOne(
		{"rectCoords[0]": {$lte: coords.x}},
		{"rectCoords[1]": {$lte: coords.y}},
		{"rectCoords[2]": {$gte: coords.x}},
		{"rectCoords[3]": {$gte: coords.y}});

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
}

function toggleModal(){
	$('#ideaInput').modal('toggle');
}

