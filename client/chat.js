Template.chat.messages = function() {
	return Messages.find();
};

Template.chat.formatDate = function() {
	return moment(this.date).format("MMM Do YYYY, h:mm:ss a");
}

Template.chat.getHeight = function() {
	return $(window).height()-$('#toolbar').outerHeight()-$('#inputbox').outerHeight()-30;
}

Template.chat.events({
	'change #inputtext': function() {
		var txt = $('#inputtext').val();
        var username = Meteor.user() ? Meteor.user().services.github.username : "Anonymous";
		Messages.insert({
			text: txt,
			date: (new Date()).toISOString(),
            username: username
		});
		$('#inputtext').val('');
	}
});

Template.chat.rendered = function() {
	var el = $('#chatstream')[0];
	el.scrollTop = el.scrollHeight;
};