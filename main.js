const leaves = document.getElementById("leaves");
let currentCopied = null;
const copy = (obj, ignore = false) => {
    if(ignore) {
        navigator.clipboard.writeText(obj.innerText);
    } else {
        navigator.clipboard.writeText(obj.parentElement.innerText.slice(0, obj.parentElement.innerText.indexOf("copy text")));  
    }
    if(currentCopied != null) {
        currentCopied.classList.remove("copied");
    }
    obj.classList.add("copied");
    currentCopied = obj;
}

const spawnLeaf = () => {
    if(document.hidden) {
        return;
    }
    const newE = document.createElement("div");
    newE.style.top = `${Math.round(Math.random() * window.innerHeight * 1.5)}px`;
    newE.style.opacity = `${Math.floor(20 + Math.random() * 30)}%`;
    newE.style.animationDuration = `${4 + Math.random() * 20}s`;
    
    leaves.appendChild(newE);
}

leaves.onanimationend = e => {
    e.target.remove();
}

setInterval(spawnLeaf, 200);