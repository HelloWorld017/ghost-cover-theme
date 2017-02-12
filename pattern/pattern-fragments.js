import {Path} from "../lib/path-tools.js";
import {Pattern} from "./pattern.js";
let h = 1080;

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	distance(point){
		return Math.hypot(point.x - this.x, point.y - this.y);
	}

	equals(p){
		return p.x === this.x && p.y === this.y;
	}
}

class Circle{
	constructor(center, radius){
		this.center = center;
		this.radius = radius;
	}

	//result < 0: outside
	//result = 0: on the circle
	//result > 0: inside
	isPointInside(p){
		return this.radius - this.center.distance(p);
	}
}


class Line {
	constructor(angle, position){
		this._angle = angle;
		this.p1 = position;
	}

	get angle(){
		return (this._angle > 180) ? this._angle % 180 : this._angle;
	}

	set angle(angle){
		this._angle = angle;
	}

	get theta(){
		return Math.tan(Math.PI / 180 * (this.angle - 90));
	}

	getIntersection(line){
		if(this.angle === line.angle) return false;
		let line1 = this;
		let line2 = line;

		if(line1.angle === 180) [line1, line2] = [line2, line1];

		let x;
		let a1 = -line1.theta;
		let b1 = h - line1.p1.y - a1 * line1.p1.x;
		if(line2.angle === 180){
			x = line2.p1.x;
		}else{
			let a2 = -line2.theta;
			let b2 = h - line2.p1.y - a2 * line2.p1.x;

			x = (b2 - b1) / (a1 - a2);
		}

		return new Point(x, h - (a1 * x + b1));
	}
}

class Edge extends Line{
	constructor(p1, p2){
		super(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI + 90, p1);
		this.p1 = p1;
		this.p2 = p2;
	}

	getCenter(){
		return new Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
	}

	getPerpBisector(){
		return new Line(this.angle + 90, this.getCenter());
	}

	//result < 0: CW
	//result === 0 : on the line
	//result > 0 : CCW
	isCCW(point){
		return (
			this.p1.x * this.p2.y +
			this.p2.x * point.y +
			point.x * this.p1.y
		) - (
			this.p1.y * this.p2.x +
			this.p2.y * point.x +
			point.y * this.p1.x
		);
	}

	equals(edge){
		return edge.p1.equals(this.p1) && edge.p2.equals(this.p2);
	}
}

class Triangle{
	constructor(p1, p2, p3){
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;

		if(
			new Edge(p1, p2).angle === new Edge(p2, p3).angle ||
			new Edge(p2, p3).angle === new Edge(p3, p1).angle ||
			new Edge(p3, p1).angle === new Edge(p1, p2).angle
		) throw new Error("Three point is on a line!");
	}

	getOuterCircle(){
		let lineP1P2 = new Edge(this.p1, this.p2);
		let lineP2P3 = new Edge(this.p2, this.p3);
		let center =
			lineP1P2.getPerpBisector().getIntersection(lineP2P3.getPerpBisector());

		let radius = center.distance(this.p1);

		return new Circle(center, radius);
	}

	equals(triangle){
		return triangle.p1.equals(this.p1) &&
			triangle.p2.equals(this.p2) &&
			triangle.p3.equals(this.p3);
	}
}

function SingleArray(){
	const arr = [];
	arr.push.apply(arr, arguments);
	arr.__proto__ = SingleArray.prototype;

	return arr;
}
SingleArray.prototype = new Array;
SingleArray.prototype.contains = function(v1){
	return this.some((v) => v.equals(v1));
};
SingleArray.prototype.push = function(...args){
	args.forEach((v) => {
		if(!this.contains(v)) Array.prototype.push.call(this, v);
	});
};
SingleArray.prototype.pushCondition = function(check, ...args){
	args.forEach((v) => check(v) ? this.push(v) : null);
};

class HexColor{
	constructor(colorCode){
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorCode);
		if(result === null) throw new Error("Invalid Color Code");
		this._r = parseInt(result[1], 16);
		this._g = parseInt(result[2], 16);
		this._b = parseInt(result[3], 16);
	}

	set r(v){
		this._r = v;
	}

	set g(v){
		this._g = v;
	}

	set b(v){
		this._b = v;
	}

	get r(){
		return Math.max(0, Math.min(255, Math.round(this._r)));
	}

	get g(){
		return Math.max(0, Math.min(255, Math.round(this._g)));
	}

	get b(){
		return Math.max(0, Math.min(255, Math.round(this._b)));
	}

	buildColor(){
		return `#${((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)}`;
	}

	clone(){
		return new HexColor(this.buildColor());
	}
}

