#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

varying vec4 newVertexPosition;

void main() {
    vec4 color = vec4(0.6,0.6,0.9, 1.0);

    if (newVertexPosition.y >= 0.5) {
		color = vec4(0.8, 0.8, 0.0, 1.0);
    }

    gl_FragColor = color;
}