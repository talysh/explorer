$(document).ready(function() {

// Initialize all div with carousel class
var carousels = bulmaCarousel.attach('#carouselOne', options);

// Loop on each carousel initialized
for(var i = 0; i < carousels.length; i++) {
	// Add listener to  event
	carousels[i].on('before:show', state => {
		console.log(state);  
	});
}






$(".navbar-burger").on("click", toggle('showNav'))


// function toggle(ev){
 
// ev = false;

// if(ev == false)


// }

});













