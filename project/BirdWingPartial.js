import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyCylinder} from './MyCylinder.js';
import {MyPrism} from './MyPrism.js';


export class BirdWingPartial extends CGFobject {
    constructor(scene, material1, material2, reverse) {
        super(scene);
        this.wing1 = new MyPrism(scene, 3, 1, reverse);
        this.wing3 = new MyPrism(scene, 3, 1, reverse);
        this.material1 = material1;
        this.material2 = material2;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.1, 0.5);
        this.scene.pushMatrix();
        this.scene.translate(-5, 0, -0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.material1.apply();
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-4.14, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.material2.apply();
        this.wing3.display();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}
