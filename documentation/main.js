const docs = document.getElementById("docs");
const search = document.getElementById("search");
const results = document.getElementById("results");
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
    new Feature("all", "This special keyword references every variable at the top level of the stack and returns them all as a collective object. This is especially useful when exporting from a file, as you can simply use 'harvest all' to refer to every variable declared on the surface of the file.", "all", "# stuff.rdsh #\r\ndig amountOfStuff plant 5\r\ndig things plant [\"apple\", \"banana\", \"teddy bear\", \"pen\", \"pencil\"]\r\nharvest all\r\n# end of file #\r\n\r\n# main.rdsh #\r\ndig stuff plant import \"stuff.rdsh\"\r\nholler(stuff.things[1])\r\n# end of file #\r\n\r\n# output: banana #", ["harvest | h", "import"]), 
    new Feature("Array syntax", "Define an array literal using square brackets. Radish arrays are not restricted to one data type and may include string, numbers, other arrays, you name it.", "[%any number of expressions separated by commas%]", "dig colors plant [\"red\", \"blue\", \"yellow\", \"orange\"]\r\nholler(colors)\r\n# output: [red, blue, yellow, orange] #", ["Object syntax", "Basic class methods"]), 
    new Feature("Basic class methods", "Certain types, such as strings and arrays, come with built-in class methods for convenience. For example, array.push(value) adds a value to an array. See the example for more useful class methods.", "%object extending class%.%class method or property%", "dig arr plant [1, 2, 3]\nholler(arr)\narr.push(4)\nholler(arr)\narr.pop()\nholler(arr)\narr.remove(1)\nholler(arr)\nholler(arr.length)\nholler(\"abc\".length)\nholler(yes.getValue())\n# note that getValue() is a function extending the Object class, which means that it can be called on pretty much any value #\n# output: [1, 2, 3]\n[1, 2, 3, 4]\n[1, 2, 3]\n[1, 3]\n2\n3\nyes #", ["class"]),
    new Feature("class", "Define a class with an (optional) constructor method and various properties that are inherited by descending objects. Classes in Radish store a prototype property that may be referred to as if the class itself were an object. Objects created via the class will inherit directly from this prototype object.", "class {%any number of expressions%}", "dig Person plant class {\r\n\xa0dig name\r\n\xa0constructor plant tool(_name) {\r\n\xa0\xa0this.name plant _name\r\n\xa0}\r\n}\r\ndig me plant new Person(\"Sarah\")\r\nholler(me.name)\r\n# output: Sarah #", ["Object syntax", "Inheritance"]), 
    new Feature("Comments", "Use hashtags to add comments to your scripts. Note that because Radish is essentially blind to newline characters, all comments are enclosed in hashtags and can span multiple lines.", "#%any text%#", "# wooooooo this is a comment #\r\n# no output #", null), 
    new Feature("dig | d", "Declare a variable, without necessarily setting its value. Dig is also used to set object properties and methods.", "dig %variable name% | d %variable name%", "dig a plant 1\r\nd b p 2\r\nholler(a + b)\r\n# output: 3 #", ["plant | p", "plant / harvest properties"]), 
    new Feature("end, cancel, continue", "These keywords terminate processes without returning a value. The end keyword is used to terminate a function, and the cancel keyword is used to terminate a loop (similar to break). The continue keyword terminates the current run of the loop but does not end the loop altogether.", "end | cancel | continue", "dig badFunction plant tool() {\r\n\xa0end\r\n\xa0holler(\"yay!\")\r\n}\r\nbadFunction()\r\n# no output #\r\n\r\nfor(dig i plant 1, i < 20, i++) {\r\n\xa0if(i % 10 == 0) {\r\n\xa0\xa0cancel\r\n\xa0} elseif(i % 5 == 0) {\r\n\xa0\xa0continue\r\n\xa0}\r\n\xa0holler(i)\r\n}\r\n# output:\r\n1\r\n2\r\n3\r\n4\r\n6\r\n7\r\n8\r\n9 #", ["for", "while", "tool | t"]), 
    new Feature("for", "A more concise form of a while loop, a for loop allows for variable declaration and quick incrementing. The first expression in the parentheses is executed at the beginning of the loop, and it will create a scope to allow for variable declaration. The second expression is the condition, similar to the while loop. The third expression is iterative, so it gets run once at the end of each run of the loop.", "for(%expression%,%expression%,%expression%) {%any number of expressions%}", "for(dig counter plant 0, counter < 5, counter++) {\r\n\xa0holler(counter)\r\n}\r\nholler(\"done!\")\r\n# output: 0\r\n1\r\n2\r\n3\r\n4\r\ndone! #", ["while"]), 
    new Feature("harvest | h", "Harvest is akin to the return keyword in many other languages in that it allows a function to output a value. Execution of the function is terminated once a value is harvested.", "harvest %expression% | h %expression%", "dig addOne plant tool(num) {\r\n\xa0harvest num + 1\r\n}\r\nholler(addOne(1))\r\n# output: 2 #", ["tool | t", "plant / harvest properties"]), 
    new Feature("holler", "Print a message to the console, along with a new line.", "holler(%expression%)", "dig message plant \"hello, world!\"\r\nholler(message)\r\n# output: hello, world! #", ["tool | t"]), 
    new Feature("import", "Use variables from other files in order to improve organization. In order to export various variables from a file so that they can be later imported, simply use the harvest | h syntax as if the entire file were a function.", "import %expression interpreted as string (should be the name of the file)%", "# stuff.rdsh #\r\ndig specialNumber plant 3.14\r\nharvest specialNumber\r\n# end of file #\r\n\r\n# in main.rdsh #\r\ndig stuff plant import \"stuff.rdsh\"\r\nholler(stuff)\r\n# end of file #\r\n\r\n# output: 3.14 #", ["main.rdsh", "harvest | h"]), 
    new Feature("Inheritance", "Classes may extend other classes, just like objects can extend classes. This allows objects of said class to reference properties and methods from either class they inherit from.", "class : %name of other class (string)% {%any number of expressions%}", "dig Organism plant class {\n\xa0dig hasRibosomes plant yes\n}\ndig Person plant class : Organism {\n\xa0dig hasTeeth plant yes\n}\ndig dak plant new Person()\nholler(dak.hasTeeth) # uses directly inherited property #\nholler(dak.hasRibosomes) # uses indirectly inherited property #\n# output: yes\nyes #", ["class", "Object syntax", "super"]),
    new Feature("main.rdsh", "The file in which every Radish process begins. Code execution will run character by character and reference other files if necessary.", "main.rdsh", "# in main.rdsh #\nholler(\"hello world\")\n# end of file #\n\n# output: hello world #", null), 
    new Feature("Object syntax", "Define an object literal using curly brackets. Objects are similar to arrays in that they stored key values, except those keys do not have to be integers. Note that arrays in Radish are actually stored as objects, so you may add additional properties to them.    To add or edit properties of an object that has already been defined, simply refer to (name of object).(name of key) and use the usual plant | p syntax.", "{%any number of expressions%}", "dig snake plant {\r\n\xa0d length p 4\r\n\xa0d color p \"green\"\r\n}\r\nsnake.eyes p 2\r\nholler(snake)\r\n# output: {\r\n\xa0length: 4\r\n\xa0color: green\r\n\xa0eyes: 2\r\n} #", ["Array syntax", "plant | p", "class"]), 
    new Feature("plant | p", "Assign a value to a variable or object property. Note that the assigning the null value will allow usage of the variable, while leaving the variable unassigned will not have the same effect.", "plant %expression% | p %expression%", "dig string plant \"hola\"\r\ndig num p 1\r\ndig bool plant no\r\ndig none p null\r\ndig arr plant [1, 2, 3]\r\ndig obj p {\r\n\xa0dig name plant \"theo\"\r\n}\r\nholler(str + num)\r\n# output: hola1 #", ["dig | d", "plant / harvest properties"]), 
    new Feature("plant / harvest properties", "Similar to get and set properties in other languages, this syntax can be used to assign functions to be called when using or setting a certain variable. In the plant function, you may use the variable 'input' to refer to the planted value passed in to the function. Note that variables do not require both a plant and a harvest method, so part of the syntax above is optional.", "dig %variable name% { plant {%any number of expressions%} harvest {%any number of expressions%}}", "dig _height plant 0\r\ndig height {\r\n\xa0plant {\r\n\xa0\xa0if(input < 1) {\r\n\xa0\xa0\xa0holler(\"You can't shrink!\")\r\n\xa0\xa0\xa0end\r\n\xa0\xa0}\r\n\xa0\xa0holler(\"You grew!\")\r\n\xa0\xa0_height += input\r\n\xa0}\r\n\xa0harvest {\r\n\xa0\xa0harvest _height\r\n\xa0}\r\n}\r\nheight plant 4\r\nholler(height)\r\n# output: You grew!\r\n4 #", ["plant | p", "harvest | h", "dig | d"]), 
    new Feature("Poly-values", "Poly values are pretty unique to Radish, and their use cases may be... limited. While poly syntax almost looks like a tuple, they are NOT the same thing. A poly value stores one single value, with three components: one number, one string, and one boolean. Tuples, arrays, and objects store multiple values nested inside of one value, which ultimately takes up more space than a poly. Poly values are also primitive, meaning that they are not pointed to and equality is checked by value comparison. When poly values are used in operations, the appropriate component is determined. For example, !value would return the opposite of the boolean component, while value + 3 would add to the number component. If any component is not specified in declaration, the defaults are as follows: 0 for numbers, \"\" for strings, and false for booleans.", "(%up to three values separated by commas - one number, one string, one boolean%)", "dig myValue plant (1, \"cadabra\", yes)\nholler(myValue / 2)\nholler(\"abra\" + myValue)\nholler(myValue ? \"yay\", \"nay\")\n# output: 0.5\nabracadabra\nyay #", ["plant | p"]),
    new Feature("public, private, protected", "Add modifiers to variables to change their privacy settings. Public variables may be accessed by any script, and private variables on an object may only be accessed in the context of that object.    Protected variables on objects and classes can be accessed as if they were private, and also by other objects that extend from the body that possesses the variable.", "dig public %variable name% | dig private %variable name% | dig protected %variable name%", "dig supersecretstuff plant {\r\n\xa0dig private secret plant \"NO ACCESS\"\r\n\xa0dig public notsecret plant \"ACCESS\"\r\n}\r\nholler(supersecretstuff.notsecret)\r\n# output: ACCESS #\r\nholler(supersecretstuff.secret)\r\n# error #", ["dig | d", "Object syntax", "class", "static"]), 
    new Feature("static", "A modifier to be added to class properties that append the property to the class itself, rather than to its prototype object. Static properties and methods can be accessed as if the class were an object: (class name).(property name).", "dig static %variable name%", "dig Forest plant class {\r\n\xa0dig public static NumTrees plant 10\r\n}\r\nholler(Forest.NumTrees)\r\n# output: 10 #", ["public, private, protected", "dig | d", "class"]), 
    new Feature("String features", "Radish comes with some special syntax to make string-building easier. To escape a character, use '\\' in front of it - some combinations, such as '\\n', are abbreviations for whitespace characters. To interpolate a Radish expression in a string, use single quotes (see the example). Finally, to access a character from a string, use square brackets as if it were an array. You can get as well as set individual characters using this notation.", "\\%character% | \"%string sequence%'%expression'%string sequence\" | %string%[%expression%]", "holler(\"hello \\\"world\\\"\")\nholler(\"hello '10 * 10' worlds!\")\nholler(\"hello\"[0])\n# output: hello \"world\"\nhello 100 worlds!\nh #"),
    new Feature("super", "The super method can only be used in class constructor classes when the class extends another class. \"super\" refers to the constructor of the inherited class, which allows the surface-level constructor to call deeper constructors in order to assemble objects.", "super(%any number of expressions separated by commas%)", "dig Car plant class {\n\xa0constructor plant tool(_numWheels) {\n\xa0\xa0this.numWheels plant _numWheels\n\xa0}\n}\ndig ModelT plant class : Car {\n\xa0constructor plant tool(_paintColor) {\n\xa0\xa0super(4)\n\xa0\xa0this.paintColor plant _paintColor\n\xa0}\n}\ndig myCar plant new ModelT(\"red\")\nholler(myCar.numWheels)\n# output: 4 #", ["class", "Inheritance"]),
    new Feature("this", "The \"this\" variable can be used in object and class methods in order to refer to the object being operated on. For example, a sayName method on an object might have to refer to this.name in order to function properly (see example).", "this", "dig person plant {\r\n\xa0dig name plant \"Nick\"\r\n\xa0dig sayName plant tool() {\r\n\xa0\xa0holler(this.name)\r\n\xa0}\r\n}\r\nperson.sayName()\r\n# output: Nick #", ["Object syntax", "class"]), 
    new Feature("throw", "Manually throw an error with a string attached to describe it. This will terminate the running process.", "throw %expression interpreted as string%", "dig age plant -1\r\nif(age < 0) {\r\n\xa0throw \"That doesn't make any sense!\"\r\n}\r\n# error output: That doesn't make any sense! #", ["try/catch"]), 
    new Feature("tool | t", "Define a function/method in Radish. Note that functions are treated similar to other data types, so you must store functions in variables to save them (see example)", "tool(%any number of variable names separated by commas%) { %any number of expressions% } | t %same syntax as with tool%", "dig hello plant tool(name) {\r\n\xa0holler(\"Hello \" + name)\r\n}\r\nhello(\"John Doe\")\r\n# output: Hello John Doe #", ["harvest | h"]), 
    new Feature("try/catch", "You can use try/catch statements to handle errors without completely terminating the program. In the body of the catch method, you may use the variable 'error' to refer to the error thrown as a string.", "try {%any number of expressions%} catch {%any number of expressions%}", "try {\r\n\xa0throw \"Throwing an error!!\"\r\n} catch {\r\n\xa0holler(\"Something went wrong: \" + error)\r\n}\r\n# output: Something went wrong: Throwing an error!! #", ["throw"]), 
    new Feature("uproot, delete, colon syntax", "Radish has a few ways of removing variables from the stack. Use 'uproot' to directly remove a variable from memory by name. To remove an object property, you can use ':' instead of '.' between accessor terms. To remove an object property by string, simply use the built-in Object.delete() method.", "uproot %variable name% | %object%:%property name% | %object%.delete(%expression%)", "dig carrot plant {\n\xa0dig color plant \"orange\"\n\xa0dig len plant 8\n}\nholler(carrot:color)\n# at this point, carrot no longer has the 'color' property #\nholler(carrot.delete(\"len\"))\n# now carrot no longer has the 'len' property #\nholler(uproot carrot)\n# now carrot doesn't exist at all #\n# output: orange\n8\n{} #", ["dig | d", "Object syntax"]),
    new Feature("while", "Use a while loop to iterate through a process until a certain condition returns false.", "while(%expression evaluated as boolean%) {%any number of expressions%}", "dig counter plant 0\r\nwhile(counter < 5) {\r\n\xa0holler(counter)\r\n\xa0counter++\r\n}\r\nholler(\"done!\")\r\n# output: 0\r\n1\r\n2\r\n3\r\n4\r\ndone! #", ["for"])
];

