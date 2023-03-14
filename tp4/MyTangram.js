import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
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

		this.Mdiamond = new CGFappearance(scene);
		this.Mdiamond.setAmbient(0.46,0.98, 0.30, 1.0);
		this.Mdiamond.setDiffuse(0.46,0.98, 0.30, 1.0);
		this.Mdiamond.setSpecular(0,1, 0, 1.0);
		this.Mdiamond.setShininess(32.0);
		this.Mdiamond.loadTexture('images/tangram.png');
		this.Mdiamond.setTextureWrap('REPEAT', 'REPEAT');

		this.MTriangleBlue = new CGFappearance(scene);
		this.MTriangleBlue.setAmbient(0.25,0.61, 0.97, 1.0);
		this.MTriangleBlue.setDiffuse(0.25,0.61, 0.97, 1.0);
		this.MTriangleBlue.setSpecular(0,0, 1, 1.0);
		this.MTriangleBlue.setShininess(32.0);

		this.orange = new CGFappearance(scene);
		this.orange.setAmbient(0.95, 0.62, 0.22, 1.0);
		this.orange.setDiffuse(0.95, 0.62, 0.22, 1.0);
		this.orange.setSpecular(1,0.5, 0, 1.0);
		this.orange.setShininess(32.0);

		this.red = new CGFappearance(scene);
		this.red.setAmbient(0.92, 0.23, 0.18, 1.0);
		this.red.setDiffuse(0.92, 0.23, 0.18, 1.0);
		this.red.setSpecular(1,0, 0, 1.0);
		this.red.setShininess(32.0);

		this.purple = new CGFappearance(scene);
		this.purple.setAmbient(0.55, 0.34, 0.72, 1.0);
		this.purple.setDiffuse(0.55, 0.34, 0.72, 1.0);
		this.purple.setSpecular(0.5,0, 1, 1.0);
		this.purple.setShininess(32.0);

		this.pink = new CGFappearance(scene);
		this.pink.setAmbient(0.95, 0.63, 0.80, 1.0);
		this.pink.setDiffuse(0.95, 0.63, 0.80, 1.0);
		this.pink.setSpecular(1,0.5, 1, 1.0);
		this.pink.setShininess(32.0);

		this.yellow = new CGFappearance(scene);
		this.yellow.setAmbient(1, 0.99, 0.33, 1.0);
		this.yellow.setDiffuse(1, 0.99, 0.33, 1.0);
		this.yellow.setSpecular(1,1, 0, 1.0);
		this.yellow.setShininess(32.0);
	}

	display() {

		this.scene.pushMatrix();

		var tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.4, 3.4, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.Mdiamond.apply();
		this.diamond.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.MTriangleBlue.apply();
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

		this.orange.apply();
		this.bigTriangle2.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		tra1 = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, -1.8, 0.0, 1.0
		];

		rot = [
			Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0, 0.0,
			-Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		this.scene.multMatrix(tra1);
		this.scene.multMatrix(rot);

		this.red.apply();
		this.trianglesmall1.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, -2.0, 0.0, 1.0
		];

		this.scene.multMatrix(tra);

		this.purple.apply();
		this.trianglesmall2.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		rot = [
			Math.cos(Math.PI), Math.sin(Math.PI), 0.0, 0.0,
			-Math.sin(Math.PI), Math.cos(Math.PI), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.8, 0.0, 1.0
		];

		tra = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, -3.8, 0.0, 1.0
		];

		this.scene.multMatrix(tra);
		this.scene.multMatrix(rot);

		this.pink.apply();
		this.triangle.display();

		this.scene.popMatrix();

		this.scene.pushMatrix();

		tra = [
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

		this.yellow.apply();
		this.parallelogram.display();

		this.scene.popMatrix();
	}

	updateBuffers(){}
}

