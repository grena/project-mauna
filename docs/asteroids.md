Chaque colonie de la TetraCorp&trade; est installée sur un des astéroïdes des Secteurs Fragmentés.

## Minerais

Les astéroïdes sont avant tout exploités pour les minerais contenus en leur sous-sol. Il existe 10 types de minerai différents, répartis en 3 catégories. Chaque catégorie de minerai nécessite une foreuse spéciale. En voici la liste exhaustive, du plus commun au plus rare :

**Minerais communs**, nécessitent une [Foreuse](buildings/mines.md#foreuse) :

- Selenium
- Asteros
- Barium
- Crystalite

**Minerais précieux**, nécessitent une [Foreuse de Profondeur](buildings/mines.md#foreuse-de-profondeur) :

- Quazinc
- Bytanium
- Korellium
- Dragonium

**Minerais rares**, nécessitent un [Pénétrateur Sismique](buildings/mines.md#penetrateur-sismique) :

- Traxium
- Nexos

## Radioactivité

Sur certains astéroïdes, les niveaux de radiation sont tels qu'ils peuvent entraîner diverses maladies qui ralentissent la production. Les scientifiques pensent que la radioactivité d'un astéroïde concorde avec la présence de minerais précieux.

## Tailles

Il existe autant de taille d'astéroïde qu'il existe d'astéroïde (les dimensions varient de quelques dizaines de mètres à plusieurs centaines de kilomètres). Cependant, pour des raisons de classification au sein de la TetraCorp&trade;, 3 tailles ont été définie :

- Les "**BETA**" (entre 5 et 50km de diamètre)
- Les "**Classe TITAN**" (entre 51 et 150km)
- Les "**Géocroiseurs**" (150km et +)

Des rumeurs laissant entendre des astéroïdes de type "**Archonte T30**" (supérieurs à 1000km) ont été démenties par la TetraCorp&trade; lors d'un discours de Jane Fong en 2129.

## Development informations

### Tailles taux de génération :

- BETA : 85%
- Classe TITAN : 13%
- Géoc : 1.5%
- Archonte T30 : 0.5% (oui ils existent :D)

### Minerais taux de génération :

Minerais communs (entre 0 et 250 unités) :

- Selenium (+250)
- Asteros (+150)
- Barium (+100)
- Crystalite (+50)

Minerais précieux (entre 0 et 20 unités)

- Quazinc (+30)
- Bytanium (+25)
- Korellium (+20)
- Dragonium (+10)

Mineraies rares (entre 0 et 2 unités)

- Traxium (+3)
- Nexos (+2)

Selon la taille de l'astéroïde, un multiplicateur est appliqué au unités de minerai :

- BETA : x 1
- Classe TITAN : x 1.6
- Géoc : x 2.5
- Archonte T30 : x 4

La quantité de minerai d'un astéroïde est donc défini comme ceci : (rand(categorie) + rand(type)) * TauxAsteroide
Example pour du Bytanium, sur un astéroïde de Classe TITAN : (rand(0, 20) + rand(0, 25)) * 1.6

### Radiation taux de génération