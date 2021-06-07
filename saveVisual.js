function saveVisual() {

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#save-button").mouseClicked(function() {
		saveCanvas('visualisation', 'jpg');
	});
}
