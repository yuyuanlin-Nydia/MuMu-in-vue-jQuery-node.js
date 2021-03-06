var express=require("express");
var session = require('express-session');
var path=require("path");
var bodyParser = require('body-parser');
var app = express();


// 切出去的router
var indexRouter=require("./routes/index");
var articleRouter=require("./routes/article");
var activityRouter=require("./routes/activity");

var bandRouter=require("./routes/band");
var userRouter=require("./routes/user");
var companyRouter=require("./routes/company");
var cartRouter=require("./routes/cart");
var logRouter=require("./routes/log");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// 以 express-session 管理狀態資訊
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,

    cookie:{
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60*1000
    }
}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
})

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);  
app.set('views', __dirname + '/views');

// app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter)
app.use("/article",articleRouter);
app.use("/activity",activityRouter);

app.use("/band",bandRouter);
app.use("/user",userRouter);
app.use("/company",companyRouter);
app.use("/cart",cartRouter);
app.use("/log",logRouter);






app.listen(3000);
console.log("Web伺服器就緒，開始接受用戶端連線.「Ctrl + C」可結束伺服器程式.");




