const fs = require("fs");

//connect app.js to routes.js
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>My First Node App</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>");
        res.write("</html>");
        return res.end();
    }
    // ASYNC NATURE OF NODE JS
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
            //function for each incoming piece of info
        }); //fired whenever new chunk is ready to be read 
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString(); //creates new buffer and
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.text", message, err => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            }); //can add sync but for larger files it might slow down your server as your code wont move on till done
            //fired once incoming data is parsed        
        });
    }
    // sets header
    res.setHeader("Content-Type", "text/html");
    // sets data
    res.write("<html>");
    res.write("<head><title>My First Node App</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
    res.end();
}
// if multiple, can do an object OR just do exports.____keyvalue pair
//i.e. exports.handler = requestHandler;
module.exports = requestHandler;