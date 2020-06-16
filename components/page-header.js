class PageHeader {
	constructor(headerElement) {
		this.headerElement = headerElement;
	}
	updateAverage(newAverage) {
		header.querySelector('.badge').textContent = newAverage;
		// console.log(newAverage);
	}
}
