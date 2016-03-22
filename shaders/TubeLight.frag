#ifdef WURST
vec3 Ld			= L1 - L0;
vec3 closestPoint	= L0 + Ld * clamp( t, 0.0, 1.0 );
vec3 centerToRay	= dot( closestPoint, r ) * r - closestPoint;
closestPoint		= closestPoint + centerToRay * clamp( tubeRad / length( centerToRay ), 0.0, 1.0 );
vec3 l				= normalize( closestPoint );
#endif
