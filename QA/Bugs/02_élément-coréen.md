## Rapport de bug - Élément coréen

Date : 30/10  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description   
Apparition d'une barre de défilement dans l'élément select quand la langue coréenne est sélectionnée.

#### Étapes pour reproduire 
1. Se rendre sur la page d'accueil
2. Changer la langue et sélectionner 한국어 en haut à droite
3. Observer l'affichage

#### Comportement attendu   
La langue sélectionnée est changée sans changement visuel de l'interface.

#### Comportement observé   
Une barre de défilement apparaît dans la case de sélection des langues.

#### Analyse  
Les caractères coréens ont une plus grande taille, et aucune règle de style n'est définie quant au débordement d'éléments. 

#### Résolution  
Ajout de d'un attribut à la classe navigation :  
intro.css :   

    .navigation {  
        ...  
        overflow: hidden;  
    }  

#### Références  
Images/bug_02_1.png  
Images/bug_02_2.png