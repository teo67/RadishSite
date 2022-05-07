const texts = document.getElementsByClassName("gist-data");
for(const text of texts) {
    text.onclick = () => {
        copy(text, true);
    }
}