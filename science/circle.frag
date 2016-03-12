float BoundBy( const in float minimum,
               const in float maximum,
               const in float value )
{
    return max(minimum, min(maximum, value));
}

float CircleYOffset( const in float x,
                     const in float circleX,
                     const in float radius )
{
    float x2 = (x-circleX)/radius;
    return sqrt(1.0-x2*x2)*radius;
}

float IntersectionHeight( const in float x,
                          const in float circleX,
                          const in float circleY,
                          const in float radius,
                          const in float rectHeight )
{
    float yOffset = CircleYOffset(x, circleX, radius);
    float maximum = BoundBy(0.0, rectHeight, circleY+yOffset);
    float minimum = BoundBy(0.0, rectHeight, circleY-yOffset);
    return maximum-minimum;
}

float PartIntersectionVolume( const in x1
                              const in x2,
                              const in circleX,
                              const in circleY,
                              const in radius,
                              const in rectHeight )
{
    float height1 = IntersectionHeight(x1, circleX, circleY, radius, rectHeight);
    float height2 = IntersectionHeight(x2, circleX, circleY, radius, rectHeight);
    float averageHeight = (height1+height2)/2.0;
    float width = x2-x1;
    return averageHeight * width;
}

const float IntegrationStepCount = 6;

float IntersectionVolume( const in circleX,
                          const in circleY,
                          const in radius,
                          const in rectWidth,
                          const in rectHeight )
{
    float xStart = BoundBy(0.0, rectWidth, circleX-radius);
    float xEnd   = BoundBy(0.0, rectWidth, circleX+radius);
    float stepSize = (xEnd-xStart) / IntegrationStepCount;
    float volume = 0.0;
    for(int i = 0; i < IntegrationStepCount-1; ++i)
    {
        float x = xStart + stepSize*i;
        volume += PartIntersectionVolume(x,
                                         x+stepSize,
                                         circleX,
                                         circleY,
                                         radius,
                                         rectHeight);
    }
    return volume;
}


