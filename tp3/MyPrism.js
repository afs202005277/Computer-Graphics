import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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

            /*for (var i = stack_idx*this.slices; i < this.slices+stack_idx*this.slices; i++) {
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx);

                // this.indices.push(i, (i + 1 < this.slices + stack_idx * this.slices ? i + 1 : stack_idx * this.slices), (i - 1 >= stack_idx * this.slices ? i - 1 : stack_idx * this.slices));
                this.normals.push(Math.cos(ang), Math.cos(Math.PI / 4.0), -Math.sin(ang));
                ang += alphaAng;
            }*/

            for (var i = 0; i < this.slices; i++) {
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);
                ang += alphaAng;
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx / this.stacks);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx + 1) / this.stacks);


                this.indices.push(i * 4 + 2, i * 4 + 1, i * 4);
                this.indices.push(i * 4 + 1, i * 4 + 2, i * 4 + 3);

                for (var _ = 0; _ < 4; _++) {
                    this.normals.push(Math.sin(ang - alphaAng / 2), -Math.cos(ang - alphaAng / 2), 0);
                }
            }
        }

        for (let idx = 2; idx < this.vertices.length; idx += 3) {
            if (this.vertices[idx] > 1) {
                console.log("Error!");
            } else if (this.vertices[idx] === 1) {
                console.log("Found max Z coordinate");
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

