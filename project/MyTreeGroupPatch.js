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

        let textures = this.getTextures(["billboardtree.png", "tree2.png", "tree3.png"]);

        let perfectPositions = [
            [0, 0, 0],
            [1, 0, 0],
            [2, 0, 0],
            [0, 0, 1],
            [1, 0, 1],
            [2, 0, 1],
            [0, 0, 2],
            [1, 0, 2],
            [2, 0, 2]
        ];

        for (let i = 0; i < 9; i++) {
            let size = Math.random() * (1.5 - 0.5) + 0.5; // random size between 0.5 and 1.5
            let texture = textures[Math.floor(Math.random() * textures.length)];
            let x = perfectPositions[i][0] + (Math.random() - 0.5) * 0.5 + 3;
            let z = perfectPositions[i][2] + (Math.random() - 0.5) * 0.5 + 3;
            let tree = new MyBillboard(scene, texture);
            this.treesPositions.push([x, 0, z]);
            this.treesSizes.push(size);
            this.trees.push(tree);
        }
    }

    display() {
        for (let i=0;i<this.trees.length;i++){
            this.scene.pushMatrix();
            this.scene.scale(this.treesSizes[i], this.treesSizes[i], this.treesSizes[i]);
            this.trees[i].display(...this.treesPositions[i]);
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
