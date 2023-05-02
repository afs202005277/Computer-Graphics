import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyOval} from "./MyOval.js";
import {MyTerrain} from "./MyTerrain.js";
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyBirdEgg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.bottom = new MyOval(scene, 30, 30, false);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(100);
        this.appearance.setTexture(new CGFtexture(scene, "images/egg.png"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.coordinates = [0, 0, 0];
    }

    checkBoundaries(value, speedFactor){
        if (this.coordinates[1] > value) {
            this.coordinates[1] -= speedFactor*0.50;
            this.coordinates[1] = Math.max(this.coordinates[1], value);
        }
    }

    falling(speedFactor){
        MyTerrain.ground_level(Math.floor((this.coordinates[0]+200)/400*128), 128+Math.floor((this.coordinates[2]-200)/400*128), this, true, speedFactor);
    }

    nest_falling(speedFactor, nest_coordinates) {
        // Assuming "object" is the object falling and "nest" is the destination object containing x, y, and z coordinates
        const targetPosition = [nest_coordinates[0], nest_coordinates[1], nest_coordinates[2]]; // Extract the target position into an array

        const displacementVector = [ // Calculate the displacement vector from the object's current position to the target position
        targetPosition[0] - this.coordinates[0],
        targetPosition[1] - this.coordinates[1],
        targetPosition[2] - this.coordinates[2]
        ];

        const displacementLength = Math.sqrt( // Calculate the length of the displacement vector
        displacementVector[0] * displacementVector[0] +
        displacementVector[1] * displacementVector[1] +
        displacementVector[2] * displacementVector[2]
        );

        const stepSize = speedFactor * 0.5; // Calculate the distance the object moves each frame

        if (displacementLength <= stepSize) { // If the object is already close enough to the target, move it directly to the target position
        this.coordinates[0] = targetPosition[0];
        this.coordinates[1] = targetPosition[1];
        this.coordinates[2] = targetPosition[2];
        } else { // Otherwise, move the object a fraction of the displacement vector towards the target
        const displacementUnitVector = displacementVector.map(component => component / displacementLength); // Calculate the unit vector in the direction of the displacement vector
        const displacementStepVector = displacementUnitVector.map(component => component * stepSize); // Calculate the displacement vector for this frame
        this.coordinates[0] += displacementStepVector[0];
        this.coordinates[1] += displacementStepVector[1];
        this.coordinates[2] += displacementStepVector[2];
        }
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(1, 1, 1);
        this.bottom.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

