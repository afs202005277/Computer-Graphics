import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {BirdHead} from './BirdHead.js';
import {BirdBody} from './BirdBody.js';
import {BirdFoot} from './BirdFoot.js';
import {BirdWing} from "./BirdWing.js";
import {MyTerrain} from './MyTerrain.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Bird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.wingMaterial1 = new CGFappearance(scene);
        this.wingMaterial1.setAmbient(0.08, 0.54, 1, 1.0);
        this.wingMaterial1.setDiffuse(0.08, 0.54, 1, 1.0);
        this.wingMaterial1.setSpecular(0.08, 0.54, 1, 1.0);
        this.wingMaterial1.setShininess(32.0);

        this.wingMaterial2 = new CGFappearance(scene);
        this.wingMaterial2.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.wingMaterial2.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.wingMaterial2.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.wingMaterial2.setShininess(32.0);

        this.birdhead = new BirdHead(scene);
        this.birdbody = new BirdBody(scene);
        this.birdwingleft = new BirdWing(scene, this.wingMaterial1, this.wingMaterial2, true);

        this.birdwingright = new BirdWing(scene, this.wingMaterial1, this.wingMaterial2, false);
        this.birdfootleft = new BirdFoot(scene);
        this.birdfootright = new BirdFoot(scene);

        this.angleWings = 0;
        this.speed = 0;
        this.incrementHeight = 0;
        this.orientation = 0;
        this.coordinates = [-160, -18, -41]
        this.elapsedTime = 0;

        this.egg = null;
    }

    accelerate(speedFactor) {
        this.speed += speedFactor;
        if (this.speed < 0)
            this.speed = 0;
    }

    turn(speedFactor) {
        this.orientation += speedFactor / 50;
    }

    reset() {
        this.angleWings = 0;
        this.speed = 0;
        this.incrementHeight = 0;
        this.orientation = 0;
        this.coordinates = [-160, -18, -41]
        this.elapsedTime = 0;
    }

    go_down(speedFactor) {
        MyTerrain.ground_level(Math.floor((this.coordinates[0] + 200) / 400 * 128), 128 + Math.floor((this.coordinates[2] - 200) / 400 * 128)).then(height_terrain => {

            if (this.coordinates[1] > height_terrain) {
                this.coordinates[1] -= speedFactor * 0.2;
                this.coordinates[1] = Math.max(height_terrain, this.coordinates[1]);
            }
        });
    }

    go_up(speedFactor) {
        this.coordinates[1] += speedFactor * 0.2;
        this.coordinates[1] = Math.min(-18, this.coordinates[1]);
    }

    update(t, speedFactor, pressingp) {

        if (pressingp) {
            this.go_down(speedFactor);
        } else if (this.coordinates[1] < -18.5) {
            this.go_up(speedFactor);
        }

        this.incrementHeight = Math.sin(t / (Math.PI * 100)) * 0.03;
        this.coordinates = [this.coordinates[0] + (t - this.elapsedTime) / 1000 * this.speed * Math.sin(this.orientation), this.coordinates[1] + this.incrementHeight, this.coordinates[2] + (t - this.elapsedTime) / 1000 * this.speed * Math.cos(this.orientation)]
        this.angleWings = Math.sin(t / 100 * speedFactor) * 30 * Math.PI / 180;
        this.elapsedTime = t;
    }

    display() {

        this.scene.pushMatrix();

        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.birdbody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 0.3);
        this.scene.scale(0.41, 0.41, 0.41);
        this.birdhead.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(this.angleWings, 0, 0, 1);
        this.birdwingleft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(this.angleWings, 0, 0, 1);
        this.birdwingright.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, -1.0, 0.0);
        this.birdfootleft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, -1.0, 0.0);
        this.birdfootright.display();
        this.scene.popMatrix();

        if (this.egg != null) {
            this.scene.pushMatrix();
            this.scene.translate(0.0, -2, 0.0);
            this.egg.display();
            this.scene.popMatrix();
        }


        this.scene.popMatrix();

    }
}

