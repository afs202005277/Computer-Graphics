#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform sampler2D altimetry;
uniform float weightOriginal;
uniform float weightAlt;

void main() {
	vec4 tex_color = texture2D(terrainTex, vTextureCoord);
	vec4 alt_color = texture2D(altimetry, vTextureCoord);
    vec4 color = weightOriginal * tex_color + weightAlt * alt_color;
	gl_FragColor = color;
}