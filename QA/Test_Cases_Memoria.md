
# Cas de tests

| ID    | TS    | Page           | Titre         | Etapes                                 | Résultat attendu |
| ----- | ----- | -------------- | ------------- | -------------------------------------- | ---------------- |
| TC-01 | TS-01 | Menu principal | Créer un paquet valide | 1. Cliquer sur "Créer un paquet" 2. Entrer un nom 3. Cliquer sur valider| Le paquet apparaît |
| TC-02 | TS-01 | Menu principal | Paquets double | Répéter TC-01 deux fois, donner le même nom| Un message d'erreur apparaît |
| TC-03 | TS-01 | Menu principal | Créer un paquet invalide | 1. Cliquer sur "Créer un paquet" 2. Entrer un nom de plus de 30 caractères 3. Cliquer sur valider| Un message d'erreur apparaît |
| TC-04 | TS-02 | Menu principal | Supprimer un paquet | 1. Créer un paquet 2. Appuyer sur le bouton "X" du paquet | Le paquet disparaît |
| TC-05 | TS-03 | Menu -> Ajouter des cartes | Créer une carte valide | 1. Créer un paquet 2.Cliquer sur "Ajouter des cartes" 3. Ecrire dans les deux champs 4. Valider | Un message de validation apparaît brièvement |
| TC-06 | TS-03 | Menu -> Ajouter des cartes | Créer une carte non valide (1) | 1. Créer un paquet 2.Cliquer sur "Ajouter des cartes" 3. Valider sans compléter les champs | Un message d'erreur apparaît |
| TC-07 | TS-03 | Menu -> Ajouter des cartes | Créer une carte non valide (2) | 1. Créer un paquet 2.Cliquer sur "Ajouter des cartes" 3. Ecrire dans un champ 4. Valider | Un message d'erreur apparaît |
| TC-08 | TS-04 | Menu | Persistance du paquet après création | 1. Créer un paquet 2. Valider 3.Actualiser | Le paquet s'affiche sur la page
| TC-09 | TS-04 | Menu -> Gestion des cartes | Persistance des cartes après création et suppression | 1. Créer un paquet 2. Créer des cartes 3.Supprimer les cartes dans gestion des cartes | Les cartes créées apparaîssent sur la page, puis disparaissent lors de la suppresion
| TC-10 | TS-05 | Révisions -> Menu | Révision réussie | 1. Créer un paquet par défaut 2. Commencer la révision 3.Cliquer sur "Connue" 4. Retourner au menu| La carte suivante apparaît, sur le menu, le nombre de cartes familières est de 1
| TC-11 | TS-05 | Révisions  -> Menu | Révision échouée | 1. Créer un paquet par défaut 2. Commencer la révision 3.Cliquer sur "Revoir" 4. Retourner au menu | La carte suivante apparaît, sur le menu, le nombre de cartes familières est de 0
| TC-12 | TS-05 | Révisions -> Menu | Avancement de la révision | 1. Créer un paquet par défaut 2. Réviser les nouvelles cartes 3.Avancer la date d'un jour 4.Réviser | Après l'avancement, la révision comporte les cartes revues lors de la 1ère session et des nouvelles cartes
| TC-13 | TS-06 | Menu -> Prévision | Prévisions nouvelles cartes | 1. Créer un paquet par défaut 2.Cliquer sur "Prévisions" | Les prédictions affichent 5 cartes à revoir pour le jour
| TC-14 | TS-06 | Menu -> Prévision | Prévisions cartes familières | 1. Créer un paquet par défaut 2. Terminer la révision du jour 3. Cliquer sur "Prévisions" | Les prédictions affichent 0 cartes à revoir pour le jour, et 10 pour le lendemain
| TC-15 | TS-07 | Gestion des cartes | Modification d'une carte | 1. Sélectionner une carte 2.Supprimer des caractères 3. Cliquer sur "Modifier" 4. Actualiser | Le bouton Modifier se grise, et les changements persistent après actualisation
| TC-16 | TS-07 | Gestion des cartes | Limite d'une carte atteinte | 1. Sélectionner une carte 3.Atteindre la limite de 3500 caractères | Un messsage d'alerte apparaît et l'ajout de nouveaux caractères est impossible
| TC-17 | TS-08 | Création de carte | Navigation | 1. Cliquer sur "Mémoria" | La page d'accueil s'affiche
| TC-18 | TS-09 | Gestion de cartes | Recherche d'une carte existante | 1. Rechercher dans la barre d'entrée le début/ un mot clé d'une carte, utiliser des minuscules ou majuscules. | La recherche est un succès, la carte apparaît dans la liste/est sélectionnée et affichée
| TC-19 | TS-09 | Gestions de cartes | Recherche d'une carte non-existante | 1. Entrer dans la barre des caractères jusqu'à ce que la liste soit vide | Un message apparaît pour informer l'utilisateur
| TC-20 | TS-09 | Gestion de cartes | Recherche d'une carte supprimée | 1. Sélectionner une carte 2. Supprimer la carte 3. Actualiser la page 4. Chercher la carte | La carte supprimée est introuvable, un message appraît pour informer l'utilisateur
| TC-21 | TS-10 | Gestion de cartes -> Menu | Modifier le nom d'un paquet | 1. Cliquer l'icône adjacente au nom du paquet  2. Supprimer un caractère du nom 3. Cliquer sur l'icône valider  4. Retourner dans le menu | La modification est validée, et le nouveau nom s'affiche correctement dans le menu
| TC-22 | TS-10 | Gestion de cartes -> Menu | Modifier le nom d'un paquet sans changements | 1. Cliquer l'icône adjacente au nom du paquet 3. Cliquer sur l'icône valider sans avoir effectuer de changements 4. Retourner dans le menu | Le paquet persiste et s'affiche correctement dans le menu
| TC-23 | TS-10 | Gestion de cartes -> Menu | Modifier le nom d'un paquet par un nom existant | 1. Créer deux paquets 2. Modifier le nom d'un paquet par le nom de l'autre 3.Valider| Un message apparaît et la modification n'est pas validée
| TC-24 | TS-11 | Menu | Augmentation du nombre de nouvelles cartes | 1. Créer un paquet par défaut 2. Augmenter le nombre de nouvelles cartes en cliquant sur "+" | Le nombre représentant les nouvelles carte augmente à chaque clic
| TC-25 | TS-11 | Menu | Augmentation du nombre de nouvelles cartes après révision | 1. Créer un paquet par défaut 2. Finir la révision du jour 3. Augmenter le nombre de nouvelles cartes en cliquant sur "+" 4. Cliquer sur le nom du paquet | Le nombe de nouvelles cartes augmente et le processus de révision est disponible, montrant de nouvelles cartes
| TC-26 | TS-11 | Menu | Réduction du nombre de nouvelles cartes | 1. Créer un paquet par défaut 2. Réduire le nombre de nouvelles cartes en cliquant sur "-" | Le nombre de nouvelles cartes diminue à chaque clic
| TC-27 | TS-11 | Menu | Réduction du nombre de nouvelles cartes après révision | 1. Créer un paquet par défaut 2. Finir la révision du jour 3. Réduire le nombre de nouvelles cartes en cliquant sur "-" 4. Cliquer sur le nom du paquet | Le nombre de nouvelles cartes diminue, et la révision du jour reste terminée.
| TC-28 | TS-12 | Page d'accueil | Traduction vers l'anglais/coréen | 1. Sélectionner "English" dans la liste d'options 2. Sélectionner "한국어" dans la liste d'options | La page est traduite en anglais, puis en coréen
| TC-29 | TS-12 | Page d'accueil -> Menu | Traduction navigation | 1. Sélectionner "English" dans la liste d'options 2. Cliquer sur "Get started" | La page est traduite en anglais, et la traduction dans la langue sélectionnée persiste lors de la navigation vers d'autres pages




