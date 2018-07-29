const bgImageArray = ["lonely.jpg", "uluwatu.jpg", "carezza-lake.jpg", "batu-bolong-temple.jpg"];
const base = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/full-";
const secs = 4;

bgImageArray.forEach(function(img){
    new Image().src = base + img; 
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (var i = 0; i < bgImageArray.length; i++) {
		setTimeout(function(){ 
			 window
        .getComputedStyle( document.documentElement )
        .setProperty( 'background-size', 'cover');
         window
        .getComputedStyle( document.documentElement )
        .setProperty( 'background', "url(" + base + bgImageArray[k] + ") no-repeat center center fixed");	
		if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }			
		}, (secs * 1000) * i)	
	}
}
backgroundSequence();