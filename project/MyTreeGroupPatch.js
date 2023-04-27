import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.trees = [];
        this.treesPositions = [];
        this.treesSizes = [];

        let textures = this.getTextures(["billboardtree.png", "tree2.png"]);

        for (let x = 0; x < 3; x++) {
            for (let z = 0; z < 3; z++) {
                let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
                let texture = textures[Math.floor(Math.random() * textures.length)];
                let tree = new MyBillboard(scene, texture);
                this.treesPositions.push([x, 0, z]);
                this.treesSizes.push(size);
                this.trees.push(tree);
            }
        }
    }

    display() {
        for (let i=0;i<this.trees.length;i++){
            this.scene.pushMatrix();
            this.trees[i].display(...this.treesPositions[i], this.treesSizes[i]);
            this.scene.popMatrix();
        }
    }

    getTextures(textures) {
        let res = [];
        for (let i = 0; i < textures.length; i++) {
            let treeMaterial = new CGFappearance(this.scene);
            treeMaterial.setAmbient(1.0, 1, 1, 1);
            treeMaterial.setDiffuse(1.0, 1, 1, 1);
            treeMaterial.setSpecular(1.0, 1, 1, 1);
            treeMaterial.setShininess(100);
            treeMaterial.setTexture(new CGFtexture(this.scene, "images/" + textures[i]));
            treeMaterial.setTextureWrap('REPEAT', 'REPEAT');

            res.push(treeMaterial);
        }
        return res;
    }

}
