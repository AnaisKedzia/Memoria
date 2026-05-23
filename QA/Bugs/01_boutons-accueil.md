## Rapport de bug - Boutons page d'accueil

Date : 30/10  
Statut : Résolu  
Méthode de test : Test exploratoire

#### Description  
Alignement inexact lors de l'affichage de la section cliquée.

#### Étapes pour reproduire 
1. Se rendre sur la page d'accueil
2. Observer l'affichage

#### Comportement attendu   
La section s'affiche entièrement et occupe tout l'écran.

#### Comportement observé   
Le haut de la section est cachée derrière la barre de navigation, le début de la section suivante est visible.

#### Analyse 
Prendre en compte la hauteur de la barre de navigation lors du défilement vers la section correspondante.

#### Résolution  
Ajustement du comportement de l'application lors du défilement et ajout du code suivant:

 style.css :   
 
    :root {  
        ...  
        scroll-padding-top: 59px;  
    }