const sort = (arr, comparator) => {
    let done = false; // sort em
    while(!done) {
        done = true;
        for(let i = 0; i < arr.length - 1; i++) {
            if(comparator(arr[i], arr[i + 1])) {
                const saved = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = saved;
                done = false;
            }
        }
    }
}
// use the following to sort docs before user accesses them to reduce runtime
// const printWithBackslashes = input => { 
//     let returning = '';
//     for(let i = 0; i < input.length; i++) {
//         if(input[i] == '\xa0') {
//             returning += '\\xa0';
//         } else if(input[i] == '\r') {
//             returning += '\\r';
//         } else if(input[i] == '\n') {
//             returning += '\\n';
//         } else if(input[i] == "\"") {
//             returning += '\\"';
//         } else {
//             returning += input[i];
//         }
//     }
//     return returning;
// }
// sort(features, (current, next) => {
//     for(let i = 0; i < current.name.length || i < next.name.length; i++) {
//         if(current.name.length <= i) {
//             return false;
//         }
//         if(next.name.length <= i) {
//             return true;
//         }
//         if(current.name[i].toLowerCase() != next.name[i].toLowerCase()) {
//             return current.name[i].toLowerCase() > next.name[i].toLowerCase();
//         }
//     }
// });

// let returning = '';
// for(let i = 0; i < features.length; i++) {
//     returning += "new Feature(\"";
//     returning += features[i].name;
//     returning += "\", \"";
//     returning += printWithBackslashes(features[i].description);
//     returning += "\", \"";
//     returning += printWithBackslashes(features[i].syntax);
//     returning += "\", \"";
//     returning += printWithBackslashes(features[i].example);
//     returning += "\", ";
//     if(features[i].similar == null) {
//         returning += "null";
//     } else {
//         returning += "[";
//         for(let j = 0; j < features[i].similar.length; j++) {
//             returning += `"${features[i].similar[j]}"`;
//             if(j != features[i].similar.length - 1) {
//                 returning += ", ";
//             }
//         }
//         returning += "]";
//     }
//     returning += ")";
//     if(i != features.length - 1) {
//         returning += ", \n";
//     }
// }
// console.log(returning);
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
const addResult = (text, input) => {
    const newRes = document.createElement("p");
    newRes.classList.add("result");
    newRes.innerHTML = "";
    const indexOf = text.toLowerCase().indexOf(input);
    newRes.innerHTML += text.slice(0, indexOf);
    newRes.innerHTML += `<strong>${text.slice(indexOf, indexOf + input.length)}</strong>`;
    newRes.innerHTML += "</strong>";
    newRes.innerHTML += text.slice(indexOf + input.length, text.length);
    newRes.onclick = () => {
        jumpto(text);
        search.value = "";
        clearResults();
    }
    results.appendChild(newRes);
}
const clearResults = () => {
    while(results.firstChild != null) {
        results.removeChild(results.firstChild);
    }
}
const pointValueFrom = (text, input) => { // 0 - 2
    return (text.toLowerCase().startsWith(input) ? 1 : 0) + (input.length / text.length);
}

search.addEventListener("input", () => {
    const val = search.value.toLowerCase();
    clearResults();
    if(val.length == 0) {
        return;
    }
    //console.log(val);
    const firstResults = [];
    for(const feature of features) {
        if(feature.name.toLowerCase().includes(val)) {
            firstResults.push(feature.name);
        }
    }
    if(firstResults.length == 0) {
        return;
    }
    sort(firstResults, (current, next) => {
        return pointValueFrom(current, val) < pointValueFrom(next, val);  
    })
    
    for(let i = 0; i < 5 && i < firstResults.length; i++) {
        addResult(firstResults[i], val);
    }
});