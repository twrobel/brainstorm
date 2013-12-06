Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
		alert("Mode is: " + Session.get('mode'))
	}
})