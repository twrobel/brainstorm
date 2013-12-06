Template.chat.messages = function() {
	return Messages.find();
};

Template.chat.formatDate = function() {
	return moment(this.date).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

Template.chat.events({
	'change #inputtext': function() {
		var txt = $('#inputtext').val();
		Messages.insert({
			text: txt,
			date: (new Date()).toISOString()
		});
		$('#inputtext').val('');
	}
});