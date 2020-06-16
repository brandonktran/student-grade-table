var header = document.getElementsByTagName('header')[0];
var form = document.getElementsByTagName('form')[0];
var gradeform = new GradeForm(form);
var pageheader = new PageHeader(header);
var gradetable = new GradeTable(table);
var app = new App(gradetable, pageheader, gradeform);
app.start();
