const texts = document.getElementById("examples");
const loadMore = document.getElementById("loadmore");
let files = [];
let next = 0;

const init = async () => {
    const raw = await fetch("https://api.github.com/repos/teo67/Radish/contents/examples?ref=main");
    const json = await raw.json();
    for(const item of json) {
        files.push(item.git_url);
    }
}

const read = async() => {
    if(files.length - next <= 5) {
        loadMore.classList.add("unavailable");
    }
    for(let i = next; i < Math.min(next + 5, files.length); i++) {
        const asJson = await (await fetch(files[i])).json();
        const item = atob(asJson.content)
        const lines = item.split("\n");
        const table = document.createElement("table");
        table.onclick = () => {
            copy(table, item);
        }
        table.classList.add("example");
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for(let j = 0; j < lines.length; j++) {
            const tr = document.createElement("tr");
            const lineNumber = document.createElement("td");
            lineNumber.classList.add("lineNumber");
            lineNumber.innerText = `${j + 1}`;
            const content = document.createElement("td");
            let modLine = lines[j];
            let numTabs = 0;
            while(modLine[0] == " ") {
                modLine = modLine.substring(1);
                numTabs++;
            }
            content.style.paddingLeft = `${numTabs + 2}vw`;
            content.innerText = modLine;
            content.classList.add("content");
            tr.appendChild(lineNumber);
            tr.appendChild(content);
            tbody.appendChild(tr);
        }
        texts.appendChild(table);
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