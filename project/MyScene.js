import {CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture} from "../lib/CGF.js";
import {MyPanorama} from "./MyPanorama.js";
import {Bird} from "./Bird.js";
import {MyTerrain} from "./MyTerrain.js";
import { Nest } from "./Nest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import {MyBillboard} from "./MyBillboard.js";
import {MyTreeRowPatch} from "./MyTreeRowPatch.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 3.0;
        this.speedFactor = 1.5;
        this.bird = new Bird(this);

        this.eggs = [
            new MyBirdEgg(this),
            new MyBirdEgg(this),
            new MyBirdEgg(this),
            new MyBirdEgg(this),
        ]
        let eggLocations = this.eggs.map((egg) => {
            return [-45*Math.random(), 0, 45*Math.random()]
        })
        this.eggRotations = this.eggs.map((egg) => {
            return [Math.PI, Math.random(), Math.random(), Math.random()];
        })

        for (let i = 0; i < this.eggs.length; i++) {
            this.eggs[i].coordinates = [-150 + eggLocations[i][0], -21+eggLocations[i][1], -71+eggLocations[i][2]];
        }

        this.nest = new Nest(this, this.eggs.length);
        this.patch = new MyTreeRowPatch(this);

        this.treeMaterial = new CGFappearance(this);
        this.treeMaterial.setAmbient(1.0, 1, 1, 1);
        this.treeMaterial.setDiffuse(1.0, 1, 1, 1);
        this.treeMaterial.setSpecular(1.0, 1, 1, 1);
        this.treeMaterial.setShininess(100);
        this.treeMaterial.setTexture(new CGFtexture(this, "images/billboardtree.png"));
        this.treeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.billboard = new MyBillboard(this, this.treeMaterial);
        this.enableTextures(true);

        this.texture = new CGFtexture(this, "images/panorama4.jpg");
        this.appearance = new CGFappearance(this);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(1, 1, 1, 1.0);

        // this.appearance.setTexture(this.texture);
        // this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.panorama = new MyPanorama(this, this.texture)

        this.setUpdatePeriod(50); // 50 ms
    }

    initLights() {
        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(-220, 9, -55),
            vec3.fromValues(0, 0, 0)
        );
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update(t) {
        let key = this.checkKeys();
        let pressingp = false;
        let check_distance = true;
        if (key !== undefined) {
            for (const letter of key) {
                if (letter === "W")
                    this.bird.accelerate(this.speedFactor);
                else if (letter === "S")
                    this.bird.accelerate(-this.speedFactor);
                else if (letter === "A")
                    this.bird.turn(this.speedFactor);
                else if (letter === "D")
                    this.bird.turn(-this.speedFactor);
                else if (letter === "R")
                    this.bird.reset();
                else if (key === "P") {
                    pressingp = true;
                }
                else if (key === "O") {
                    this.bird_drop_egg();
                    check_distance = false;
                }
            }
        }
        this.bird.update(t, this.speedFactor, pressingp);
        this.check_distance_from_eggs_to_nest();
        if (check_distance)
            this.check_distances_to_eggs();
        this.terrain.update(t);

        this.eggs.forEach(egg => {
            MyTerrain.ground_level(Math.floor((egg.coordinates[0]+200)/400*128), 128+Math.floor((egg.coordinates[2]-200)/400*128)).then(value => {
                if (egg.coordinates[1] > value) {
                    egg.coordinates[1] -= this.speedFactor*0.50;
                    egg.coordinates[1] = Math.max(egg.coordinates[1], value);
                }
            })
        });
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.appearance.apply();
        this.rotate(Math.PI, 0, 1, 0);
        this.panorama.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(this.bird.coordinates[0], this.bird.coordinates[1], this.bird.coordinates[2]);
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.bird.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, -100, 0);
        this.scale(400, 400, 400);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(7, 10, 7);
        this.translate(this.bird.coordinates[0]+40, this.bird.coordinates[1]+10, this.bird.coordinates[2]+10);
        this.patch.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(...this.nest.coordinates);
        this.scale(6, 6, 6);
        this.nest.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(5, 10, 5);
        this.billboard.display(this.bird.coordinates[0], this.bird.coordinates[1]+10, this.bird.coordinates[2]);
        this.popMatrix();

        for (let i = 0; i < this.eggs.length; i++) {
            this.pushMatrix();
            this.translate(this.eggs[i].coordinates[0], this.eggs[i].coordinates[1], this.eggs[i].coordinates[2]);
            this.rotate(this.eggRotations[i][0], this.eggRotations[i][1], this.eggRotations[i][2], this.eggRotations[i][3]);
            this.scale(2.2, 2.2, 2.2);
            this.eggs[i].display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }

    bird_drop_egg() {
        if (this.bird.egg != null) {
            this.bird.egg.coordinates = [this.bird.coordinates[0], this.bird.coordinates[1]-4.5, this.bird.coordinates[2]];
            this.eggs.push(this.bird.egg);
            this.eggRotations.push([Math.PI, 0, 0, 0]);
            this.bird.egg = null;
        }
    }

    check_distances_to_eggs() {

        if (this.bird.egg == null) {
            for (let i = 0; i < this.eggs.length; i++) {
                let egg_coord = this.eggs[i].coordinates;
                let distance_to_bird = Math.sqrt((this.bird.coordinates[0] - egg_coord[0])**2 + (this.bird.coordinates[1] - egg_coord[1])**2 + (this.bird.coordinates[2] - egg_coord[2])**2);
                if (distance_to_bird < 4) {
                    let egg_removed = this.eggs.splice(i, 1);
                    this.eggRotations.splice(i, 1);
                    this.bird.egg = egg_removed[0];
                    break;
                }
            }
        }

    }

    check_distance_from_eggs_to_nest() {

        let distances = [];
        for (let i = 0; i < this.eggs.length; i++) {
            let egg_coord = this.eggs[i].coordinates;
            let distance_to_nest = Math.sqrt((this.nest.coordinates[0] - egg_coord[0])**2 + (this.nest.coordinates[1] - egg_coord[1])**2 + (this.nest.coordinates[2] - egg_coord[2])**2);
            distances.push(distance_to_nest);
            if (distance_to_nest < 4) {
                this.eggs.splice(i, 1);
                this.eggRotations.splice(i, 1);
                this.nest.counter++;
                break;
            }
        }

        console.log(distances)

    }

    checkKeys() {
        var text = "";
        var keysPressed = false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += "W";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += "S";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += "A";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += "D";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text += "R";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += "P";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyO")) {
            text += "O";
            keysPressed = true;
        }
        if (keysPressed)
            return text;
    }
}
