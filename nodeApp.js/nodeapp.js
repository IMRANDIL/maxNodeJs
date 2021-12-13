const http = require('http');

const route = require('./routes')

const server = http.createServer(route);

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT} `);
})





 // if (url === '/message' && req.method === "POST") {

    //     res.write(`<h1>Thank You..!! We got your Love!</h1><a href="/">Back Home</a>`);
    //     return res.end()
    // }
