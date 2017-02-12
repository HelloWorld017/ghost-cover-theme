window.gcTest = (pattern, theme) => {
	const coverDrawer = new gcDrawer(pattern, theme);
	document.childNodes[0].innerHTML =
		coverDrawer.drawPattern(1920, 1080).buildPathList();
};
