# Project
----------------------------------------------------
<b>During first use:</b>

First you need to have installed node.js and npm to your pc from <a href="https://nodejs.org/en/">here</a>  
After that, download the project to your disk.  
Navigate to project folder and open a cmd command prompt (or terminal).  
While in the project directory, enter the command <code>npm install</code> to install the necessary packages and dependencies.
After the command has successfully executed, enter the /client directory inside the project and once again run the command <code>npm install</code>. This time it will take some more time to execute since more dependencies are necessary inside this folder, don't worry just wait patiently until it is finished.

<b>To run the project:</b>

While in the project directory, enter the command <code>node app</code>. That's it, the program will automatically open in your browser. If your browser has not opened automatically, you can see the project by entering <a href="http://localhost:3000">localhost:3000</a> in your browser.  

<b>To add to the project:</b>

If you make any changes in the index.js inside the client directory you need to enter the command <code>./node_modules/.bin/webpack index.js -o dist/bundle.js</code> in order to append your changes to the bundle.js file . If you are changing anything else simply save the file and restart the server by pressing ctrl+C and then the command <code>node app</code> if your server was already running, or simply start your server by inserting <code>node app</code> while inside the main project directory