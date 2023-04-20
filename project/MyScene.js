import {CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture} from "../lib/CGF.js";
import {MyPanorama} from "./MyPanorama.js";
import {Bird} from "./Bird.js";
import {MyTerrain} from "./MyTerrain.js";
import { Nest } from "./Nest.js";

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
        this.scaleFactor = 1;
        this.speedFactor = 1.5;
        this.bird = new Bird(this, this.speedFactor);
        this.nest = new Nest(this);
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
        if (key !== undefined) {
            console.log(key);
            for (const letter of key) {
                console.log(letter);
                if (key === "W")
                    this.bird.increaseSpeed();
                else if (key === "S")
                    this.bird.decreaseSpeed();
                else if (key === "A")
                    this.bird.rotateLeft();
                else if (key === "D")
                    this.bird.rotateRight();
                else if (key === "R") {
                    this.bird.reset();
                }
            }
        }
        this.bird.update(t, this.speedFactor);
        this.terrain.update(t);
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
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scale(2.5, 2.5, 2.5);
        this.rotate(this.bird.orientation, 0, 1, 0);
        this.translate(this.bird.coordinates[0], this.bird.coordinates[1], this.bird.coordinates[2]);
        this.bird.display();
        this.popMatrix();


        this.pushMatrix();
        this.translate(0, -100, 0);
        this.scale(400, 400, 400);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-160, -23, -41);
        this.scale(6, 6, 6);
        this.nest.display();
        this.popMatrix();



        // ---- END Primitive drawing section
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
        if (keysPressed)
            return text;
    }
}
