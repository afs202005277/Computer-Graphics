import {CGFobject, CGFtexture} from '../lib/CGF.js';
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

        this.texture = new CGFtexture(scene, 'images/tangram.png');


        this.leg = new MyCylinder(scene, 8, 1);
        this.backtoe = new MyUnitCubeQuad(scene);
        this.toe1 = new MyCylinder(scene, 5, 1);
        this.toe2 = new MyCylinder(scene, 5, 1);
        this.toe3 = new MyCylinder(scene, 5, 1);

    }

    display() {

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);

        this.scene.scale(0.13, 0.13, 1.3);

        this.leg.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.05, -0.1);

        this.scene.scale(0.18, 0.1, 0.25);

        this.backtoe.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.scale(0.1, 0.1, 0.6);

        this.toe2.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.rotate(Math.PI/5, 0.0, 1.0, 0.0);

        this.scene.scale(0.1, 0.1, 0.6);

        this.toe3.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.1, 0.0);

        this.scene.rotate(-Math.PI/5, 0.0, 1.0, 0.0);

        this.scene.scale(0.1, 0.1, 0.6);

        this.toe1.display();

    }

    updateBuffers() {
    }
}

