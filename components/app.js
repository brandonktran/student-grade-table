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
		console.log(grades);
		this.gradeTable.updateGrades(grades);
		var avg = 0;
		for (var i = 0; i < grades.length; i++) {
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
		var submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Edit';
		currentID = id;
	}
	editGrade(name, course, grade) {
		var data;
		if (name && !course && !grade) {
			data = { "name": name };
		} else if (!name && course && !grade) {
			data = { "course": course };
		} else if (!name && !course && grade) {
			data = { "grade": grade };
		} else if (name && course && !grade) {
			data = { "name": name, "course": course };
		} else if (name && !course && grade) {
			data = { "name": name, "grade": grade };
		} else if (!name && course && grade) {
			data = { "course": course, "grade": grade };
		} else {
			data = { "name": name, "course": course, "grade": grade };
		}
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
		var submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Add';
	}
	handleReviseGradesSuccess() {
		var submit = document.querySelector('button[type="submit"]');
		submit.textContent = 'Add';
		this.getGrades();
	}
}
