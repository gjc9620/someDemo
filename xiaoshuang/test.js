
const defaultShaderType = [
  'VERTEX_SHADER',
  'FRAGMENT_SHADER',
];

function error(msg) {
  if (window.console) {
    if (window.console.error) {
      window.console.error(msg);
    } else if (window.console.log) {
      window.console.log(msg);
    }
  }
}

function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  const program = gl.createProgram();
  
  shaders.forEach((shader) => {
    gl.attachShader(program, shader);
  });
  
  if (opt_attribs) {
    opt_attribs.forEach((attriib, ndx) => {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attriib);
    });
  }
  
  gl.linkProgram(program);
  
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  
  if (!linked) {
    const lastError = gl.getProgramInfoLog(program);
    errFn("Error in program linking:" + lastError);
    
    gl.deleteShader(program);
    return null;
  }
  
  return program;
}

function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  const shader = gl.createShader(shaderType);
  
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  
  if (!compiled) {
    const lastError = gl.getShaderInfoLog(shader);
    errFn("*** Error compiling shader '" + shader + "':" + lastError);
    gl.deleteShader(shader);
    
    return null;
  }
  
  return shader;
}

function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const shaders = [];
  
  for (let v = 0; v < shaderSources.length; v += 1) {
    shaders.push(loadShader(gl, shaderSources[v], gl[defaultShaderType[v]], opt_errorCallback));
  }
  
  return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
}

function resizeCanvasToDisplaySize(canvas, multiplier = 1) {
  const width = canvas.clientWidth * multiplier || 0;
  const height = canvas.clientHeight * multiplier || 0;
  
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    
    return true;
  }
  
  return false;
}

THREE.Matrix4.prototype.watchAt = function(eye, center, up) {
  this.makeTranslation(eye.x, eye.y, eye.z);
  this.lookAt(eye, center, up);
  
  return this.getInverse(this);
};

Object.defineProperties(Array.prototype, {
  fakeForEach: {
    value(cb, obj, worldMat) {
      const list = this;
      const { length = 0 } = list;
      
      for (let v = 0; v < length; v += 1) {
        cb(list[v], v ,obj, worldMat);
      }
    },
  },
  
  fakeMap: {
    value(cb) {
      const list = this;
      const res = [];
      
      list.fakeForEach((item) => {
        res.push(cb(item));
      });
      
      return list;
    },
  },
});

const runWin = (func) => {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  return func;
};

const resize = runWin((gl) => {
  if (!gl) {
    return null;
  }
  
  const { canvas } = gl;
  
  const { devicePixelRatio = 1 } = window;
  const { clientWidth = 0, clientHeight = 0 } = canvas;
  
  const dW = clientWidth * devicePixelRatio;
  const dH = clientHeight * devicePixelRatio;
  
  if (canvas.width !== dW || canvas.height !== dH) {
    canvas.width = dW;
    canvas.height = dH;
  }
});

const launch = (gl) => {
  if (!gl) {
    return null;
  }
  
  resize(gl);
  
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  
  gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
  
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
};

const patchUniforms = (gl, program, obj = {}) => {
  if (!gl || !program) {
    return null;
  }
  
  const keys = Object.keys(obj);
  
  gl.useProgram(program);
  
  keys.fakeForEach((key) => {
    const uniform = gl.getUniformLocation(program, key);
    
    const value = obj[key] || {};
    const { func, args = [] } = value;
    
    func.call(gl, uniform, ...args);
  });
};

const setIndexBuffer = (gl, obj = {}) => {
  if (!gl) {
    return null;
  }
  
  const { target = gl.ELEMENT_ARRAY_BUFFER, usage = gl.STATIC_DRAW, data = [], clear = false } = obj;
  
  const buffer = gl.createBuffer();
  
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, usage);
  
  clear && gl.bindBuffer(target, null);
  
  return buffer;
};

