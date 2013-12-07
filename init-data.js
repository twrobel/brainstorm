/**
 * Created by caleb on 12/6/2013.
 */

IdeaNodes = new Meteor.Collection('IdeaNodes');
IdeaEdges = new Meteor.Collection('IdeaEdges');
Shapes = new Meteor.Collection('Shapes');
Messages = new Meteor.Collection('Messages');
Erasers = new Meteor.Collection('Erasers');

if(Meteor.isServer && IdeaNodes.find().count() == 0) {
    var ideaNode1 = {
        position:[100,50],
        text:'Sample Idea Node 1'
    };
    var ideaNode2 = {
        position:[175, 125],
        text:'Sample Idea Node 2'
    };
    var ideaNode3 = {
        position:[500, 125],
        text:'third ideaers'
    };
    var ideaNode4 = {
        position:[700, 125],
        text:'third ideaers'
    };


    ideaNode1._id = IdeaNodes.insert(ideaNode1);
    ideaNode2._id = IdeaNodes.insert(ideaNode2);
    ideaNode3._id = IdeaNodes.insert(ideaNode3);
    ideaNode4._id = IdeaNodes.insert(ideaNode4);

    var ideaEdge = {
        node1: ideaNode1._id,
        node2: ideaNode2._id
    };
    var ideaEdge2 = {
        node1: ideaNode2._id,
        node2: ideaNode3._id
    };
    var ideaEdge3 = {
        node1: ideaNode3._id,
        node2: ideaNode4._id
    };
    IdeaEdges.insert(ideaEdge);
    IdeaEdges.insert(ideaEdge2);
    IdeaEdges.insert(ideaEdge3);
}






