## Rapport de bug - Traduction message liste vide

Date : 30/10  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description   
Le message informant que l'utilisateur n'a pas de paquets à afficher apparaît en anglais.

#### Étapes pour reproduire 
1. Se rendre sur deck-menu.html
2. Sélectionner le français ou coréen.
3. Créer un paquet par défaut ou manuellement.
4. Supprimer le paquet.
5. Constater le message affiché.

#### Comportement attendu   
Le message est affiché dans la langue sélectionnée.

#### Comportement observé   
Le message est affiché en anglais.

#### Analyse   
Lors de la création du message et ses éléments, la valeur du message est en anglais.

#### Résolution  
Implémentation de la traduction des éléments non-statiques, grâce à l'objet lang, en charge de la traduction :

*Code initial :*

menu.js  

    export const display = {  
        create : {  
            noDeckMessage() {  
            ...  
            let title = document.createElement("h3");  
            title.innerHTML = "You have no deck to display";  
            }  
        }  
    }  

*Version modifiée :*   

menu.js : 

    export const display = {
        create : {
            noDeckMessage() {
            ...
            let title = document.createElement("h3");
            title.innerHTML = `${lang.translate("no-deck")}`;
            }
        }
    }

#### Références  
Bug_04_1.png  
Bug_04_2.png
