import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyHalfSphere} from './MyHalfSphere.js';
import {MyBirdEgg} from './MyBirdEgg.js';

/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class Nest extends CGFobject {
    constructor(scene, amount_eggs) {
        super(scene);
        this.insideSphere = new MyHalfSphere(scene, 30, 30, false);
        this.outerSphere = new MyHalfSphere(scene, 30, 30, true);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1.0, 1, 1, 1);
        this.appearance.setDiffuse(1.0, 1, 1, 1);
        this.appearance.setSpecular(1.0, 1, 1, 1);
        this.appearance.setShininess(2);
        this.appearance.setTexture(new CGFtexture(scene, "images/nest.jpg"));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.counter = 0;

        this.eggs = [];

        this.coordinates = [-160, -23, -41];

        for (let i = 0; i < amount_eggs; i++) {
            this.eggs.push(new MyBirdEgg(scene));
        }
        this.initBuffers();
    }

    display() {
        this.appearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.4, 0.0);
        this.scene.scale(Math.max(0.05 * this.eggs.length, 0.9), -0.4, Math.max(0.05 * this.eggs.length, 0.9));
        this.insideSphere.display();
        this.outerSphere.display();
        this.scene.popMatrix();

        let distance = 0.5;
        for (let i = 0; i < this.counter; i++) {
            let multiplier = 0.001;
            let angle = i * 0.5;
            let radius = distance * (i * i * multiplier + 1);
            let x = Math.cos(angle) * radius;
            let y = Math.sin(angle) * radius;
            this.scene.pushMatrix();
            this.scene.translate(x, 0.2, y);
            this.scene.scale(0.2, 0.2, 0.2);
            this.eggs[i].display();
            this.scene.popMatrix();
        }

    }
}

