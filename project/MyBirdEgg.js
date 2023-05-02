import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyOval} from "./MyOval.js";
import {MyTerrain} from "./MyTerrain.js";
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
        this.bottom = new MyOval(scene, 30, 30, false);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(100);
        this.appearance.setTexture(new CGFtexture(scene, "images/egg.png"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.coordinates = [0, 0, 0];
    }

    checkBoundaries(value, speedFactor){
        if (this.coordinates[1] > value) {
            this.coordinates[1] -= speedFactor*0.50;
            this.coordinates[1] = Math.max(this.coordinates[1], value);
        }
    }

    falling(speedFactor){
        MyTerrain.ground_level(Math.floor((this.coordinates[0]+200)/400*128), 128+Math.floor((this.coordinates[2]-200)/400*128), this, true, speedFactor);
    }
    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.bottom.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

