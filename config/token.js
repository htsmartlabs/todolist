const jwt = require('jsonwebtoken');

//this is the middleware validating the user
module.exports = (req,res,next)=>{
    try{
        if(req.headers.autharization){
            const token = req.headers.autharization.split(" ")[1];
            const decode = jwt.verify(token,'citicollege');    
            if(decode){
                next();
            }else{
                return res.json({status:false,msg:"Auth Failed"});    
            }    
        }else{
            return res.json({status:false,msg:"Auth Failed"});    
        }
    }catch(error){
        console.log(error);
        return res.json({status:false,msg:"Auth Failed"});
    }
}
