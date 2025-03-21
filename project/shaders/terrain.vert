attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float weightOriginal;
uniform float weightAlt;
uniform sampler2D terrainMap;

varying vec3 vertexPos;
varying vec2 vTextureCoord;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset.z=0.2 * texture2D(terrainMap, aTextureCoord).r;

	vertexPos = aVertexPosition + offset;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
