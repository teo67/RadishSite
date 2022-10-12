const gal = document.getElementById("gal");
setupreader("loadmore", 5, "files.json", async fileName => {
        const src = await (await fetch(`src/${fileName}.rdsh`)).text();
        const res = `./img/${fileName}.bmp`;
        const newD = document.createElement("section");
        newD.classList.add("gallery");
        const newI = document.createElement("img");
        newI.src = res;
        newD.appendChild(newI);
        const newT = document.createElement("p");
        newT.innerText = src;
            const span = document.createElement("span");
            span.innerText = "copy text";
            span.onclick = () => {
                copy(span);
            }
        newT.appendChild(span); 
        newD.appendChild(newT);
        gal.appendChild(newD);
});