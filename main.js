var header = document.getElementsByTagName('header')[0];
var pageheader = new PageHeader(header);
var gradetable = new GradeTable(table);
var app = new App(gradetable, pageheader);
app.getGrades();
