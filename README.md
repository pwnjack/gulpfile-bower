#gulpfile-bower

This is a gulp/bower working environment to develop a frontend website from scratch.

The author is @pwnjack

Dependencies: NodeJS, Bower, GulpJS

Other dependencies: git CLI (for the first setup)



This script use Bower to download packages and Gulp to initiate a task that:

- Copy vendor libraries files (downloaded from Bower) to your production folder (jQuery, Bootstrap, Font Awesome, etc.)
- Render 'less' in flat 'css' and update it at every file save
- Watch every file inside the 'source' folder and update the output counterparts in the 'production' folder.

Every file type will be treated in a different way before reaching the output folder:

- LESS will be compiled in CSS (and automagically vendor-prefixed for oldies)
- JS will be merged and minimized
- Images will be web optimized
- HTML files will be W3C validated (validation errors output in Terminal)
- All other files will simply be copied

Your worfklow will be to work on the 'source' folder and view the 'production' folder in your browser,
real-time updated at every change, with a fancy notification (Pre-Lion and Windows users need Growl installed).

## Get Started

You need NodeJS installed, download it from their [official website](http://nodejs.org/).

Then install Gulp and Bower globally via NPM:

    sudo npm install gulp -g

    sudo npm install bower -g

Then move to the desired folder and clone this Git and use it as a starting point for your project:
    
    git clone https://github.com/pwnjack/gulpfile-bower.git

    cd /gulpfile-bower

    npm install

This last command will lookup at the [package.json](/package.json) file and install all the needed gulp plugins defined in the first part of the [gulpfile](/gulpfile.js).


## Setup

At this point you have to choose what packages to install, based on what you need for your current project, you can do it using Bower like this (example):

    bower install bootstrap

    bower install magnific-popup

If you want you can set them as dependencies in your bower.json file by adding the --save-dev option, so for you next similar projects, you can use this bower.json and instead run just:

    bower install

It will automatically install all the packages you previously added in your [bower.json](/bower.json) file.
I added some sample libraries, of course feel free to add your own.

If your desired package is not bower-ready and has not an auto-generated bower.json file, you can use the "overrides" parameter in your project's bower.json file to define the "main" production file for that package. (You can see some overrides samples I did in the bower.json file).

Well, now your environment is ready.

Don't worry you have to do this just the first time, for the next projects you could use the same template and skip this tedious "Setup" step.


## Usage

When you are done with the installation open the terminal, move to your project's folder and run:

    gulp

The program will iterate trough the gulpfile.js and run every defined task.

It will:

- Copy Bower Components' main files (js/css/img/fonts) to the production folder (/public/**).
- Copy all files from the /src root folder, validate *.html files (throwing errors in the terminal), and push all files to the /public folder.
- Compile your custom scripts/styles (less/js), concatenate, auto vendor-prefix, minimize, optimize images and push everything to production folder.
- Start the watch task that will automatically update your production (/public) files whenever you do any change to a development (/src) file.

So you can simply work on /src files and keep your project's /public/*.html open in your favorite browser to see the results.

Done. Good coding!


## Errors

For now error handling is not in the scope of the project, so if you get one and the process hangs just run

    gulp watch

This will re-run just the watch task.

If you have an error of version mismatch from your gulp global install and the local one inside the project, simply run

    sudo npm install gulp
    
It will update the local installation of gulp to the latest version.


If you have any suggestion or optimization feel free to submit a pull request or open an issue, I like feedback.


## Commands

This is a list of specific tasks you can use individually when needed.

    gulp clean

This will delete completely the /public folder and all it's contents without asking for a confirm. Although it won't affect the /src folder, so after cleaning you can always re-run gulp to compile everything again, without loosing any change you did, except if you modified something directly in the public folder, but this is not supposed to happen, because as said, you should work only on the files inside your /src folder.

    gulp watch 

When you have to get back to work on your project after you restarted your computer, or after the terminal throws an error, or for any other reason that may have interrupted the initial watch task, run it again with this command.
