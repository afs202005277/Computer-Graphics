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

        let textures = this.getTextures(["billboardtree.png", "tree2.png"]);

        for (let x = 0; x < 66; x += 22) {
            for (let z = 0; z < 66; z += 22) {
                let y = 0;
                let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
                let texture = textures[Math.floor(Math.random() * textures.length)];
                let tree = new MyBillboard(scene, texture);
                tree.x = startX + x;
                tree.z = startZ + z;
                tree.s = size;
                if (0 === MyTerrain.ground_level(Math.floor((tree.x + 200) / 400 * 128), 128 + Math.floor((tree.z - 200) / 400 * 128), tree, false, null)){
                    tree.needsUpdate = true;
                }
                this.trees.push(tree);
            }
        }
    }

    display() {
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].display_tmp();
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
