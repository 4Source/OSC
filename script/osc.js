function _styleToNumber(style) { try {
	if(style != null) {
		return parseFloat(style.slice(0, -2));
	}
	else { return null; }
}
catch (e) {
    throw Error(e);
    return null;
} }
function onClickHandler(elmnt, value) {
	if(elmnt.className.includes("nav") && (elmnt.className.includes("prev") || elmnt.className.includes("next"))) {
		var itemsElmnt = document.querySelector("#" + elmnt.parentElement.children.item(0).children.item(0).id);
		plusSlide(itemsElmnt, parseInt(value));
	}
	else if(elmnt.className.includes("nav") && elmnt.className.includes("dot")) {
		
	}
}
function init(id) {
	var selector = document.getElementById(id);
	initOptions(selector);
	buildNavigations(selector);
	buildItemView(selector);
	setupSlide(selector, getIndex(selector));
}
function initOptions(selector) {
	setIndex(selector, selector.getAttribute("data-index"));
	setLoop(selector, selector.getAttribute("data-loop"));
	setViewSize(selector, selector.getAttribute("data-viewSize"));
	setAlignment(selector, selector.getAttribute("data-alignment"));
	setRatio(selector, getRatioWidth(selector), getRatioHeight(selector));
}
function buildNavigations(selector) {
    var prevNav, nextNav, dotNav;
	prevNav = document.querySelector("#" + selector.id + " ~ .prev");
    nextNav = document.querySelector("#" + selector.id + " ~ .next");
    prevNav.style.left = selector.parentElement.offsetLeft + "px";
    prevNav.style.top = ((selector.parentElement.offsetHeight / 2) + selector.parentElement.offsetTop) + "px";
    nextNav.style.left = (selector.parentElement.offsetLeft + selector.parentElement.offsetWidth - nextNav.offsetWidth) + "px";
    nextNav.style.top = ((selector.parentElement.offsetHeight / 2) + selector.parentElement.offsetTop) + "px";
	
	/* if(document.querySelector("#" + selector.id + " ~ .dot") != null){
		dotNav = document.querySelector("#" + selector.id + " ~ .dot");

	} */
}
function buildItemView(selector) {
    var itemStyle = getComputedStyle(selector.children.item(0));
	var contentboxStyle = getComputedStyle(selector.parentElement);
	var itemHeight, itemWidth, itemPosition;
	var length = selector.childElementCount;
	var viewSize = getViewSize(selector);
	
	if(viewSize == "auto" || viewSize == 0) {
		if(getRatioWidth(selector) > 0 && getRatioHeight(selector) > 0) {
			if(false) {	//manuall Set
				itemHeight = itemStyle.height;
			}
			else {
				itemHeight = (_styleToNumber(contentboxStyle.height) - _styleToNumber(itemStyle.marginTop) - _styleToNumber(itemStyle.marginBottom) - _styleToNumber(contentboxStyle.paddingTop) - _styleToNumber(contentboxStyle.paddingBottom)) + "px";
			}
			var ratioWidth = getRatioWidth(selector);
			var ratioHeight = getRatioHeight(selector);
			
			itemWidth = (_styleToNumber(itemHeight) / ratioHeight * ratioWidth) + "px";
			viewSize = Math.round(_styleToNumber(contentboxStyle.width)/_styleToNumber(itemWidth));
			setViewSize(selector, String(viewSize));
			console.log("0");
			console.log(itemWidth);
			console.log(itemHeight);
		}
		else {
			viewSize = Math.round(_styleToNumber(contentboxStyle.width)/_styleToNumber(itemStyle.width));
			setViewSize(selector, String(viewSize));
			itemWidth = (_styleToNumber(contentboxStyle.width) - (_styleToNumber(contentboxStyle.paddingLeft) + _styleToNumber(contentboxStyle.paddingRight)) - viewSize * (_styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight))) / viewSize + "px";
			if(false) {	//manuall Set
				itemHeight = itemStyle.height;
			}
			else {
				itemHeight = (_styleToNumber(contentboxStyle.height) - _styleToNumber(itemStyle.marginTop) - _styleToNumber(itemStyle.marginBottom) - _styleToNumber(contentboxStyle.paddingTop) - _styleToNumber(contentboxStyle.paddingBottom)) + "px";
			}
			console.log("1");
			console.log(itemWidth);
			console.log(itemHeight);
		}
	}
	else {
		if(getRatioWidth(selector) > 0 && getRatioHeight(selector) > 0) {
			var ratioWidth = getRatioWidth(selector);
			var ratioHeight = getRatioHeight(selector);
			
			itemWidth = (_styleToNumber(contentboxStyle.width) - (_styleToNumber(contentboxStyle.paddingLeft) + _styleToNumber(contentboxStyle.paddingRight)) - viewSize * (_styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight))) / viewSize + "px";
			itemHeight = (_styleToNumber(itemWidth) / ratioWidth * ratioHeight) + "px";
			console.log("2");
			console.log(itemWidth);
			console.log(itemHeight);
		}
		else {
			if(false) {	//manuall Set
				itemHeight = itemStyle.height;
			}
			else {
				itemHeight = (_styleToNumber(contentboxStyle.height) - _styleToNumber(itemStyle.marginTop) - _styleToNumber(itemStyle.marginBottom) - _styleToNumber(contentboxStyle.paddingTop) - _styleToNumber(contentboxStyle.paddingBottom)) + "px";
			}
			itemWidth = (_styleToNumber(contentboxStyle.width) - (_styleToNumber(contentboxStyle.paddingLeft) + _styleToNumber(contentboxStyle.paddingRight)) - viewSize * (_styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight))) / viewSize + "px";
			console.log("3");
			console.log(itemWidth);
			console.log(itemHeight);
		}
	}
	//Item	
	itemPosition = "absolute";
	for(let i = 0; i < length; i++) {
		setIndex(selector.children.item(i), i);
		selector.children.item(i).style.height = itemHeight;
		selector.children.item(i).style.width = itemWidth;
		selector.children.item(i).style.position = itemPosition;
	}

	selector.style.width = Math.ceil(_styleToNumber(itemWidth) + _styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight)) * (viewSize + 2) + "px"; 
	selector.style.height = itemHeight;
	selector.style.position = "absolute";
	selector.style.left = -_styleToNumber(itemWidth) - _styleToNumber(itemStyle.marginLeft) - _styleToNumber(itemStyle.marginRight) + "px";
	
	var view = document.createElement("div");
    view.className = "view";
    selector.parentElement.insertBefore(view, selector.parentElement.children.item(0));
    view.appendChild(selector);
    view.style.overflow = "hidden";
	view.style.height = itemHeight;
	view.style.width = (_styleToNumber(contentboxStyle.width) -_styleToNumber(contentboxStyle.paddingLeft) - _styleToNumber(contentboxStyle.paddingRight)) + "px";
	view.style.position = "absolute";
	//cssRule (target, attribute, value);
}
//Update
function plusSlide(selector, value) {
	if(getAlignment(selector) == "right") {
		showSlide(selector, - value);
	}
	else {	//left & center
		showSlide(selector, value);
	}
}
function currentSlide(selector, index) {
	var index_alt = getIndex(selector);
	var value = index - index_alt;
	showSlide(selector, value)
}
function showSlide(selector, value) {
	var index_alt = getIndex(selector);
	var index_new = index_alt + value;
	var viewSize = getViewSize(selector);
	var length = selector.children.length;
	var pos = [];
	var posStart = []; 
	var posEnd = [];
	var dir;
	var itemStyle = getComputedStyle(selector.children.item(0));
	var itemWidth = _styleToNumber(itemStyle.width) + _styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight);
	
	//Create available positions
	if(getAlignment(selector) == "left") {
		for(let i = 0; i < viewSize + 2; i++) { 
			pos.push(itemWidth * i); 
		}
		dir = -1 * value * itemWidth/22;
	}
	// else if(getAlignment(selector) == "center") {
		// if(viewSize%2 == 0) {
			// /*Needed*/	
		// }
		// else {
			// for(let i = 0; i < viewSize + 1; i++) { 
				// pos.push(itemWidth * i + itemWidth); 
			// }
			// dir = -1 * value * itemWidth/22;
		// }
	// }
	else if(getAlignment(selector) == "right") {
		let ii = viewSize + 2;
		for(let i = 0; i < viewSize + 2; i++) { 
			ii--;
			pos.push(itemWidth * ii); 
		}
		dir = value * itemWidth/22;
		//value *= -1;
	}
	
	//New Index out of Range
	if(length > viewSize) {
		if(getLoop(selector)) {
			while(index_new < 0) {
				selector.insertBefore(selector.children.item(length - 1), selector.children.item(0));
				selector.children.item(0).style.left = pos[0] + "px";
				index_new++;
			}
			while(index_new > (length - viewSize)) {
				selector.appendChild(selector.children.item(0));
				selector.children.item(length - 1).style.left = pos[viewSize + 1] + "px";
				index_new--;
			}
		}
		else {
			if(index_new < 0) {
				index_new = 0;
				value = 0;
			}
			else if(index_new > (length - viewSize)) {
				index_new = length - viewSize;
				value = 0;
			}
		}
	}
	else {
		index_new = index_alt;
	}
	
	//Set positions for Items
	console.log("value " + value);
	var index = 0;
	for(let i = 0; i < length; i++) { 
		posStart.push(getPosition(selector.children[i])); 
		if(getAlignment(selector) == "left") {
			console.log("left");
			if(i < index_new) {
				console.log("i<");
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				posEnd.push(pos[index]);
			}
			else if(i > index_new + viewSize) {
				console.log("i>=");
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				posEnd.push(pos[index]);
			}
			else {
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				index++;
				posEnd.push(pos[index]);
			}
		}
		// else if(getAlignment(selector) == "center") {
			// if(viewSize%2 == 0) {
				// console.log("center gerade");
				// Needed	
			// }
			// else {
				// console.log("center ungerade");
				// Needed
			// }
		// }
		else if(getAlignment(selector) == "right") {
			console.log("right");
			if(i < index_new) {
				console.log("i<");
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				posEnd.push(pos[index]);
			}
			else if(i > index_new + viewSize) {
				console.log("i>=");
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				posEnd.push(pos[index]);
			}
			else {
				console.log("i" + i + " index " + index + " index_new " + index_new + " index_alt " + index_alt);
				index++;
				posEnd.push(pos[index]);
			}
		}
	}
	
	//Create Animation
	var id = setInterval(frame, 20);
		
	function frame() {
		var finish = true;
		for(let i = 0; i < length; i++){
			posStart[i] += dir;
			if(dir > 0 && posStart[i] >= posEnd[i]) {
				posStart[i] = posEnd[i];
			}
			else if(dir < 0 && posStart[i] <= posEnd[i]) {
				posStart[i] = posEnd[i];
			}
			else if(Math.abs(posEnd[i] - posStart[i]) <= 0.1) {
				posStart[i] = posEnd[i];
			}
			else {
				finish = false;
			}
			selector.children.item(i).style.left = posStart[i] + "px";
		}
		if(finish) {
			clearInterval(id);
		}
	}
	
	//Update Index
	setIndex(selector, index_new);
}
function setupSlide(selector, index) {
	var itemStyle = getComputedStyle(selector.children.item(0));
	var itemWidth = _styleToNumber(itemStyle.width) + _styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight);
	var viewSize = getViewSize(selector);
	var length = selector.children.length;
	var pos = [];
	var j = 0;
	
	//Create available positions
	if(getAlignment(selector) == "left") {
		for(let i = 0; i < viewSize + 2; i++) { 
			pos.push(itemWidth * i); 
		}
	}
	// else if(getAlignment(selector) == "center") {	
		// if(viewSize%2 == 0) {		}
		// else {
			// for(let i = 0; i < viewSize + 2; i++) { 
				// pos.push(itemWidth * i); 
			// }
		// }
	// }
	else if(getAlignment(selector) == "right") {
		let ii = viewSize + 2;
		for(let i = 0; i < viewSize + 2; i++) { 
			ii--;
			pos.push(itemWidth * ii); 
		}
	}
	
	//Set Items to positions
	for(let i = 0; i < length; i++) { 
		if(i < index) {
			selector.children.item(i).style.left = pos [j] + "px";
		}
		else if(i > index + viewSize) {
			selector.children.item(i).style.left = pos [j] + "px";
		}
		else {
			j++;
			selector.children.item(i).style.left = pos [j] + "px";
		}
	}
	setIndex(selector, index); 
}
//Getter
function getIndex(selector) {
    return parseInt(selector.getAttribute("data-index"));
}
function getItem(selector, index) {
	for(let i = 0; i < selector.children.length; i++) {
		if(getIndex(selector.children.item(i)) == index){
			return selector.children.item(i);
		}
	}
}
function getPosition(selector) {
	var style = getComputedStyle(selector);
	return _styleToNumber(style.left);
}
function getIndexFromPosition(selector) { 											// only alignment left suport | right & center ERROR
	var itemStyle = getComputedStyle(selector);
	var itemWidth = _styleToNumber(itemStyle.width) + _styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight);
	var pos = getPosition(selector);
	return Math.round(pos / itemWidth);
}
function getLoop(selector) {
    return (selector.getAttribute("data-loop") == 'true');
}
function getViewSize(selector) {
	return selector.getAttribute("data-viewSize");
}
function getAlignment(selector) {
	return selector.getAttribute("data-alignment");
}
function getRatio(selector) {
	var ratio = selector.getAttribute("data-ratio");
	if(ratio != null && ratio != "") {
		return ratio;
	}
	else 
	{
		return "0:0";
	}
}
function getRatioWidth(selector) {
	var ratio = getRatio(selector).split(':');
	return parseInt(ratio[0]);
}
function getRatioHeight(selector) {
	var ratio = getRatio(selector).split(':');
	return parseInt(ratio[1]);
}
//Setter
function setIndex(selector, value) {
	if(value == null || value == "") {
		selector.setAttribute("data-index", "0");
	}
	else {
		selector.setAttribute("data-index", String(value));
	}
}
function setLoop(selector, value) {
	if(value == null || value == "") {
		selector.setAttribute("data-loop", "false");
	}
	else if (value == 1 || value == true || value == "1" || value == "true" || value == "True" || value == "TRUE") {
		selector.setAttribute("data-loop", "true");
	}
	else if (value == 0 || value == false || value == "0" || value == "false" || value == "False" || value == "FALSE") {
		selector.setAttribute("data-loop", "false");
	}
	else {
		selector.setAttribute("data-loop", "false");
	}
}
function setViewSize(selector, value) {
	if(value == null || value == "") {
		selector.setAttribute("data-viewSize", "auto");
	}
	else if (value < 0) {
		selector.setAttribute("data-viewSize", "auto");
	}
	else {
		selector.setAttribute("data-viewSize", String(value));
	}
}
function setAlignment(selector, value) {
	if(value == null || value == "") {
		selector.setAttribute("data-alignment", "left");
	}
	else if(value == "left" || value == "Left" || value == "LEFT" || value == "l" || value == "L") {
		selector.setAttribute("data-alignment", "left");
	}
	// else if(value == "center" || value == "Center" || value == "CENTER" || value == "c" || value == "C") {
		// selector.setAttribute("data-alignment", "center");
	// }																					   
	else if(value == "right" || value == "Right" || value == "RIGHT" || value == "r" || value == "R") {
		selector.setAttribute("data-alignment", "right");
	}
	else {
		selector.setAttribute("data-alignment", "left");
	}
}
function setRatio(selector, width, height) {
	if(width == null || width == "" || height == null || height == "") {
		selector.setAttribute("data-ratio", "0:0");
	}
	else if(width > 0 && height > 0) {
		selector.setAttribute("data-ratio", width + ":" + height);
	}
	else {
		selector.setAttribute("data-ratio", "0:0");
	}
}