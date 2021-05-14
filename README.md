But : apprendre quelques concepts autour de la notion de monolithe modulaire.

Je m'intéresse beaucoup à la notion de monolithe modulaire, en pensant que
cette notion peut m'aider à gérer la complexité et diminuer le couplage entre
pans fonctionnels. J'ai aussi des craintes par rapport à ça, et je suis perdu
pour trouver par quoi commencer pour aller dans cette direction.

### D'où je pars

Je suis à l'aise avec une architecture hexagonale qui s'appuie sur une unique
base ACID. J'ai vu plusieurs conférences de
[@lilobase](https://twitter.com/lilobase), je pense les avoir en partie
comprises mais pas mémorisées ni intégrées. J'ai également vu deux répos qui
implémentent ces principes, mais pareil : je pense pouvoir les comprendre mais
je ne les ai pas intégrés.

En parallèle, je suis à l'aise avec les bases de l'Event Storming, et j'ai lu
le livre Domain-Driven Design (a.k.a. "Blue Book"). Je me suis aussi pas mal
documenté sur CQRS.

### Mes craintes

Me retrouver en prod avec un système distribué que je ne sais pas gérer
(frontières fonctionnelles mal définies, communication complexe entre pans
fonctionnels, perte de compréhension dans des événements qui déclenchent
d'autres événements, erreurs pas gérées correctement, unknown unknowns,...).

### Mes attentes

Pouvoir avancer progressivement dans la bonne direction, c'est quoi le next
step suffisamment petit ? Je suis perdu dans la masse de connaissances à
intégrer.

### Mon plan pour apprendre

Porter une fonctionnalité simple du répo [Modular Monolith with
DDD](https://github.com/kgrzybek/modular-monolith-with-ddd).

Je souhaite qu'il y ait plusieurs modules impliqués dans cette fonctionnalité,
pour comprendre la communication entre modules.

Une partie de la fonctionnalité d'enregistrement d'un utilisateur semble
convenir :

- La commande "Register New User" est traitée dans le module "User Access"
- Cette commande déclenche l'événement "New User Registered".
- Cet événement se propage dans le module "Meetings", et donne lieu à la
  commande "Create Member".

## Réferences

- <https://github.com/kgrzybek/modular-monolith-with-ddd>
- <https://www.youtube.com/watch?v=F8C_iPGhHoI&t=2573s>
- <https://github.com/arpinum/arpinum-graine-api>
