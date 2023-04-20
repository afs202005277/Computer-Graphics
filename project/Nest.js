import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyHalfSphere } from './MyHalfSphere.js';
import {MyOval} from "./MyOval.js";
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class Nest extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.insideSphere = new MyHalfSphere(scene, 30, 30, false);
        this.outerSphere = new MyHalfSphere(scene, 30, 30, true);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(2);
        this.appearance.setTexture(new CGFtexture(scene, "images/nest.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.4, 0.0);
        this.scene.scale(0.9, -0.4, 0.9);
        this.insideSphere.display();
        this.outerSphere.display();
        this.scene.popMatrix();
    }
}

