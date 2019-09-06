(function(global) {
    var glUtils = {
        VERSION: '0.0.1',
        checkWebGL: function(canvas) {
            var contexts = ["webgl", "moz-webgl", "webkit-3d", "experimental-webgl"];
            var gl;
            for (let i = 0; i < contexts.length; i++){
                try {
                    gl = canvas.getContext(contexts[i]);
                } catch (error) {
                    //kosong
                }
                if(gl){
                    break;
                }
            }
            if(!gl){
                alert("WebGL tidak ditemukan. Tolong gunakan chrome/firefox terbaru.");
            }
            return gl;
        },
        getShader: function(gl, type, source) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                console.log("error: getShader: " + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        },
        createProgram: function(gl, vertexShader, fragmentShader) {
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
                console.log("error: createProgram: " + gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                return null;
            }
            return program;
        }
    }
    global.glUtils = glUtils;
})(window || this);