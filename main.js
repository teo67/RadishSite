let currentCopied = null;
const copy = obj => {
    console.log(obj);
    console.log(obj.parentElement.textContent);
    navigator.clipboard.writeText(obj.parentElement.textContent.slice(0, obj.parentElement.textContent.indexOf("copy text")));
    if(currentCopied != null) {
        currentCopied.classList.remove("copied");
    }
    obj.classList.add("copied");
    currentCopied = obj;
}