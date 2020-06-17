var table = document.getElementsByTagName('table')[0];
class GradeTable {
	constructor(tableElement, noGradesElement) {
		this.tableElement = tableElement;
		this.noGradesElement = noGradesElement;
	}
	updateGrades(grades) {
		if (grades.length === 0) {
			document.getElementsByClassName('d-none')[0].classList.remove('d-none');
		} else {
			document.getElementsByClassName('d-none')[0].classList = 'd-none';
		}
		var body = table.querySelector('tbody');
		body.innerHTML = '';
		for (var i = 0; i < grades.length; i++) {
			var row = this.renderGradeRow(grades[i], this.deleteGradee)
			body.append(row);
		}
	}
	onDeleteClick(deleteGrade) {
		this.deleteGradee = deleteGrade;
	}
	renderGradeRow(data, deleteGrade) {
		var row = document.createElement('tr');
		var name = document.createElement('td');
		name.textContent = data.name;
		row.append(name);
		var course = document.createElement('td');
		course.textContent = data.course;
		row.append(course);
		var grade = document.createElement('td');
		grade.textContent = data.grade;
		row.append(grade);
		var del = document.createElement('td');
		var button = document.createElement('button');
		button.textContent = 'Delete';
		button.addEventListener('click', function () {
			deleteGrade(data.id);
		});
		del.append(button);
		row.append(del);
		return row;
	}
}
