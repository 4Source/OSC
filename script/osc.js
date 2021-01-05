function _styleToNumber(style) { try {
    return parseFloat(style.slice(0, -2));
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
	var length = selector.childElementCount;
	var viewSize = getViewSize(selector);
		
	//Item	
    var itemHeight = (_styleToNumber(contentboxStyle.height) - _styleToNumber(itemStyle.marginTop) - _styleToNumber(itemStyle.marginBottom) - _styleToNumber(contentboxStyle.paddingTop) - _styleToNumber(contentboxStyle.paddingBottom)) + "px";
	var itemWidth = (_styleToNumber(contentboxStyle.width) - (_styleToNumber(contentboxStyle.paddingLeft) + _styleToNumber(contentboxStyle.paddingRight)) - viewSize * (_styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight))) / viewSize + "px";
	var itemPosition = "absolute";
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
}
//Update
function plusSlide(selector, value) {
	if(getAlignment(selector) == "right") {
		showSlide(selector, - value);
	}
	else {
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
	else if(getAlignment(selector) == "right") {
		let ii = viewSize + 2;
		for(let i = 0; i < viewSize + 2; i++) { 
			ii--;
			pos.push(itemWidth * ii); 
		}
		dir = value * itemWidth/22;
	}
	
	//New Index out of Range
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
		}
		else if(index_new > (length - viewSize)) {
			index_new = length - viewSize;
		}
	}
	
	//Set positions for Items
	j = 0;
	for(let i = 0; i < length; i++) { 
		if(i < index_new) {
			posEnd.push(pos[j]);
		}
		else if(i > index_new + viewSize) {
			posEnd.push(pos[j]);
		}
		else {
			j++;
			posEnd.push(pos[j]);
		}
		posStart.push(getPosition(selector.children[i])); 
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
	
	if(getAlignment(selector) == "left") {
		for(let i = 0; i < viewSize + 2; i++) { 
			pos.push(itemWidth * i); 
		}
	}
	else if(getAlignment(selector) == "right") {
		let ii = viewSize + 2;
		for(let i = 0; i < viewSize + 2; i++) { 
			ii--;
			pos.push(itemWidth * ii); 
		}
	}
	
		
	
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
function getIndexFromPosition(selector) {
	var itemStyle = getComputedStyle(selector.children.item(0));
	var itemWidth = _styleToNumber(itemStyle.width) + _styleToNumber(itemStyle.marginLeft) + _styleToNumber(itemStyle.marginRight);
	var pos = getPosition(selector);
	return -1 * Math.round(pos / itemWidth);
}
function getLoop(selector) {
    return (selector.getAttribute("data-loop") == 'true');
}
function getViewSize(selector) {
	return parseInt(selector.getAttribute("data-viewSize"));
}
function getAlignment(selector) {
	return selector.getAttribute("data-alignment");
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
		selector.setAttribute("data-viewSize", "3");
	}
	else if (value < 0) {
		selector.setAttribute("data-viewSize", "1");
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
	else if(value == "right" || value == "Right" || value == "RIGHT" || value == "r" || value == "R") {
		selector.setAttribute("data-alignment", "right");
	}
	else {
		selector.setAttribute("data-alignment", "left");
	}
}