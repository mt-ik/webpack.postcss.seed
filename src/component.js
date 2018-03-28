export default (text = "Hello Xugy") => {
	const element = document.createElement("div");

	element.className = "pure-button";

	element.innerHTML = text;

	return element;
};
