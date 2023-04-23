import {CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyTangram } from "./MyTangram.js";
import {BirdWing} from "../project/BirdWing.js";
import {MyBirdEgg} from "../project/MyBirdEgg.js";
import {MyBillboard} from "../project/MyBillboard.js";

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

    //Objects connected to MyInterface
    this.displayTriangle = true;
    this.displayDiamond = true;
    this.displayParallelogram = true;
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(1.0, 1, 1, 1);
    this.appearance.setDiffuse(1.0, 1, 1, 1);
    this.appearance.setSpecular(1.0, 1, 1, 1);
    this.appearance.setShininess(100);
    this.appearance.setTexture(new CGFtexture(this, "images/billboardtree.jpg"));
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.billboard = new MyBillboard(this, this.appearance);
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

    this.setDefaultAppearance();

    this.billboard.display(3, 2, 1);
  }
}
