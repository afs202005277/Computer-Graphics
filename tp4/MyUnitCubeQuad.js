import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top=null, front=null, right=null, back=null, left=null, bottom=null) {
		super(scene);
		
        this.quad1 = new MyQuad(scene);
        this.quad2 = new MyQuad(scene);
        this.quad3 = new MyQuad(scene);
        this.quad4 = new MyQuad(scene);
        this.quad5 = new MyQuad(scene);
        this.quad6 = new MyQuad(scene);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.material.setSpecular(1.0, 1.0, 1.0, 1.0);
		this.material.setShininess(32.0);
        

        this.top = top;
        this.front = front;
        this.right = right;
        this.back = back;
        this.left = left;
        this.bottom = bottom;
	}
	
	display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);

        this.quad1.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ]
        this.quad1.updateTexCoordsGLBuffers();
        this.material.setTexture(this.front);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad2.texCoords = [
            1, 0,
            0, 0,
            1, 1,
            0, 1
        ]
        this.quad2.updateTexCoordsGLBuffers();
        this.material.setTexture(this.back);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad2.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad3.texCoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ]
        this.quad1.updateTexCoordsGLBuffers();
        this.material.setTexture(this.bottom);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad4.texCoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ]
        this.quad4.updateTexCoordsGLBuffers();
        this.material.setTexture(this.top);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad5.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ]
        this.quad5.updateTexCoordsGLBuffers();
        this.material.setTexture(this.left);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad6.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ]
        this.quad6.updateTexCoordsGLBuffers();
        this.material.setTexture(this.right);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad6.display();
        this.scene.popMatrix();

    }
}

