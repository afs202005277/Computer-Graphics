import { CGFobject } from '../lib/CGF.js';
import { BirdHead } from './BirdHead.js';
import { BirdBody } from './BirdBody.js';
import { BirdWing } from './BirdWing.js';
import { BirdFoot } from './BirdFoot.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Bird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.birdhead = new BirdHead(scene);
        this.birdbody = new BirdBody(scene);
        this.birdwingleft = new BirdWing(scene);
        this.birdwingright = new BirdWing(scene);
        this.birdfootleft = new BirdFoot(scene);
        this.birdfootright = new BirdFoot(scene);

    }

    display() {

        this.scene.pushMatrix();

        this.birdbody.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.35, 0.6, 0.0);
        this.scene.scale(0.41, 0.41, 0.41);
        this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);

        this.birdhead.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(1.6, -1.3, -0.7);

        this.scene.rotate(Math.PI/6, 0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);

        this.birdwingleft.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        //this.scene.translate(1.6, -1.3, -0.7);

        //this.scene.rotate(Math.PI/6, 0.0, 1.0, 0.0);
        //this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);

        this.scene.translate(-3.8, -4, 0.0);

        this.scene.rotate(Math.PI/3, 0.0, 0.0, 1.0);

        this.scene.scale(1.0, -1.0, -1.0);

        this.birdwingright.display();

        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.translate(-0.6, -3.5, -1.0);

        this.birdfootleft.display();

        this.scene.popMatrix();

        this.scene.translate(1.2, 0.0, 0.0);

        this.birdfootright.display();

    }

    updateBuffers() {
    }
}

