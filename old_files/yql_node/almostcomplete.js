var YQL = require('yql');
var $ = require('jquery');

var studentname;
var resultstatus;
var studentusn;
var subject_obj = {};
var semester;
var inputusn = "1MV09IS00";
var inputsem = 7;
var usninit = 9;

while (usninit <= 70) {
    inputusn = inputusn.concat(usninit);
    while (inputsem >= 1) {
var querybuild1 = "select * from html where url='http://www.vtualerts.com/results/get_res.php?usn=";
querybuild1 = querybuild1.concat(inputusn);
var querybuild2 = "&sem=";
var n = querybuild1.concat(querybuild2);

finalone = n.concat(inputsem);
finalone = finalone + "\'";

var queryname = finalone;

var json = {};

new YQL.exec(queryname, function (response) {

    if (response.error) {
        console.log("Error: " + response.error.description);
    } else {

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

        console.log("Student Name : " + studentname);
        console.log("Student USN : " + studentusn);
        console.log("Semester : " + semester);
        console.log("Result : " + resultstatus);

        json.usn = studentusn;
        json.Name = studentname;
        json.sem = semester;
        json.Status = resultstatus;

        /* $.each(response.query.results.body.div.div[0].table[1].tr[0].td, function(i, item) {
                console.log(response.query.results.body.div.div[0].table[1].tr[0].td[i].p);
                    }) */
        json.results = [];

        var output = '';

        var k = response.query.results.body.div.div[0].table[1].tr.length;

        for (var j = 1; j < k; j++) {

            for (var i = 0; i < 5; i++) {


                for (key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                    if (typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].em === "undefined") {
                        continue;
                    }

                    var result_obj = {};
                    result_obj.subjects = [];

                    output += "Subject : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].em + " " + "\n";

                    var subtext = response.query.results.body.div.div[0].table[1].tr[j].td[i].em + " " + "\n";
                    subject_obj.subject_name = subtext.replace(/[(].*[)]/, "").trim();

                    result_obj.subjects.push(subject_obj);

                    break;

                }


                for (key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                    if (typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].p === "undefined") {
                        continue;
                    }


                    if (i == 1) {
                        output += "External : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                        subject_obj.external = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                        result_obj.subjects.push(subject_obj);
                    }

                    if (i == 2) {
                        output += "Internal : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                        subject_obj.internal = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                        result_obj.subjects.push(subject_obj);
                    }


                    if (i == 3) {
                        output += "Total : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].p + " " + "\n";
                        subject_obj.total = response.query.results.body.div.div[0].table[1].tr[j].td[i].p;
                        result_obj.subjects.push(subject_obj);
                    }


                    break;
                }

                for (key in response.query.results.body.div.div[0].table[1].tr[j].td[i]) {
                    if (typeof response.query.results.body.div.div[0].table[1].tr[j].td[i].strong === "undefined") {
                        continue;
                    }

                    output += "Status : " + response.query.results.body.div.div[0].table[1].tr[j].td[i].strong + " " + "\n";
                    subject_obj.status = response.query.results.body.div.div[0].table[1].tr[j].td[i].strong;
                    result_obj.subjects.push(subject_obj);

                    break;
                        }

                    }
                    console.log(subject_obj);
                }


            }

            console.log(output);


        });
        

        inputsem--;
    }
    

    usninit++;
}

String.prototype.toProperCase = function () {
    return this.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
        return $1.toUpperCase();
    });
};