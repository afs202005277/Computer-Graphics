#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(terrainTex, vTextureCoord);
	vec4 tex_color = vec4(texture2D(terrainMap, vTextureCoord).r, texture2D(terrainMap, vTextureCoord).g, texture2D(terrainMap, vTextureCoord).b, 1.0);

	gl_FragColor = tex_color;
}