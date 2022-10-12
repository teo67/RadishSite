const texts = document.getElementById("examples");
    setupreader("loadmore", 10, "files.json", async fileName => {
        const item = await (await fetch(`files/${fileName}`)).text();
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
    });