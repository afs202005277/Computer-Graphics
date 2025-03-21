import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
import {MyTerrain} from "./MyTerrain.js";


export class MyBillboard extends CGFobject {
    constructor(scene, material) {
        super(scene);
        this.needsUpdate = false;
        this.quad = new MyQuad(scene);
        this.material = material;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.s = 1;
        this.initBuffers();
    }

    display() {
        if (this.needsUpdate) {
            const res = MyTerrain.get_height_from_heightmap(...MyTerrain.convertToTerrainCoordinates(this.x, this.z));
            if (res === 0) {
                this.needsUpdate = true;
            } else {
                this.needsUpdate = false;
                this.y = res;
            }
        }
        this.scene.pushMatrix();
        let cameraPos = this.scene.camera.position;
        let dirVec = vec3.fromValues(cameraPos[0] - this.x, cameraPos[1] - this.y, cameraPos[2] - this.z);

        let initVec = vec3.fromValues(0, 0, 1);
        let angle = Math.atan2(dirVec[0], dirVec[2]) - Math.atan2(initVec[0], initVec[2]);

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(angle, 0, 1, 0);
        this.scene.scale(this.s, this.s, this.s);
        this.scene.scale(20, 20, 20);
        this.scene.translate(0, 0.5, 0);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}

