
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	offset=aVertexNormal + 0.1*sin(timeFactor)*normScale;

	vec3 tmp = aVertexPosition;
	tmp.x += offset.x;

	gl_Position = uPMatrix * uMVMatrix * vec4(tmp, 1.0);
}

