incident lighting: ein/auftreffendes licht

irradiance: diffuse reflexion
radiance:   gespielgelte/gerichtete reflexion

distance-based roughness:
Je weiter die in der Spiegelung sichtbare Oberfläche entfernt ist,
desto stärker muss gestreut werden.

IBL:
Um gestreutes Licht zu simulieren, müsste für den kompletten Streubereich ein
Durchschnittswert errechnet werden.

Mithilfe der Monte-Carlo-Methode kann durch zufällige Samples der
Durchschnittswert angenähert werden.  Das verursacht allerdings ein Rauschen.

Um das Rauschen zu reduzieren, sollen die Richtungen, welche das Ergebnis
vorraussichtlich am meisten Beeinflussen häufiger gesampled werden als andere.
Die Gewichtung wird durch eine "Probability Density Function" PDF generiert.
So gewonnene Samples müssen mit der Gewichtung der PDF skaliert werden.
1/PDF(..) * sample

Eine "Cumulative Distribution Function" CDF nimmt Zufallszahlen an und mappt
diese auf Samplingpunkte der PDF.
