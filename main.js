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
    
      var vertices = [0.5, 0.5, 0.0, 0.0, -0.5, 0.5];
    
      // Create a linked-list for storing the vertices data in GPU realm
      var buffrer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffrer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
      // VERTEX SHADER
      var vertexShaderCode = `
      attribute vec2 aPosition;
      void main () {
        gl_PointSize = 15.0;  // adding size of point
        gl_Position = vec4(aPosition, 0.0, 1.0);
        // is the final destination for storing
        // positional data for the rendered vertex
      }
      `;
    
      // Create shader to vertext shader
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      // passing Shader from CPU to GPU
      gl.shaderSource(vertexShader, vertexShaderCode);
      gl.compileShader(vertexShader);
    
      // FRAGMENT SHADER
      var fragmentShaderCode = `
            void main () {
              // final color for (they need to render in particular fragment) fev1/fec2 dll is for vector
              // final destinarion for storing 
              gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
            }
      `;
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderCode);
      gl.compileShader(fragmentShader);
    
      // Comparing to C programming, we my imagine
    
      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader); // After the shader program has been created
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);
    
      // Teach the GPU how to collect the potitional values from ARRAY_BUFFER
      // for each vertex being processed
      var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPosition);
    
      gl.clearColor(1.0, 0.75, 0.79, 1.0); // adding a color background
      //           R    G      B     A
      gl.clear(gl.COLOR_BUFFER_BIT);
    
      // draw the canvas using drawArrays
      // glPOINTS (Assembly)
      gl.drawArrays(gl.POINT, 0, 3);
    }