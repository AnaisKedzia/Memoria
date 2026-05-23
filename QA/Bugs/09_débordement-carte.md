## Rapport de bug - Débordement éléments cartes

Date : 01/12  
Statut : Résolu  
Méthode de test : Test exporatoire  


#### Description   
Lors de la révision, les questions et réponses longues dont les caractères se suivent s'affichent incorectement.

#### Étapes pour reproduire 
1. Se rendre sur deck-menu.html
2. (Optionnel) Créer un paquet
3. Cliquer sur créer des cartes
4. Créer une carte avec un minimum de 80 caractères minimum se suivant
5. Revenir au menu et cliquer sur le nom du paquet correspondant à la carte créée
6. Avancer dans la révision jusqu'à rencontrer la carte et constater l'erreur

#### Comportement attendu 
La question/réponse reste dans sont contenant et s'affiche entièrement.

#### Comportement observé 
La question/réponse est coupée et cachée car elle déborde du contenant.

#### Analyse 
Modifier la classe CSS pour prévenir des débordements.

#### Résolution  
Ajout de la propriété overflow-wrap à la classe CSS corespondante.

review-cards.css : 


    .review-window__display p {
        font-size: 18px;
        padding: 10px;
        overflow-wrap: break-word;
    }

#### Références
bug_09_1.png  
bug_09_2.png 