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

    static default_values = {
        'angle': 0,
        'speed': 0,
        'incrementHeight': 0,
        'orientation': 0,
        'coordinates': [-160, -2, -41],
        'elapsedTime': 0,
        'goingDown': false
    };

    setDefaults() {
        this.angleWings = Bird.default_values['angle'];
        this.speed = Bird.default_values['speed'];
        this.incrementHeight = Bird.default_values['incrementHeight'];
        this.orientation = Bird.default_values['orientation'];
        this.coordinates = Bird.default_values['coordinates']
        this.elapsedTime = Bird.default_values['elapsedTime'];
        this.goingDown = Bird.default_values['goingDown'];
    }

    constructor(scene) {
        super(scene);

        this.bird_default_height = Bird.default_values['coordinates'][1];
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

        this.setDefaults();

        this.egg = null;
    }

    accelerate(speedFactor) {
        this.speed += speedFactor;
        if (this.speed < 0)
            this.speed = 0;
    }

    turn(speedFactor) {
        this.orientation += speedFactor / 25;
    }

    reset() {
        this.setDefaults();
    }

    checkBoundaries(height_terrain, speedFactor) {
        if (this.coordinates[1] > height_terrain) {
            this.coordinates[1] -= speedFactor * 0.2;
            this.coordinates[1] = Math.max(height_terrain, this.coordinates[1]);
        }
    }

    go_down() {
        let value = MyTerrain.get_height_from_heightmap(Math.floor((this.coordinates[0] + 200) / 400 * 128), 128 + Math.floor((this.coordinates[2] - 200) / 400 * 128));
        this.checkBoundaries(value, null);
        if (value + 1 >= this.coordinates[1]) {
            this.goingDown = false;
        }

        this.checkBoundaries(value, (this.bird_default_height - value) * 0.4);
    }

    go_up(speedFactor) {
        let value = MyTerrain.get_height_from_heightmap(Math.floor((this.coordinates[0] + 200) / 400 * 128), 128 + Math.floor((this.coordinates[2] - 200) / 400 * 128));
        this.checkBoundaries(value, null);
        this.coordinates[1] += (this.bird_default_height - value) * 0.4 * 0.2;
        this.coordinates[1] = Math.min(this.bird_default_height, this.coordinates[1]);
    }

    update(t, speedFactor) {
        if (this.goingDown) {
            this.go_down();
        } else if (this.coordinates[1] < this.bird_default_height - 0.5 && this.goingDown === false) {
            this.go_up(speedFactor);
        }

        this.incrementHeight = Math.sin(t / (Math.PI * 100)) * 0.03;
        this.coordinates = [this.coordinates[0] + (t - this.elapsedTime) / 1000 * this.speed * Math.sin(this.orientation), this.coordinates[1] + this.incrementHeight, this.coordinates[2] + (t - this.elapsedTime) / 1000 * this.speed * Math.cos(this.orientation)]
        this.angleWings = Math.sin(t / 100 * speedFactor) * 30 * Math.PI / 180;
        this.elapsedTime = t;
    }

    dropEgg() {
        if (this.egg != null) {
            this.egg.coordinates = [this.coordinates[0], this.coordinates[1] - 4.5, this.coordinates[2]];
            this.scene.eggs.push(this.egg);
            this.scene.eggRotations.push([Math.PI, 0, 0, 0]);
            this.egg = null;
        }
    }

    dropEggInNest(nestCoordinates, threshold) {
        let res = [];
        let distance_to_nest_horizontal = Math.sqrt((nestCoordinates[0] - this.coordinates[0]) ** 2 + (nestCoordinates[2] - this.coordinates[2]) ** 2);
        if (this.egg != null && distance_to_nest_horizontal < threshold) {
            this.egg.coordinates = [this.coordinates[0], this.coordinates[1] - 4.5, this.coordinates[2]];
            res.push(this.egg);
            this.egg = null;
        }
        return res;
    }

    checkDistancesToEggs(eggs, threshold) {
        if (this.egg == null) {
            for (let i = 0; i < eggs.length; i++) {
                let egg_coord = eggs[i].coordinates;
                let distance_to_bird = Math.sqrt((this.coordinates[0] - egg_coord[0]) ** 2 + (this.coordinates[1] - egg_coord[1]) ** 2 + (this.coordinates[2] - egg_coord[2]) ** 2);
                if (distance_to_bird < threshold) {
                    let egg_removed = eggs.splice(i, 1);
                    this.egg = egg_removed[0];
                    break;
                }
            }
        }
        return eggs;
    }

    display() {

        this.scene.pushMatrix();

        this.scene.scale(0.8, 0.8, 0.8);

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
        this.scene.popMatrix();

    }
}

