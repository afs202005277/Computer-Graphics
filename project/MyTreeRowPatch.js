import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";
import {MyTerrain} from "./MyTerrain.js";
import {TreePatch} from "./TreePatch.js";


export class MyTreeRowPatch extends TreePatch {
    constructor(scene, startX, startZ) {
        super(scene);

        let textures = this.getTextures();

        for (let z = 0; z < 132; z += 22) {
            let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
            let texture = textures[Math.floor(Math.random() * textures.length)];
            let tree = new MyBillboard(scene, texture);
            tree.x = startX + size;
            tree.z = startZ + z + size;
            tree.s = size;
            const res = MyTerrain.get_height_from_heightmap(...MyTerrain.convertToTerrainCoordinates(tree.x, tree.z));
            if (0 === res) {
                tree.needsUpdate = true;
            } else {
                tree.y = res;
            }
            this.trees.push(tree);
        }
    }
}
