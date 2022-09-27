function main() {
  // get the element (id) from HTML
  // getCotext is for adding the library webGL into out code
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("experimental-webgl");

  /*
    A ( 0.5, 0.5)
    B ( 0.0, 0.0)
    C ( -0.5, 0.5)

  */

  var vertices = [
    0.5, 0.0, 1.0, 0.0, 0.0,
    0.0, -0.5, 0.0, 1.0, 0.0,
    -0.5, 0.0, 0.0, 0.0 ,1.0,
    0.0, 0.5, 0.0, 0.0, 0.0,

    // //CROWN
    // -0.73736, 0.24866, //p
    // -0.68871, 0.21929, //q
    // -0.69177, 0.27808, //s
    // -0.64912, 0.2369, //r
    // -0.64176, 0.29279, //u
    // -0.61529, 0.2369, //o
    // -0.6, 0.2, //w
    // -0.70648, 0.1663, //v
    // -0.72118, 0.20307, //m
    // -0.73736, 0.24866, //p
  ]; // VERTICES

  // Create a linked-list for storing the vertices data in GPU realm
  var buffrer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffrer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // VERTEX SHADER
  var vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  varying vec3 vColor;
  void main () {
    gl_PointSize = 15.0;
    vec2 position = vec2(aPosition);
    position.x = -cos(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
    position.y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;

    gl_Position = vec4(position, 0.0, 1.0);
    vColor = aColor;
  }
  `;


  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode); 
  gl.compileShader(vertexShader);

  var fragmentShaderCode = `
      precision mediump float; // useful practice
      varying vec3 vColor;
        void main () {
          gl_FragColor = vec4(vColor, 1.0);
        }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader); // After the shader program has been created
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);


  var theta = 0.0;
  // ! all qualifire
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 *Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(aPosition);

  // adding color
  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 *Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

function render() {
  gl.clearColor(1.0, 0.75, 0.79, 1.0); // adding a color background
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  theta += 0.01;
  gl.uniform1f(uTheta, theta);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  gl.drawArrays(gl.LINE_LOOP, 4, 9);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
}