const requestBodyparser= require("../util/body-parser");
const crypto=require("crypto");
const writeTOFile = require("../util/write-to-file");
module.exports = async (req,res) => {
    if(req.url==="/api/movies"){
        try{
            let body=  await requestBodyparser(req);
            body.id=crypto.randomUUID();
            req.movies.push(body);
            writeTOFile(req.movies);
            res.writeHead(201,{"content":"application/json"});
            res.end();
        }catch(err){
            res.writeHead(400,{"content":"application/json"});
            console.log(err);
            
                res.end(JSON.stringify({
                    title:"validation failed",message:"request body not found",
                })
            )

        }
    }
    else{
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"not working get"}));
    }
};