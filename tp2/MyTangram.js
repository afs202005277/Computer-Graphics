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
	}

	display() {

		this.scene.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.4, 3.3, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.diamond.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.bigTriangle1.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

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

		this.scene.multMatrix(tra1);
		this.scene.multMatrix(rot);
		this.scene.multMatrix(tra2);

		this.bigTriangle2.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

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

		this.scene.multMatrix(tra1);
		this.scene.multMatrix(rot);

		this.trianglesmall1.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, -2.0, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.trianglesmall2.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

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

		this.scene.multMatrix(tra);
		this.scene.multMatrix(rot);

		this.triangle.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

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

		this.scene.multMatrix(tra);
		this.scene.multMatrix(esc);

		this.parallelogram.display();

		this.scene.popMatrix();
	}
}

