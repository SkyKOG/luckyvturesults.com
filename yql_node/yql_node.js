var YQL = require('yql');

var queryname = "select * from html where url='http://www.vtualerts.com/results/get_res.php?usn=1MV09IS002'";

new YQL.exec(queryname, function(response) {

	if (response.error) {
		console.log("Error: " + response.error.description);
	} 
	else {
        
        var studentname  = response.query.results.body.div.div[0].strong;
        console.log("Student Name : " + studentname);

        var semester = response.query.results.body.div.div[0].table[0].tr.td[1].strong;
        console.log("Semester : " + semester);

        var resultstatus = response.query.results.body.div.div[0].table[0].tr.td[3].p.strong;
        console.log(resultstatus);
	}
});  
