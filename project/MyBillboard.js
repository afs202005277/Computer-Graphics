import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
import {MyTerrain} from "./MyTerrain.js";

/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
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

    display_tmp(){
        if (this.needsUpdate){
            const res = MyTerrain.ground_level(Math.floor((this.x + 200) / 400 * 128), 128 + Math.floor((this.z - 200) / 400 * 128), this, false, null);
            if (res === 0){
                this.needsUpdate = true;
            } else{
                this.needsUpdate = false;
                this.y = res;
            }
        }
        console.log(this.s);
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

    display(x, y, z, s) {
        if (x === undefined) {
            x = 0;
            y = 0;
            z = 0;
            s = 1;
        }
        this.scene.pushMatrix();
        let cameraPos = this.scene.camera.position;
        let dirVec = vec3.fromValues(cameraPos[0] - x, cameraPos[1] - y, cameraPos[2] - z);

        let initVec = vec3.fromValues(0, 0, 1);
        let angle = Math.atan2(dirVec[0], dirVec[2]) - Math.atan2(initVec[0], initVec[2]);

        this.scene.translate(x, y, z);

        this.scene.rotate(angle, 0, 1, 0);

        this.scene.scale(s, s, s);

        this.scene.scale(20, 20, 20);

        this.scene.translate(0, 0.5, 0);

        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();
        /*
                let newNormal = [];
                for (let coord = 0; coord < this.quad.vertices.length; coord += 3) {
                    let normal = vec3.fromValues(0, 0, 0);
                    vec3.normalize(normal, dirVec);
                    newNormal.push(normal[0], normal[1], normal[2]);
                }
                this.quad.normals = newNormal;
                this.initBuffers();*/
    }

}

