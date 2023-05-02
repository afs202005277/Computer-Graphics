import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";
import {MyTerrain} from "./MyTerrain.js";
import {TreePatch} from "./TreePatch.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeRowPatch extends TreePatch {
    constructor(scene, startX, startZ) {
        super(scene);

        let textures = this.getTextures();

        for (let z = 0; z < 132; z += 22) {
            let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
            let texture = textures[Math.floor(Math.random() * textures.length)];
            let tree = new MyBillboard(scene, texture);
            tree.x = startX;
            tree.z = startZ + z;
            tree.s = size;
            const res = MyTerrain.get_height_from_heightmap(Math.floor((tree.x + 200) / 400 * 128), 128 + Math.floor((tree.z - 200) / 400 * 128));
            if (0 === res) {
                tree.needsUpdate = true;
            } else {
                tree.y = res;
            }
            this.trees.push(tree);
        }
    }
}
