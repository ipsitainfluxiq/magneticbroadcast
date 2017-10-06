/**
 * Created by kta pc on 7/18/2017.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 3005;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
//var mzsadielink='http://mzsadie.influxiq.com/#/';
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));

var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
emitter.setMaxListeners(0)


var multer  = require('multer');
var datetimestamp='';
var filename='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        cb(null, '../src/assets/images/uploads/');
      //  cb(null, '../assets/images/uploads/'); //for server
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log('file.originalname'+file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        // console.log(filename);
        cb(null, filename);
    }
});



var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.json(filename);


    });
});


var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/magneticbroadcast';

var MongoClient = mongodb.MongoClient;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;

    }});

var multer1  = require('multer');
var datetimestamp1='';
var filename1='';
var storage1 = multer1.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        cb(null, '../src/assets/images/newsimageuploads/');
    },
    filename: function (req, file, cb) {
        //console.log(cb);
        console.log('file.originalname------ '+file.originalname);
        filename1=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        console.log('filename---------- '+filename);
        cb(null, filename1);
    }
});

var upload1 = multer1({ //multer settings
    storage: storage1
}).single('file');

app.post('/newsuploads', function(req, res) {
    console.log('newsuploads');
    datetimestamp = Date.now();
    upload1(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.json(filename1);
        console.log('filename1'+filename1);

    });
});
/*-----------------------------------EXAMPLES_START------------------------------------------*/
app.get('/addpeople',function(req,resp){

    var collection = db.collection('information');
    collection.insert([{
        firstname: "Ipsita",
        lastname: "Ghosal",
        email: "ips@gmail.com",
    }], function (err, result) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify(result));
        }
    });
});


app.get('/update',function (req,resp) {

    var collection = db.collection('information');
    collection.update({firstname: 'Ipsita'}, {$set: {

        firstname: "Ipsitayyyyy",
        lastname: "Ghosal",
        email: "ips@gmail.com",
        addnew: "newly_added_after_update"

    }},function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
            //db.close();

        }
    });

});
app.get('/addnewcolumnpeople',function(req,resp){

    var collection = db.collection('information');
    collection.insert([{
        firstname: "Ipsita",
        lastname: "Ghosal",
        email: "ips@gmail.com",
        add2: "added_successfully",
    }], function (err, result) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify(result));
        }
    });
});
app.get('/peoplelist', function (req, resp) {
    var collection = db.collection('information');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});
/*-----------------------------------EXAMPLES_END------------------------------------------*/


/*--------------------------------------ADMIN_START--------------------------------------------*/

app.post('/addadmin',function(req,resp){
    console.log('call');
    var collection = db.collection('admin');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        type:1,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/adminlist',function (req,resp) {

    var collection = db.collection('admin');

    collection.find({type:1}).toArray(function(err, items) {
        //  collection.drop(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }

    });

});



app.post('/details',function(req,resp){        // this is for editadmin page
    console.log("details from server.js called");
    var resitem = {};
    var collection = db.collection('admin');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});


app.post('/editadmin',function(req,resp){
    var collection = db.collection('admin');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.post('/deleteadmin', function (req, resp) {

    var o_id = new mongodb.ObjectID(req.body.id);

    var collection = db.collection('admin');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
            //   db.close();
        }
    });
});

/*--------------------------------------Dealership_START--------------------------------------------*/

app.post('/adddealership',function(req,resp){
    var collection = db.collection('admin');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        image: req.body.image,
        link: req.body.link,
        type:2,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});


app.get('/dealershiplist',function (req,resp) {
    var collection = db.collection('admin');
    collection.find({type:2}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });

});


app.post('/deletedealer', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('admin');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});

app.post('/detailsofdealer',function(req,resp){        // this is for editdealer page
    console.log("details from server.js called");
    var resitem = {};
    var collection = db.collection('admin');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editdealer',function(req,resp){
    console.log('editdealer');
    var collection = db.collection('admin');
    var o_id = new mongodb.ObjectID(req.body.id);
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        link: req.body.link,
        image: req.body.image,
    }
    console.log(data);
    console.log(o_id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});
