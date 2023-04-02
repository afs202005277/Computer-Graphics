attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D waterMap;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset=aVertexNormal*0.1 * texture2D(waterMap, aTextureCoord + timeFactor).r;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

