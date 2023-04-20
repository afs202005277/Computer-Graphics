import { CGFobject } from '../lib/CGF.js';

export class MyHalfSphere extends CGFobject {
  constructor(scene, slices, stacks, drawInside) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.drawInside = drawInside;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (let i = 0; i <= this.stacks; i++) {
      const phi = (i * Math.PI) / (2 * this.stacks);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      for (let j = 0; j <= this.slices; j++) {
        const theta = j * (2 * Math.PI / this.slices);
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        const x = cosTheta * sinPhi;
        const y = cosPhi;
        const z = sinTheta * sinPhi;

        const u = 1 - j / this.slices;
        const v = 1 - i / this.stacks;

        this.vertices.push(x, y, z);

        const normal = vec3.fromValues(x, y, z);
        vec3.normalize(normal, normal);
        this.normals.push(normal[0], normal[1], normal[2]);

        this.texCoords.push(u, 1 - v);
      }
    }

    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        const k1 = i * (this.slices + 1) + j;
        const k2 = k1 + 1;
        const k3 = (i + 1) * (this.slices + 1) + j;
        const k4 = k3 + 1;

        if (this.drawInside) {
          this.indices.push(k1, k3, k2);
          this.indices.push(k2, k3, k4);
        } else {
          this.indices.push(k2, k3, k1);
          this.indices.push(k4, k3, k2);
        }
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