/*--------------------------------------Post_Category_START--------------------------------------------*/


app.post('/addpost',function(req,resp){
    var collection = db.collection('postcategory');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});



app.post('/details1',function(req,resp){   // this is for edit post category page
    var resitem = {};
    var collection = db.collection('postcategory');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });

});



app.post('/editpostcategory',function(req,resp){
    var collection = db.collection('postcategory');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/postcategorylist',function (req,resp) {
    var collection = db.collection('postcategory');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


app.post('/deletepostcategory', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('postcategory');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});




app.post('/postcategorymanagement',function(req,resp){
    var collection = db.collection('postcategorymanagement');
    var o_id_postlist = new mongodb.ObjectID(req.body.postlist);

    collection.insert([{
        title: req.body.title,
        postlist: o_id_postlist,
        content: req.body.content,
        link: req.body.link,
        priority: req.body.priority,
        status: req.body.status,
        image: req.body.image,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.post('/detailsformanagement',function(req,resp){   // this is for edit post category page
    var resitem = {};
    var collection = db.collection('postcategorymanagement');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });

});

app.post('/editpostmanagement',function(req,resp){
    console.log('editpostmanagement');
    var collection = db.collection('postcategorymanagement');
    var o_id = new mongodb.ObjectID(req.body.id);
    var o_id_postlist = new mongodb.ObjectID(req.body.postlist);
    var data = {
        title: req.body.title,
        postlist: o_id_postlist,
        content: req.body.content,
        link: req.body.link,
        priority: req.body.priority,
        status: req.body.status,
        image: req.body.image,
    }
    console.log(data);
    console.log(o_id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});


app.post('/deletepostmanagement', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('postcategorymanagement');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
        }
    });
});




/*app.get('/postmanagementlist',function (req,resp) {
 var collection = db.collection('postcategorymanagement');
 collection.find().toArray(function(err, items) {
 if (err) {
 console.log(err);
 resp.send(JSON.stringify({'res':[]}));
 } else {
 resp.send(JSON.stringify({'res':items}));
 }
 });
 });*/

app.post('/subscribedposts', function (req, resp) {
    var logid = new mongodb.ObjectID(req.query.loginid);
    console.log(logid);
    var collection1 = db.collection('subscribe');
    var collection = db.collection('subscribe').aggregate([
     /*   { "$match": { "logid": logid } },*/

        {
            $lookup: {
                from: "postcategorymanagement",
                localField: "categoryid",   // localfield of subscribe
                foreignField: "postlist",   //localfield of postcategorymanagement
                as: "PostManegementdata"
            }
        },
    /*    { "$unwind": "$PostManegementdata" },*/

    ]);


    collection.toArray(function (err, items) {
         console.log(items);
        resp.send(JSON.stringify(items));
    });

});

app.get('/postmanagementlist', function (req, resp) {
    var collection1 = db.collection('postcategorymanagement');
    var collection = db.collection('postcategorymanagement').aggregate([

        {
            $lookup: {
                from: "postcategory",
                localField: "postlist",   // localfield of postcategorymanagement
                foreignField: "_id",   //localfield of postcategory
                as: "PostManegementdata"
            }
        },
        { "$unwind": "$PostManegementdata" },

    ]);


    collection.toArray(function (err, items) {
        // console.log(items);
        resp.send(JSON.stringify(items));
    });

});


app.get('/getcategorylist', function (req, resp) {
    var collection1 = db.collection('postcategory');
    var collection = db.collection('postcategory').aggregate([

        {
            $lookup: {
                from: "postcategorymanagement",
                localField: "_id",
                foreignField: "postlist",
                as: "Postcategorydetail"
            }
        },
    ]);


    collection.toArray(function (err, items) {
        // console.log(items);
        resp.send(JSON.stringify(items));
    });

});

app.get('/getcategorylist_subscribedornot', function (req, resp) {
   // console.log('hi');
    var collection1 = db.collection('postcategory');
    var collection = db.collection('postcategory').aggregate([

        {
            $lookup: {
                from: "postcategorymanagement",
                localField: "_id",
                foreignField: "postlist",
                as: "Postcategorydetail"
            }
        },

        {
            $lookup: {
                from: "subscribe",
                localField: "_id",   // localfield of postcategory
                foreignField: "categoryid",   //localfield of subscribe
                as: "Subsdata"
            }
        },
    ]);

    collection.toArray(function (err, items) {
        // console.log(items);
        resp.send(JSON.stringify(items));
    });

});


/*app.get('/subscribedornot', function (req, resp) {
    var log_id = new mongodb.ObjectID(req.query.id);
    var collection1 = db.collection('postcategory');
    var collection = db.collection('postcategory').aggregate([
        //{ "$unwind": "$Subsdata" },
        //{$match:{"Subsdata.logid":log_id}},
        {
            $lookup: {
                from: "subscribe",
                localField: "_id",   // localfield of postcategory
                foreignField: "categoryid",   //localfield of subscribe
                as: "Subsdata"
            }
        },
         //{$match:{"Subsdata.logid":log_id}},

    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify(items));
    });
});*/
/*--------------------------------------Twitter_Call_START--------------------------------------------*/
app.get('/leadlist',function (req,resp) {

    var collection = db.collection('lead');

    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }

    });

});

