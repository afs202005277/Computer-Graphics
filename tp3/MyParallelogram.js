import {CGFobject} from '../lib/CGF.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0, //0
            1, 0, 0, //1
            1, 1, 0, //2
            2, 0, 0, //3
            2, 1, 0, //4
            3, 1, 0, //5

            0, 0, 0, //6
            1, 0, 0, //7
            1, 1, 0, //8
            2, 0, 0, //9
            2, 1, 0, //10
            3, 1, 0  //11
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            1, 3, 2,
            3, 4, 2,
            3, 5, 4,
            2, 1, 0,
            2, 3, 1,
            2, 4, 3,
            4, 5, 3,

            8, 7, 6,
            8, 9, 7,
            8, 10, 9,
            10, 11, 9,
            6, 7, 8,
            7, 9, 8,
            9, 10, 8,
            9, 11, 10
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

}