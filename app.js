var YQL = require('yql');
var $ = require('jquery');

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    async = require('async');

var databaseUrl = "vtu"; // "username:password@example.com/mydb"
var collections = ["mongostuds"]
var db = require("mongojs").connect(databaseUrl, collections);    

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


app.get("/luckyvtu/:usnexpress", function (req, res) {
    var studentname;
    var resultstatus;
    var studentusn;
    var json = {};
    var semester;
    var inputusn = "1MV09IS00";
    var inputsem = 7;
    var usninit = req.params.usnexpress;
        inputusn = inputusn.concat(usninit);
        for(var counter=inputsem;inputsem>=1;inputsem--) 
        {
            var querybuild1 = "select * from html where url='http://www.vtualerts.com/results/get_res.php?usn=";
            querybuild1 = querybuild1.concat(inputusn);
            var querybuild2 = "&sem=";
            var n = querybuild1.concat(querybuild2);

            finalone = n.concat(inputsem);
            finalone = finalone + "\'";

            //var queryname = "select * from html where url='http://www.vtualerts.com/results/get_res.php?usn=1MV09IS001'";

            var queryname = finalone;

          

            new YQL.exec(queryname, function (response, callback) {

                if (response.error) {
                    console.log("Error: " + response.error.description);
                } 
                else 
                {

                    studentname = response.query.results.body.div.div[0].strong;
                    semester = response.query.results.body.div.div[0].table[0].tr.td[1].strong;
                    resultstatus = response.query.results.body.div.div[0].table[0].tr.td[3].p.strong;

                    studentusn = studentname.split('(')[1];
                    studentusn = studentusn.split(')')[0];
                    studentname = studentname.split('(')[0];
                    resultstatus = resultstatus.substring(9);

                    studentname = studentname.toProperCase();
                    studentusn = studentusn.toUpperCase();
                    resultstatus = resultstatus.toProperCase();

                    // console.log("Student Name : " + studentname);
                    // console.log("Student USN : " + studentusn);
                    // console.log("Semester : " + semester);
                    // console.log("Result : " + resultstatus);

                    json.usn = studentusn;
                    json.Name = studentname;
                     
                    //res.send([{usn:studentusn},{name:studentname}]);
                    /* $.each(response.query.results.body.div.div[0].table[1].tr[0].td, function(i, item) {
                    console.log(response.query.results.body.div.div[0].table[1].tr[0].td[i].p);
                    }) */
                    json.overall = [];
                    var overall_obj = {};
                    
                    overall_obj.sem = semester;
                    overall_obj.Status = resultstatus;

                    json.overall.push(overall_obj);
                    overall_obj.results = [];


                    var output = '';

                    var k = response.query.results.body.div.div[0].table[1].tr.length;

                    for (var j = 1; j < k; j++) {
                        
                        
                        var result_obj = {};
                        for (var i = 0; i <5; i++) {

                            if (i === 0) {
                                output += "Subject : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].em + " " + "\n";
                                var subtext = response.query.results.body.div.div[0].table[1].tr[j].td[i].em + " " + "\n";
                                result_obj.subject_name = subtext.replace(/[(].*[)]/, "").trim();
                                
                            }

                            if (i == 1) {
                                output += "External : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                                result_obj.external = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                                
                            }

                            if (i == 2) {
                                output += "Internal : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                                result_obj.internal = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                                
                            }

                            if (i == 3) {
                                output += "Total : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                                result_obj.total = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                                
                            }

                            if (i === 4) {
                                output += "Status : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].strong + " " + "\n";
                                result_obj.status = response.query.results.body.div.div[0].table[1].tr[j].td[i].strong;
                                
                            }                              
                           
                        }                        
                          overall_obj.results.push(result_obj);
                    }  

                    var newjson = JSON.stringify(json);

                    console.log(newjson);

                    db.mongostuds.save(newjson, function(err, saved) {
                      if( err || !saved ) console.log("User not saved");
                      else console.log("Record saved");
                    }); 

                    //console.log(output);
                    res.send(studentname+studentusn);
                }
            });
        }

    String.prototype.toProperCase = function () {
        return this.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
            return $1.toUpperCase();
        });
    };
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
