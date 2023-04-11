import {CGFobject} from '../lib/CGF.js';
import {BirdHead} from './BirdHead.js';
import {BirdBody} from './BirdBody.js';
import {BirdWing} from './BirdWing.js';
import {BirdFoot} from './BirdFoot.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Bird extends CGFobject {
    constructor(scene, speedFactor) {
        super(scene);

        this.birdhead = new BirdHead(scene);
        this.birdbody = new BirdBody(scene);
        this.birdwingleft = new BirdWing(scene);
        this.birdwingright = new BirdWing(scene);
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
        this.coordinates = [this.coordinates[0] + (t - this.elapsedTime) / 1000 * this.speed * Math.cos(this.orientation), this.coordinates[1] + this.incrementHeight, this.coordinates[2] + (t - this.elapsedTime) / 1000 * this.speed * Math.sin(this.orientation)]
        this.angleWings = Math.sin(t / (Math.PI * 100)) * speedFactor;

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

        this.birdbody.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.35, 0.6, 0.0);
        this.scene.scale(0.41, 0.41, 0.41);
        this.scene.rotate(Math.PI / 2, 0.0, 1.0, 0.0);

        this.birdhead.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(1.6, -1.3, -0.7);

        this.scene.rotate(Math.PI / 6, 0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI / 2, 1.0, 0.0, 0.0);

        let matrix = this.scene.getMatrix();
        let secondVertex = this.birdwingleft.wing1.vertices.slice(0, 3);
        let firstVertex = this.birdwingleft.wing1.vertices.slice(3, 6);

        firstVertex = this.transformVertex(matrix, firstVertex);
        secondVertex = this.transformVertex(matrix, secondVertex);

        this.scene.rotate(this.angleWings, 0, firstVertex[1] - secondVertex[1], 0);
        this.birdwingleft.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-3.8, -4, 0.0);

        this.scene.rotate(Math.PI / 3, 0.0, 0.0, 1.0);

        this.scene.scale(1.0, -1.0, -1.0);
        firstVertex = this.birdwingright.wing4.vertices.slice(0, 3);
        secondVertex = this.birdwingright.wing4.vertices.slice(3, 6);
        matrix = this.scene.getMatrix();
        firstVertex = this.transformVertex(matrix, firstVertex);
        secondVertex = this.transformVertex(matrix, secondVertex);

        const print = [];
        for (let i=0;i<this.birdwingright.wing4.vertices.length;i+=3){
            const tmp = this.transformVertex(matrix, this.birdwingright.wing4.vertices.slice(i, i+3));
            print.push(tmp[0], tmp[1], tmp[2]);
        }
        console.log(this.birdwingright.wing4.vertices);
        console.log(print);
        this.scene.rotate(-this.angleWings, 0, firstVertex[1] - secondVertex[1], 0);
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

