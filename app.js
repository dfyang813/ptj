
const http=require("http");
const express=require("express");
const qs=require("querystring");
const mysql=require("mysql");
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"ptj",
    port:3306,
    connectionLimit:10
});
var app=express();
var server=http.createServer(app);
server.listen(8081);
app.use(express.static("public"));
app.post("/reg.do",(req,res)=>{
    req.on("data",(data)=>{
        var str=data.toString();
        var obj=qs.parse(str);
        var u=obj.uname;
        var p=obj.upwd;
        var h=obj.uphone;
        console.log("2:"+h);
        var a=obj.uattr;
        pool.getConnection((err,conn)=>{
            var sql="insert into user values(null,?,?,?,?)";
            conn.query(sql,[u,p,h,a],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.json({code: 1, "msg": "添加成功"});
                }else{
                    res.json({code: -1, "msg": "添加失败"});
                }
                conn.release();
            })
        })
    })
});
app.get("/testuname",(req,res)=>{
    var u=req.query.uname;
    pool.getConnection((err,conn)=>{
        var sql="select * from user where uname=?";
        conn.query(sql,[u],(err,result)=>{
            if(result.length<1){
                res.json({code:1,msg:"用户名输入正确"});
            }else{
                res.json({code:-1,msg:"*该用户名己被占用"});
            }
            conn.release();
        })
    })
});
app.post("/login.do",(req,res)=>{
    req.on("data",(data)=>{
        var str=data.toString();
        var obj=qs.parse(str);
        var u=obj.uname;
        var p=obj.upwd;
        pool.getConnection((err,conn)=>{
            var sql="select * from user where uname=? and upwd=?";
            conn.query(sql,[u,p],(err,result)=>{
                if(result.length<1){
                    res.json({code:-1,msg:"用户名或密码有误"});
                }else{

                    res.json({code:1,msg:"登陆成功",uid:result[0].uid});
                }
                conn.release();
            })
        })
    })
});
app.get("/uname",(req,res)=>{

    var u=req.query.uid;
    console.log(u);
    pool.getConnection((err,conn)=>{
        var sql="select * from user where uid=?";
        conn.query(sql,[u],(err,result)=>{
           res.json(result);
            conn.release();
        })
    })
});
app.get("/product",(req,res)=>{
    var start=1;
    pool.getConnection((err,conn)=>{
        var sql="select * from ptj_pdu limit ?,?";
        conn.query(sql,[start,10],(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
})
app.get('/getmore',(req,res)=>{
    pool.getConnection((err,conn)=>{
        var sql="select count(*) as c from ptj_pdu";
        conn.query(sql,(err,result)=>{
            var start=Math.ceil(result[0].c/10-1);
            var sq="select * from ptj_pdu limit ?,?";
            conn.query(sq,[start,result[0].c-10],(err,result)=>{
                res.json(result);
                conn.release();
            })

        })
    })
})
app.get("/detail",(req,res)=>{
    var pid=req.query.pid;
    pool.getConnection((err,conn)=>{
        var sql="select * from ptj_pdu where pid=?";
        conn.query(sql,[pid],(err,result)=>{
            res.json(result);
        })
    })
});
app.get("/addcart",(req,res)=>{
    var u=req.query.uid;
    var p=req.query.pid;
    pool.getConnection((err,conn)=>{
        var sql="select * from ptj_cart where pid=? and uid=?";
        conn.query(sql,[p,u],(err,result)=>{
            if(result.length<1){
                var sql="insert into ptj_cart values(null,?,?,1)";
                conn.query(sql,[p,u],(err,result)=>{
                    res.json({code:1,msg:"添加成功数量1"});
                    conn.release();
                })
            }else{
                var c = parseInt(result[0].count)+1;
                var sq="update ptj_cart set count=count+1 where pid=? and uid=?";
                conn.query(sq,[p,u],(err,result)=>{
                    res.json({code:1,msg:"添加成功"+c});
                    conn.release();
                })
            }
        })
    })
});
app.get("/getcart",(req,res)=>{
    var uid=req.query.uid;
    pool.getConnection((err,conn)=>{
        var sql="select c.cid,p.pname,p.price,p.pic,c.count from ptj_pdu p,ptj_cart c where";
        sql+=" p.pid=c.pid and c.uid=?";
        conn.query(sql,[uid],(err,result)=>{
            res.json(result);
            conn.release();
        })
    })
});
app.get("/delcart",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        var sql="delete from ptj_cart where cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(result.affectedRows>0){
                res.json({code:1,msg:"删除成功"});
            }else{
                res.json({code:-1,msg:"删除失败"});
            }
            conn.release();
        })
    })
});
app.get("/cart-sub",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        var sql="update ptj_cart set count=count-1 where cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(result.affectedRows>0){
                res.json({code:1,msg:"更新成功"});
            }else{
                res.json({code:-1,msg:"更新失败"});
            }
            conn.release();
        })
    })
});
app.get("/cart-add",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        var sql="update ptj_cart set count=count+1 where cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(result.affectedRows>0){
                res.json({code:1,msg:"更新成功"});
            }else{
                res.json({code:-1,msg:"更新失败"});
            }
            conn.release();
        })
    })
});


