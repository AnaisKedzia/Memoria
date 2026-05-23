## Rapport de bug - Accès menu

Date : 30/10  
Statut : Résolu  
Méthode de test : Test exploratoire

#### Description   
Erreur 404 lors de l'accès à deck-menu.html après retour sur la page d'accueil.

#### Étapes pour reproduire 
1. Se rendre sur la page d'accueil.
2. Cliquer sur le bouton "Commencer" en bas de la page.
3. Cliquer sur "Mémoria" pour revenir à la page d'accueil.
4. Cliquer de nouveau sur le bouton "Commencer" en bas de la page.
5. Constater l'erreur.

#### Comportement attendu   
La page d'accueil s'affiche normalement.

#### Comportement observé   
Le fichier est introuvable et une erreur 404 survient.
L'URL renvoie : http://localhost:8000/html/html/deck-menu.html

#### Analyse   
Le chemin d'accès au fichier index.html correspond à l'ULR racine localhost:8000, comme défini dans server.py, afin d'accéder directement à la page d'accueil lors du lancement du serveur.
La fonction du bouton "Mémoria" doit être modifiée pour rediriger vers l'URL source au lieu de "/html/index.html" pour maintenir tous les chemins relatifs.

#### Résolution  
Modification de l'addresse de la page d'accueil : 

*Code initial :*

storage.js

    export const links = {  
        ...  
        index : `/html/index.html`,  
    }  


*Version modifiée :*

storage.js 

    export const links = {  
    ...  
    index : `/`,  
    }