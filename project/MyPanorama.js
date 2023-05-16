import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MySphere} from "./MySphere.js";


export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 40, 40, true);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.emission = [1, 1, 1, 1];
        this.appearance.ambient = [0, 0, 0, 0];
        this.appearance.diffuse = [0, 0, 0, 0];
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.scale(1000, 1000, 1000);
        this.sphere.display();
        this.scene.popMatrix();
    }
}

