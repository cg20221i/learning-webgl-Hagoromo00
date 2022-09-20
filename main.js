function main() {
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  // A(0.5,0.5)
  // B(0.0, 0.0)
  // C(-0.5, 0.5)

  var vertices = [
        0.5, 0.5,
        0.0, 0.0, -0.5, 0.5,
        0.0, 1.0,

      //CROWN
      -0.73736, 0.24866, //p
      -0.68871, 0.21929, //q
      -0.69177, 0.27808, //s
      -0.64912, 0.2369, //r
      -0.64176, 0.29279, //u
      -0.61529, 0.2369, //o
      -0.6, 0.2, //w
      -0.70648, 0.1663, //v
      -0.72118, 0.20307, //m
      -0.73736, 0.24866, //p
  ];

  //create a linked list for storing the vertices data in the GPU realm
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // VERTEX SHADER
  var vertexShaderCode = `
  attribute vec2 aPosition;
  uniform float uTheta;
      void main () {
          gl_PointSize = 15.0;
          vec2 position = vec2(aPosition);
          position.x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
          position.y = sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
          gl_Position = vec4(position, 0.0, 1.0);
  }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  // FRAGMENT SHADER
  var fragmentShaderCode = `
      void main() {
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
          // Blue = R:0, G:0, B:1, A:1
          // gl_FragColor is the final destination for storing
          //  color data for the rendered fragment
      }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Comparing to C programming, we my imagine
  // that up to this step we have created two
  // object files (.o) for the vertex and fragment shader

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // local var
  var theta = 0.0;

  // ALL the qualifiers need by shadeers
  var uTheta = gl.getUniformLocation(shaderProgram, 'uTheta');

  //teach the GPU how to collect
  //the positional values from ARRAY_BUFFER
  //for each vertex being processed

  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  function render() {
      gl.clearColor(1.0, 0.75, 0.79, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      theta += 0.01;
      gl.uniform1f(uTheta, theta);
      gl.drawArrays(gl.LINE_LOOP, 0, 4);
      gl.drawArrays(gl.LINE_LOOP, 4, 9);
  }

  setInterval(render, 1000 / 60);
}