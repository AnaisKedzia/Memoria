## Rapport de bug - Affichage du paquet

Date : 04/11  
Statut : Résolu  
Méthode de test : Test exploratoire

#### Description   
Les informations relatives au paquet ne s'affiche pas correctement lors de la création.

#### Étapes pour reproduire   
1. Se rendre sur deck-menu.html
2. Créer un paquet.
3. Lire les informations relatives au paquet.

#### Comportement attendu   
Toutes les informations sont affichées comme attendues.

#### Comportement observé   
Les données sont affichées seules, sans leurs labels.

#### Analyse   
Manquement dans la traduction dynamique.

#### Résolution  
Implémentation de la traduction des éléments non-statiques.
Ajout des lignes de code suivantes :

menu.js : 

    export const display = {
        create : {
            deckElements(name) {
                ...
                deckInformationNewCards.innerHTML = `${lang.translate("daily-counter")}`
                addCards.innerHTML = `${lang.translate("second-step")}`;
                newInfo.innerHTML = `${lang.translate("new-cards")}`;
                familiarInfo.innerHTML = `${lang.translate("familiar-cards")}`;
            }
        }
    }

#### Références  
bug_06_1.png  
bug_06_2.png