const totalSize = 960;
let divNum = 16;
let divWidth = `${totalSize/divNum}px`;

const button = document.querySelector('.button');
const container = document.querySelector('.container');
const cleanButton=document.querySelector('.clean');

createGrid(divNum);
button.addEventListener('click', resetGrid);

//Cleans the canvas when the button is clicked
cleanButton.addEventListener('click',()=>{
    const divs=document.querySelectorAll('.divStyle');
    divs.forEach(div=>{
        div.style.backgroundColor='gray';})
})

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
            div.addEventListener('mouseenter', e => {
                div.style.backgroundColor = 'black';
            })

        }
        sentinal = true;
    }
}

function resetGrid() {
    let numGrid = 0;
    numGrid = userInput();

    if (numGrid != null) {
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