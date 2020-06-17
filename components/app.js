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
	}
	handleGetGradesError(error) {
		console.error(error);
	}
	handleGetGradesSuccess(grades) {
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
		this.gradeForm.onSubmit(this.createGrade);
		this.gradeTable.onDeleteClick(this.deleteGrade);
	}
	createGrade(name, course, grade) {
		console.log(typeof grade);
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
		console.log(id);
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
}
