## Rapport de bug - Message liste persistant

Date : 30/10  
Statut : Résolu  
Méthode de test : Test exploratoire  

#### Description   
Le message informant que l'utilisateur n'a pas de paquets persiste après avoir créé un paquet.  

#### Étapes pour reproduire 
1. Se rendre sur deck-menu.html
2. (Optionnel) Supprimer tous les paquets existants
3. Créer un paquet manuellement.
4. Constater le message affiché.

#### Comportement attendu   
Le message disparaît une fois la création du paquet.

#### Comportement observé   
Le paquet créé apparaît sur la page, mais le message indiquant une liste vide persiste.

#### Analyse   
Aucun code ne vérifie et supprime le message à la création d'un premier paquet. 

#### Résolution  
Ajout de l'opérateur "!" oublié, pour tester si la liste de paquets est non-vide.

*Code initial :* 

menu.js :

        createdeck {
            if (this.emptyList) {
                document.getElementById("noDeckMessage").remove();
            }
        }


*Version modifiée :* 

menu.js :

    createdeck {
        if (!this.emptyList) {
            document.getElementById("noDeckMessage").remove();
        }
    }