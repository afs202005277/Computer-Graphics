import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdWingPartial extends CGFobject {
    constructor(scene) {
        super(scene);

        this.wing1 = new MyCylinder(scene, 3, 1);
        this.wing3 = new MyCylinder(scene, 3, 1);

    }

    display() {
        // angulos negativos estao virados para o bico
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.1, 0.5);
        //this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.translate(-5, 0, -0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.2, 0.58, -0.1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.wing3.display();

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