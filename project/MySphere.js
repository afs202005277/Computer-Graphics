import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        for (let i = 0; i <= this.stacks; i++) {
            const stackAngle = Math.PI * i / this.stacks;
            const y = Math.cos(stackAngle);
            const r = Math.sin(stackAngle);

            for (let j = 0; j <= this.slices; j++) {
                const sliceAngle = 2 * Math.PI * j / this.slices;
                const x = r * Math.cos(sliceAngle);
                const z = r * Math.sin(sliceAngle);

                this.vertices.push(x, y, z);
                this.normals.push(x / r, y, z / r);
            }
        }

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const a = i * (this.slices + 1) + j;
                const b = a + this.slices + 1;

                this.indices.push(a, b, a + 1);
                this.indices.push(b, b + 1, a + 1);
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