app.get('/twitter',function(req,resp){
    console.log('twitter called..');
    var collection = db.collection('usersocialdata');
    var logid = new mongodb.ObjectID(req.query.logid);
    console.log('login id is    ' + logid);
    collection.find({loginid:logid}).toArray(function(err, items) {
        console.log('item  '+ items.length);
        if(items.length==0){
            console.log('so new input');
            collection.insert([{
                oauth_token: req.query.oauth_token,
                oauth_token_secret: req.query.oauth_token_secret,
                loginid: logid,
            }], function (err, result) {
                if (err) {
                    console.log('this is in error block');
                    resp.send(JSON.stringify({'status':'error'}));
                } else {
                    console.log('inserted successfully');
                    resp.send(JSON.stringify(result));
                }
            });
        }
        if(items.length>0) {
            var data = {
                oauth_token: req.query.oauth_token,
                oauth_token_secret: req.query.oauth_token_secret,
            }
            console.log('updated');
            collection.update({loginid:logid}, {$set: data}, true, true);
            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
            resp.send(JSON.stringify(items));
        }
    });
});


app.get('/tumblr',function(req,resp){
    console.log('tumblr called..');
    var collection = db.collection('usersocialdata');
    var logid = new mongodb.ObjectID(req.query.logid);
    console.log('login id is    ' + logid);
    collection.find({loginid:logid}).toArray(function(err, items) {
        console.log('item  '+ items.length);
        if(items.length==0){
            console.log('so new input');
            collection.insert([{
                tumblr_oauth_token: req.query.oauth_token,
                tumblr_oauth_token_secret: req.query.oauth_token_secret,
                loginid: logid,
            }], function (err, result) {
                if (err) {
                    console.log('this is in error block');
                    resp.send(JSON.stringify({'status':'error'}));
                } else {
                    console.log('inserted successfully');
                    resp.send(JSON.stringify(result));
                }
            });
        }
        if(items.length>0) {
            var data = {
                tumblr_oauth_token: req.query.oauth_token,
                tumblr_oauth_token_secret: req.query.oauth_token_secret,
            }
            console.log('updated');
            collection.update({loginid:logid}, {$set: data}, true, true);
            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
            resp.send(JSON.stringify(items));
        }
    });
});




