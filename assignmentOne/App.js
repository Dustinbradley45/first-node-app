const http = require("http");
const port= 3000

const server = http.createServer((req, res) => {

    const url = req.url
    if (url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.write(`<html><head><title>Assignment 1</title></head></html>`)
        res.write("<body><form action='/create-user' method='POST' type='text' name='username'><input type='text'/><button>Submit</button></form> </body>")
        res.write("</html>")
        return res.end();
        //
    }
    if (url === "/users") {
        res.setHeader("Content-Type", "text/html")
        res.write(`<html><head><title>Assignment 1</title></head></html>`)
        res.write("<body><ul><li>user1</li><li>user2</li><li>user3</li><li>user4</li></ul></body>")
        res.write("</html>")
        return res.end();
        //
    }
    //
    if (url === "/create-user") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);

        });
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
    }
});

server.listen(3000);




