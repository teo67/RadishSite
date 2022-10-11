const texts = document.getElementById("examples");
// for(const text of texts) {
//     text.onclick = () => {
//         copy(text, true);
//     }
// }
const init = async () => {
    let returning = [];
    const raw = await fetch("https://api.github.com/repos/teo67/Radish/contents/examples?ref=main");
    const json = await raw.json();
    for(const item of json) {
        const text = await fetch(item.git_url);
        const asJson = await text.json();
        returning.push(atob(asJson.content))
    }
    return returning;
}

init().then(res => {
    for(const item of res) {
        const lines = item.split("\n");
        const table = document.createElement("table");
        table.onclick = () => {
            copy(table, item);
        }
        table.classList.add("example");
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for(let i = 0; i < lines.length; i++) {
            const tr = document.createElement("tr");
            const lineNumber = document.createElement("td");
            lineNumber.classList.add("lineNumber");
            lineNumber.innerText = `${i + 1}`;
            const content = document.createElement("td");
            content.innerText = lines[i];
            content.classList.add("content");
            tr.appendChild(lineNumber);
            tr.appendChild(content);
            tbody.appendChild(tr);
        }
        texts.appendChild(table);
    }
})