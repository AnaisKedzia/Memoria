## Rapport de bug - Données des prévisions erronées

Date : 13/12  
Statut : Résolu  
Méthode de test : Test exploratoire


#### Description   
Lors de la vérification du nombre de carte à revoir pour la semaine, la prévision du nombre de cartes à revoir dans review-forecast.html est erronée. 

#### Étapes pour reproduire 
1. Se rendre sur deck.menu.html
2. Supprimer les paquets existants et créer un paquet par défaut.
3. Cliquer sur le nom du paquet et terminer la révision du jour.
4. Cliquer sur "Révisions à venir".
5. Le nombre de cartes à revoir pour le jour même n'est pas égal à 0.

#### Comportement attendu   
Une fois la révision du jour terminée, la prédiction du nombre de cartes à revoir pour le jour-même est à 0.

#### Comportement observé   
Lorsque la révision est terminée, les révisions pour le jour ne sont pas à 0, et les cartes qui ont été revues le jour-même ne sont pas comptabilisées dans les prévisions du nombre de cartes à revoir pour les prochains jours.
Si un paquet contient 5 nouvelles cartes, et ont toutes été revues, la prévision du jour affiche toujours 5 cartes à revoir. 

#### Analyse   
Il existe deux défaillances :  
1 - Les cartes nouvelles qui ont été revues ne sont pas comptabilisées et persistent dans la prévision du nombre de carte à revoir pour le jour même.  
2 - Les cartes familières ne sont pas comptabilisées dans la prévision pour les jours à venir.

1 - Dans graph.py, qui prévoit les cartes à revoir dans la semaine, la valeur new_count qui compte les nouvelles cartes
est mise à zéro pour le jour-même, days[0]. À chaque fois que graph.py est exécuté, il ignore les nouvelles cartes revues,
réinitialise le nombre de nouvelles cartes à revoir et en comptabilise de nouvelles jusqu'à la limite du paquet new_limit.

2 - Dans graph.py, la comparaison des dates de révision se fait par rapport à la variable today, qui tient sa valeur de la date du jour du système.
Les comparaisons entre les cartes qui ont une date ultérieure à today renvoie False, et la carte familière n'est pas ajoutée aux prévisions.

#### Résolution  
1 - Compter les cartes du jour qui ont été revues :   
Dans decks.js, ajout d'une propriété dailyReviewed à la classe Deck qui comptera les nouvelles cartes revues le jour même.
Ainsi, newDailyCount compte les nouvelles cartes qui ont été ajouté lors de la construction de la révision du jour (deck.review) et dailyReviewed compte les nouvelles cartes qui on été revues. 

Ajout de la propriété dailyReviewed dans le code :   

decks.js 

    export class Deck {
        constructor(name) {
            this.name = name;
            ...
            this.dailyReviewed = 0;
        }

        toJSON() {
            return {
                name: this.name,
            ...
                dailyReviewed : this.dailyReviewed
            }
        }

        
        resetDailyCount() {
            ...
            if (reset < date) {
                this.newDailyCount = 0;
                this.dailyReviewed = 0;
                this.resetDate = reset.setDate(reset.getDate() + 1);
                this.countNew();
            }
        }
    }

review.js 

    function knownAnswer() {
        const card = deck.review[0];

        if (card.status === "New") {
            card.status = "Familiar";
            deck.dailyReviewed++;
            ....
        }
    }

2 - Modification de l'emplacement et de la valeur de "today" :

graph.py 

*Code initial :* 

    def sort_cards(deck, days):
        today = datetime.now(timezone.utc)
        ...
        for card in cards: 
            review = datetime.fromisoformat(card["reviewDate"].replace("Z", "+00:00"))
            for day in range(8):
                ...
                else: 
                    continue

*Code modifié :*

graph.py 

    def sort_cards(deck, days):
        ...
        for card in cards: 
            review = datetime.fromisoformat(card["reviewDate"].replace("Z", "+00:00"))
            today = datetime.now(timezone.utc)
            for day in range(8):
                ...
                else: 
                    today += timedelta(days=1)
                    continue