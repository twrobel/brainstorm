/**
 * Created by caleb on 12/6/2013.
 */

IdeaNodes = new Meteor.Collection('IdeaNodes');
IdeaEdges = new Meteor.Collection('IdeaEdges');
Shapes = new Meteor.Collection('Shapes');

if(Meteor.isServer && IdeaNodes.find().count() == 0) {
    var ideaNode1 = {
        position:[100,50],
        text:'Sample Idea Node 1'
    };
    var ideaNode2 = {
        position:[175, 125],
        text:'Sample Idea Node 2'
    };


    ideaNode1._id = IdeaNodes.insert(ideaNode1);
    ideaNode2._id = IdeaNodes.insert(ideaNode2);

    var ideaEdge = {
        node1: ideaNode1._id,
        node2: ideaNode2._id
    };
    IdeaEdges.insert(ideaEdge);
}






