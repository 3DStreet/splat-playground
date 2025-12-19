import { SplatMesh, NewSparkRenderer } from '@sparkjsdev/spark';

// Register splat component using NewSparkRenderer with LOD
AFRAME.registerComponent('splat', {
  schema: {
    src: { type: 'string', default: '' }
  },

  init: function () {
    this.splatMesh = null;
    this.initRenderer();
  },

  initRenderer: function () {
    const scene = this.el.sceneEl;

    if (!scene.renderer) {
      scene.addEventListener('renderstart', () => this.initRenderer());
      return;
    }

    if (!scene.sparkRenderer) {
      scene.sparkRenderer = new NewSparkRenderer({
        renderer: scene.renderer,
        enableLod: true
      });
      scene.object3D.add(scene.sparkRenderer);
      console.log('[splat] NewSparkRenderer initialized with LOD');
    }

    if (this.data.src) {
      this.loadSplat(this.data.src);
    }
  },

  loadSplat: function (src) {
    this.splatMesh = new SplatMesh({ url: src, lod: true });
    this.splatMesh.quaternion.set(1, 0, 0, 0);
    this.el.setObject3D('mesh', this.splatMesh);
    console.log('[splat] Loaded:', src);
  },

  remove: function () {
    if (this.splatMesh) {
      this.el.removeObject3D('mesh');
      this.splatMesh = null;
    }
  }
});
