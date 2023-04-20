#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTex;
uniform sampler2D waterMap;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(waterTex, vTextureCoord+timeFactor);
	vec4 tex_color = vec4(texture2D(waterMap, vTextureCoord + timeFactor).r, texture2D(waterMap, vTextureCoord + timeFactor).g, texture2D(waterMap, vTextureCoord + timeFactor).b, 1.0);

	if (tex_color.b < 0.5)
 	{
		color = color * (tex_color + vec4(0.5, 0.5, 0.5, 1.0));
	} else {
		color = color + (tex_color - vec4(0.5, 0.5, 0.5, 1.0));
	}
	gl_FragColor = color;
}