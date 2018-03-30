import _ from "lodash";
import "purecss";

import "react";
import "react-dom";

import "./main.css";
// import './mainLess.less';
// import './mainScss.scss';

import printMe from "./print.js";
import { cube } from "./math.js";
import component from "./component.js";

console.log(process.env.NODE_ENV, "-----------------");
if (process.env.NODE_ENV !== "production") {
	console.log("Looks like in development mode!");
}

// function component() {
//     // var element = document.createElement('div');

//     var btn = document.createElement('button');

//     var element = document.createElement('pre');

//     // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//     // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     element.innerHTML = [
//         'Hello webpack!',
//         '10cubed is equal to ' + cube(5)
//     ].join('\n\n');
//     element.classList.add('hello');

//     // let myIcon = new Image();
//     // myIcon.src = Icon;
//     // element.appendChild(myIcon);

//     // console.log(Data);

//     btn.innerHTML = 'Click me and check the console!';
//     btn.onclick = printMe;
//     element.appendChild(btn);
//     return element;
// }

// document.body.appendChild(component());
let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

// HMR interface
if (module.hot) {
	// Capture hot update
	module.hot.accept("./print.js", function() {
		console.log("Accepting the updated printMe module!");
		printMe();
		// document.body.removeChild(element);
		// element = component(); // Re-render the "component" to update the click handler
		// document.body.appendChild(element);
	});
}
