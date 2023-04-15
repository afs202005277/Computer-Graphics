import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import {BirdWingPartial} from "./BirdWingPartial.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdWing extends CGFobject {
    constructor(scene) {
        super(scene);

        this.partial1 = new BirdWingPartial(scene);
        this.partial2 = new BirdWingPartial(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.18, 0, 0.5);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.partial1.display();
        this.scene.pushMatrix();
        this.scene.scale(-1, -1, -1);
        this.scene.translate(2.999, 0, 0.31);
        this.partial2.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

/*
this.scene.pushMatrix();

        this.scene.translate(-3.0, 0, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-2.5, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.wing4.display();

        this.scene.popMatrix();
 */