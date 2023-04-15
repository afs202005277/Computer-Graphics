import {CGFscene, CGFcamera, CGFaxis, CGFappearance} from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyTangram } from "./MyTangram.js";
import {BirdWing} from "../project/BirdWing.js";

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
    this.unitcubequad = new MyUnitCubeQuad(this);
    this.tangram = new MyTangram(this);

    this.wingMaterial1 = new CGFappearance(this);
    this.wingMaterial1.setAmbient(0.08,0.54, 1, 1.0);
    this.wingMaterial1.setDiffuse(0.08,0.54, 1, 1.0);
    this.wingMaterial1.setSpecular(0.08,0.54, 1, 1.0);
    this.wingMaterial1.setShininess(32.0);

    this.wingMaterial2 = new CGFappearance(this);
    this.wingMaterial2.setAmbient(0.15,0.33, 0.78, 1.0);
    this.wingMaterial2.setDiffuse(0.15,0.33, 0.78, 1.0);
    this.wingMaterial2.setSpecular(0.15,0.33, 0.78, 1.0);
    this.wingMaterial2.setShininess(32.0);

    this.wing = new BirdWing(this, this.wingMaterial1, this.wingMaterial2);

    //Objects connected to MyInterface
    this.displayTriangle = true;
    this.displayDiamond = true;
    this.displayParallelogram = true;
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    this.translate(0.5, 0, 0);
    this.wing.display();

    this.setDefaultAppearance();

  }
}
