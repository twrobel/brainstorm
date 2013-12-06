Template.main.rendered = function() {
    var nodes = IdeaNodes.find();
    var context = $("#mainCanvas")[0].getContext("2d");
    context.beginPath();
    context.fillstyle = 'white';
    context.rect(10,10,40,40);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
//    context.fillStyle = 'white';
//    context.strokeStyle = 'black';
//    nodes.forEach(function (node) {
//        context.fillRect(node.position[0], node.position[1], node.width, node.height);
//    });
};