const patchAttributes = (gl, program, obj = {}) => {
  if (!gl || !program) {
    return null;
  }
  
  const keys = Object.keys(obj);
  
  keys.fakeForEach((key) => {
    const attribute = gl.getAttribLocation(program, key);
    
    const value = obj[key] || {};
    const { data = [], target = gl.ARRAY_BUFFER, usage = gl.STATIC_DRAW, clear = true, args = [] } = value;
    
    const buffer = gl.createBuffer();
    
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);
    
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, ...args);
    
    clear && gl.bindBuffer(target, null);
  });
};


const animate = func => (...list) => {
  let id;
  
  function run() {
    
    func(...list);
    
    id && window.cancelAnimationFrame(id);
    id = window.requestAnimationFrame(run);
  }
  
  run();
};

const getIfFunc = (res, ...args) => {
  return typeof res === 'function' ? res(...args) : res;
};

const worldBuild = (viewMat = new THREE.Matrix4(), cb) => (worldMat = new THREE.Matrix4()) => {
  const worldView = new THREE.Matrix4();
  worldView.multiplyMatrices(viewMat, worldMat);
  
  const worldInverse = new THREE.Matrix4();
  worldInverse.getInverse(worldMat);
  
  const worldInverseTranspose = worldInverse.transpose();
  
  cb && cb(worldView, worldInverseTranspose);
};

// function startMap(gl, program, setMat, tree = {}, now = 0) {
//   const { children = [], mats = [], models = [], baseMat, parentMat } = tree;
//   const worldMat = new THREE.Matrix4();

//   // for (let v = 0; v < mats.length; v += 1) {
//   //   const mat = mats[v];
//   //   worldMat.multiply(getIfFunc(mat, now));
//   // }

//   // setMat && setMat(worldMat);

//   // models.fakeForEach(model => model && model.render(gl, program));

//   // children.fakeForEach((child) => {
//   //   child.parentMat = worldMat;
//   //   tree = child;

//   //   startMap(gl, program, setMat, tree, now);
//   // });
// }

const fuckmap = function(child, aaa, obj, worldMat) {
  child.parentMat = worldMat;
  obj.tree = child;
  
  startMap(obj);
};

window.a = false;
function startMap(obj) {
  let {gl, program, setMat ,tree = {}, now = 0 }  = obj;
  const { children = [], mats = [], models = [], baseMat, parentMat } = tree;
  console.log(tree);
  
  const worldMat = new THREE.Matrix4().multiply(baseMat || parentMat);

  mats.fakeForEach(mat => worldMat.multiply(getIfFunc(mat, now)));
  setMat && setMat(worldMat);

  models.fakeForEach(model => model && model.render(gl, program));

  children.fakeForEach(fuckmap, obj, worldMat);
}

const modelRender = (obj) => {
  
  startMap(obj);
};

const normals = new Float32Array([
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
]);

const getRectangleIndex = (i1, i2, i3, i4) => {
  return [
    i2, i1, i4,
    i3, i4, i1,
  ];
};

const concatFunc = (items = [], points = []) => {
  let res = [];
  
  items.forEach((item = 0) => {
    res = res.concat(points[item]);
  });
  
  return res;
};

class Cube {
  constructor(props = {}) {
    this.colors = [];
    this.normals = normals;
    this.positions = [];
    this.indexs = [];
    
    this.update(props);
  }
  
  update(data = {}) {
    this.data = data;
    
    this.calc();
  }
  
