Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
		alert("Mode is: " + Session.get('mode'))
	}
})

Template.main.events({
	'click #mainCanvas': function(event, target){
		var coord = util.extractClickCoordinates(event, target.firstNode);
	}
})
