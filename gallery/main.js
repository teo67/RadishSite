const gal = document.getElementById("gal");

let srcs = [];
let ress = [];

const init = async () => {
    const files = await (await fetch("files.json")).json();
    for(const file of files) {
        srcs.push(await (await fetch(`src/${file}.rdsh`)).text());
        ress.push(`./img/${file}.bmp`);
    }
}

init().then(() => {
    for(let i = 0; i < srcs.length; i++) {
        const newD = document.createElement("section");
        newD.classList.add("gallery");
        const newI = document.createElement("img");
        newI.src = ress[i];
        newD.appendChild(newI);
        const newT = document.createElement("p");
        newT.innerText = srcs[i];
            const span = document.createElement("span");
            span.innerText = "copy text";
            span.onclick = () => {
                copy(span);
            }
        newT.appendChild(span); 
        newD.appendChild(newT);
        gal.appendChild(newD);
    }
});