  calc() {
    const { w = 0, h = 0, l = 0, color = [1.0, 1.0, 1.0, 1.0] } = this.data;
    const constants = [w, h, l];
    const { length = 1 } = constants;
    
    const points = [
      [0, 0, 0],
      [0, h, 0],
      [w, 0, 0],
      [w, h, 0],
      [0, 0, l],
      [0, h, l],
      [w, 0, l],
      [w, h, l],
    ];
    
    const cubePoints = new Float32Array([
      ...concatFunc([1, 0, 3, 2], points),
      ...concatFunc([0, 1, 4, 5], points),
      ...concatFunc([1, 3, 5, 7], points),
      ...concatFunc([3, 2, 7, 6], points),
      ...concatFunc([2, 0, 6, 4], points),
      ...concatFunc([4, 5, 6, 7], points),
    ]);
    
    const positions = cubePoints.map((p, i) => {
      const curr = constants[i % length] / 2;
      const res = p - curr;
      
      return res;
    });
    
    let indexs = [];
    let colors = [];
    
    for (let v = 0; v < positions.length / 3; v += 1) {
      colors = colors.concat(color);
      
      if (v % 4 === 0) {
        const min = v;
        
        indexs = indexs.concat(getRectangleIndex(min, min + 1, min + 2, min + 3));
      }
    }
    
    colors = new Float32Array(colors);
    indexs = new Int16Array(indexs);
    
    this.indexs = indexs;
    this.colors = colors;
    this.positions = positions;
  }
  
  render(gl, program, obj = {}) {
    const { pName = 'a_position', NName = 'a_normal', cName = 'a_color' } = obj;
    
    patchAttributes(gl, program, {
      [pName]: {
        data: this.positions,
        args: [3, gl.FLOAT, false, 0, 0],
      },
      [NName]: {
        data: this.normals,
        args: [3, gl.FLOAT, false, 0, 0],
      },
      [cName]: {
        data: this.colors,
        args: [4, gl.FLOAT, false, 0, 0],
      },
    });
    
    setIndexBuffer(gl, {
      data: this.indexs,
    });
    
    gl.drawElements(gl.TRIANGLES, this.indexs.length, gl.UNSIGNED_SHORT, 0);
  }
}

const table = new Cube({
  w: 120,
  h: 2,
  l: 65,
  color: [0.85, 0.85, 0.85, 1.0],
});

const tableLeg = new Cube({
  w: 5,
  h: 60,
  l: 5,
  color: [0.85, 0.85, 0.85, 1.0],
});

const macPlane = new Cube({
  w: 30,
  h: 1,
  l: 22,
  // color: [0.7, 0.7, 0.7, 1.0],
  color: [0.7, 0.7, 0.7, 1.0],
});

const keyBoard = new Cube({
  w: 26,
  h: 0,
  l: 14,
  color: [0.2, 0.2, 0.2, 1.0],
});

const macScreen = new Cube({
  w: 28,
  h: 0,
  l: 20,
  color: [0.2, 0.2, 0.2, 1.0],
});

const screenContainer = new Cube({
  w: 36,
  h: 60,
  l: 3,
  color: [0.6, 0.6, 0.6, 1.0],
});

const screen = new Cube({
  w: 32,
  h: 56,
  l: 0,
  color: [0.2, 0.2, 0.2, 1.0],
});

const beauties = {
  mats: [
    now => new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0).normalize(), THREE.Math.degToRad(now * 100)),
  ],
  baseMat: new THREE.Matrix4().makeTranslation(0, 0, -50),
  models: [table],
  children: [
    {
      mats: [
        new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(10)),
        new THREE.Matrix4().makeTranslation(-15, 1, 5),
      ],
      models: [macPlane],
      children: [
        {
          mats: [
            new THREE.Matrix4().makeTranslation(0, 10, -16.5),
            new THREE.Matrix4().makeRotationX(45),
          ],
          models: [macPlane],
          children: [
            {
              mats: [
                new THREE.Matrix4().makeTranslation(0, 0.55, 0),
              ],
              models: [macScreen],
            },
          ],
        },
        {
          mats: [
            new THREE.Matrix4().makeTranslation(0.25, 0.55, 0),
          ],
          models: [keyBoard],
        },
      ],
    },
    {
      mats: [
        new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(-15)),
        new THREE.Matrix4().makeTranslation(30, 30, -5),
      ],
      models: [screenContainer],
      children: [{
        mats: [ new THREE.Matrix4().makeTranslation(0.5, 1, 2)],
        models: [screen],
      }],
    },
    {
      mats: [new THREE.Matrix4().makeTranslation(-54, -30, 26)],
      models: [tableLeg],
    },
    {
      mats: [new THREE.Matrix4().makeTranslation(-54, -30, -26)],
      models: [tableLeg],
    },
    {
      mats: [new THREE.Matrix4().makeTranslation(54, -30, -26)],
      models: [tableLeg],
    },
    {
      mats: [new THREE.Matrix4().makeTranslation(54, -30, 26)],
      models: [tableLeg],
    },
  ],
};

