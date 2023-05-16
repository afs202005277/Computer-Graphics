import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    static pixelData;
    static canvas_width;
    static loaded = false;

    constructor(scene) {
        super(scene);

        let img = new Image();
        img.src = 'images/heightmap_edited_2.jpeg';
        img.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            MyTerrain.canvas_width = canvas.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            MyTerrain.loaded = true;
            ctx.drawImage(img, 0, 0);
            MyTerrain.pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        }

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
        this.shader_water.setUniformsValues({timeFactor: 0, waterTex: 3, waterMap: 4});

        this.terrainTextureMaterial = new CGFappearance(this.scene);
        this.terrainTextureMaterial.setAmbient(1, 1, 1, 1.0);
        this.terrainTextureMaterial.setDiffuse(1, 1, 1, 1.0);
        this.terrainTextureMaterial.setSpecular(1, 1, 1, 1.0);
        this.terrainTextureMaterial.setTexture(this.terrainTexture);
        this.terrainTextureMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.waterTextureMaterial = new CGFappearance(this.scene);
        this.waterTextureMaterial.setAmbient(1, 1, 1, 1.0);
        this.waterTextureMaterial.setDiffuse(1, 1, 1, 1.0);
        this.waterTextureMaterial.setSpecular(1, 1, 1, 1.0);
        this.waterTextureMaterial.setTexture(this.waterTex);
        this.waterTextureMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(t) {
        this.shader_water.setUniformsValues({timeFactor: t / 100000 % 100});
    }

    static get_height_from_heightmap(x, y) {
        if (MyTerrain.loaded) {
            const i = (y * MyTerrain.canvas_width + x) * 4;
            const r = MyTerrain.pixelData[i];
            // The formula below comes from a careful analysis of the correlation between the heightmap and the "real life" heights. On the README we go into more detail about it.
            return 0.00015*(r**2) + 0.2689*r - 95.956;
        } else {
            return 0;
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -100, 0);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);

        this.scene.pushMatrix();
        this.scene.scale(400, 400, 400);
        this.terrainHeightMap.bind(1)
        this.altimetry.bind(2);
        this.terrainTextureMaterial.apply();
        this.scene.setActiveShader(this.shader_terrain);
        this.plane_terrain.display();
        this.scene.popMatrix();

        this.waterTex.bind(3)
        this.waterMap.bind(4)
        this.waterTextureMaterial.apply();
        this.scene.setActiveShader(this.shader_water);

        this.scene.pushMatrix();
        this.scene.translate(-80, -40, 20);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(256, 256, 256);
        this.plane_water.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}

