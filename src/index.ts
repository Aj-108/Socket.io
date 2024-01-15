import express from 'express' ;
import * as socketio from "socket.io" ;
import path from "path" ;
import cors from "cors" ;

const app = express() ;
const PORT = 8000 ; 
const http =  require('http').Server(app) ;


app.use(cors()) ;
const io =  require("socket.io")(http) ;

app.use(express.static(path.resolve("./src/View")))

io.on("connection",(socket:any) => {
    // console.log("User Connected")
    socket.on("userMessage",(message:any) => {
        console.log("New User Message ",message) ;
        io.emit("serverMessage",message) ;
    })    
})


app.get('/',(req,res)=> {
    res.sendFile("./src/View/inedx.html")
    // res.send("Working")
})



const server =  http.listen(PORT,()=> {
    console.log("Server is up on PORT ",PORT) ;
}) 