const vShader = `
  attribute vec4 a_position;
  attribute vec4 a_color;
  attribute vec3 a_normal;

  uniform mat4 u_world;
  uniform mat4 u_worldInverse;

  varying vec3 v_normal;
  varying vec4 v_color;

  void main() {
    gl_Position = u_world * a_position;

    v_normal = mat3(u_worldInverse) * a_normal;
    v_color = a_color;
  }
`;

const fShader = `
  precision mediump float;

  varying vec3 v_normal;
  varying vec4 v_color;

  uniform vec3 u_light;
  uniform vec3 u_eye;

  void main() {
    vec3 normal = normalize(v_normal);

    vec3 halfE = normalize(u_eye + u_light);
    float diffuse = clamp(dot(normal, u_light), 0.0, 1.0);
    float specular = pow(clamp(dot(normal, halfE), 0.0, 1.0), 50.0);
    vec4 light = v_color * vec4(vec3(diffuse), 1.0) + v_color * vec4(vec3(specular), 1.0);

    gl_FragColor = light;
    gl_FragColor.rgb += vec3(0.1, 0.1, 0.1);
  }
`;

const dance = (selector) => {
  
  if (!selector) {
    return null;
  }
  
  const canvas = document.querySelector(selector);
  const gl = canvas.getContext('webgl', {
    antialias: true,
  });
  
  if (!gl) {
    return null;
  }
  
  launch(gl);
  const program = createProgramFromSources(gl, [vShader, fShader]);
  
  const light = new THREE.Vector3(0, 1, 1).normalize();
  const eye = new THREE.Vector3(0, 1, 1);
  
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1;
  const zFar = 2000;
  const projectionMatrix = new THREE.PerspectiveCamera(60, aspect, zNear, zFar);
  
  const camera = new THREE.Vector3(0, 105, 200);
  const target = new THREE.Vector3(0, 35, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const viewMatrix = new THREE.Matrix4().watchAt(camera, target, up);
  
  const viewProjectionMatrix = new THREE.Matrix4();
  viewProjectionMatrix.multiplyMatrices(projectionMatrix.projectionMatrix, viewMatrix);
  
  let count = 0;
  
  patchUniforms(gl, program, {
    u_light: {
      func: gl.uniform3fv,
      args: [[light.x, light.y, light.z]],
    },
    u_eye: {
      func: gl.uniform3fv,
      args: [[eye.x, eye.y, eye.z]],
    },
  });
  
  const setWorldBase = worldBuild(viewProjectionMatrix, (worldView, worldInverseTranspose) => {
    patchUniforms(gl, program, {
      u_world: {
        func: gl.uniformMatrix4fv,
        args: [false, worldView.elements],
      },
      u_worldInverse: {
        func: gl.uniformMatrix4fv,
        args: [false, worldInverseTranspose.elements],
      },
    });
  });
  
  
  
  animate(() => {
    if(a) return
  
    count += 0.01;
    const now = count % 360;
    
    // resize(gl);
    modelRender({
      setMat: setWorldBase,
      gl,        34
      program,
      tree: beauties,
      now,
    });
    
    gl.flush();
  })();
};

dance('#world');
document.getElementById('world').onclick=function(){
  window.a = !window.a;
}


