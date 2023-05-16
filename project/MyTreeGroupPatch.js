import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyBillboard} from "./MyBillboard.js";
import {MyTerrain} from "./MyTerrain.js";
import {TreePatch} from "./TreePatch.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTreeGroupPatch extends TreePatch {
    constructor(scene, startX, startZ) {
        super(scene);

        let textures = this.getTextures();
        for (let x = 0; x < 66; x += 22) {
            for (let z = 0; z < 66; z += 22) {
                let size = Math.random() * (1 - 0.5) + 0.5; // random size between 0.5 and 1
                let texture = textures[Math.floor(Math.random() * textures.length)];
                let tree = new MyBillboard(scene, texture);
                tree.x = startX + x + size;
                tree.z = startZ + z + size;
                tree.s = size;
                const res = MyTerrain.get_height_from_heightmap(...MyTerrain.convertToTerrainCoordinates(tree.x, tree.z));
                if (res === 0){
                    tree.needsUpdate = true;
                } else{
                    tree.y = res;
                }
                this.trees.push(tree);
            }
        }
    }

}
