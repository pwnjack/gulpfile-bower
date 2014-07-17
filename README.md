# gulpfile-bower

This script helps you to start a front-end web project from scratch, it uses Bower to download packages and GulpJS to build and deploy everything for you.

The author is @pwnjack

Dependencies: NodeJS, Bower, GulpJS

Other dependencies: git CLI (for the first setup)

## What it does

Once you started the script, all files will be copied from the /src folder to the /public folder and every file type will be treated differently before outputting in the /public folder.

- All the main files of the defined Bower packages will be copied into their respective destination folders (css, js, fonts).
- Less files will be compiled in plain CSS and automagically vendor-prefixed for old browsers
- JS scripts will be merged in a single file called main.js
- Images will be web-optimized

## Getting started

Clone this git on your Desktop

    cd /Desktop
    
    git clone https://github.com/pwnjack/gulpfile-bower.git
    

Install dependencies
    
    npm install


Install the desired Bower packages (e.g.)

    bower install bootstrap --save
    
The --save option is needed to save the package name in the bower.json file as a dependency for your project, this is needed to let the script work correctly.

If your desired package is not bower-ready and has not an auto-generated bower.json file, you can use the "overrides" parameter in your project's bower.json file to define the "main" production file for that package. (You can see some overrides samples I did in the bower.json file).

After you are finished installing the desired packages you will have a compiled bower.json file that you may use for other projects by just running the following command to install all the defined dependencies at once.

    bower install
    
At this point you just installed everything you need.


## Usage

Now build everything up

    gulp build


Check if the /public folder has been created succesfully, if it's there, everything went fine, you are done. Every file should be there in their respective folder (js/css/font). The script will build and output both, a minimized file (suffixed with .min) and an un-minimized development version too.

To start the watch task that will real-time update your compiled project at every file save just run:

    gulp watch

If an error occurs and the process hangs, re-run it.


## Commands

There are some useful commands for specific cases like:

    gulp clean

Clears completely the compiled folder (/public)


    gulp

For lazy people, after the installation part, run directly this command to build everything up and start the watch task immediately after the build process, so you can start to work on your project asap.


    gulp libs
    
Copy just the Bower libraries to /public folder.


## Workflow

Always work on the /src folder, the script will automatically update the compiled counterpart (/pubic) at every file save. This way you can safely run 'gulp clean' and don't be worried of loosing anything, because the /src folder will remain untouched, and you can always compile it again.