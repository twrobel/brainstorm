var newIdeaNode = {};

Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
		alert("Mode is: " + Session.get('mode'))
	}
})

Template.main.events({
	'click #mainCanvas': function(event, target){
		var coord = extractClickCoordinates(event, target.firstNode);
		toggleModal();
		newIdeaNode = {
			x: coord.x,
			y: coord.y
		};
	}
})

Template.ideaInput.events({
	'click #ideaInputSubmit': function(){
		var ideaText = $('#ideaInputText').val();

		if(ideaText){
			toggleModal();
			newIdeaNode.text = ideaText;
			saveIdeaNode();
		}
	}
})

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