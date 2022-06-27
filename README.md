# Prérequis et installation projet 7 Groupomania

## Prérequis :

Avoir installer **nodejs** sur sa machine.

Si ce n'est pas le cas :point_right: https://nodejs.org/en/download/

Avoir installer **mysql** sur sa machine.

Si ce n'est pas le cas :point_right: https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7152681-installez-le-sgbd-mysql

## Installation :

Avec le terminal, depuis le dossier dans lequel vous souhaitez enregistrer le projet, clonez le projet avec la commande :
```
git clone https://github.com/Rhomard/Groupomania.git
```
**Pour le dossier front :**

Ouvrir un terminal :

```
cd front_groupomania
```

```
npm i
```

Pour Mac :
```
npm run start-mac
```

Pour Windows :
```
npm run start-windows
```

:white_check_mark: &nbsp;Front

**Pour le dossier back :**

Dans le dossier **back_groupomania** créer un fichier .env

**(Veiller à ce que votre éditeur de code le détecte comme du texte brut !)**

Copier puis coller ceci dans le fichier .env en remplissant les lignes :
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

SECRET_TOKEN=
```
 Sauvegarder le fichier :floppy_disk:

Ouvrir un terminal :

```
cd back_groupomania
```

```
npm i
```

```
npx nodemon
```

:white_check_mark: &nbsp;Back

<img src="https://media.giphy.com/media/NytMLKyiaIh6VH9SPm/giphy.gif" width="250" height="200" />
