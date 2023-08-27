const http = require("http");
 require("dotenv").config();
const putReq = require("./methods/put-request");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const deleteReq = require("./methods/delete-request");
let movies = require("./data/movies.json");
const PORT = process.env.Port || 5001

const server = http.createServer((req,res)=>{
    req.movies = movies;
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;
    
        case "PUT":
            putReq(req,res);
            break;

        case "POST":
            postReq(req,res);
            break;

        case "DELETE":
            deleteReq(req,res);
            break;
        default:
            res.statusCode=404;
            res.setHeader("content-type", "application/json");
            res.write(JSON.stringify({message: "not foundd"}));
            res.end();

    }


});

server.listen(PORT,()=>
{
    console.log(`server started on port ; ${PORT}`)
})