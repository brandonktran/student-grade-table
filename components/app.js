var key = 'kdAPDHqi';

class App {
	constructor(gradeTable, pageHeader) {
		this.handleGetGradesError = this.handleGetGradesError.bind(this);
		this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
		this.gradeTable = gradeTable;
		this.pageHeader = pageHeader;
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
	}
}
