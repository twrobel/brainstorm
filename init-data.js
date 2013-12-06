/**
 * Created by caleb on 12/6/2013.
 */

IdeaNodes = new Meteor.Collection('IdeaNodes');
IdeaEdges = new Meteor.Collection('IdeaEdges');
Shapes = new Meteor.Collection('Shapes');

if(Meteor.isServer && IdeaNodes.find().count() == 0) {
    var ideaNode = {
        position:[10,10],
        text:'Sample Idea Node'
    };

    IdeaNodes.insert(ideaNode);
}






