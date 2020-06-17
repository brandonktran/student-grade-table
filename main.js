var header = document.getElementsByTagName('header')[0];
var form = document.getElementsByTagName('form')[0];
var p = document.getElementsByClassName('d-none')[0];
var currentID;
var gradeform = new GradeForm(form);
var pageheader = new PageHeader(header);
var gradetable = new GradeTable(table, p);
var app = new App(gradetable, pageheader, gradeform);
app.start();
