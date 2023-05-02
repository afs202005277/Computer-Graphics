import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 40, true);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.emission = [1, 1, 1, 1];
        this.appearance.ambient = [0, 0, 0, 0];
        this.appearance.diffuse = [0, 0, 0, 0];
        this.appearance.setTexture(new CGFtexture(this.scene, "images/panorama4.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        let distance = Math.sqrt(this.scene.camera.position[0] ** 2 + this.scene.camera.position[1] ** 2 + this.scene.camera.position[2] ** 2);
        this.scene.scale(Math.max(200, distance), Math.max(200, distance), Math.max(200, distance));
        this.sphere.display();
        this.scene.popMatrix();
    }
}

