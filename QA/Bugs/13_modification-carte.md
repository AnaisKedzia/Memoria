## Rapport de bug - Modification d'une carte impossible

Date : 09/01/26  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description ---  
La modification d'une carte reste désactivée après la suppression d'un ou plusieurs caractères.

#### Étapes pour reproduire ---  
1. Se rendre sur deck-menu.html
2. (Optionnel) Créer un paquet
3. Cliquer sur "Gérer les cartes"
4. Sélectionner une carte et supprimer un caractère

#### Comportement attendu ---  
Le bouton "Modifier" s'active et rend possible la modification.

#### Comportement observé ---  
Le bouton "Modifier" reste grisé et inactif, empêchant la modification.

#### Analyse ---  
Le bouton reste inactif car la fonction rendant possible la modification réagit à l'évènement "keypress", qui ne prend pas en compte la barre d'espace et la touche de suppression.

#### Résolution---  
Remplacement du type d'évènement "keypress" par "keydown" :  

*Code initial :*

card-management.js

    function attachEvents() {
        ...
        document.getElementById("front").addEventListener("keypress", (event) => checkInput(event, "front"));
        document.getElementById("back").addEventListener("keypress", (event) => checkInput(event, "back"));
    }

*Code modifié :* 

card-management.js

    function attachEvents() {
        ...
        document.getElementById("front").addEventListener("keydown", (event) => checkInput(event, "front"));
        document.getElementById("back").addEventListener("keydown", (event) => checkInput(event, "back"));
    }