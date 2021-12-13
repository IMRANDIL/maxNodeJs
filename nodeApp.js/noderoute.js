const fs = require('fs');


const routeHandler = (req, res) => {
    const url = req.url;


    if (url === '/') {

        res.write(`<html>`);
        res.write(`<head><title>Enter Message</title></head>`);
        res.write(`<body><h1>Hey There!</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        return res.end()
    }




    if (url === '/message' && req.method === "POST") {
        // getting input data...
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk);

        });

        return req.on('end', () => {
            //because we know it will be input...text
            const parsedbody = Buffer.concat(body).toString();

            const parsedmsg = parsedbody.split('=')[1];
            const sliceMsg = parsedmsg.split('+').join(' ');
            const decodemsg = decodeURI(sliceMsg)

            fs.writeFile('message.txt', decodemsg, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end()
            });

        })


    }

}


module.exports = routeHandler;
