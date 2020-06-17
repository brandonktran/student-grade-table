class GradeForm {
	constructor(formElement) {
		this.formElement = formElement;
		this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
	}
	onSubmit(createGrade, reviseGrade, editGrade) {
		this.createGrade = createGrade;
		this.reviseGrade = reviseGrade;
		this.editGrade = editGrade;
	}
	handleSubmit(event) {
		var submit = document.querySelector('button[type="submit"]');
		event.preventDefault();
		console.log('hi');
		var formdata = new FormData(event.target);
		var name = formdata.get('name');
		var course = formdata.get('course');
		var grade = formdata.get('grade');
		if (submit.textContent === 'Add') {
			this.createGrade(name, course, grade);
		} else if (submit.textContent === 'Edit') {
			this.editGrade(name, course, grade);
		}
		event.target.reset();
	}
}
