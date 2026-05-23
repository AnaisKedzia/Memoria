## Rapport de bug - Fin de révision
Date : 01/12  
Statut : Résolu  
Méthode de test : Test exploratoire  


#### Description   
Le message de fin de révision s'affiche au début de la révision.

#### Étapes pour reproduire   
1. Se rendre sur deck-menu.html
2. Cliquer sur le nom d'un paquet affichant des cartes nouvelles et familières à revoir.
3. Constater le message de fin.

#### Comportement attendu   
La révision commence et le message de fin n'apparaît qu'une fois la révision terminée.

#### Comportement observé   
Le message s'affiche sans avoir revue aucune carte. 

#### Analyse   
Le message de fin est ajouté au document alors que le processus de révision n'a pas débuté par la traduction de la page, lors du chargement de la page. Le message de fin est également traduit, car il n'a pas de conditions de garde.

#### Résolution  
L'élément \<p id="card"> affiche les questions et réponses dans review-card.html, et sert également à l'affichage du message de fin de révision.

Pour préserver l'affichage des questions et réponses et préserver \<p id="card">, lui ajouter l'attribut data-i18n, ciblant les éléments à traduire, uniquement à la fin de la révision. 


*Code initial :*

review-card.html :

    <div class="review-window" id="reviewWindow">
        ...
        <div class="review-window__menu" id="cardDisplayMenu">
            <div class="review-window__display" id="cardDisplay">
                <p id="card" data-i18n="review-finished"></p>
            </div>
        </div>
    </div>

review.js :

    function finishReview() {
        document.getElementById("card").innerHTML = `${lang.translate("review-finished")}`;
        document.getElementById("unknown").remove();
        document.getElementById("known").remove();
        window.removeEventListener("keydown", reviewShortcuts)
    }

*Code modifié :* 

review-card.html :

    <div class="review-window" id="reviewWindow">
        ...
        <div class="review-window__menu" id="cardDisplayMenu">
            <div class="review-window__display" id="cardDisplay">
                <p id="card"></p>
            </div>
        </div>
    </div>

review.js :

    function finishReview() {
        document.getElementById("card").innerHTML = `${lang.translate("review-finished")}`;
        document.getElementById("card").setAttribute("data-i18n", "review-finished"); 
        document.getElementById("unknown").remove();
        document.getElementById("known").remove();
        window.removeEventListener("keydown", reviewShortcuts)
    }

