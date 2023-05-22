import {CGFscene, CGFcamera, CGFaxis, CGFtexture} from "../lib/CGF.js";
import {MyPanorama} from "./MyPanorama.js";
import {Bird} from "./Bird.js";
import {MyTerrain} from "./MyTerrain.js";
import {Nest} from "./Nest.js";
import {MyBirdEgg} from "./MyBirdEgg.js";
import {MyTreeRowPatch} from "./MyTreeRowPatch.js";
import {MyTreeGroupPatch} from "./MyTreeGroupPatch.js";

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
        this.enableTextures(true);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 2.0;
        this.speedFactor = 1.5;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.bird = new Bird(this);
        this.nest = new Nest(this);
        this.groupPatch = new MyTreeGroupPatch(this, -60, 40);
        this.rowPatch = new MyTreeRowPatch(this, 90, -40);
        this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
        this.eggs = [
            new MyBirdEgg(this),
            new MyBirdEgg(this),
            new MyBirdEgg(this),
            new MyBirdEgg(this)
        ];
        this.nest = new Nest(this, this.eggs.length);
        this.nestSize = [10, 10, 10];

        this.setUpdatePeriod(50); // 50 ms

        this.eggsFallingToNest = [];
        this.eggsSize = [2.2, 2.2, 2.2];

        this.checkDistance = 10;
        this.thresholdNest = 9;
        this.thresholdBird = 4;
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
            vec3.fromValues(-256.7447204589844, 26.567428588867188, -60.517398834228516),
            vec3.fromValues(-4.092823028564453, -3.761986255645752, 13.172765731811523)
        );
    }

    update(t) {
        let key = this.checkKeys();
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
                else if (key === "P" && this.bird.egg == null) {
                    this.bird.goingDown = true;
                } else if (key === "L") {
                    this.bird.dropEgg();
                    this.checkDistance = 0;
                } else if (key === "O") {
                    let possibleEgg = this.bird.dropEggInNest(this.nest.coordinates, this.thresholdNest);
                    if (possibleEgg.length !== 0) {
                        this.eggsFallingToNest.push(possibleEgg[0]);
                    }
                    this.checkDistance = 0;
                }
            }
        }
        this.bird.update(t, this.speedFactor);
        this.checkDistanceFromAllEggsToNest();
        if (this.checkDistance < 10)
            this.checkDistance++;
        else
            this.eggs = this.bird.checkDistancesToEggs(this.eggs, this.thresholdBird);
        this.terrain.update(t);

        this.eggs.forEach(egg => {
            egg.falling(this.speedFactor);
        });

        this.eggsFallingToNest.forEach(egg => {
            egg.nest_falling(this.speedFactor, this.nest.coordinates);
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
        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.rotate(Math.PI, 0, 1, 0);
        this.panorama.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(...(this.bird.coordinates));
        this.scale(this.scaleFactor * 1.5, this.scaleFactor * 1.5, this.scaleFactor * 1.5);
        this.bird.display();
        this.popMatrix();

        if (this.bird.egg != null) {
            this.pushMatrix();
            this.translate(this.bird.coordinates[0], this.bird.coordinates[1] - 4, this.bird.coordinates[2]);
            this.scale(2.2, 2.2, 2.2);
            this.bird.egg.display();
            this.popMatrix();
        }

        this.pushMatrix();
        this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.groupPatch.display();
        this.popMatrix();

        this.pushMatrix();
        this.rowPatch.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(...this.nest.coordinates);
        this.scale(...this.nestSize);
        this.nest.display();
        this.popMatrix();

        for (let i = 0; i < this.eggs.length; i++) {
            this.pushMatrix();
            this.translate(...(this.eggs[i].coordinates));
            this.rotate(...(this.eggs[i].rotation));
            this.scale(...this.eggsSize);
            this.eggs[i].display();
            this.popMatrix();
        }

        for (let i = 0; i < this.eggsFallingToNest.length; i++) {
            this.pushMatrix();
            this.translate(...(this.eggsFallingToNest[i].coordinates));
            this.scale(...this.eggsSize);
            this.eggsFallingToNest[i].display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }

    checkDistanceFromAllEggsToNest() {
        for (let i = 0; i < this.eggs.length; i++) {
            if (this.eggs[i].checkDistanceToNest(this.nest.coordinates, this.thresholdNest)) {
                this.eggs.splice(i, 1);
                this.nest.counter++;
                break;
            }
        }
        for (let i = 0; i < this.eggsFallingToNest.length; i++) {
            if (this.eggsFallingToNest[i].checkDistanceToNest(this.nest.coordinates, this.thresholdNest)) {
                this.eggsFallingToNest.splice(i, 1);
                this.nest.counter++;
                break;
            }
        }
    }

    checkKeys() {
        let text = "";
        let keysPressed = false;
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
        if (this.gui.isKeyPressed("KeyL")) {
            text += "L";
            keysPressed = true;
        }
        if (keysPressed)
            return text;
    }
}
