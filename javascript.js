function styleDiv(temp) {
    temp.style.display = "flex";
    temp.style.backgroundColor = "grey";
    temp.style.margin = "1px";
    temp.style.width = "960px";
}

function change_div_background_back(e) {
    e.target.style.backgroundColor = "grey";
}

function change_div_background(e) {
    e.target.style.backgroundColor = "black";

    setTimeout(change_div_background_back, TILE_LINGERING_TIME, e);
}

function deleteGrid() {
    let divs = Array.from(document.querySelectorAll(".box"));
    divs.forEach(div => div.remove());

    let row_containers = Array.from(document.querySelectorAll(".row"));
    row_containers.forEach(div => div.remove());
}

function openPopUp(e) {
    let newWidth = prompt("Enter new width (max 100)", currentWidth.toString());
    let newHeight = prompt("Enter new height (max 100)", currentHeight.toString());
    
    //handling invalid input(s)
    if (newWidth === null || newHeight === null || 
        isNaN(newWidth) || isNaN(newHeight) || 
        Number(newWidth) > 100 || Number(newHeight) > 100) {
        return;
    }

    deleteGrid();
    createGrid(newWidth, newHeight);
    currentWidth = newWidth;
    currentHeight = newHeight;
}

function createRowContainer(gridHeight) {
    let rowContainer;
    let mainContainer = document.querySelector(".container");
    
    for (let i = 0; i < gridHeight; i++) {
        rowContainer = document.createElement("div");
        rowContainer.setAttribute("class", "row");
        mainContainer.appendChild(rowContainer);
    }
}

function createGrid(gridWidth, gridHeight) {
    let row_idx = 0; //starts from 0 and ends with height - 1; keeps track of row in which to create tempDivs 
    createRowContainer(gridHeight);

    for (let b = 0; b < gridWidth * gridHeight; b++) {
        tempDiv = document.createElement("div");
        tempDiv.setAttribute("class", "box");

        styleDiv(tempDiv);

        let rows = Array.from(document.querySelectorAll(".row"));
        
        //fill in each row with tempDivs
        rows[row_idx].appendChild(tempDiv);

        if (b === gridWidth * (row_idx + 1) - 1) { //row completely filled; move on to the next row
            row_idx++;
        }

        tempDiv.addEventListener('mouseover', change_div_background);
    }
}

const TILE_LINGERING_TIME = 2000; //for how long the hovered tile stays black 
const DEFAULT_HEIGHT = 4;
const DEFAULT_WIDTH = 4;

let currentWidth = DEFAULT_WIDTH;
let currentHeight = DEFAULT_HEIGHT;

createGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT);

let adjust_size_button = document.querySelector(".button-box button");
adjust_size_button.addEventListener("click", openPopUp);

