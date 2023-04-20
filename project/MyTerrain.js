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
        this.plane_terrain = new MyPlane(this.scene, 50)
        this.plane_water = new MyPlane(this.scene, 50)
        this.shader_terrain = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag")
        this.shader_water = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag")
        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainHeightMap = new CGFtexture(this.scene, "images/heightmap_edited_2.jpeg");
        this.altimetry = new CGFtexture(this.scene, "images/altimetry.png");
        this.shader_terrain.setUniformsValues({terrainMap: 1, weightOriginal: 0.7, weightAlt: 0.3, altimetry: 2});
        this.waterTex = new CGFtexture(this.scene, "images/waterTex.jpg");
		this.waterMap = new CGFtexture(this.scene, "images/waterMap.jpg");
        this.shader_water.setUniformsValues({ timeFactor: 0, waterTex: 3, waterMap: 4 });
    }

    update(t) {
        this.shader_water.setUniformsValues({ timeFactor: t / 100000 % 100 });
	}


    display() {
        this.scene.appearance.setTexture(this.terrainTexture);
        this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.terrainHeightMap.bind(1)
        this.altimetry.bind(2);

        this.scene.appearance.apply();

        this.scene.setActiveShader(this.shader_terrain);

        this.plane_terrain.display();

        this.scene.appearance.setTexture(this.waterTex);
		this.scene.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.waterTex.bind(3)
        this.waterMap.bind(4)

        this.scene.appearance.apply();

        this.scene.setActiveShader(this.shader_water);

        this.scene.pushMatrix();
    
        this.scene.translate(0, 0, 0.05);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.plane_water.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

