## Rapport de bug - Suppression carte message persistant 

Date : 11/12  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description   
Lors de la recherche d'une carte depuis manage-cards.js, supprimer la ou toutes les cartes résultantes de la recherche provoque l'apparition et la persistance du message "aucune carte correspondante". Il devient impossible de supprimer d'autre cartes.

#### Étapes pour reproduire 
1. Se rendre sur card-management.html
2. Effectuer une recherche pour réduire la liste de carte à 1 carte.
3. Supprimer la carte.
4. Effacer l'entrée dans la barre de recherche pour afficher toutes les cartes du paquet.
5. Selectionner une carte.
6. Constater la persistance du message et l'absence du bouton de supression.

#### Comportement attendu   
La supression de la dernière carte affichée grâce à une recherche, supprime la carte et affiche le message 
"Aucune carte correspondante". Lors d'une nouvelle recherche, le message précédent disparaît et une nouvelle liste de carte apparaît.
Les cartes sélectionnées peuvent être supprimées ou modifiées.

#### Comportement observé   
La supression de la dernière carte supprime la carte mais affiche le message "Ce paquet ne contient aucune carte", 
qui persiste même lors d'une nouvelle recherche. Les nouvelles cartes sélectionnées ne peuvent être supprimées ou modifiées.

#### Analyse   
Après la suppression d'une carte, card.deleteCard appelle la fonction de rappel display.active, qui cible et surligne une autre carte parmis celles affichées.
Mais la condition suivante s'exécute et fait appel à display._emptyDeck : 

card-management.js : 

    active() {
            ...
            if (cardDisplay.childElementCount === 0 || this.emptyList) {
                this._emptyDeck();
                return
            }
    }

display._emptyDeck crée et affiche un message informant l'utilisateur que le paquet sélectionné est vide.


#### Résolution  
L'évaluation de la condition dans display.active se base seulement sur la liste affichée dans le DOM. 
Elle ne prend pas en compte les éléments de données relatifs au paquet dans le localStorage, l'évalutation est donc erronée. 

Il faut prévoir différents scénarios : 
- Le paquet n'a pas de cartes :  
 -> "Ce paquet est vide".
- Le paquet possède des cartes mais la liste affichée est vide :  
 -> "Aucune correspondance".
- Le paquet possède des cartes et et la liste affichée est non-vide :  
 -> Surligne une autre carte dans la liste.


*Code initial :*  

card-management.js 

    active() {
            let active = document.querySelector(".card.active");
            let cardDisplay = document.getElementById("cardDisplay");

            if (cardDisplay.childElementCount === 0 || this.emptyList) {
                this._emptyDeck();
                return
            } else if (!this.emptyList && !active) {
                document.querySelector(".card").classList.add("active");
            }

            this.fillTextArea(document.querySelector(".card.active"));
            this._deleteButton();
    }


*Code modifié :* 

card-management.js

    active() {
        let active = document.querySelector(".card.active");
        let cardDisplay = document.getElementById("cardDisplay");
        let deck = getDeck(document.getElementById("deckList").value);
        let cardNumber = deck.cards.length + deck.review.length;

        if (!active) {
            if (cardNumber === 0) {
                this._emptyDeck();
                return
            } else if (!this.emptyList && cardDisplay.childElementCount !== 0) {
                document.querySelector(".card")?.classList.add("active");
            } else {
                this.noMatch();
                return
            }
        }

        this.fillTextArea(document.querySelector(".card.active"));
        this._deleteButton();
    },