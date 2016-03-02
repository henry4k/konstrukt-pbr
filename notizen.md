## Allgemeines

Statt Metallisch/Nicht-Metallisch sollte zwischen Leitern und Nichtleitern
unterschieden werden.

Leiter:  Metall, Wasser, Eis, ...
Nichtleiter:  Plastik, Gummi, Stein, ...

Leiter reflektieren viel mehr als Nichtleiter: 60-90% vs 0-20%.
Im Umkehrschluss haben Leiter einen verschwindend geringen diffusen Anteil.
(Je mehr Verunreinigungen z.B. eine Metalloberfläche aufweist, desto größer
wird der diffuse Anteil.)

Manche Leiter reflektieren gefärbtes Licht.  Z.B. Gold, Kupfer, Bronze
Nichtleiter tun das i.d.R. überhaupt nicht.

Zur Orientierung:
Der Albedowert von Nichtleitern liegt allgemein zwischen 32 und 234.
32 ist Kohle und 234 ist frischer Schnee.  Dunklere bzw. hellere
Oberflächen gibt es normalerweise nicht.
Pure Leiter, ohne Verunreinigungen, haben einen Albedo von 0.

Beleuchtungsinformationen wie z.B. AO gehören nicht in den Albedowert.

## Fresnel Effekt

Je flacher der Winkel in dem Licht auf eine Oberfläche auftrifft, desto höher
der reflektierte Anteil.
So sehen dann Objekte an ihren Rändern z.B. heller aus.

Der Fresnel-Effekt-Faktor muss so angepasst werden, dass dieser zusammen mit
dem Wert aus der Reflexions/Metalligkeits-Map maximal 1 ergibt.

> Fresnel generally should be set to 1 (and is locked to a value of 1 with the
> metalness reflectivity module) as all types of materials become 100%
> reflective at grazing angles. Variances in microsurface which result in a
> brighter or dimmer Fresnel effect are automatically accounted for via the
> gloss map content.


## Anderes

> When using a metalness map, insulative surfaces - pixels set to 0.0 (black) in
> the metalness map – are assigned a fixed reflectance value (linear: 0.04 sRGB:
> 0.22) and use the albedo map for the diffuse value. For metallic
> surfaces – pixels set to 1.0 (white) in the metalness map – the specular color
> and intensity is taken from the albedo map, and the diffuse value is set to 0
> (black) in the shader. Gray values in the metalness map will be treated as
> partially metallic and will pull the reflectivity from the albedo and darken
> the diffuse proportionally to that value (partially metallic materials are
> uncommon).

> For a given material type, reflectivity tends to remain fairly constant.


## Glossar


Albedo:  fraction of incoming light which is diffused
Diffus: light that is scattered in every direction by the material
Reflektion:
Specular: spiegelnd


