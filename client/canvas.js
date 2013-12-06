Template.main.doNothing = function() {
    return IdeaNodes.find().count();
}

Template.main.rendered = function() {
    var nodes = IdeaNodes.find();
    var context = $("#mainCanvas")[0].getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    console.log("nodes:" + nodes.count());
    nodes.forEach(function (node) {
        console.log("render node");



        console.log("x:" + node.position[0]);
        console.log("y:" + node.position[1]);
        console.log("w:" + node.width);
        console.log("h:" + node.height);
        context.rect(node.position[0], node.position[1], node.width, node.height);
        context.stroke();
    });
};