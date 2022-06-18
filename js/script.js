const totalSize = 960;
let divNum = 16;
let divWidth = `${totalSize/divNum}px`;

let countRow = 1;
let countColumn = 2;
let sentinal= true;


const container = document.querySelector('.container');

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
        sentinal=false;

        container.appendChild(div);

        //add event listener for each div
        div.addEventListener('mouseenter', e=>{
            div.style.backgroundColor='black';
        })

    }
    sentinal = true;
}