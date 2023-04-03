import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.initBuffers();
        this.sphere = new MySphere(scene, 40, 40, true);
        this.material = new CGFappearance(scene);
        this.material.emission = [1, 1, 1, 1];
        this.material.ambient = [0, 0, 0, 0];
        this.material.diffuse = [0, 0, 0, 0];
        this.material.setTexture(texture);
    }

    initBuffers() {
        this.indices = []
        this.vertices = []
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(200, 200, 200);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}

