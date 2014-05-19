gulpfile-bower
==============

This is a gulp-bower working environment to develop a frontend website from scratch.

The author is @pwnjack <br>
This file relies on Bower <br>
Remember to define dependencies of your project in bower.json to grab the defined packages.

Usage
=======

Before you can start to code, this project need to be initialized.

First of all choose what dependencies you want in you project, to do so check the "bower.json" file, insert and remove what package you need under the "dependencies" part.
Once defined the packages you want to be imported in the "public" folder, be sure to have those packages downloaded in the bower_components folder, if not, download them using:

	bower install packagename

Remember to check if the downloaded package have a bower.json file, check if there the "main" file is defined, if not define it with the override parameter in the bower.json of your project's root folder.

When you are done, simply open the terminal move to this project folder and run:

  gulp

It will iterate trough the gulpfile.js and run every defined task to copy components' main files to "public", the production folder.
Remember then to link in the "index.html" markup file all the needed files (such as /css and vendor/js).

Done.
