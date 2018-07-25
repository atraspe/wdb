var mode = 6;	// hard mode by default
var colors = '';

var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var spanRGB = document.getElementById('spanRGB');
var spanTryAgain = document.querySelector('#spanTryAgain');
var btnPlayOrNew = document.querySelector('#btnPlayOrNew');
var btnMode = document.querySelectorAll('.btnMode');

var pickedColor = '';
var clickedColor = '';

init();

function init() {
	// initially, draw the squares depending on mode
	drawSquares(mode);
	// setup mode buttons
	setupModeButtons();
} // end of functioon init()

function setupModeButtons() {
	// add eventEventListener to Easy and Hard buttons
	for (var i = 0; i < btnMode.length; i++) {
		btnMode[i].addEventListener('click', function() {
			// first, remove class btnSelected on both buttons
			btnMode[0].classList.remove('btnSelected');
			btnMode[1].classList.remove('btnSelected');

			// then retain class btnSelected on the clicked button
			this.classList.add('btnSelected');

			// button clicked will determine the mode
			// use ternary operator instead of the if-else statement

			this.textContent === "Easy" ? mode = 3: mode = 6;

			drawSquares(mode);	
		});
	} // end of for loop
} // end of function setupModeButtons()


btnPlayOrNew.addEventListener('click', function() {	
	drawSquares(mode);
});


function drawSquares(easyOrHard) {
	// set the h1 background color to steelblue
	h1.style.backgroundColor = 'steelblue';

	// generate colors depending on mode (3 = Easy; 6 = Hard)
	colors = generateRandomColors(easyOrHard);

	// pick the random color
	pickedColor = pickColor();

	// update the span with the picked color
	spanRGB.textContent = pickedColor;

	// empty the (Try Again!/Correct!) spanTryAgain's text content
	spanTryAgain.textContent = '';

	// empty the (New Colors/Play Again?) button's text content
	btnPlayOrNew.textContent = 'New Colors';


	// draw the squares
	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {	// only style (background color) the square if there is availabe colors (either 3 or 6)
			squares[i].style.display = 'block';	// make all squares appear
			squares[i].style.backgroundColor = colors[i];
		} 
		else {	// else hide the bottom squares
			squares[i].style.display = 'none';
		} // end of if-else
		
		squares[i].addEventListener('click', function() {
			// grab color of clicked square
			clickedColor = this.style.backgroundColor;

			// compare color to pickedColor
			if (clickedColor === pickedColor) {
				correctPick(clickedColor);
			} // end of if
			else {
				// for wrong picks, fill square's background color same as body background color to make it 'disappear'
				this.style.backgroundColor = '#232323';
				// update span's text content to 'Try Again!'
				spanTryAgain.textContent = 'Try Again!';
			} // end of if-else
		}); // end of addEventListener
	} // end of for loop
} // end of function drawSquares()


function correctPick(clickedColor) {
	spanTryAgain.textContent = 'Correct!';
	h1.style.backgroundColor = clickedColor;
	btnPlayOrNew.textContent = 'Play Again?';

	// color all boxes with pickedColor value
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = clickedColor;
	}
}


function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}


function generateRandomColors(arraySize) {
	var randomColors = [];

	for (var i = 0; i < arraySize; i++) {
		randomColors[i] = randomColor();
		// can also be done by
		// randomColors.push(randomColor());
	}
	return randomColors;
}


function randomColor() {
	var red = '';
	var green = '';
	var blue = '';

	red = Math.floor(Math.random() * 256);
	green = Math.floor(Math.random() * 256);
	blue = Math.floor(Math.random() * 256);

	return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

