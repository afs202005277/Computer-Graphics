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

    static texture = null;

    constructor(scene) {
        super(scene);

        if (MyBirdEgg.texture === null)
            MyBirdEgg.texture = new CGFtexture(scene, 'images/egg.png');
        this.bottom = new MyOval(scene, 30, 30, false);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(100);
        this.appearance.setTexture(MyBirdEgg.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        let location = [-45 * Math.random(), 0, 45 * Math.random()];

        this.coordinates = [-150 + location[0], -21 + location[1], -71 + location[2]];
        this.rotation = [Math.PI, Math.random(), Math.random(), Math.random()];
        this.initBuffers();
    }

    checkBoundaries(value, speedFactor) {
        if (this.coordinates[1] > value) {
            this.coordinates[1] -= speedFactor * 0.50;
            this.coordinates[1] = Math.max(this.coordinates[1], value);
        }
    }

    falling(speedFactor) {
        const res = MyTerrain.get_height_from_heightmap(...MyTerrain.convertToTerrainCoordinates(this.coordinates[0], this.coordinates[2]));
        this.checkBoundaries(res, speedFactor);
    }

    checkDistanceToNest(nestCoordinates, threshold) {
        let near = false;
        let distance_to_nest = Math.sqrt((nestCoordinates[0] - this.coordinates[0]) ** 2 + (nestCoordinates[1] - this.coordinates[1]) ** 2 + (nestCoordinates[2] - this.coordinates[2]) ** 2);
        if (distance_to_nest < threshold) {
            near = true;
        }
        return near;
    }

    nest_falling(speedFactor, nest_coordinates) {
        const targetPosition = [nest_coordinates[0], nest_coordinates[1], nest_coordinates[2]];

        const displacementVector = [
            targetPosition[0] - this.coordinates[0],
            targetPosition[1] - this.coordinates[1],
            targetPosition[2] - this.coordinates[2]
        ];

        const displacementLength = Math.sqrt(
            displacementVector[0] * displacementVector[0] +
            displacementVector[1] * displacementVector[1] +
            displacementVector[2] * displacementVector[2]
        );

        const stepSize = speedFactor * 0.5;

        if (displacementLength <= stepSize) {
            this.coordinates[0] = targetPosition[0];
            this.coordinates[1] = targetPosition[1];
            this.coordinates[2] = targetPosition[2];
        } else {
            const displacementUnitVector = displacementVector.map(component => component / displacementLength);
            const displacementStepVector = displacementUnitVector.map(component => component * stepSize);
            this.coordinates[0] += displacementStepVector[0];
            this.coordinates[1] += displacementStepVector[1];
            this.coordinates[2] += displacementStepVector[2];
        }
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.bottom.display();
        this.scene.popMatrix();
    }
}

