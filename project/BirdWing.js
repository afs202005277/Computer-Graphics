import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdWing extends CGFobject {
    constructor(scene) {
        super(scene);

        this.wing1 = new MyCylinder(scene, 3, 1);
        this.wing2 = new MyCylinder(scene, 3, 1);
        this.wing3 = new MyCylinder(scene, 3, 1);
        this.wing4 = new MyCylinder(scene, 3, 1);

    }

    display() {

        this.scene.pushMatrix();

        this.scene.scale(1.0, 1.0, 0.1);

        this.wing1.display();

        this.scene.translate(1.73, 0.0, 0.0);

        this.wing3.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.865, -0.5, 0.0);
        this.scene.scale(-1.0, -1.0, 0.1);

        this.wing2.display();

        this.scene.translate(-1.73, 0.0, 0.0);

        this.wing4.display();

    }

    updateBuffers() {
    }
}

