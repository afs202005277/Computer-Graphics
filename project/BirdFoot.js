import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js';
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';


export class BirdFoot extends CGFobject {
    constructor(scene) {
        super(scene);

        const materialColor = [1, 0.65, 0, 1.0]

        this.material = new CGFappearance(scene);
        this.material.setAmbient(...materialColor);
        this.material.setDiffuse(...materialColor);
        this.material.setSpecular(...materialColor);
        this.material.setShininess(32.0);

        this.leg = new MyCylinder(scene, 8, 1);
        this.backtoe = new MyUnitCubeQuad(scene, null, null, null, null, null, null, this.material);
        this.toe1 = new MyCylinder(scene, 5, 1);
        this.toe2 = new MyCylinder(scene, 5, 1);
        this.toe3 = new MyCylinder(scene, 5, 1);

    }

    display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1.0, 0.0, 0.0);
        this.scene.scale(0.08, 0.08, 0.7);
        this.scene.translate(0, 0, 0.1);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.1, -0.1);
        this.scene.scale(0.18, 0.1, 0.25);
        this.backtoe.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.1, 0.0);
        this.scene.scale(0.08, 0.08, 0.5);
        this.toe2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.1, 0.0);
        this.scene.rotate(Math.PI / 5, 0.0, 1.0, 0.0);
        this.scene.scale(0.08, 0.08, 0.5);
        this.toe3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.1, 0.0);
        this.scene.rotate(-Math.PI / 5, 0.0, 1.0, 0.0);
        this.scene.scale(0.08, 0.08, 0.5);
        this.toe1.display();
        this.scene.popMatrix();
    }
}

