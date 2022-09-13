function main() {
      
      var canvas = document.getElementById("myCanvas");
      var gl = canvas.getContext("experimental-webgl");
    
      // VERTEX SHADER
      var vertexShaderCode = `
      void main () {
        gl_PointSize = 30.0;  // adding size of point
        gl_Position = vec4(0.5, 0.5, 0.0, 1.0);
        // is the final destination for storing
        // positional data for the rendered vertex
      }
      `;
    
      // Create shader to vertext shader
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderCode); // passing Shader from CPU to GPU
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
    
    
      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader); // After the shader program has been created
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);
    
      gl.clearColor(1.0, 0.75, 0.79, 1.0); 
      
      gl.clear(gl.COLOR_BUFFER_BIT);
    
      // draw the canvas using drawArrays
      // glPOINTS (Assembly)
      gl.drawArrays(gl.POINT, 0, 1);
    }