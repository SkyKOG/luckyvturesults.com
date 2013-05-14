var YQL = require('yql');
var $ = require('jquery');

var queryname = "select * from html where url='http://www.vtualerts.com/results/get_res.php?usn=1MV09IS002'";

new YQL.exec(queryname, function(response) {

	if (response.error) {
		console.log("Error: " + response.error.description);
	} 
	else {
        
        var studentname  = response.query.results.body.div.div[0].strong;
        var semester = response.query.results.body.div.div[0].table[0].tr.td[1].strong;
        var resultstatus = response.query.results.body.div.div[0].table[0].tr.td[3].p.strong;
        
        var studentusn = studentname.split('(')[1];
        studentusn = studentusn.split(')')[0];
        studentname = studentname.split('(')[0];
        resultstatus = resultstatus.substring(9);

        studentname = studentname.toProperCase();
        studentusn = studentusn.toUpperCase();
        resultstatus = resultstatus.toProperCase();
        
        console.log("Student Name : " + studentname);
        console.log("Student USN : " + studentusn);
        console.log("Semester : " + semester);
        console.log("Result : " + resultstatus);


        $.each(response.query.results.body.div.div[0].table[1].tr[0].td, function(i, item) {
                console.log(response.query.results.body.div.div[0].table[1].tr[0].td[i].p);
                    })


        var output = '';
            var k =  response.query.results.body.div.div[0].table[1].tr.length;
            for (var j=1; j<k; j++) {  
                for ( var i=0; i<=5; i++) {
                    for(key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                        if(typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].em === "undefined"){
                             continue;
                            }
                            output += response.query.results.body.div.div[0].table[1].tr[j].td[i].em + " " ;
                            break;
                         }
                    for(key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                        if(typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].p === "undefined"){
                             continue;
                            }
                            output += response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " ";
                            break;
                         }
                    for(key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                        if(typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].strong === "undefined"){
                             continue;
                             }
                            output += response.query.results.body.div.div[0].table[1].tr[j].td[i].strong + " ";
                            break;
                         }

                    }
                }
    
    }
    console.log(output);
});  

String.prototype.toProperCase = function() {
      return this.toLowerCase().replace(/^(.)|\s(.)/g, 
      function($1) { return $1.toUpperCase(); });
};
