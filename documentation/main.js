const docs = document.getElementById("docs");
class Feature {
    constructor(_name, _description, _syntax, _example, _similar) {
        this.name = _name;
        this.description = _description;
        this.syntax = _syntax;
        this.example = _example;
        this.similar = _similar;
    }
}
const features = [
    new Feature("example", "exampleabc", "abc", "abcd", ["example2"]), 
    new Feature("example2", "example123", "123", "1234", ["example"])
];
const init = () => {
    for(const feature of features) {
        const newElement = document.createElement("section");
        newElement.classList.add("feature");
        newElement.id = feature.name;
        const name = document.createElement("h1");
        name.innerText = feature.name;
        newElement.appendChild(name);
        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = feature.description;
        newElement.appendChild(description);
        if(feature.syntax != null) {
            const syntax = document.createElement("p");
            syntax.classList.add("code");
            syntax.classList.add("syntax");
            syntax.innerText = feature.syntax;
            newElement.appendChild(syntax);
        }
        if(feature.example != null) {
            const example = document.createElement("p");
            example.classList.add("code");
            example.classList.add("syntax");
            example.innerText = feature.example;
            newElement.appendChild(example);
        }
        if(feature.similar != null) {
            const similar = document.createElement("section");
            similar.classList.add("similar");
            for(const similarFeature of feature.similar) {
                const newSimilar = document.createElement("a");
                newSimilar.href = `#${similarFeature}`;
                newSimilar.innerText = similarFeature;
                similar.appendChild(newSimilar);
            }
            newElement.appendChild(similar);
        }
        docs.appendChild(newElement);
    }
}
init();