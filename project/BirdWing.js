import {CGFobject} from '../lib/CGF.js';
import {BirdWingPartial} from "./BirdWingPartial.js";


export class BirdWing extends CGFobject {
    constructor(scene, material1, material2, reverse) {
        super(scene);
        this.partial1 = new BirdWingPartial(scene, material1, material2, reverse);
        this.partial2 = new BirdWingPartial(scene, material1, material2, reverse);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.pushMatrix();
        this.scene.translate(0.18, 0, 0.5);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.partial1.display();
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, -1);
        this.scene.translate(3.0, 0, 0.25);
        this.partial2.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}