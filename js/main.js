
let paletteSection = document.querySelector(".palette-container");
let generateColorBtn = document.querySelector("button");


window.onload = display;

function display() {
    for(let i=0; i<10; i++) {
        let colorCode = generateHexColorCode();
        
        let palette = `
            <div class="palette" style="background-color: ${colorCode}">
                <div class="icons">
                    <i class="fas fa-unlock" onclick="lockThisColor(this)"></i>
                    <i class="fas fa-copy" onclick="copyToClipboard('${colorCode}')"></i>
                </div>
            </div>`;
    
        paletteSection.innerHTML += palette;
    }
}


function generateColorPalette() {
    for(let i=0; i<paletteSection.children.length; i++) {
        let palette = paletteSection.children[i];
        let lockIcon = paletteSection.children[i].children[0].children[0];
        let copyIcon = paletteSection.children[i].children[0].children[1];

        if(lockIcon.classList[1] == "fa-unlock") {
            let colorCode = generateHexColorCode();
            palette.style.backgroundColor = colorCode;
            copyIcon.setAttribute("onclick", `copyToClipboard('${colorCode}')`);
        }
    }
}

generateColorBtn.onclick = generateColorPalette;


function generateHexColorCode() {
    let color = "#";
    let char = "0123456789abcdef";

    for(let i=0; i<6; i++) {
        let index = Math.floor(Math.random() * char.length);
        color += char[index];
    }
    
    return color;    
}


function lockThisColor(elem) {
    if(elem.classList[1] == "fa-unlock") {
        elem.classList = "fas fa-lock";
        snackbar("Color Locked");
    }else {
        elem.classList = "fas fa-unlock";
    }
}


function copyToClipboard(colorCode) {
    navigator.clipboard.writeText(colorCode).then(function() {
        snackbar("Copied!");
    });
}


function snackbar(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;

    setTimeout(function(){ 
        x.className = x.className.replace("show", ""); 
    }, 2000);
}
