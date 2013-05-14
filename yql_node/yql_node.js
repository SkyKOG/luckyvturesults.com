var YQL = require('yql');

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
	}
});  

String.prototype.toProperCase = function() {
      return this.toLowerCase().replace(/^(.)|\s(.)/g, 
      function($1) { return $1.toUpperCase(); });
};
