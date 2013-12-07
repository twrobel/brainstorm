Meteor.startup(function() {
	Session.set('mode', 'idea');
});

Template.toolbar.isIdeaMode = function() {
	return (Session.get('mode')==='idea') ? 'btn-primary' : 'btn-default';
};

Template.toolbar.isPencilMode = function() {
	return (Session.get('mode')==='pencil') ? 'btn-primary' : 'btn-default';
};