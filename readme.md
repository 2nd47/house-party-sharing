# CSC309 - Programming on the Web - Sharing Economy Web App
After my group's submission fell apart, I attempted to redo the entire project on my own.

Given two days instead of three weeks and being the only member I think I did okay.

## Installation
For Windows:
- Go to https://www.mongodb.org/downloads#production and install MongoDB.
- Create a new folder somewhere on your file system named <i>data</i>.
- Create a new folder under the <i>data</i> folder named <i>db</i>.

## Launching the app
For Windows:
- Open your command window and enter the following code, replacing <i>db_folder_path</i> with the absolute path to the db folder you've made:
~~~
  mongod --port 27017 --dbpath "db_folder_path"
~~~
- Open your command window in the root folder of the app and enter:
~~~
  npm install
  node app.js
~~~
- You can now go to the app by going to <i>localhost:3000</i> in your web browser

## Testing the app
For Windows:
- Open your command window and enter the following code, replacing <i>db_folder_path</i> with the absolute path to the db folder you've made:
~~~
  mongod --port 27017 --dbpath "db_folder_path"
~~~
- Open your command window in the root folder of the app and enter:
~~~
  npm install
  npm test
~~~
- Mocha should now run and display the tests that are being run.
