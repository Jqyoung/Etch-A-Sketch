const totalSize = 960;
let divNum = 16;
let divWidth = `${totalSize/divNum-1}px`;
//variable used to track the status of rgb toggle 
let rgbClicked = false;

const button = document.querySelector('.button');
const container = document.querySelector('.container');
const cleanButton = document.querySelector('.clean');
const rgbButton = document.querySelector('.rgb');

//Creates the initial grid with the default values
createGrid(divNum);

//Recreate the grid with user defined values
button.addEventListener('click', resetGrid);

//Cleans the canvas when the button is clicked
cleanButton.addEventListener('click', () => {
    const divs = document.querySelectorAll('.divStyle');
    divs.forEach(div => {
        div.style.backgroundColor = 'lightgray';
        div.classList.remove('rgbDiv');
        div.style.filter = 'brightness(100%)';
    })
})

//Toggle between RGB and black mode when clicked
rgbButton.addEventListener('click', toggleRGB);

//Creates the grid with a number of square divs on each side of the grid
function createGrid(divNum) {
    //variables that is used to count row and column
    let countRow = 1;
    let countColumn = 2;
    //variable that used to indicate when a new row starts
    let sentinal = true;
    //calculates the size of each div on the grid by using the total canvas size divided by number of divs and then minus the margin size on each div
    divWidth = `${totalSize/divNum-1}px`;

    for (let i = 0; i < divNum; i++) {
        for (let j = 0; j < divNum; j++) {
            const div = document.createElement('div');
            div.style.width = divWidth;
            div.style.height = divWidth;
            div.style.filter = 'brightness(100%)'
            div.classList.add('divStyle');

            //if-else that is used to count rows and columns of the grid created
            if (countRow <= divNum) {
                div.textContent = countRow;
                countRow++;
            } else if (sentinal == true) {
                div.textContent = countColumn;
                countColumn++;
            }
            sentinal = false;

            container.appendChild(div);

            //add event listener for each div depending on the toggle flag, the div will be black or RGB
            if (rgbClicked == false) {
                div.addEventListener('mousedown', changeColorBlack)
                div.addEventListener('mouseenter', changeColorBlack)
            } else {
                div.addEventListener('mousedown', changeRgbColor)
                div.addEventListener('mouseenter', changeRgbColor)
            }

        }
        sentinal = true;
    }
}

//Resets the grid by first delete the current grid and then use the user input value to recreate a new grid
function resetGrid() {
    let numGrid = 0;
    numGrid = userInput();

    //deletes the current grid if user input isn't 0 and then create a new grid with the new values
    if (numGrid != 0) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        createGrid(numGrid);
    }
}

//Asks for user input to determine how many squares per side on the grid
function userInput() {
    let userInput;
    userInput = +(prompt("Enter number of squares per side for the new grid"));

    //input validation
    while (userInput > 100 || isNaN(userInput)) {
        userInput = +(prompt("Please enter a number less or equal to 100"))
    }

    return userInput;
}

//Toggles individual grid color to RGB from black or vise versa when the button is clicked
function toggleRGB() {
    const divs = document.querySelectorAll('.divStyle');
    if (!rgbClicked) {
        let rgbColor = '';
        let currentBright;
        let filterValue;
        rgbClicked = true;

        rgbButton.classList.add('rgbStyle');


        divs.forEach(div => {
            div.removeEventListener('mousedown', changeColorBlack);
            div.removeEventListener('mouseenter', changeColorBlack);

            div.addEventListener('mousedown', changeRgbColor)
            div.addEventListener('mouseenter', changeRgbColor)
        })

    } else if (rgbClicked) {
        rgbButton.classList.remove('rgbStyle');
        divs.forEach(div => {
            div.classList.remove('rgbDiv');
            div.removeEventListener('mousedown', changeRgbColor)
            div.removeEventListener('mouseenter', changeRgbColor)
            div.addEventListener('mousedown', changeColorBlack)
            div.addEventListener('mouseenter', changeColorBlack)
        })
        rgbClicked = false;
    }
}

//Changes div color to black
function changeColorBlack(event) {
    const div = event.target;
    if (event.type == 'mousedown') {
        event.preventDefault();
        div.style.backgroundColor = 'black';
    } else if (event.type == 'mouseenter') {
        if (event.buttons == 1) {
            div.style.backgroundColor = 'black';
        }
    }
}

//Changes div color to RGB as well as add 10% black to it with each pass
function changeRgbColor(event) {
    const div = event.target;
    let rgbColor;
    //variable used to calculate the brightness level on each div
    let currentBright;
    let filterValue;
    
    //determines if the event type is either mousedown or mouseenter
    if (event.type == 'mousedown') {
        event.preventDefault();
        //generates a random rgb color and assign it to the variable
        rgbColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`  
        //if the div already has rgb color then darken it by 10%, else if the div has not been passed through before then add rgb color to it
        if (event.target.classList.contains('rgbDiv')) {
            if (div.style.filter == 'brightness(100%)') {
                filterValue = div.style.filter;
                currentBright = filterValue.substr(11, 3)
                div.style.filter = `brightness(${currentBright-10}%)`;
            } else {
                filterValue = div.style.filter;
                currentBright = filterValue.substr(11, 2)
                div.style.filter = `brightness(${currentBright-10}%)`;
            }
        } else {
            div.style.backgroundColor = rgbColor;
            div.classList.add('rgbDiv');
        }
    } else if (event.type == 'mouseenter') {
        rgbColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
        if (event.buttons == 1) {
            if (event.target.classList.contains('rgbDiv') && div.style.filter != 'brightness(0%)') {
                if (div.style.filter == 'brightness(100%)') {
                    filterValue = div.style.filter;
                    currentBright = filterValue.substr(11, 3)
                    div.style.filter = `brightness(${currentBright-10}%)`;
                } else {
                    filterValue = div.style.filter;
                    currentBright = filterValue.substr(11, 2)
                    div.style.filter = `brightness(${currentBright-10}%)`;
                }
            } else {
                div.style.backgroundColor = rgbColor;
                div.classList.add('rgbDiv');
            }

        }
    }//end of if else-if
}//end of function