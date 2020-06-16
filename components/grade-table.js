var table = document.getElementsByTagName('table')[0];
class GradeTable {
	constructor(tableElement) {
		this.tableElement = tableElement;
	}
	updateGrades(grades) {
		var body = table.querySelector('tbody');
		body.innerHTML = '';
		for (var i = 0; i < grades.length; i++) {
			var row = document.createElement('tr');
			var name = document.createElement('td');
			name.textContent = grades[i].name;
			row.append(name);
			var course = document.createElement('td');
			course.textContent = grades[i].course;
			row.append(course);
			var grade = document.createElement('td');
			grade.textContent = grades[i].grade;
			row.append(grade);
			body.append(row);
		}
	}
}
