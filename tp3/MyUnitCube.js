import {CGFobject} from '../lib/CGF.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5, //0
            -0.5, -0.5, 0.5, //1
            -0.5, 0.5, -0.5, //2
            -0.5, 0.5, 0.5, //3
            0.5, -0.5, -0.5, //4
            0.5, -0.5, 0.5, //5
            0.5, 0.5, -0.5, //6
            0.5, 0.5, 0.5, //7

            -0.5, -0.5, -0.5, //8
            -0.5, -0.5, 0.5, //9
            -0.5, 0.5, -0.5, //10
            -0.5, 0.5, 0.5, //11
            0.5, -0.5, -0.5, //12
            0.5, -0.5, 0.5, //13
            0.5, 0.5, -0.5, //14
            0.5, 0.5, 0.5, //15

            -0.5, -0.5, -0.5, //16
            -0.5, -0.5, 0.5, //17
            -0.5, 0.5, -0.5, //18
            -0.5, 0.5, 0.5, //19
            0.5, -0.5, -0.5, //20
            0.5, -0.5, 0.5, //21
            0.5, 0.5, -0.5, //22
            0.5, 0.5, 0.5, //23
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // Front face
            0, 1, 2,
            2, 1, 3,

            // Back face
            4, 6, 5,
            6, 7, 5,

            // Left face
            0, 2, 4,
            4, 2, 6,

            // Right face
            1, 5, 3,
            5, 7, 3,

            // Top face
            2, 3, 6,
            6, 3, 7,

            // Bottom face
            0, 4, 1,
            4, 5, 1,

            8, 9, 10,
            10, 9, 11,
            12, 14, 13,
            14, 15, 13,
            8, 10, 12,
            12, 10, 14,
            9, 13, 11,
            13, 15, 11,
            10, 11, 14,
            14, 11, 15,
            8, 12, 9,
            12, 13, 9,

            16, 17, 18,
            18, 17, 19,
            20, 22, 21,
            22, 23, 21,
            16, 18, 20,
            20, 18, 22,
            18, 21, 19,
            21, 23, 19,
            18, 19, 22,
            22, 19, 23,
            16, 20, 17,
            20, 21, 17
        ];

        this.normals = [
            -1.0,  0.0,  0.0,  // Vertex 0
            -1.0,  0.0,  0.0,  // Vertex 1
            -1.0,  0.0,  0.0,  // Vertex 2
            -1.0,  0.0,  0.0,  // Vertex 3
            1.0,  0.0,  0.0,  // Vertex 4
            1.0,  0.0,  0.0,  // Vertex 5
            1.0,  0.0,  0.0,  // Vertex 6
            1.0,  0.0,  0.0,  // Vertex 7
            0.0, -1.0,  0.0,  // Vertex 8
            0.0, -1.0,  0.0,  // Vertex 9
            0.0,  1.0,  0.0,  // Vertex 10
            0.0,  1.0,  0.0,  // Vertex 11
            0.0, -1.0,  0.0,  // Vertex 12
            0.0, -1.0,  0.0,  // Vertex 13
            0.0,  1.0,  0.0,  // Vertex 14
            0.0,  1.0,  0.0,  // Vertex 15
            0.0,  0.0, -1.0,  // Vertex 16
            0.0,  0.0, -1.0,  // Vertex 17
            0.0,  0.0,  1.0,  // Vertex 18
            0.0,  0.0,  1.0,  // Vertex 19
            0.0,  0.0, -1.0,  // Vertex 20
            0.0,  0.0, -1.0,  // Vertex 21
            0.0,  0.0,  1.0,  // Vertex 22
            0.0,  0.0,  1.0   // Vertex 23
        ];


        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(){

    }
}