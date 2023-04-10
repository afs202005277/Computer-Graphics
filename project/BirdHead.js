import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {Pyramid} from "./Pyramid.js";
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class BirdHead extends CGFobject {
    constructor(scene) {
        super(scene);

        this.texture = new CGFtexture(scene, 'images/tangram.png');


        this.pyramid = new Pyramid(scene, 4, 1);
        this.cube = new MyUnitCubeQuad(scene);
        this.beak = new Pyramid(scene, 4, 1);
        this.lefteye = new MyUnitCubeQuad(scene);
        this.leftpupil = new MyUnitCubeQuad(scene);
        this.righteye = new MyUnitCubeQuad(scene);
        this.rightpupil = new MyUnitCubeQuad(scene);

    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.7, 0.0);

        this.scene.rotate(Math.PI/4, 0.0, 1.0, 0.0);

        this.scene.scale(1.0, 0.5, 1.0);

        this.pyramid.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.scale(1.4, 1.4, 1.4);

        this.cube.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.0, -0.2, 0.7);

        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);

        this.scene.rotate(Math.PI/4, 0.0, 1.0, 0.0);

        this.scene.scale(0.4, 0.7, 0.4);

        this.beak.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.72, 0.2, 0.2);

        this.scene.scale(0.05, 0.36, 0.36);

        this.lefteye.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.75, 0.2, 0.2);

        this.scene.scale(0.02, 0.2, 0.2);

        this.leftpupil.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-0.72, 0.2, 0.2);

        this.scene.scale(0.05, 0.36, 0.36);

        this.righteye.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-0.75, 0.2, 0.2);

        this.scene.scale(0.02, 0.2, 0.2);

        this.rightpupil.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
    }

    updateBuffers() {
    }
}

