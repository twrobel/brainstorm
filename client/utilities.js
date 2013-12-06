util = {
	extractClickCoordinates: function(e, canvas){
		var x;
		var y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		}
		else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		/*x += parseInt($(canvas).css('margin-left').replace('px',''));
		y += parseInt($(canvas).css('margin-top').replace('px',''));*/

		return {
			x: x,
			y: y
		}
	}
}