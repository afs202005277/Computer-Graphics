import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {BirdHead} from './BirdHead.js';
import {BirdBody} from './BirdBody.js';
import {BirdFoot} from './BirdFoot.js';
import {BirdWing} from "./BirdWing.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Bird extends CGFobject {
    constructor(scene, speedFactor) {
        super(scene);

        this.wingMaterial1 = new CGFappearance(scene);
        this.wingMaterial1.setAmbient(0.08,0.54, 1, 1.0);
        this.wingMaterial1.setDiffuse(0.08,0.54, 1, 1.0);
        this.wingMaterial1.setSpecular(0.08,0.54, 1, 1.0);
        this.wingMaterial1.setShininess(32.0);

        this.wingMaterial2 = new CGFappearance(scene);
        this.wingMaterial2.setAmbient(0.15,0.33, 0.78, 1.0);
        this.wingMaterial2.setDiffuse(0.15,0.33, 0.78, 1.0);
        this.wingMaterial2.setSpecular(0.15,0.33, 0.78, 1.0);
        this.wingMaterial2.setShininess(32.0);
        
        this.birdhead = new BirdHead(scene);
        this.birdbody = new BirdBody(scene);
        this.birdwingleft = new BirdWing(scene, this.wingMaterial1, this.wingMaterial2);
        this.birdwingright = new BirdWing(scene, this.wingMaterial1, this.wingMaterial2);
        this.birdfootleft = new BirdFoot(scene);
        this.birdfootright = new BirdFoot(scene);

        this.angleWings = 0;
        this.speed = 0;
        this.speedFactor = speedFactor;
        this.incrementHeight = 0;
        this.orientation = 0;
        this.coordinates = [0, 1, 0]
        this.elapsedTime = 0;
    }

    increaseSpeed() {
        this.speed += this.speedFactor;
    }

    decreaseSpeed() {
        this.speed = this.speed - this.speedFactor < 0 ? 0 : this.speed - this.speedFactor;
    }

    rotateLeft() {
        this.orientation += this.speedFactor / 100;
    }

    rotateRight() {
        this.orientation -= this.speedFactor / 100;
    }
    update(t, speedFactor) {
        this.speedFactor = speedFactor;
        this.incrementHeight = Math.sin(t / (Math.PI * 100)) * 0.03;
        this.coordinates = [this.coordinates[0] + (t - this.elapsedTime) / 1000 * this.speed * Math.sin(this.orientation), this.coordinates[1] + this.incrementHeight, this.coordinates[2] + (t - this.elapsedTime) / 1000 * this.speed * Math.cos(this.orientation)]
        this.angleWings = Math.sin(t / 100 * speedFactor) * 30 * Math.PI / 180;

        this.elapsedTime = t;
    }

    transformVertex(matrix, vertex) {
        // Create a 4-element vector for the vertex
        var vec4Vertex = vec4.fromValues(vertex[0], vertex[1], vertex[2], 1.0);

        // Multiply the vertex by the transformation matrix
        vec4.transformMat4(vec4Vertex, vec4Vertex, matrix);

        // Extract the transformed vertex coordinates from the resulting vector
        // Return the transformed vertex
        return [vec4Vertex[0], vec4Vertex[1], vec4Vertex[2]];
    }


    display() {

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 0, 1, 0);
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

    }
}

