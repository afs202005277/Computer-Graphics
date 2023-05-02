import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdWingPartial extends CGFobject {
    constructor(scene, material1, material2, reverse) {
        super(scene);

        this.wing1 = new MyCylinder(scene, 3, 1, reverse);
        this.wing3 = new MyCylinder(scene, 3, 1, reverse);
        this.material1 = material1;
        this.material2 = material2;
    }

    display() {
        // angulos negativos estao virados para o bico
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.1, 0.5);
        //this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.translate(-5, 0, -0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.material1.apply();
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.1, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.material2.apply();
        this.wing3.display();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}
