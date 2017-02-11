$(document).ready(function() {

	// fetch the heighest box and set the others to the same height

	var height = $('.box1').height();
	for(var i=2;i<=3;i++) {
		if($('.box' + i).height()>=height) {
			height = $('.box' + i).height();
		}
	}

	for(var i=1;i<=3;i++) {
		$('.box' + i).height(height);
	}
})