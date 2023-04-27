import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";
import {MyTerrain} from "./MyTerrain.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, startX, startZ) {
        super(scene);
        this.scene = scene;
        this.trees = [];
        this.treesPositions = [];
        this.treesSizes = [];

        let textures = this.getTextures(["billboardtree.png", "tree2.png"]);

        for (let x = 0; x < 66; x += 22) {
            for (let z = 0; z < 66; z += 22) {
                let y = 0;
                let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
                let texture = textures[Math.floor(Math.random() * textures.length)];
                let tree = new MyBillboard(scene, texture);
                y = this.getHeight(startX + x, startZ + z);
                this.treesPositions.push([startX + x, y, startZ + z]);
                this.treesSizes.push(size);
                this.trees.push(tree);
            }
        }
    }

    async getHeight(x, z) {
        return await MyTerrain.ground_level(Math.floor((x + 200) / 400 * 128), 128 + Math.floor((z - 200) / 400 * 128)).then(value => {
            return value;
        })
    }

    display() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].display(...this.treesPositions[i], this.treesSizes[i]);
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
