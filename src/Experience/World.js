import * as THREE from "three";
import Experience from "./Experience.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setRoom();
        this.setWallframe();
      }
    });

    // this.addAxesHelper();
  }

  setWallframe() {
    this.wallframe = {};
    this.wallframe.model = this.resources.items.wallframeModel.scene;

    this.wallframe.model.traverse((o) => {
      if (o.isMesh) {
        o.material.map = this.resources.items.exampleTexture;
        o.material.map.flipY = false;
      }
    });

    this.scene.add(this.wallframe.model);
  }

  setRoom() {
    this.room = {};
    this.room.model = this.resources.items.roomModel.scene;

    this.scene.add(this.room.model);

    // lights
    let spotLight = new THREE.SpotLight("#FFFFFF", 14.31);
    spotLight.position.set(-3.51147, 7.2, -1.2);
    spotLight.penumbra = 0.05;
    spotLight.distance = 2.5;
    spotLight.angle = THREE.MathUtils.degToRad(45);
    spotLight.decay = 2;
    // this.addSpotLightHelper(spotLight);

    let directionalLight1 = new THREE.DirectionalLight("#87A0FF", 0.5);
    directionalLight1.position.set(10.9967, 2.86015, -9.57261);
    // this.addDirectionalLightHelper(directionalLight1);

    let directionalLight2 = new THREE.DirectionalLight("#FFBB7B", 0.5);
    directionalLight2.position.set(-8.30432, 2.86015, 11.9834);
    // this.addDirectionalLightHelper(directionalLight2);

    let directionalLight3 = new THREE.DirectionalLight("#87A0FF", 0.5);
    directionalLight3.position.set(-6.54904, 9.26175, -6.54904);
    // this.addDirectionalLightHelper(directionalLight3);

    let pointLight = new THREE.PointLight("#8F00FF", 50);
    pointLight.position.set(0, 3.5, -4);
    pointLight.decay = 2;
    pointLight.distance = 10;
    // this.addPointLightHelper(pointLight);

    this.scene.add(spotLight);
    this.scene.add(directionalLight1);
    this.scene.add(directionalLight2);
    this.scene.add(directionalLight3);
    this.scene.add(pointLight);
  }

  addDirectionalLightHelper(light) {
    const helper = new THREE.DirectionalLightHelper(light, 5);
    this.scene.add(helper);
  }

  addSpotLightHelper(spotLight) {
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    this.scene.add(spotLightHelper);
  }

  addPointLightHelper(spotLight) {
    const helper = new THREE.PointLightHelper(spotLight);
    this.scene.add(helper);
  }

  addAxesHelper() {
    const helper = new THREE.AxesHelper(5);
    this.scene.add(helper);
  }

  resize() {}

  update() {}

  destroy() {}
}
