const fs = require('fs');
const res = fs.readdirSync("./files").filter(name => {
    return name.endsWith(".rdsh");
})
fs.writeFileSync("./files.json", JSON.stringify(res));