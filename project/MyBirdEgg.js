import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.top = new MySphere(scene, 30, 30, false);
        this.bottom = new MySphere(scene, 30, 30, false);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(10);
        this.appearance.setTexture(new CGFtexture(scene, "images/egg.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(1, 1.4, 1);
        this.appearance.apply();
        this.top.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.scale(1, 0.9, 1);
        this.bottom.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

