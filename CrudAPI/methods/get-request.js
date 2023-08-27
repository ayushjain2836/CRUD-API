module.exports = (req,res) => {
    let baseUrl= req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];
   console.log(id);
    const regexV4=new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i );

    if(req.url === "/api/movies"){
        res.statusCode=200;
        res.setHeader("Content-type","application/json")
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(!regexV4.test(id)){
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"validation failed"}));
    }
    else if(baseUrl==="/api/movies/" && regexV4.test(id)){
        res.statusCode=200;
        res.setHeader("Content-type","application/json")
        let filteredmovie = req.movies.filter((movie)=>{
            return movie.id===id;
        })
        if(filteredmovie.length>0){
            res.statusCode=200;
            res.write(JSON.stringify(filteredmovie));
            res.end();
        }else{
            res.statusCode=404;
            res.end(JSON.stringify({message:"movie not found"}));
            res.end();
        }
       
    }
    else{
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"not working get"}));
    }
};