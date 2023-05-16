import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {Pyramid} from "./Pyramid.js";
import {MyUnitCubeQuad} from './MyUnitCubeQuad.js';


export class BirdHead extends CGFobject {
    constructor(scene) {
        super(scene);

        const colors = [[1, 0.65, 0, 1.0], [0, 0, 0, 1.0], [0.5, 0.5, 0.5, 1.0]];

        this.beakMaterial = new CGFappearance(scene);
        this.beakMaterial.setAmbient(...colors[0]);
        this.beakMaterial.setDiffuse(...colors[0]);
        this.beakMaterial.setSpecular(...colors[0]);
        this.beakMaterial.setShininess(32.0);

        this.pupilMaterial = new CGFappearance(scene);
        this.pupilMaterial.setAmbient(...colors[1]);
        this.pupilMaterial.setDiffuse(...colors[1]);
        this.pupilMaterial.setSpecular(...colors[1]);
        this.pupilMaterial.setShininess(32.0);

        this.headMaterial = new CGFappearance(scene);
        this.headMaterial.setAmbient(...colors[2]);
        this.headMaterial.setDiffuse(...colors[2]);
        this.headMaterial.setSpecular(...colors[2]);
        this.headMaterial.setShininess(32.0);

        this.pyramid = new Pyramid(scene, 4, 1);
        this.cube = new MyUnitCubeQuad(scene, null, null, null, null, null, null, this.headMaterial);
        this.beak = new Pyramid(scene, 4, 1);
        this.lefteye = new MyUnitCubeQuad(scene);
        this.leftpupil = new MyUnitCubeQuad(scene, null, null, null, null, null, null, this.pupilMaterial);
        this.righteye = new MyUnitCubeQuad(scene);
        this.rightpupil = new MyUnitCubeQuad(scene, null, null, null, null, null, null, this.pupilMaterial);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.7, 0.0);
        this.scene.rotate(Math.PI / 4, 0.0, 1.0, 0.0);
        this.scene.scale(1.0, 0.5, 1.0);
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.4, 1.4, 1.4);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.2, 0.7);
        this.scene.rotate(Math.PI / 2, 1.0, 0.0, 0.0);
        this.scene.rotate(Math.PI / 4, 0.0, 1.0, 0.0);
        this.scene.scale(0.4, 0.7, 0.4);
        this.beakMaterial.apply();
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
    }
}

