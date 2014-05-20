gulpfile-bower
==============

This is a gulp/bower working environment to develop a frontend website from scratch.

The author is @pwnjack

Dependencies: Bower, GulpJS


Get Started
===========

You need Node installed.

Then install Gulp and Bower globally via NPM:

    npm install gulp -g

    npm install bower -g

Then move to the desired folder and clone this Git and use it as a starting point for your project:
    
    cd /myproject

    git clone https://github.com/pwnjack/gulpfile-bower.git

This will install all the needed gulp plugins defined in the first part of the gulpfile.

At this point you need to install the packages/libraries you need for your current project from Bower like this (example):

    bower install bootstrap

    bower install magnific-popup

When you are done choosing and downloading your packages, simply set them as dependencies in your bower.json file (see the example file for reference).

Then define your project's libraries and dependencies inside the bower.json file (I wrote some example libraries, obviously feel free to add your own). If your desired package haven't a dedicated bower.json file create one or you can use the "overrides" parameter in your bower.json file to tell the program which file to grab as "main" (like I did with "modernizr.js" and some other examples).

Now your environment is ready.

Don't worry you have to do this just the first time, for the next projects you will use the same template and skip this tedious "Get Started" step.


Usage
=======

When you are done with the installation part simply open the terminal, move to your project's folder and run:

    gulp

The program will iterate trough the gulpfile.js and run every defined task.

It will:

- Copy components' main files (js/css/img/fonts) to the production folder (/public/**).
- Compile your custom scripts/styles (less/js), concatenate, auto vendor-prefix, optimize, minimize and push them to production folder.
- Start the watch task that will automatically update your production (/public) files whenever you do any change to a development (/src) file.

So you can simply work on /src and keep your project's /public/*.html open in your favorite browser to see the results.

Done. Good coding!
