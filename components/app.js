class App {
	constructor(gradeTable, pageHeader, gradeForm) {
		this.handleGetGradesError = this.handleGetGradesError.bind(this);
		this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
		this.gradeTable = gradeTable;
		this.pageHeader = pageHeader;
		this.gradeForm = gradeForm;
		this.createGrade = this.createGrade.bind(this);
		this.handleCreateGradesError = this.handleCreateGradesError.bind(this);
		this.handleCreateGradesSuccess = this.handleCreateGradesSuccess.bind(this);
		this.deleteGrade = this.deleteGrade.bind(this);
		this.handleDeleteGradesError = this.handleDeleteGradesError.bind(this);
		this.handleDeleteGradesSuccess = this.handleDeleteGradesSuccess.bind(this);
		this.reviseGrade = this.reviseGrade.bind(this);
		this.editGrade = this.editGrade.bind(this);
		this.handleReviseGradesError = this.handleReviseGradesError.bind(this);
		this.handleReviseGradesSuccess = this.handleReviseGradesSuccess.bind(this);
	}
	handleGetGradesError(error) {
		console.error(error);
	}
	handleGetGradesSuccess(grades) {
		currentData = grades;
		console.log(grades);
		this.gradeTable.updateGrades(grades);
		let avg = 0;
		for (let i = 0; i < grades.length; i++) {
			avg += grades[i].grade;
		}
		avg = avg / grades.length;
		this.pageHeader.updateAverage(avg);
	}
	getGrades() {
		$.ajax({
			method: 'GET',
			url: 'https://sgt.lfzprototypes.com/api/grades',
			headers: {
				'X-Access-Token': 'kdAPDHqi'
			},
			error: this.handleGetGradesError,
			success: this.handleGetGradesSuccess
		});
	}
	start() {
		this.getGrades();
		this.gradeForm.onSubmit(this.createGrade, this.reviseGrade, this.editGrade);
		this.gradeTable.onDeleteClick(this.deleteGrade);
		this.gradeTable.onEditClick(this.reviseGrade);
	}
	createGrade(name, course, grade) {
		$.ajax({
			method: 'POST',
			url: 'https://sgt.lfzprototypes.com/api/grades',
			data: {
				"name": name,
				"course": course,
				"grade": parseFloat(grade)
			},
			headers: {
				'X-Access-Token': 'kdAPDHqi'
			},
			error: this.handleCreateGradesError,
			success: this.handleCreateGradesSuccess
		});
	}
	handleCreateGradesError(error) {
		console.log(error);
	}
	handleCreateGradesSuccess() {
		this.getGrades();
	}
	deleteGrade(id) {
		$.ajax({
			method: 'DELETE',
			url: 'https://sgt.lfzprototypes.com/api/grades/' + id,
			headers: {
				'X-Access-Token': 'kdAPDHqi'
			},
			error: this.handleDeleteGradesError,
			success: this.handleDeleteGradesSuccess
		});
	}
	handleDeleteGradesError(error) {
		console.error(error);
	}
	handleDeleteGradesSuccess() {
		this.getGrades();
	}
	reviseGrade(id) {
		let tempindex = 0;
		for (let i = 0; i < currentData.length; i++) {
			if (currentData[i].id === id) {
				tempindex = i;
			}
		}
		document.getElementById('labelAdd').textContent = 'Update a Grade';
		document.querySelector('input[name="name"]').value = currentData[tempindex].name;
		document.querySelector('input[name="course"]').value = currentData[tempindex].course;
		document.querySelector('input[name="grade"]').value = currentData[tempindex].grade;
		const submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Update';
		currentID = id;
	}
	editGrade(name, course, grade) {
		const data = { "name": name, "course": course, "grade": grade };
		$.ajax({
			method: 'PATCH',
			url: 'https://sgt.lfzprototypes.com/api/grades/' + currentID,
			data: data,
			headers: {
				'X-Access-Token': 'kdAPDHqi'
			},
			error: this.handleReviseGradesError,
			success: this.handleReviseGradesSuccess
		});
	}
	handleReviseGradesError(error) {
		console.error(error);
		document.getElementById('labelAdd').textContent = 'Add a Grade';
		const submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Add';
	}
	handleReviseGradesSuccess() {
		document.getElementById('labelAdd').textContent = 'Add a Grade';
		const submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Add';
		this.getGrades();
	}
}
