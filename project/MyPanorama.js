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
        this.sphere = new MySphere(scene, 40, 40, true);
        this.material = new CGFappearance(scene);
        this.material.emission = [1, 1, 1, 1];
        this.material.ambient = [0, 0, 0, 0];
        this.material.diffuse = [0, 0, 0, 0];
        this.material.setTexture(texture);
    }

    display() {
        this.scene.pushMatrix();
        let distance = Math.sqrt(this.scene.camera.position[0]**2 + this.scene.camera.position[1]**2 + this.scene.camera.position[2]**2);
        this.scene.scale(Math.max(200, distance), Math.max(200, distance), Math.max(200, distance));
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}

