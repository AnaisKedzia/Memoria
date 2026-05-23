## Rapport de bug - Modification nom paquet

Date : 02/12  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description   
La validation de la modification d'un nom de paquet, lorsque le nom reste le même, 
cause des anomalies dans l'interface de card-management.html et l'enregistrement des données. Toutes les données relatives au paquet disparaissent. 

#### Étapes pour reproduire 
1. (Optionnel) Se rendre sur menu.html et créer un paquet
2. Cliquer sur "Gérer les cartes"
3. Cliquer sur l'icône pour éditer le nom du paquet
4. Valider la modification sans changer le nom
5. Constater l'erreur d'affichage
6. Revenir à menu.html et constater l'absence du paquet

#### Comportement attendu   
La validation de la modification ne provoque aucun changement notable sur le comportement de l'application ou du paquet.

#### Comportement observé 
La validation de la modification efface les données du paquet et les éléments HTML relatifs à la liste disparaissent de menu.html.

#### Analyse   
Le test comparant l'entrée de l'utilisateur et le nom du paquet échoue.  

card-management.js : 

    modifyDeck(deck) {
        ...
        if (input === deck.name) {
            return;
        }
    }

Le paramètre passé à la fonction modifyDeck doit être un object de la classe Deck, mais la valeur passée est celle de l'élément select avant la modification. Il n'a donc pas de propriété name et renvoie undefined. 
L'autre branche de code est excécutée et efface les données du paquet, qui existe toujours sous le même nom : 


    modifyDeck(deck) {
        ...
        else {
            deckList[input] = deckList[deck];
            deckList[input].name = input;
            delete deckList[deck];
            localStorage.setItem("deckList", JSON.stringify(deckList));
        }
    }

#### Résolution  
Modifier le test afin que l'entrée de l'utilisateur soit comparée avec la valeur de select. 

card-management.js : 

    modifyDeck(deck) {
        ...
        if (input === deck) {
            return;
        }
    }

#### Références  
bug_10_1.png  
bug_10_2.png