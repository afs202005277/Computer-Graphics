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

            this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx);
            this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx+1));
            this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
            this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
            console.log(ang/(Math.PI*2));
            ang += alphaAng;
            for (var i = 0; i < this.slices-1; i++) {
                console.log(ang/(Math.PI*2));
                this.vertices.push(Math.sin(ang), -Math.cos(ang), stack_idx);
                this.vertices.push(Math.sin(ang), -Math.cos(ang), (stack_idx+1));
                this.normals.push(Math.sin(ang), -Math.cos(ang), 0);
                this.normals.push(Math.sin(ang), -Math.cos(ang), 0);

                this.indices.push(i*2+2, i*2+1, i*2);
                this.indices.push(i*2+1, i*2+2, i*2+3);

                ang += alphaAng;
            }
            this.indices.push(0, (this.slices-1)*2+1, (this.slices-1)*2);
            this.indices.push(1, (this.slices-1)*2+1, 0);

        for (let idx = 2; idx < this.vertices.length; idx += 3) {
            if (this.vertices[idx] > 1) {
                console.log("Error!");
            } else if (this.vertices[idx] === 1) {
                console.log("Found max Z coordinate");
            } else if (this.vertices[idx] < 0){
                console.log(this.vertices[idx-2]);
                console.log(this.vertices[idx-1]);
                console.log(this.vertices[idx]);
                console.log("\n\n");
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        }
    }
}

