varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 2.0)), 2.0);
    gl_FragColor = vec4(0.02, 0.49, 1, 0.76) * intensity;
}