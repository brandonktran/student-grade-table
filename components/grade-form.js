class GradeForm {
	constructor(formElement) {
		this.formElement = formElement;
		this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
	}
	onSubmit(createGrade) {
		this.createGrade = createGrade;
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log('hi');
		var formdata = new FormData(event.target);
		var name = formdata.get('name');
		var course = formdata.get('course');
		var grade = formdata.get('grade');
		this.createGrade(name, course, grade);
		event.target.reset();
	}
}
