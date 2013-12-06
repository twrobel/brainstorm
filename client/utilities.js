util = {
	extractClickCoordinates: function(e){
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
		x -= e.currentTarget.offsetLeft;
		y -= e.currentTarget.offsetTop;
		return {
			x: x,
			y: y
		}
	}
}