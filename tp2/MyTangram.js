import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js'
import { MyTriangleSmall } from './MyTriangleSmall.js'
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		this.diamond = new MyDiamond(scene);
		this.triangle = new MyTriangle(scene);
		this.parallelogram = new MyParallelogram(scene);
		this.trianglesmall1 = new MyTriangleSmall(scene);
		this.trianglesmall2 = new MyTriangleSmall(scene);
		this.bigTriangle1 = new MyTriangleBig(scene);
		this.bigTriangle2 = new MyTriangleBig(scene);

		this.initBuffers();
	}

	display() {

		this.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.4, 3.3, 0.0, 1.0
		];

		this.multMatrix(tra);

		this.diamond.display();

		this.popMatrix();

		this.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		this.multMatrix(tra);

		this.bigTriangle1.display();

		this.popMatrix();

		this.pushMatrix();

		var tra1 = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-2.0, 0.0, 0.0, 1.0
		];

		var rot = [
			Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
			-Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		var tra2 = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, -2.0, 0.0, 1.0
		];

		this.multMatrix(tra1);
		this.multMatrix(rot);
		this.multMatrix(tra2);

		this.bigTriangle2.display();

		this.popMatrix();

		this.pushMatrix();

		var tra1 = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, -1.8, 0.0, 1.0
		];

		var rot = [
			Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0, 0.0,
			-Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		this.multMatrix(tra1);
		this.multMatrix(rot);

		this.trianglesmall1.display();

		this.popMatrix();

		this.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, -2.0, 0.0, 1.0
		];

		this.multMatrix(tra);

		this.trianglesmall2.display();

		this.popMatrix();

		this.pushMatrix();

		var rot = [
			Math.cos(Math.PI), Math.sin(Math.PI), 0.0, 0.0,
			-Math.sin(Math.PI), Math.cos(Math.PI), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, -3.8, 0.0, 1.0
		];

		this.multMatrix(tra);
		this.multMatrix(rot);

		this.triangle.display();

		this.popMatrix();

		this.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-3.0, -3.0, 0.0, 1.0
		];

		var esc = [
			1.0, 0.0, 0.0, 0.0,
			0.0, -1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		];

		this.multMatrix(tra);
		this.multMatrix(esc);

		this.parallelogram.display();

		this.popMatrix();
	}

	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

