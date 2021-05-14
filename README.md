## But

Apprendre quelques concepts autour de la notion de monolithe modulaire.

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

## Apprentissages

- Les opérations métier sont faciles à lire et à naviguer, tout est explicite
- Dans l'exemple "Modular Monolith with DDD", les choix d'architectures sont
  bien documentés
    - Les lectures sont séparées des écritures
    - Une archi à deux couches pour les lectures
    - Une clean architecture à quatre couches pour les écritures
    - Quatre modules séparés
    - Pas d'appels directs entre modules
    - Communication événementielle entre modules
    - Utiliser un bus d'événements en mémoire
    - <https://github.com/kgrzybek/modular-monolith-with-ddd/tree/de6e0b5/docs/architecture-decision-log>
- Les événements métier sont ajoutés dans les racines d'agrégats lors
  d'opérations métier
- Il n'est pas simple de voir le lien entre les événements métier dans les
  racines d'agrégats et leur publication dans le bus d'événements : le code et
  la configuration Infra sont plus difficiles à lire que le code métier,
  beaucoup d'implicite et d'enregistrement des types par réflexion qui peut
  ressembler à de la magie
    - Les containers d'injection de dépendances sont configurés dans les
      `ProcessingModule`
    - Les `UnitOfWorkCommandHandlerDecorator` sont associés aux
      `ICommandHandler` dans les `ProcessingModule`
    - C'est le `UnitOfWork` qui dispatch les événements dans le `CommitAsync`
      grâce au `DomainEventsDispatcher`
    - Le `DomainEventsDispatcher` demande au `DomainEventsAccessor` de lister
      les domain events
    - Le `DomainEventsAccessor` demande au `DbContext` de lister les entités
      qui ont été modifiées, et en liste tous les domain events émis
    - Les `DbContext` sont configurés dans les `DataAccessModule`
    - Les `DbContext` sont capables de lister les entités qui ont été modifiées
      car les implémentations de repositories délèguent les opérations au
      `DbContext`
- Il y a un `DbContext` par module
- Il y a un container d'injection de dépendances par module


## Réferences

- <https://github.com/kgrzybek/modular-monolith-with-ddd>
- <https://www.youtube.com/watch?v=F8C_iPGhHoI&t=2573s>
- <https://github.com/arpinum/arpinum-graine-api>
