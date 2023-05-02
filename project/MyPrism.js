import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks, reverse) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.reverse = reverse;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let alphaAng = 2 * Math.PI / this.slices;
        for (let stack_idx = 0; stack_idx < this.stacks; stack_idx++) {
            let ang = 0;

            for (let i = 0; i < this.slices; i++) {
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);
                ang += alphaAng;
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);

                if (!this.reverse) {
                    this.indices.push(i * 4 + 2 + stack_idx * this.slices * 4, i * 4 + 1 + stack_idx * this.slices * 4, i * 4 + stack_idx * this.slices * 4);
                    this.indices.push(i * 4 + 1 + stack_idx * this.slices * 4, i * 4 + 2 + stack_idx * this.slices * 4, i * 4 + 3 + stack_idx * this.slices * 4);
                } else {
                    this.indices.push(i * 4 + stack_idx * this.slices * 4, i * 4 + 1 + stack_idx * this.slices * 4, i * 4 + 2 + stack_idx * this.slices * 4);
                    this.indices.push(i * 4 + 3 + stack_idx * this.slices * 4, i * 4 + 2 + stack_idx * this.slices * 4, i * 4 + 1 + stack_idx * this.slices * 4);
                }


                for (let _ = 0; _ < 4; _++) {
                    this.normals.push(Math.sin(ang - alphaAng / 2), -Math.cos(ang - alphaAng / 2), 0);
                }
            }
        }

        let bottomCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        for (let i = 0; i < this.slices; i++) {
            let angle1 = i * alphaAng;
            let angle2 = (i + 1) * alphaAng;
            this.vertices.push(Math.sin(angle1), -Math.cos(angle1), 0);
            this.vertices.push(Math.sin(angle2), -Math.cos(angle2), 0);
            if (this.reverse)
                this.indices.push(bottomCenterIndex, bottomCenterIndex + 1 + i * 2, bottomCenterIndex + 1 + (i * 2 + 2) % (this.slices * 2));
            else
                this.indices.push(bottomCenterIndex + 1 + (i * 2 + 2) % (this.slices * 2), bottomCenterIndex + 1 + i * 2, bottomCenterIndex);
            this.normals.push(0, 0, -1);
            this.normals.push(0, 0, -1);
        }

        let topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        for (let i = 0; i < this.slices; i++) {
            let angle1 = i * alphaAng;
            let angle2 = (i + 1) * alphaAng;
            this.vertices.push(Math.sin(angle1), -Math.cos(angle1), 1);
            this.vertices.push(Math.sin(angle2), -Math.cos(angle2), 1);
            if (this.reverse)
                this.indices.push(topCenterIndex, topCenterIndex + 1 + (i * 2 + 2) % (this.slices * 2), topCenterIndex + 1 + i * 2);
            else
                this.indices.push(topCenterIndex + 1 + i * 2, topCenterIndex + 1 + (i * 2 + 2) % (this.slices * 2), topCenterIndex);
            this.normals.push(0, 0, 1);
            this.normals.push(0, 0, 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}