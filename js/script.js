const totalSize = 960;
let divNum = 16;
let divWidth = `${totalSize/divNum}px`;
let rgbClicked = false;

const button = document.querySelector('.button');
const container = document.querySelector('.container');
const cleanButton = document.querySelector('.clean');
const rgbButton = document.querySelector('.rgb');

createGrid(divNum);
button.addEventListener('click', resetGrid);

//Cleans the canvas when the button is clicked
cleanButton.addEventListener('click', () => {
    const divs = document.querySelectorAll('.divStyle');
    divs.forEach(div => {
        div.style.backgroundColor = 'gray';
        div.classList.remove('rgbDiv');
        div.style.filter = 'brightness(100%)';
    })
})

rgbButton.addEventListener('click', generateRGB);

function createGrid(divNum) {
    let countRow = 1;
    let countColumn = 2;
    let sentinal = true;

    divWidth = `${totalSize/divNum}px`;

    for (let i = 0; i < divNum; i++) {
        for (let j = 0; j < divNum; j++) {
            const div = document.createElement('div');
            div.style.width = divWidth;
            div.style.height = divWidth;
            div.style.filter = 'brightness(100%)'
            div.classList.add('divStyle');

            if (countRow <= divNum) {
                div.textContent = countRow;
                countRow++;
            } else if (sentinal == true) {
                div.textContent = countColumn;
                countColumn++;
            }
            sentinal = false;

            container.appendChild(div);

            //add event listener for each div
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

function resetGrid() {
    let numGrid = 0;
    numGrid = userInput();
    console.log(numGrid);

    if (numGrid != 0) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        createGrid(numGrid);
    }
}

function userInput() {
    let userInput;
    userInput = +(prompt("Enter number of squares per side for the new grid"));

    //input validation
    while (userInput > 100 || isNaN(userInput)) {
        userInput = +(prompt("Please enter a number less or equal to 100"))
    }

    return userInput;
}

function generateRGB() {
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
    console.log(rgbClicked);
}


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

function changeRgbColor(event) {
    const div = event.target;
    let rgbColor;
    let currentBright;
    let filterValue;
    if (event.type == 'mousedown') {
        event.preventDefault();
        rgbColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
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
    }
}