class FragmentsPattern extends Pattern{
	constructor(){
		super("fragments");
	}

	draw(_palette, fullWidth, fullHeight){
		h = fullHeight;
		const palette = [];
		_palette.pop();
		_palette.forEach((v, k) => {
			const currentColor = new HexColor(v);
			palette.push(currentColor);

			let nextColor = _palette[k + 1];
			if(!nextColor) return;

			nextColor = new HexColor(nextColor);
			const tempColor = currentColor.clone();
			tempColor.r = (nextColor.r + tempColor.r) / 2;
			tempColor.g = (nextColor.g + tempColor.g) / 2;
			tempColor.b = (nextColor.b + tempColor.b) / 2;
			console.log(tempColor.buildColor());
			palette.push(tempColor);
		});

		const boundaryVertexes = new SingleArray;
		const vertexes = [];
		const vertexCount = 100;
		const margin = 200;
		const baseline = Math.max(0, fullHeight - margin);

		const section = fullWidth / palette.length;

		for(let i = 0; i < 7; i++){
			let bottomBoundary = new Point(
				fullWidth / 5 * (i - 1) + Math.random() * (fullWidth / 10),
				Math.round(baseline + Math.random() * margin / 2 * Math.pow(-1, i))
			);

			vertexes.push(bottomBoundary);
			boundaryVertexes.push(bottomBoundary);
		}

		for(let i = 0; i < vertexCount; i++){
			vertexes.push(new Point(
				Math.round(Math.random() * fullWidth),
				Math.round(Math.random() * fullHeight - 3 / 2 * margin)
			));
		}

		vertexes.push(new Point(
			-100,
			-100
		), new Point(
			fullWidth + 100,
			-100
		));

		const candidateEdges = new SingleArray;
		const finishedEdges = new SingleArray;
		const finishedTriangles = new SingleArray;

		vertexes.every((v, k) => {
			let v2 = vertexes.reduce((prev, curr, index) => {
				let tempEdge = new Edge(v, curr);
				let newDistance = Math.hypot(curr.x - v.x, curr.y - v.y);
				if(prev[1] > newDistance && index !== k) return [curr, newDistance];
				return prev;
			}, [undefined, Infinity]);

			if(v2[0] === undefined) return true;

			candidateEdges.push(new Edge(v, v2[0]));
			return false;
		});

		while(candidateEdges.length > 0){
			const currentEdge = candidateEdges.shift();
			const ccwPoints = vertexes.filter((v) => currentEdge.isCCW(v) > 0);

			ccwPoints.forEach((p3) => {
				if(p3.equals(currentEdge.p1) || p3.equals(currentEdge.p2)) return;
				if(currentEdge.isCCW(p3) <= 0) return;
				const currentTriangle = new Triangle(currentEdge.p1, currentEdge.p2, p3);
				const outerCircle = currentTriangle.getOuterCircle();
				if(ccwPoints.filter((v) => {
					if(v.equals(currentEdge.p1) || v.equals(currentEdge.p2) || v.equals(p3))
						return false;

					return true;
				}).every((v) => {
					return outerCircle.isPointInside(v) <= 0;
				})){
					candidateEdges.pushCondition(
						(v) => !finishedEdges.contains(v),
						new Edge(p3, currentEdge.p2),
						new Edge(currentEdge.p1, p3)
					);

					finishedEdges.push(
						new Edge(currentEdge.p2, p3),
						new Edge(p3, currentEdge.p1),
						currentEdge
					);

					if(
						!boundaryVertexes.contains(currentEdge.p1) ||
						!boundaryVertexes.contains(currentEdge.p2) ||
						!boundaryVertexes.contains(p3)
					){
						finishedTriangles.push(
							new Triangle(currentEdge.p1, currentEdge.p2, p3)
						);
					}
				}
			});
		};

		return finishedTriangles.map((v) => {
			const color = palette[Math.min(palette.length - 1, Math.max(
				0, Math.floor(((v.p1.x + v.p2.x + v.p3.x) / 3) / section)
			))].clone();
			color.r += Math.round(Math.random() * 40);
			color.g += Math.round(Math.random() * 40);
			color.b += Math.round(Math.random() * 40);

			return new Path(color.buildColor(),
				['M', v.p1.x, v.p1.y],
				['L', v.p2.x, v.p2.y],
				['L', v.p3.x, v.p3.y],
				['Z']
			);
		});
	}
}

export default FragmentsPattern;
