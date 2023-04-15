import {CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 50)
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainHeightMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.altimetry = new CGFtexture("images/altimetry.png");
        this.shader.setUniformsValues({terrainMap: this.terrainHeightMap, terrainTex: this.terrainTexture, weightOriginal: 0.7, weightAlt: 0.3, altimetry: this.altimetry});
    }

    display() {
        // aplly main appearance (including texture in default texture unit 0)
        this.scene.appearance.setTexture(this.terrainTexture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.scene.appearance.apply();
        this.plane.display();
        // activate selected shader
        this.scene.setActiveShader(this.shader);
    }
}

