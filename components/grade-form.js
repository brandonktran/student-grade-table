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
		const submit = document.querySelector('button[type="submit"]');
		event.preventDefault();
		const formdata = new FormData(event.target);
		const name = formdata.get('name');
		const course = formdata.get('course');
		const grade = formdata.get('grade');
		if (submit.textContent === 'Add') {
			this.createGrade(name, course, grade);
		} else if (submit.textContent === 'Update') {
			this.editGrade(name, course, grade);
		}
		event.target.reset();
	}
}
