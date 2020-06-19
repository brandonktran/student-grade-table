const table = document.getElementsByTagName('table')[0];
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
		const body = table.querySelector('tbody');
		body.innerHTML = '';
		for (let i = 0; i < grades.length; i++) {
			const row = this.renderGradeRow(grades[i], this.deleteGrade, this.reviseGrade)
			body.append(row);
		}
	}
	onDeleteClick(deleteGrade) {
		this.deleteGrade = deleteGrade;
	}
	onEditClick(reviseGrade) {
		this.reviseGrade = reviseGrade;
	}
	renderGradeRow(data, deleteGrade, reviseGrade) {
		const row = document.createElement('tr');
		const name = document.createElement('td');
		name.textContent = data.name;
		row.append(name);
		const course = document.createElement('td');
		course.textContent = data.course;
		row.append(course);
		const grade = document.createElement('td');
		grade.textContent = data.grade;
		row.append(grade);
		const del = document.createElement('td');
		const button = document.createElement('button');
		button.textContent = 'Delete';
		button.addEventListener('click', () => {
			deleteGrade(data.id);
		});
		const button1 = document.createElement('button');
		button1.textContent = 'Edit';
		button1.addEventListener('click', () => {
			reviseGrade(data.id);
		});
		del.append(button);
		del.append(button1)
		row.append(del);
		return row;
	}
}
