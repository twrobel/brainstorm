IdeaNodes = new Meteor.Collection('IdeaNodes');
IdeaEdges = new Meteor.Collection('IdeaEdges');
Shapes = new Meteor.Collection('Shapes');
Messages = new Meteor.Collection('Messages');
Erasers = new Meteor.Collection('Erasers');
if(Meteor.isServer){
    socket = Meteor.require("socket.io-client").connect("brainstorm3000-notifications-server.jit.su:80");
    var query = Messages.find({});
    var handle = query.observeChanges({
        added:  Meteor.bindEnvironment(
            function(id, message){
                console.log(" message posted " + message.text + " at " + message.date);
                socket.emit("messages", message);
            },
            function(e){
                console.log('bind failure');
            }
        )
    });
}

if(Meteor.isServer && IdeaNodes.find().count() == 0) {
}




