gulpfile-bower
==============

This is a gulp/bower working environment to develop a frontend website from scratch.

The author is @pwnjack

Dependencies: NodeJS, Bower, GulpJS

Other dependencies: git CLI (for the first setup)


Get Started
===========

You need Node installed.

Then install Gulp and Bower globally via NPM:

    sudo npm install gulp -g

    sudo npm install bower -g

Then move to the desired folder and clone this Git and use it as a starting point for your project:
    
    cd /myproject

    git clone https://github.com/pwnjack/gulpfile-bower.git

This will install all the needed gulp plugins defined in the first part of the gulpfile.

At this point you need to install the packages/libraries you need for your current project from Bower like this (example):

    bower install bootstrap

    bower install magnific-popup

When you are done choosing and downloading your packages, simply set them as dependencies in your bower.json file (see the example file for reference).
I wrote some example libraries, obviously feel free to add your own.

If your desired package haven't a dedicated bower.json file create one or you can use the "overrides" parameter in your bower.json file to tell the program which file to grab as "main" (like I did with "modernizr.js" and some other examples).

Now your environment is ready.

Don't worry you have to do this just the first time, for the next projects you will use the same template and skip this tedious "Get Started" step.


Usage
=====

When you are done with the installation simply open the terminal, move to your project's folder and run:

    gulp

The program will iterate trough the gulpfile.js and run every defined task.

It will:

- Copy components' main files (js/css/img/fonts) to the production folder (/public/**).
- Copy all files (*.*) in the src root folder, validate *.html files (throwing errors in the terminal), and push all files in the public root folder.
- Compile your custom scripts/styles (less/js), concatenate, auto vendor-prefix, optimize, minimize and push them to production folder.
- Start the watch task that will automatically update your production (/public) files whenever you do any change to a development (/src) file.

So you can simply work on /src and keep your project's /public/*.html open in your favorite browser to see the results.

Done. Good coding!

If you have a version mismatch from your gulp global install and the local one inside the project, simply run

    sudo npm install gulp
    
again, so it will update to the latest gulp version.


Commands
========

This is a list of specific tasks you can use individually when needed.

    gulp clean

This will delete completely the /public folder and all it's contents without asking for a confirm.

    gulp watch 

When you have to get back to work on your project after you restarted your computer, or after the terminal throwed an error and interrupted the initial watch task, run it again with this command.
