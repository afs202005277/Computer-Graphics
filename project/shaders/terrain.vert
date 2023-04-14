attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix; // view
uniform mat4 uPMatrix; // projection
uniform mat4 uNMatrix; // model
uniform sampler2D terrainMap;

varying vec2 vTextureCoord;
varying vec2 vPosition;

void main() {
    vTextureCoord = aTextureCoord;
    vPosition = (uNMatrix * vec4(aVertexPosition, 1.0)).xyz;
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 1.0);
}

