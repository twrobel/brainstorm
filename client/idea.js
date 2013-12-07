var newIdeaNode = {};
var canvasDragEvent = {startNodeId: undefined, endNodeId: undefined};
var linkFrom;//when node created, this is the id is should be linked to

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
		Erasers.find({}).forEach(
			function(shape){ Erasers.remove(shape._id);}
		)
		Messages.find({}).forEach(
			function(message){ Messages.remove(message._id);}
		)
	}
})

function createNode(coord) {
	isEditMode = false;
	toggleModal();
	newIdeaNode = {
		position: [coord.x, coord.y]
	};
}

function editNode(nodeId){
	isEditMode = true;
	newIdeaNode = IdeaNodes.findOne({_id: nodeId})
	$('#ideaInputText').val(newIdeaNode.text);
	toggleModal();
}

Template.main.events({
	'mousedown #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			var coord = util.extractClickCoordinates(event);
			var node = getContainingNode(coord);

			canvasDragEvent.startNodeId = node ? node._id : undefined;
		}
	},
	'mouseup #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			var coord = util.extractClickCoordinates(event);
			var node = getContainingNode(coord);

			canvasDragEvent.endNodeId = node ? node._id : undefined;

			takeAction(coord);
		}
	}
})

function takeAction(mouseUpCoord){
	var startId = canvasDragEvent.startNodeId;
	var endId = canvasDragEvent.endNodeId;
	if(startId && endId){
		if(startId === endId){
			editNode(startId);
		}else{
			createEdge(startId, endId);
		}
	}else if(startId && !endId){
		createNode(mouseUpCoord);
		linkFrom = startId;
	}else if(!startId && !endId){
		createNode(mouseUpCoord);
	}
}

function getContainingNode(coords, callback) {
	var result;
	IdeaNodes.find({}).forEach(function(node){
		var nodeCoords = deriveNodeCoordinates(node);
		if(nodeCoords.x1 <= coords.x
			&& nodeCoords.y1 <= coords.y
			&& nodeCoords.x2 >= coords.x
			&& nodeCoords.y2 >= coords.y){

			result = node;
		}
	});
	return result;
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
			if(!isEditMode){
				saveIdeaNode();
				linkNodeIfNecessary();
			}else{
				updateIdeaNode();
			}
			newIdeaNode = {};
			closeIdeaModal();
		}
	},
	'click #ideaInputCancel': function(){
		closeIdeaModal();
	}

})

function linkNodeIfNecessary(){
	if(linkFrom){
		createEdge(linkFrom, newIdeaNode._id);
	}
	linkFrom = undefined;
}

function createEdge(id1, id2){
	if(!id1 || !id2){
		console.log("KABOOOM");
	}
	var newEdge = {
		node1: id1,
		node2: id2
	};
	IdeaEdges.insert(newEdge);
}

function shortenText(text){
	return text.length > 20 ? text.substring(0, 20) + " ..." : text;
}

function saveIdeaNode(){
	newIdeaNode._id = IdeaNodes.insert(newIdeaNode);
}

function updateIdeaNode(){

	IdeaNodes.update({_id: newIdeaNode._id},
		{$set: {
			text: newIdeaNode.text,
			shortText: newIdeaNode.shortText
		}})
}

function toggleModal(){
	$('#ideaInput').modal('toggle');
    setTimeout(function(){
        $('#ideaInputText').focus();
    }, 400);
}

