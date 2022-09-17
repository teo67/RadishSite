const fs = require('fs');
const res = fs.readdirSync("./src").map(item => {
    return item.substring(0, item.length - 5)
})
fs.writeFileSync("./files.json", JSON.stringify(res));
