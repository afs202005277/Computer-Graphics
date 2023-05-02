import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
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

    static ground_level(x, y, object, isBird, speedFactor) {
        // create an Image object
        const img = new Image();

        // set the source of the image
        img.src = 'images/heightmap_edited_2.jpeg';

        // wait for the image to load
        img.onload = function () {
            // create a canvas element in memory
            const canvas = document.createElement('canvas');

            // set the width and height of the canvas to the size of the image
            canvas.width = img.width;
            canvas.height = img.height;

            // get the context of the canvas
            const ctx = canvas.getContext('2d');

            // draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // get the pixel data of the canvas
            const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // calculate the index of the pixel at the specified coordinates
            const i = (y * canvas.width + x) * 4;

            // calculate the grayscale value of the pixel
            const r = pixelData[i];
            if (!isBird) {
                object.y = 0.3038 * r - 94.313;
            } else {
                object.checkBoundaries(0.3038 * r - 94.313, speedFactor);
            }
            // resolve the promise with the pixel value
            return 0.3038 * r - 94.313;
        };
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

        if (this.scene.displayTerrain)
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

