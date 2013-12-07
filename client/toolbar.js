Meteor.startup(function() {
	Session.set('mode', 'idea');
});

Template.toolbar.isIdeaMode = function() {
	return (Session.get('mode')==='idea') ? 'btn-primary' : 'btn-default';
};

Template.toolbar.isPencilMode = function() {
	return (Session.get('mode')==='pencil') ? 'btn-primary' : 'btn-default';
};

Template.toolbar.isEraserMode = function() {
	return (Session.get('mode')==='eraser') ? 'btn-primary' : 'btn-default';
};

Template.toolbar.showEraserButton = function() {
	return (Session.get('mode')==='eraser' || Session.get('mode')==='pencil');
};

Template.toolbar.events({
	'click #ideaModeSelector': function(){
		Session.set('mode', 'idea');
	},
	'click #pencilModeSelector': function() {
		Session.set('mode', 'pencil');
	},
	'click #erasorSelector': function() {
		Session.set('mode', 'eraser');
	}
});
