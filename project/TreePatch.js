import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";
import {MyTerrain} from "./MyTerrain.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class TreePatch extends CGFobject {
    static texturesPaths = ["billboardtree.png", "tree2.png"];

    constructor(scene) {
        super(scene);
        this.trees = [];
    }

    display() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].display_tmp();
        }
    }

    getTextures() {
        let res = [];
        for (let i = 0; i < TreePatch.texturesPaths.length; i++) {
            let treeMaterial = new CGFappearance(this.scene);
            treeMaterial.setAmbient(1.0, 1, 1, 1);
            treeMaterial.setDiffuse(1.0, 1, 1, 1);
            treeMaterial.setSpecular(1.0, 1, 1, 1);
            treeMaterial.setShininess(100);
            treeMaterial.setTexture(new CGFtexture(this.scene, "images/" + TreePatch.texturesPaths[i]));
            treeMaterial.setTextureWrap('REPEAT', 'REPEAT');

            res.push(treeMaterial);
        }
        return res;
    }

}