app.get('/linkedin',function(req,resp){
    console.log('linkedin called..');
    var collection = db.collection('usersocialdata');
    console.log(req.query.logid);
    var logid = new mongodb.ObjectID(req.query.logid);
    var req_value = req.query.req_value;
    var access_value = req.query.access_value;


    console.log('login id is    ' + logid);
    console.log('req_value id is    ' + req_value);
    var res = req_value.split("||");
    var access = access_value.split("||");

    var link_req_oauth_token = res[0];
    var link_req_oauth_token_secret = res[1];
    var link_oauth_verifier = res[2];
    var link_access_oauth_token = access[0];
    var link_access_oauth_token_secret = access[1];
    var link_access_oauth_expires_in = access[2];



    collection.find({loginid:logid}).toArray(function(err, items) {
        console.log('item  '+ items.length);
        if(items.length==0){
            console.log('so new input');
            collection.insert([{

                link_req_oauth_token: link_req_oauth_token,
                link_req_oauth_token_secret: link_req_oauth_token_secret,
                link_oauth_verifier: link_oauth_verifier,
                link_access_oauth_token: link_access_oauth_token,
                link_access_oauth_token_secret: link_access_oauth_token_secret,
                link_access_oauth_expires_in: link_access_oauth_expires_in,
                loginid: logid,
            }], function (err, result) {
                if (err) {
                    console.log('this is in error block');
                    resp.send(JSON.stringify({'status':'error'}));
                } else {
                    console.log('inserted successfully');
                    resp.send(JSON.stringify(result));
                }
            });
        }
        if(items.length>0) {
            var data = {
                link_req_oauth_token: link_req_oauth_token,
                link_req_oauth_token_secret: link_req_oauth_token_secret,
                link_oauth_verifier: link_oauth_verifier,
                link_access_oauth_token: link_access_oauth_token,
                link_access_oauth_token_secret: link_access_oauth_token_secret,
                link_access_oauth_expires_in: link_access_oauth_expires_in,
            }
            console.log('updated');
            collection.update({loginid:logid}, {$set: data}, true, true);
            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
            resp.send(JSON.stringify(items));
        }
    });
});


app.get('/linkedinmain',function(req,resp){
    console.log('linkedinmain called..');
    var collection = db.collection('usersocialdata');
    console.log(req.query.logid);
    var logid = new mongodb.ObjectID(req.query.logid);

    collection.find({loginid:logid}).toArray(function(err, items) {
        console.log('item  '+ items.length);
        if(items.length==0){
            console.log('so new input');
            collection.insert([{
                link_oauth_token: req.query.oauth_token,
                link_oauth_token_secret: req.query.oauth_token_secret,
                loginid: logid,
            }], function (err, result) {
                if (err) {
                    console.log('this is in error block');
                    resp.send(JSON.stringify({'status':'error'}));
                } else {
                    console.log('inserted successfully');
                    resp.send(JSON.stringify(result));
                }
            });
        }
        if(items.length>0) {
            var data = {
                link_oauth_token: req.query.oauth_token,
                link_oauth_token_secret: req.query.oauth_token_secret,
            }
            console.log('updated');
            collection.update({loginid:logid}, {$set: data}, true, true);
            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
            resp.send(JSON.stringify(items));
        }
    });
});
/*--------------------------------------Call_START--------------------------------------------*/

app.post('/fbcall',function(req,resp){
    var token = req.body.token;
    var client_id = req.body.client_id;
    var client_secret = req.body.client_secret;
    var userid = req.body.userid;
    var loginid = new mongodb.ObjectID(req.body.loginid);


    var graph_url = "https://graph.facebook.com/oauth/access_token?client_id="+client_id+"&client_secret="+client_secret+"&grant_type=fb_exchange_token&fb_exchange_token="+token;
    request( graph_url, function(error2, response, html2){
        console.log('callllllllllllllllllllllllllllllllllllllllll.');
        if(!error2) {
            console.log('html2----------------');
            html2 = JSON.parse(html2); // these are the long access tokens
            var collection = db.collection('usersocialdata');
            collection.find({loginid:loginid}).toArray(function(err, items) {
                if (items.length==0) {
                    collection.insert([{
                        long_access_token: html2.access_token,
                        expires_in: html2.expires_in,
                        app_id: client_id,
                        loginid: loginid,
                        userid: userid,


                    }], function (err, result) {
                        if (err) {
                            console.log('error'+err);
                            resp.send(JSON.stringify({'status':'error'}));
                        } else {
                            console.log(result);
                            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id,htmlval:html2}));
                        }
                    });
                }  if (items.length>0) {
                    var data = {
                        long_access_token: html2.access_token,
                        expires_in: html2.expires_in,
                        app_id: client_id,
                        userid: userid,
                    }
                    collection.update({loginid:loginid}, {$set: data}, true, true);
                    //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id,htmlval:html2}));
                    resp.send(JSON.stringify({'status':'success','htmlval':html2}));
                }
            });
        }
    });
});

