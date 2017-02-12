import "./index.less";
import "babel-polyfill";
import gcTheme from "./theme/index.js";
import gcPattern from "./pattern/index.js";

import CoverDrawer from "./lib/cover-drawer.js";

class GhostCover{
	constructor(pattern, theme){
		this.drawer = new CoverDrawer(pattern, theme);
		window.addEventListener('resize', () => {
			this.drawCover();
		});
	}

	drawCover(){
		if(location.pathname !== '/') return;

		const svg = this.drawer.drawPattern(window.innerWidth, window.innerHeight * 1.2);
		const svgString = `url('${svg.toDataURI()}')`;

		var $ = document.querySelector.bind(document);
		var header = $('.main-header');
		header.classList.remove('no-cover');
		header.style.background = svgString;
	}
};

window.gcCover = GhostCover;
window.gcDrawer = CoverDrawer;
window.gcTheme = gcTheme;
window.gcPattern = gcPattern;
