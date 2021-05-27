# African Impact Challenge: Community & E-Learning Virtual Platform 
## Table of contents
* [About The Project](#About-The-Project)
* [Installation](#Installation)
  * [Basic Environment Setup](###Basic-Environment-Setup)
  * [Connet to Mongo DB Atlas](###Connet-to-Mongo-DB-Atlas)
  * [How to Run](###How-to-Run)
* [Contribution](#Contribution)
* [Reference Links](#Reference-Links)


## About The Project
The project is based on the [African Impact Challenge](https://www.africanimpact.ca/the-african-impact-challenge), a continent-focused project that provides aspiring African entrepreneurs the opportunity to solve critical problems with technology. 
The goal of the project is to fulfill the raising needs of the challenge in creating two major consumer segments: \
(1) an user-focused virtual platform to better connect the **start-up community** of the African Impact Challenge and \
(2) an **e-learning space** that is user-friendly and simple to use. 

## Installation
This project will follow closely to the MERN stack model. MERN stands for MongoDB, Express(.js), React(.js), and Node(.js). \
The following explains the relationship of MERN (extract from [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial))\
<img src="images/MERN.jpg" width="800"> \
For installation, click [here](https://www.mongodb.com/languages/mern-stack-tutorial) for reading or follow the steps below: 

### Basic Environment Setup
Make sure you have: 
1. Installed Node \
click for [Windows](https://nodejs.org/en/download/) or [Mac](https://nodejs.org/en/)
2. Have a code editor\
[VS code](https://code.visualstudio.com/) might be a good choice

### Connet to Mongo DB Atlas
1. Sign up or login to [MongoDB Atlas](https://account.mongodb.com/account/register)
2. Notify through the discord server so you can be invited to access the database
3. Once you have been invited to the project, click on the "Database Access" tab. 
4. Add your self as user by clicking on the "ADD NEW DATABASE USER" on the right top corner. Fill in the username and password you prefer.  
<img src="images/db1.png" width="500"> 
5. Click on "Cluster" tab and click on "connect"  
6. Choose "Connect your application" as the connection method. A URL like the following should appear:
<img src="images/db2.png" width="500"> 
* Remember to replace the <\password> with your own password. Note that "<>" should be replaced as well.

### How to Run
Make sure you have access to Mongo DB Atlas database first before completing the following step. \
In ```mern/server/config.env```, replace the URL with the URL obained in Step 6 of Connect to Mongo DB Atlas. 
```
ATLAS_URI=mongodb+srv://usermame:password@cscc01-seal.pawl3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
```

#### Server
1. In ```mern/server```, run:
```
npm install
npm install -g nodemon
```
* If ```npm install -g nodemon``` doesn't work. Try ```sudo $npm install -g nodemon```
2. Activate the server
```
nodemon server
```
It should look like this if suceed: 
<img src="images/server1.png" width="500"> 
* If your code failed with: 
  ```
  [nodemon] app crashed - waiting for file changes before starting...
  ```
  You will need to kill the pid occupying the port first. 
#### Client
1. In ```mern/client```, run:
```
npm install
npm start
```
You should be able to lunch the web now. 

## Contribution
### Git Flow
This project uses git flow. 

### Branches
- Master
- Develop
- Test
- Feature branches...

### Ticketing
The project will be using Jira and Github Issues for issue tracking. 

### Pull Requests
You can follow the steps below to edit in a separate branch. 
1. Branching off from the main branch and create own branch
```
git checkout -b branch_name
```
2. Implement new features and commit & push the new changes to the branch
```
git add --all
git commit -m “msg”
git push
```
3. Pull Request\
A "Compare & pull request" button will appear and you will be able to create a new pull request.
- If you are solving for specific issue, include ```Resolves #issue_number``` in the description so that git close the issue automatically. 

4. Merge\
Using ```squash and merge``` is recommended

5. Delete the branch
```
git branch -d local_branch_name
```

## Reference Links
https://www.mongodb.com/languages/mern-stack-tutorial
https://create-react-app.dev/docs/getting-started
