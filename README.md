FSJS project 7 - React Gallery App
For this project, I used React, React Router DOM 4, and JavaScripts Fetch API interface to create an App that makes an API call to Flickr to retreive and display 24 Flickr photos.

The App will display Flickr photos that have tags matching terms on three buttons -- you click a button to choose a term for photos that match that term.  There is also a search form so that you can view photos that match a term you enter.


======= To Note ==========================

The App will display a 404 error page if there was an incorrect URL to the site.
The App will display a message if no photos were found for a search.
The App will display a loading indicator while photos are loading into the site.

======= Instuctions to view project locally =========

To run this project locally, you must have node.js and npm installed.
Download or clone the project from this repo.

First, you will need to have an API Key from Flickr. With this API key, you need to:
1) create a config.js file.  The config file file should contain the following:
 
```const apiKey = 'YOUR API KEY';
export default apiKey;```
2) Put the file in the **/scr** folder

The project was created using the Create React App tool and React Router DOM 4 also installed.  You must run:
**npm install**

Then Run **npm start** to start the server and application. When you see the 'Compiled successfully!' message, you can view the site in your browser at: **localhost:3000** 
