Cette catégorie rassemble les informations développeur quant à la génération / création / caractéristiques des astéroïdes.

**Afin de laisser du suspens / du contenu à découvrir aux joueurs, il est évident que ces infos (algo de génération) doivent rester au sein de l'équipe de dev !!!**

------------

## Génération des tailles

- BETA : **82%**
- Classe TITAN : **16%**
- Géocroiseur : **1.7%**
- Archonte T30 : **0.3%** _(oui ils existent :D)_

## Génération de la radioactivité

La radioactivité dépend du type d'astéroïde :

- BETA
    - **70%** : `1 à 2`
    - **25%** : `2 à 4`
    - **5%** : `5`
- Classe TITAN
    - **70%** : `4 à 7`
    - **25%** : `7 à 9`
    - **5%** : `11`
- Géocroiseur
    - **70%** : `7 à 9`
    - **25%** : `10 à 12`
    - **5%** : `14`
- Archonte T30
    - **70%** : `15 à 18`
    - **25%** : `19 à 22`
    - **5%** : `25`

## Génération du minerai

Le minerai est généré selon plusieurs facteurs. En premier lieu, il y a le **facteur de catégorie** (Commun, Précieux, Rare). En second lieu, le **facteur de type** (le nom du minerai). Puis le **type de l'astéroide** et enfin **la radioactivité** sur ce dernier.

#### Facteurs de catégorie

- Communs
    - **60%** : `25 à 150`
    - **30%** : `100 à 200`
    - **10%** : `150 à 250`
- Précieux
    - **60%** : `2 à 10`
    - **30%** : `6 à 13`
    - **10%** : `13 à 20`
- Rares
    - **70%** : `0 à 1`
    - **25%** : `1 à 2`
    - **5%** : `2 à 4`

#### Facteurs de type

- Communs
    - Selenium
        - **70%** : `+50 à +200`
        - **30%** : `+201 à +250`
    - Asteros
        - **70%** : `+40 à +100`
        - **30%** : `+101 à +150`
    - Barium
        - **70%** : `+20 à +70`
        - **30%** : `+71 à +100`
    - Crystalite
        - **70%** : `+10 à +30`
        - **30%** : `+31 à +50`
- Précieux
    - Quazinc
        - **70%** : `+4 à +20`
        - **30%** : `+21 à +30`
    - Bytanium
        - **70%** : `+2 à +16`
        - **30%** : `+17 à +25`
    - Korellium
        - **70%** : `+1 à +14`
        - **30%** : `+15 à +20`
    - Dragonium
        - **70%** : `+1 à +6`
        - **30%** : `+7 à +10`
- Rares
    - Traxium
        - **80%** : `+0 à +1`
        - **20%** : `+2 à +3`
    - Nexos
        - **90%** : `+0`
        - **10%** : `+1 à +2`

#### Type de l'astéroïde

Selon la taille de l'astéroïde, un multiplicateur est appliqué aux unités de minerai :

- BETA : **x 1**
- Classe TITAN : **x 2.3**
- Géocroiseur : **x 5.8**
- Archonte T30 : **x 12**

#### Radioactivité de l'astéroïde

Selon la radioactivité de l'astéroïde, un multiplicateur est appliqué aux unités de minerai :

```
mult_radio = ((radioactivite * 10) + 100) / 100
```

#### Résumé

La génération de minerai est donc défini comme ceci :
```
(rand(categorie) + rand(type)) * typeAsteroide * mult_radio
```