import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyBillboard extends CGFobject {
    constructor(scene, material) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.material = material;
        this.initBuffers();
    }

    display(x, y, z, s) {
        if (x === undefined) {
            x = 0;
            y = 0;
            z = 0;
            s = 1;
        }
        this.scene.pushMatrix();
        var cameraPos = this.scene.camera.position;
        var dirVec = vec3.fromValues(cameraPos[0] - x, cameraPos[1] - y, cameraPos[2] - z);

        var initVec = vec3.fromValues(0, 0, 1);
        var angle = Math.atan2(dirVec[0], dirVec[2]) - Math.atan2(initVec[0], initVec[2]);

        this.scene.translate(x, y, z);

        this.scene.rotate(angle, 0, 1, 0);

        this.scene.scale(s, s, s);

        this.scene.translate(0, 0.5, 0);

        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        let newNormal = [];
        for (let coord = 0; coord < this.quad.vertices.length; coord += 3) {
            let normal = vec3.fromValues(0, 0, 0);
            vec3.normalize(normal, dirVec);
            newNormal.push(normal[0], normal[1], normal[2]);
        }
        this.quad.normals = newNormal;
        this.initBuffers();
    }

}

