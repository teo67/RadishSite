const setupreader = (buttonId, numreads, filePath, onRead) => {
    const loadMore = document.getElementById(buttonId);

    let files = [];
    let next = 0;

    const init = async () => {
        files = await (await fetch(filePath)).json();
    }

    const read = async () => {
        if(files.length - next <= numreads) {
            loadMore.classList.add("unavailable");
        }
        for(let i = next; i < Math.min(next + numreads, files.length); i++) {
            await onRead(files[i]);
        }
    }

    init().then(read).then(() => {
        loadMore.onclick = () => {
            if(loadMore.classList.contains("unavailable")) {
                return;
            }
            next += numreads;
            read();
        }
    });
}
