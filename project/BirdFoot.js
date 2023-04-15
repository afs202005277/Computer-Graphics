import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdFoot extends CGFobject {
    constructor(scene) {
        super(scene);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1,0.65, 0, 1.0);
        this.material.setDiffuse(1,0.65, 0, 1.0);
        this.material.setSpecular(1,0.65, 0, 1.0);
        this.material.setShininess(32.0);

        this.leg = new MyCylinder(scene, 8, 1);
        this.backtoe = new MyUnitCubeQuad(scene, null, null, null, null, null, null, this.material);
        this.toe1 = new MyCylinder(scene, 5, 1);
        this.toe2 = new MyCylinder(scene, 5, 1);
        this.toe3 = new MyCylinder(scene, 5, 1);

    }

    display() {

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);

        this.scene.scale(0.08, 0.08, 0.7);
        this.scene.translate(0, 0, 0.1);
        this.material.apply();
        this.leg.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, -0.1);

        this.scene.scale(0.18, 0.1, 0.25);

        this.material.apply();
        this.backtoe.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.scale(0.08, 0.08, 0.5);

        this.material.apply();
        this.toe2.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.rotate(Math.PI/5, 0.0, 1.0, 0.0);

        this.scene.scale(0.08, 0.08, 0.5);

        this.material.apply();
        this.toe3.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.rotate(-Math.PI/5, 0.0, 1.0, 0.0);

        this.scene.scale(0.08, 0.08, 0.5);

        this.material.apply();
        this.toe1.display();
        this.scene.popMatrix();
    }
}

