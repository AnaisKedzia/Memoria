## Rapport de bug - Fin de révision message manquant

Date : 01/12  
Statut : Résolu  
Méthode de test : Test de régression manuel

#### Description   
Le message de fin de révision ne s'affiche pas lors de l'accès à un paquet dont la révision est déjà finie.

#### Étapes pour reproduire 
1. Se rendre sur deck-menu.html
2. Cliquer sur le nom d'un paquet dont aucune carte est à revoir.
3. Constater l'absence de message de fin.

#### Comportement attendu   
Un message informe l'utilisateur que les révisions sont finies.

#### Comportement observé   
Aucun message ne s'affiche.

#### Analyse   
La correction du bug 07_fin-revision modifie la traduction du message au chargement de la page et l'introduit à la fin de la révision, mais ne prévoit pas le cas où la révision est déjà terminée.

#### Résolution  
Ajout de l'affichage et l'attribut de traduction du message si la révision est déjà finie. 

*Code initial :* 

review.js :

    function showQuestion() {
        ...
        if (deck.review.length === 0) {
            document.getElementById("answer").remove();
        }
    }

*Code modifié :* 

review.js :

    function showQuestion() {
        ...
        if (deck.review.length === 0) {
            document.getElementById("answer").remove();
            document.getElementById("card").innerHTML = `${lang.translate("review-finished")}`;
            document.getElementById("card").setAttribute("data-i18n", "review-finished");
        }
    }

#### Références  
bug_08_1.png  
bug_08_2.png  