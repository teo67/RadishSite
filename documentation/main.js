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
const tab = ''.padStart(4, ' ');
console.log(tab + "a");
const features = [
    new Feature("main.rdsh", "The file in which every Radish process begins. Code execution will run character by character and reference other files if necessary.", 
    null, null, null), 
    new Feature("holler", "Print a message to the console, along with a new line.", "holler(%expression%)", 
    "dig message plant \"hello, world!\"\nholler(message)\n# output: hello, world! #", null), 
    new Feature("dig | d", "Declare a variable, without necessarily setting its value. Dig is also used to set object properties and methods.", 
    "dig %variable name% | d %variable name%", "dig a plant 1\nd b p 2\nholler(a + b)\n# output: 3 #", ["plant | p"]), 
    new Feature("plant | p", "Assign a value to a variable or object property. Note that the assigning the null value will allow usage of the variable, while leaving the variable unassigned will not have the same effect.", 
    "plant %expression% | p %expression%", `dig string plant \"hola\"\ndig num p 1\ndig bool plant no\ndig none p null\ndig arr plant [1, 2, 3]\ndig obj p {\n\xa0dig name plant \"theo\"\n}\nholler(str + num)\n# output: hola1 #`,
    ["dig | d"]), 

    new Feature("tool | t", "Define a function/method in Radish. Note that functions are treated similar to other data types, so you must store functions in variables to save them (see example)", 
    "tool(%any number of variable names separated by commas%) { %any number of expressions% } | t %same syntax as with tool%", 
    "dig hello plant tool(name) {\n\xa0holler(\"Hello \" + name)\n}\nhello(\"John Doe\")\n# output: Hello John Doe #"), 

    new Feature("Array syntax", "Define an array literal using square brackets. Radish arrays are not restricted to one data type and may include string, numbers, other arrays, you name it.", 
    "[%any number of expressions separated by commas%]", 
    "dig colors plant [\"red\", \"blue\", \"yellow\", \"orange\"]\nholler(colors)\n# output: [red, blue, yellow, orange] #", ["Object syntax"]), 

    new Feature("Object syntax", "Define an object literal using curly brackets. Objects are similar to arrays in that they stored key values, except those keys do not have to be integers. Note that arrays in Radish are actually stored as objects, so you may add additional properties to them.\
    To add or edit properties of an object that has already been defined, simply refer to (name of object).(name of key) and use the usual plant | p syntax.", 
    "{%any number of expressions%}", 
    "dig snake plant {\n\xa0d length p 4\n\xa0d color p \"green\"\n}\nsnake.eyes p 2\nholler(snake)\n# output: {\n\xa0length: 4\n\xa0color: green\n\xa0eyes: 2\n} #", ["Array syntax", "plant | p"]), 

    new Feature("class", "Define a class with an (optional) constructor method and various properties that are inherited by descending objects. Classes in Radish store a prototype property that may be referred to as if the class itself were an object. Objects created via the class will inherit directly from this prototype object.", 
    "class {%any number of expressions%}", 
    "dig Person plant class {\n\xa0dig name\n\xa0dig constructor plant tool(_name) {\n\xa0\xa0this.name plant _name\n\xa0}\n}\ndig me plant new Person(\"Sarah\")\nholler(me.name)\n# output: Sarah #"),

    new Feature("public, private, protected", "Add modifiers to variables to change their privacy settings. Public variables may be accessed by any script, and private variables on an object may only be accessed in the context of that object.\
    Protected variables on objects and classes can be accessed as if they were private, and also by other objects that extend from the body that possesses the variable.", 
    "dig public %variable name% | dig private %variable name% | dig protected %variable name%", 
    "dig supersecretstuff plant {\n\xa0dig private secret plant \"NO ACCESS\"\n\xa0dig public notsecret plant \"ACCESS\"\n}\nholler(supersecretstuff.notsecret)\n# output: ACCESS #\nholler(supersecretstuff.secret)\n# error #", ["dig | d", "Object syntax", "class", "static"]), 

    new Feature("static", "A modifier to be added to class properties that append the property to the class itself, rather than to its prototype object. Static properties and methods can be accessed as if the class were an object: (class name).(property name).", 
    "dig static %variable name%", 
    "dig Forest plant class {\n\xa0dig public static NumTrees plant 10\n}\nholler(Forest.NumTrees)\n# output: 10 #", ["public, private, protected", "dig | d", "class"]), 

    new Feature("Comments", "Use hashtags to add comments to your scripts. Note that because Radish is essentially blind to newline characters, all comments are enclosed in hashtags and can span multiple lines.", 
    "#%any text%#", "# wooooooo this is a comment #\n# no output #", null), 

    new Feature("harvest | h", "Harvest is akin to the return keyword in many other languages in that it allows a function to output a value. Execution of the function is terminated once a value is harvested.",
    "harvest %expression% | h %expression%", 
    "dig addOne plant tool(num) {\n\xa0harvest num + 1\n}\nholler(addOne(1))\n# output: 2 #", ["tool | t"]), 

    new Feature("end, cancel, continue", "These keywords terminate processes without returning a value. The end keyword is used to terminate a function, and the cancel keyword is used to terminate a loop (similar to break). The continue keyword terminates the current run of the loop but does not end the loop altogether.", 
    "end | cancel | continue", 
    "dig badFunction plant tool() {\n\xa0end\n\xa0holler(\"yay!\")\n}\nbadFunction()\n# no output #\n\nfor(dig i plant 1, i < 20, i++) {\n\xa0if(i % 10 == 0) {\n\xa0\xa0cancel\n\xa0} else if(i % 5 == 0) {\n\xa0\xa0continue\n\xa0}\n\xa0holler(i)\n}\n# output:\n1\n2\n3\n4\n6\n7\n8\n9 #", null)
];
const init = () => {
    for(const feature of features) {
        const newElement = document.createElement("section");
        newElement.classList.add("feature");
        newElement.id = feature.name;
        const name = document.createElement("h1");
        name.innerText = feature.name + " ";
        newElement.appendChild(name);
        if(feature.syntax != null) {
            const syntax = document.createElement("p");
            syntax.classList.add("code");
            const syntaxTag = document.createElement("span");
            syntaxTag.innerText = "SYNTAX:";
            syntax.innerText = feature.syntax;
            syntax.prepend(syntaxTag);
            
            newElement.appendChild(syntax);
        }
        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = feature.description;
        newElement.appendChild(description);
        
        if(feature.example != null) {
            const example = document.createElement("p");
            example.classList.add("code");
            const span = document.createElement("span");
            span.innerText = "copy text";
            span.onclick = () => {
                copy(span);
            }
            
            example.classList.add("example");
            example.innerText = feature.example;
            example.appendChild(span);
            newElement.appendChild(example);
        }
        if(feature.similar != null) {
            const similar = document.createElement("section");
            similar.classList.add("similar");
            similar.innerText = "Related topics: ";
            for(const similarFeature of feature.similar) {
                const newSimilar = document.createElement("a");
                
                newSimilar.innerText = similarFeature;
                newSimilar.onclick = () => {
                    jumpto(similarFeature);
                }
                similar.appendChild(newSimilar);
            }
            newElement.appendChild(similar);
        }
        docs.appendChild(newElement);
    }
}
const jumpto = id => {
    const target = document.getElementById(id);
    target.scrollIntoView({behavior: 'smooth', block: 'center'});
    
}
init();