import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyDiamond} from "./MyDiamond.js";
import {MyTriangle} from './MyTriangle.js';
import {MyParallelogram} from './MyParallelogram.js'
import {MyTriangleSmall} from './MyTriangleSmall.js'
import {MyTriangleBig} from "./MyTriangleBig.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.texture = new CGFtexture(scene, 'images/tangram.png');


        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall1 = new MyTriangleSmall(scene);
        this.trianglesmall2 = new MyTriangleSmall(scene);
        this.bigTriangle1 = new MyTriangleBig(scene);
        this.bigTriangle2 = new MyTriangleBig(scene);

        this.Mdiamond = new CGFappearance(scene);
        this.Mdiamond.setAmbient(1, 1, 1, 1.0);
        this.Mdiamond.setDiffuse(1, 1, 1, 1.0);
        this.Mdiamond.setSpecular(1, 1, 1, 1.0);
        this.Mdiamond.setShininess(32.0);
        this.Mdiamond.setTexture(this.texture);
        this.Mdiamond.setTextureWrap('REPEAT', 'REPEAT');

        this.MTriangleBlue = new CGFappearance(scene);
        this.MTriangleBlue.setAmbient(1, 1, 1, 1.0);
        this.MTriangleBlue.setDiffuse(1, 1, 1, 1.0);
        this.MTriangleBlue.setSpecular(1, 1, 1, 1.0);
        this.MTriangleBlue.setShininess(32.0);
        this.MTriangleBlue.setTexture(this.texture);
        this.MTriangleBlue.setTextureWrap('REPEAT', 'REPEAT');

        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(1, 1, 1, 1.0);
        this.orange.setDiffuse(1, 1, 1, 1.0);
        this.orange.setSpecular(1, 1, 1, 1.0);
        this.orange.setShininess(32.0);
        this.orange.setTexture(this.texture);
        this.orange.setTextureWrap('REPEAT', 'REPEAT');

        this.red = new CGFappearance(scene);
        this.red.setAmbient(1, 1, 1, 1.0);
        this.red.setDiffuse(1, 1, 1, 1.0);
        this.red.setSpecular(1, 1, 1, 1.0);
        this.red.setShininess(32.0);
        this.red.setTexture(this.texture);
        this.red.setTextureWrap('REPEAT', 'REPEAT');

        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(1, 1, 1, 1.0);
        this.purple.setDiffuse(1, 1, 1, 1.0);
        this.purple.setSpecular(1, 1, 1, 1.0);
        this.purple.setShininess(32.0);
        this.purple.setTexture(this.texture);
        this.purple.setTextureWrap('REPEAT', 'REPEAT');

        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1, 1, 1, 1.0);
        this.pink.setDiffuse(1, 1, 1, 1.0);
        this.pink.setSpecular(1, 1, 1, 1.0);
        this.pink.setShininess(32.0);
        this.pink.setTexture(this.texture);
        this.pink.setTextureWrap('REPEAT', 'REPEAT');

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1, 1, 1, 1.0);
        this.yellow.setDiffuse(1, 1, 1, 1.0);
        this.yellow.setSpecular(1, 1, 1, 1.0);
        this.yellow.setShininess(32.0);
        this.yellow.setTexture(this.texture);
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.Mdiamond.apply();

        this.scene.pushMatrix();

        var tra = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.4, 3.4, 0.0, 1.0
        ];

        this.scene.multMatrix(tra);

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

        this.bigTriangle1.texCoords = [
            0, 0,
            1, 0,
            0.5, 0.5
        ];
        this.bigTriangle1.updateTexCoordsGLBuffers();
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

        this.bigTriangle2.texCoords = [
            1, 0,
            1, 1,
            0.5, 0.5
        ];
        this.bigTriangle2.updateTexCoordsGLBuffers();
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

        this.trianglesmall1.texCoords = [
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75
        ];
        this.trianglesmall1.updateTexCoordsGLBuffers();
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

        this.trianglesmall2.texCoords = [
            0, 0,
            0.25, 0.25,
            0, 0.5
        ];
        this.trianglesmall2.updateTexCoordsGLBuffers();
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

        this.triangle.texCoords = [
            0, 0.5,
            0.5, 1,
            0, 1
        ];
        this.triangle.updateTexCoordsGLBuffers();
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

        this.parallelogram.texCoords = [
            0.25, 0.75,
            0.5, 1,
            1, 1,
            0.5, 0.75
        ];
        this.parallelogram.updateTexCoordsGLBuffers();
        this.yellow.apply();
        this.parallelogram.display();

        this.scene.popMatrix();
    }

    updateBuffers() {
    }
}

