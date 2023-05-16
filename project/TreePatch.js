import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class TreePatch extends CGFobject {
    static texturesPaths = ["billboardtree.png", "tree2.png", "tree3.png"];
    static loadedTextures = [];

    constructor(scene) {
        super(scene);
        this.trees = [];
    }

    display() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].display();
        }
    }

    getTextures() {
        if (TreePatch.loadedTextures.length === 0) {
            let res = [];
            for (let i = 0; i < TreePatch.texturesPaths.length; i++) {
                let treeMaterial = new CGFappearance(this.scene);
                treeMaterial.setAmbient(1.0, 1, 1, 1);
                treeMaterial.setDiffuse(1.0, 1, 1, 1);
                treeMaterial.setSpecular(1.0, 1, 1, 1);
                treeMaterial.setShininess(32.0);
                treeMaterial.setTexture(new CGFtexture(this.scene, "images/" + TreePatch.texturesPaths[i]));
                treeMaterial.setTextureWrap('REPEAT', 'REPEAT');

                res.push(treeMaterial);
            }
            TreePatch.loadedTextures = res;
            return res;
        } else {
            return TreePatch.loadedTextures;
        }
    }

}
