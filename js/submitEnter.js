window.submitEnter = function() {	
    // Get the input field
    var input = document.getElementById("text");
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
	//Stop event from firing multiple times
	event.stopImmediatePropagation();
    // Number 13 is the "Enter" key on the keyboard
	if (event.keyCode === 13) {
		// Trigger the button element with a click
        document.getElementById("execute").click();
        //Remove text from textarea after submit
        document.getElementById('text').value='';
	}
});
}

window.onclick = submitEnter;

export{submitEnter};