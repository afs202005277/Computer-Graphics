import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

        var alphaAng = 2 * Math.PI / this.slices;
        for (var stack_idx = 0; stack_idx < this.stacks; stack_idx++) {
            var ang = 0;

            this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
            this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);
            this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
            this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
            ang += alphaAng;
            for (var i = 0; i < this.slices - 1; i++) {
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);
                this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
                this.normals.push(Math.sin(ang), -Math.cos(ang), 0);

                this.indices.push(i * 2 + 2 + stack_idx * this.slices * 2, i * 2 + 1 + stack_idx * this.slices * 2, i * 2 + stack_idx * this.slices * 2);
                this.indices.push(i * 2 + 1 + stack_idx * this.slices * 2, i * 2 + 2 + stack_idx * this.slices * 2, i * 2 + 3 + stack_idx * this.slices * 2);

                ang += alphaAng;
            }
            this.indices.push(0 + stack_idx*this.slices*2, (this.slices - 1) * 2 + 1 + stack_idx*this.slices*2, (this.slices - 1) * 2 + stack_idx*this.slices*2);
            this.indices.push(1 + stack_idx*this.slices*2, (this.slices - 1) * 2 + 1 + stack_idx*this.slices*2, 0 + stack_idx*this.slices*2);

        }

        var temp_zero = [];
        var temp_one = [];

        for (var i = 2; i < this.vertices.length; i+= 3) {
            if (this.vertices[i] == 0) {
                temp_zero.push((i-2)/3);
            }
            if (this.vertices[i] == 1) {
                temp_one.push((i-2)/3);
            }
        }
        for (var i = 0; i < temp_zero.length; i += 2) {
            if (i < temp_zero.length-1)
                this.indices.push((i+2 == temp_zero.length ? 0 : temp_zero[i+2]), temp_zero[i+1], temp_zero[i]);
        }
        for (var i = 0; i < temp_zero.length; i += 4) {
            if (i < temp_zero.length-2)
            this.indices.push((i+4 == temp_zero.length ? 0 : temp_zero[i+4]), temp_zero[i+2], temp_zero[i]);
        }
        for (var i = 0; i < temp_one.length; i += 2) {
            if (i < temp_one.length-1)
                this.indices.push(temp_one[i], temp_one[i+1], (i+2 == temp_one.length ? 1 : temp_one[i+2]));
        }
        for (var i = 0; i < temp_one.length; i += 4) {
            if (i < temp_one.length-2)
            this.indices.push(temp_one[i], temp_one[i+2], (i+4 == temp_one.length ? 1 : temp_one[i+4]));
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

