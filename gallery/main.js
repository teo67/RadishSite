const gal = document.getElementById("gal");
const loadMore = document.getElementById("loadmore");

let files = [];
let next = 0;

const init = async () => {
    files = await (await fetch("files.json")).json();
}

const read = async () => {
    if(files.length - next <= 5) {
        loadMore.classList.add("unavailable");
    }
    let srcs = [];
    let ress = [];
    for(let i = next; i < Math.min(next + 5, files.length); i++) {
        srcs.push(await (await fetch(`src/${files[i]}.rdsh`)).text());
        ress.push(`./img/${files[i]}.bmp`);
    }
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
}

init().then(read).then(() => {
    loadMore.onclick = () => {
        if(loadMore.classList.contains("unavailable")) {
            return;
        }
        next += 5;
        read();
    }
});