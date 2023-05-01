import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {Pyramid} from "./Pyramid.js";
import { MyCylinder } from './MyCylinder.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.birdbodyfront = new MyCylinder(scene, 5, 1);
        this.tail = new Pyramid(scene, 4, 1);
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.47,0.76, 0.93, 1.0);
        this.material.setDiffuse(0.47,0.76, 0.93, 1.0);
        this.material.setSpecular(0.47,0.76, 0.93, 1.0);
        this.material.setShininess(32.0);

    }

    display() {

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(1.2, 0.4, 1.0);

        this.scene.translate(0.0, 0.0, -0.5);
        this.birdbodyfront.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-0.2, -0.03, 0.0);

        this.scene.scale(2.0, 0.4, 0.7);

        this.scene.rotate(Math.PI/2, 0.0, 0.0, 1.0);

        this.scene.rotate(Math.PI/4, 0.0, 1.0, 0.0);
        this.tail.display();

        this.scene.popMatrix();

    }
}

