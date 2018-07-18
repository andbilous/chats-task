let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
let messages = [];


app.get('/',function(req,res){
res.sendFile(__dirname+ '/index.html');
});

app.get('/script.js',function(req,res){
    res.sendFile(__dirname+'/script.js');
    });

app.get('/messages',function(req,res){
    res.json(messages);
    })

app.post('/messages',function(req,res){
        messages.push(req.body);
        });



        http.listen(5010,function(){
            console.log('listening on *:5010');
        });
 

