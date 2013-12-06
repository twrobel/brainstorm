var newIdeaNode = {};

Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
	},
	'click #clearCanvas': function(){
		IdeaNodes.remove({})
		IdeaEdges.remove({})
		Shapes.remove({})
	}
})

Template.main.events({
	'click #mainCanvas': function(event, target){
		if(Session.get('mode') === 'idea'){
			var coord = extractClickCoordinates(event, target.firstNode);
			toggleModal();
			newIdeaNode = {
				position: [coord.x, coord.y]
			};
		}
	}
})

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

function extractClickCoordinates(e, canvas){
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
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	return {
		x: x,
		y: y
	}
}