app.post('/socialmedialist',function (req,resp) {
    //  console.log('socialmedialist');
    var collection = db.collection('usersocialdata');
    var id = new mongodb.ObjectID(req.body.id);
    collection.find({loginid:id}).toArray(function(err, items) {
        //  collection.drop(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            //console.log(id);
            //console.log(items);
            resp.send(JSON.stringify(items[0]));
        }
    });
});
/*--------------------------------------Call_END--------------------------------------------*/

app.post('/leadnumbers', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    console.log(o_id);
    var collection = db.collection('lead');
    collection.find({parentid: o_id}).toArray(function(err, items) {
          console.log(JSON.stringify(items));
        resp.send(JSON.stringify(items));
    });
});

app.post('/subscribernumbers', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    console.log('?');
    console.log(o_id);
    var collection = db.collection('subscribe');
    collection.find({logid: o_id}).toArray(function(err, items) {
        // console.log(JSON.stringify(items));
        resp.send(JSON.stringify(items));
    });
});
/*--------------------------------------Leadpage_Start--------------------------------------------*/
app.post('/lead',function(req,resp){
    console.log('call lead');
    var collection = db.collection('lead');
    collection.insert([{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        zip: req.body.zip,
        parentid: req.body.parentid,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

/*--------------------------------------Leadpage_End--------------------------------------------*/


/*--------------------------------------Common_START--------------------------------------------*/
app.post('/callsubscribe',function(req,resp){
    console.log('call callsubscribe');
    var collection = db.collection('subscribe');
    var o_id = new mongodb.ObjectID(req.body.logid);
    var o_category = new mongodb.ObjectID(req.body.categoryid);
    collection.insert([{
        logid: o_id,
        categoryid: o_category,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
           // console.log(result);
            console.log('call calltonewdb');
            calltonewdb(o_id, o_category);
           // resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

function calltonewdb(o_id,o_category){
    console.log('called calltonewdb');
    console.log(o_category);
    console.log(o_id);
    var collection = db.collection('postcategorymanagement');
    collection.find({postlist:o_category}).toArray(function(err, items) {
        if (err) {
            console.log('err');
            console.log(err);
           // resp.send(JSON.stringify({'res':[]}));
        } else {
          //  console.log(items);
          //  console.log(items[0].content);

            var collection1 = db.collection('broadcast');
            for(eachval in items){
              //  console.log('eachval');
              //  console.log(items[eachval].content);
               // console.log(' ');
                collection1.insert([{
                    logid: o_id,
                    categoryid: o_category,
                    postid: items[eachval]._id,
                    status: 0,
                }], function (err, result) {
                    if (err) {
                        console.log('error'+err);
                      //  resp.send(JSON.stringify({'status':'error'}));
                    } else {
                        // console.log(result);
                       // calltonewdb(o_id);
                        // resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                    }
                });
            }
        }

    });
}
app.post('/callunsubscribe', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.logid);
    var category_id = new mongodb.ObjectID(req.body.categoryid);
    var collection = db.collection('subscribe');
    console.log(o_id);
    console.log(category_id);
    collection.deleteOne(
        { logid : o_id, categoryid : category_id }
    );
    var collection1 = db.collection('broadcast');
    collection1.remove(
        { logid : o_id, categoryid : category_id }
    );
   /* collection.deleteOne([{
        logid: o_id,
        categoryid: category_id,
    }],function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
            //   db.close();
        }
    });*/
});

app.get('/broadcastposts', function (req, resp) {
    //   var collection = db.collection('broadcast').distinct('logid');
 //   db.collection('broadcast').distinct('logid');
    var collection = db.collection('broadcast').aggregate([
        // collection.aggregate([
        { "$match": { "status": 0 } },

        {
            $lookup: {
                from: "postcategorymanagement",
                localField: "postid",   // localfield of broadcast
                foreignField: "_id",   //localfield of postcategorymanagement
                as: "BroadcastManegement"
            }
        },
        { "$unwind": "$BroadcastManegement" },

    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify(items));
    });

});


app.post('/login', function (req, resp) {
    console.log('callloginnn');
    console.log(req.body.email);
    console.log(req.body.password);
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var collection = db.collection('admin');
    collection.find({ email:req.body.email }).toArray(function(err, items){
        console.log('items[0]');
        console.log(items[0]); //admin_login details shown here
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Username invalid...'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        /* if(items.length>0 && items[0].status!=1){
         resp.send(JSON.stringify({'status':'error','msg':'You are Blocked..'}));
         return;
         }*/
        if(items.length>0 && items[0].password==hash){
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
            return;
        }
    });
});

app.post('/changepassword', function (req, resp) {
    console.log('has-error');
    var cryptoold = require('crypto');
    var secretold = req.body.oldpassword;
    var hashold = cryptoold.createHmac('sha256', secretold)
        .update('password')
        .digest('hex');


    var cryptonew = require('crypto');
    var secretnew = req.body.password;
    var hashnew = cryptonew.createHmac('sha256', secretnew)
        .update('password')
        .digest('hex');
    var data = {
        password: hashnew
    }

    var collection = db.collection('admin');
    var logid = new mongodb.ObjectID(req.body.logid);

    collection.find({_id: logid, password: hashold}).toArray(function (err, items) {

        if(items.length==0) {
            resp.send(JSON.stringify({'status': 'error', 'msg': 'Old password doesnot match'}));
            return;
        }
        else {
            collection.update({_id: logid}, {$set: data}, true, true);
            resp.send(JSON.stringify({'status': 'success', 'msg':items[0]}));
        }
    });
});

app.post('/forgetpassword', function (req, resp) {
    console.log('forgt pass');
    var collection = db.collection('admin');
    collection.find({ email:req.body.email }).toArray(function(err, items) {
        if(items.length>0){
            var randomstring = require("randomstring");
            var generatedcode=randomstring.generate();
            var data = {
                accesscode: generatedcode,
            }
            collection.update({ email:req.body.email}, {$set: data}, true, true);
            var smtpTransport = mailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });
            var mail = {
                from: "Admin <ipsitaghosal1@gmail.com>",
                  to: req.body.email,
                // to: 'ipsita.influxiq@gmail.com',
                subject: 'Access code',
                html: 'Access code is given -->  '+generatedcode
            }
            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
        }
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Emailid invalid...'}));
            return;
        }
    });
});


app.post('/accesscodecheck', function (req, resp) {
    var collection = db.collection('admin');
    var logid = new mongodb.ObjectID(req.body.logid);
    collection.find({ _id:logid, accesscode:req.body.accesscode}).toArray(function(err, items) {
        console.log(items.length);
        if(items.length>0) {
            resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
        }
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Wrong access code'}));
            return;
        }
    });
});

app.post('/newpassword', function (req, resp) {
    var collection = db.collection('admin');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var data = {
        password: hash
    }
    var logid = new mongodb.ObjectID(req.body.logid);
    collection.update({_id:logid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status': 'success', 'msg':''}));
});
/*--------------------------------------Common_END--------------------------------------------*/









app.get('/showsubscribe', function(req,resp){
    var collection = db.collection('subscribe');
    collection.find().toArray(function(err,items){
        if(err){
            console.log(err);
            resp.send(JSON.stringify());
        } else{
            resp.send(JSON.stringify(items));
        }
    });
});

app.get('/showcontact', function(req,resp){
    var collection = db.collection('contactus');
    collection.find().toArray(function(err,items){
        if(err){
            console.log(err);
            resp.send(JSON.stringify());
        } else{
            resp.send(JSON.stringify(items));
        }
    });
});


/*--------------------------------------ADMIN_END--------------------------------------------*/

/*--------------------------------------MANAGER_START--------------------------------------------*/


app.post('/addmanager',function(req,resp){
    console.log('call addmanager');
    var collection = db.collection('addmanager');
    collection.insert([{
        name: req.body.name,
        image: req.body.image,
        link: req.body.link,
        priority: req.body.priority,
        status: req.body.status,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});


app.get('/managerlist',function (req,resp) {

    var collection = db.collection('addmanager');

    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }

    });

});

app.post('/deleteimage', function (req, resp) {
    if (req.body.id != ''){
        var o_id = new mongodb.ObjectID(req.body.id);
        var collection = db.collection('addmanager');
        var data = {
            image: ''
        }
        collection.update({_id: o_id}, {$set: data}, true, true);
    }

    var fs = require('fs');
    // var filePath = "/home/influxiq/public_html/projects/mzsadie/uploads/" +req.body.image;
    var filePath = "../src/assets/images/uploads/" +req.body.image; // Path set //
 //   var filePath = "../assets/images/uploads/" +req.body.image; // Path set //
    console.log('filepath is  ' +filePath);
    fs.unlinkSync(filePath);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));

});

app.post('/managerdetails',function(req,resp){
    var resitem = {};
    var collection = db.collection('addmanager');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {

        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editmanager',function(req,resp){
    var collection = db.collection('addmanager');
    var data = {
        name: req.body.name,
        image: req.body.image,
        link: req.body.link,
        priority:req.body.priority,
        status:req.body.status,
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});





app.post('/deletemanager', function (req, resp) {

    var o_id = new mongodb.ObjectID(req.body.id);

    var collection = db.collection('addmanager');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
            //   db.close();
        }
    });
});
/*--------------------------------------MANAGER_END--------------------------------------------*/
/*--------------------------------------News_START--------------------------------------------*/
app.post('/addnews',function(req,resp){
    console.log('call addnews');
    var collection = db.collection('addnews');
    collection.insert([{
        name: req.body.name,
        image: req.body.image,
        details: req.body.details,
        date: req.body.date,
        priority: req.body.priority,
        status: req.body.status,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.post('/deleteimagefromnews', function (req, resp) {
    if (req.body.id != ''){
        var o_id = new mongodb.ObjectID(req.body.id);
        var collection = db.collection('addnews');
        var data = {
            image: ''
        }
        collection.update({_id: o_id}, {$set: data}, true, true);
    }

    var fs = require('fs');
    var filePath1 = "../src/assets/images/newsimageuploads/" +req.body.image; // Path set //
    console.log('filepath is  ' +filePath1);
    fs.unlinkSync(filePath1);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));

});

app.get('/newslist',function (req,resp) {
    var collection = db.collection('addnews');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});

app.post('/deletenews', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('addnews');
    collection.deleteOne({_id: o_id}, function(err, results) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send("success");
            //   db.close();
        }
    });
});

app.post('/newsdetails',function(req,resp){
    var resitem = {};
    var collection = db.collection('addnews');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {

        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.post('/editnews',function(req,resp){
    var collection = db.collection('addnews');
    var data = {
        name: req.body.name,
        image: req.body.image,
        details: req.body.details,
        date: req.body.date,
        priority: req.body.priority,
        status: req.body.status,
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});

app.post('/deleteimagefornews', function (req, resp) {
    if (req.body.id != ''){
        var o_id = new mongodb.ObjectID(req.body.id);
        var collection = db.collection('addnews');
        var data = {
            image: ''
        }
        collection.update({_id: o_id}, {$set: data}, true, true);
    }

    var fs = require('fs');
    var filePath = "../src/assets/images/newsimageuploads/" +req.body.image; // Path set //
    console.log('filepath is  ' +filePath);
    fs.unlinkSync(filePath);
    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));

});
/*--------------------------------------News_END--------------------------------------------*/
/*--------------------------------------USER_START--------------------------------------------*/

app.post('/subscribe', function(req, resp){
    var collection = db.collection('subscribe');
    collection.insert([{
        name: req.body.name,
        dealership: req.body.dealership,
        state: req.body.state,
        city: req.body.city,
        email: req.body.email,
    }], function (err, result) {
        if(err){
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.post('/contactus', function(req, resp){
    var collection = db.collection('contactus');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    }], function (err, result) {
        if(err){
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});


/*--------------------------------------USER_END--------------------------------------------*/





var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    //  console.log("Example app listening at http://%s:%s", host, port)

})