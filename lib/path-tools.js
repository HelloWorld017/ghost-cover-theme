class Path{
	constructor(color, ...path){
		this.color = color;
		this.path = path;
	}

	parseParam(params){
		const method = params.shift();
		const args = params.map((v) => {
			if(typeof v !== 'number') return v;

			let decFrac = v - Math.floor(v);
			if(decFrac < 0.001 || decFrac > 0.999) return Math.round(v);

			decFrac = v * 10 - Math.floor(v * 10);
			if(decFrac < 0.001 || decFrac > 0.999) return Math.round(v * 10) / 10;

			return v;
		}).join(',');

		return `${method} ${args}`;
	}

	build(){
		return `<path ` +
				`fill="${this.color}" ` +
				`d="${this.path.map((v) => this.parseParam(v)).join(' ')}"` +
			`/>`;
	}
}

class StrokePath extends Path{
	build(){
		return `<path ` +
				`stroke="${this.color}" ` +
				`d="${this.path.map((v) => this.parseParam(v)).join(' ')}"` +
			`/>`;
	}
}

class Rect{
	constructor(color, x, y, width, height){
		this.color = color;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	build(){
		return `<rect fill="${this.color}" x="${this.x} y="${this.y}" width="${this.width}" height="${this.height}"/>`;
	}
}

class Circle{
	constructor(color, cx, cy, r){
		this.color = color;
		this.cx = cx;
		this.cy = cy;
		this.r = r;
	}

	build(){
		return `<circle fill="${this.color}" cx="${this.cx}" cy="${this.cy}" r="${this.r}"/>`;
	}
}

class CustomObject{
	constructor(svg){
		this.svg = svg;
	}

	build(){
		return this.svg;
	}
}

class SVGObject{
	constructor(width, height, path){
		this.width = width;
		this.height = height;
		this.path = path || [];
	}

	setPath(pathList){
		this.path = pathList;
	}

	buildPathList(){
		window._path = this;
		return this.path.map((v) => v.build()).join('');
	}

	build(){
		return `<svg ` +
				`width="${this.width}" ` +
				`height="${this.height}" ` +
				`xmlns="http://www.w3.org/2000/svg">` +
					this.buildPathList() +
			`</svg>`;
	}

	toDataURI(){
		return `data:image/svg+xml;base64,${btoa(this.build())}`;
	}
}

export {Path, StrokePath, Rect, Circle, CustomObject, SVGObject};
