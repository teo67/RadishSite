let currentCopied = null;
const copy = obj => {
    navigator.clipboard.writeText(obj.parentElement.innerText.slice(0, obj.parentElement.innerText.indexOf("copy text")));      
    if(currentCopied != null) {
        currentCopied.classList.remove("copied");
    }
    obj.classList.add("copied");
    currentCopied = obj;
}