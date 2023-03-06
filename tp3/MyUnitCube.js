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
            2,0,1,
            3,2,1,

            // Back face
            5,4,6,
            5,6,7,

            // Left face
            4,0,2,
            6,4,2,

            // Right face
            1,5,3,
            3,5,7,

            // Top face
            6,2,3,
            7,6,3,

            // Bottom face
            1,0,4,
            1,4,5,

            10,8,9,
            11,10,9,
            13,12,14,
            13,14,15,
            12,8,10,
            14,12,10,
            11,9,13,
            11,13,15,
            14,10,11,
            15,14,11,
            9,8,12,
            9,12,13,

            18,16,17,
            19,18,17,
            21,20,22,
            21,22,23,
            20,16,18,
            22,20,18,
            19,18,21,
            19,21,23,
            22,18,19,
            23,22,19,
            17,16,20,
            17,20,21
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
            0.0,  0.0, 1.0,  // Vertex 17
            0.0,  0.0,  -1.0,  // Vertex 18
            0.0,  0.0,  1.0,  // Vertex 19
            0.0,  0.0, -1.0,  // Vertex 20
            0.0,  0.0, 1.0,  // Vertex 21
            0.0,  0.0,  -1.0,  // Vertex 22
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