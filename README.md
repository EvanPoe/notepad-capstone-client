# Note Pad Capstone Client
Busy schedule? Do you find it difficult to keep track of everything? NotePad is a place to store all your notes-anything you need to save, available anytime you need it!


### 1. Working Prototype (to do later)
You can access a working prototype of the React app here: https:// and Node app here: https://

### 2. User Stories 
This app is for two types of users: a visitor and a logged-in user


###### Landing Page (Importance - Medium) (Est: 2h)
* as a visitor
* I want to understand what I can do with this app and sign up, or log in,
* so I can decide if I want to use it

###### Login Page (Importance - High) (Est: 3h)
* As a returning registered user
* I want to enter my password and username,
* So I can have access to my account.

###### Sign Up (Importance - High) (Est: 3h)
* As a visitor
* I want to register to use this app with a username and password,
* So I can create a personal account.

###### Dashboard Page (Importance - High) (Est: 2h)
* As a logged-in user,
* I want to be able to view all saved notes by title and have the ability to edit, delete, or add a note,
* So I can decide what section I want to navigate to.

###### Add Note Page (Importance - High) (Est: 3h)
* As a logged-in user,
* I want to be able to create a new note, title it, add notes, or cancel,
* So I can save my note to the dashboard.

###### Edit Note Page (Importance - High) (Est: 3h)
* As a logged-in user,
* I want to be able to edit a note and its title, starting with the note in its previously saved state, or cancel,
* So I can update my item and save it to the dashboard.

### 3. Functionality
The app's functionality includes:
* A persistent nav-bar to navigate to dashboard and log-in/log-out
* Every User has the ability to create an account, log in or log-out
* logging out will route the user back to the landing page
* On the dashboard page, a visitor can view notes they saved, and choose to add, edit, or delete notes
* Selecting 'add note' will route to a new form 
* Selecting 'edit' will route to an edit form, dispaying that note's saved information
* The 'add note' form allows the user to enter a new note
* The 'edit note' form allows the user to edit both the title and notes 
* Selecting 'cancel' on the 'new note' or 'edit note' form will route back to the dashboard without saving changes
* Selecting 'delete' will remove that note from the dashboard
* Saved notes can be edited and/or deleted
* A succesful save/edit/delete will reroute to the dashboard with the new note added to the top


### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver


### 5. Wireframes (to do now)
Landing Page Wireframe
:-------------------------:
![Landing Page Wireframe](/github-images/wireframes/landing-page.jpg)
Log-in Page Wireframe
![Log-in Page Wireframe](/github-images/wireframes/log-in-page.jpg)


### 6. Front-end Structure - React Components Map (to do later)
* (Example) __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the __App.js__
            * __Login.js__ (stateful) -
            * __Register.js__ (stateful) -
        * __Navbar.js__ (stateless) -
        * __Dashboard.js__ (stateless) -
        * __AddNote.js__ (stateless) -
        * __EditNote.js__ (stateless) -
        



### 7. Back-end Structure - Business Objects
* Users (database table)
    * id (auto-generated)
    * username (email validation)
    * password (at least one number, one lowercase and one uppercase letter at least eight characters that are letters, numbers or the underscore validation)
* Notes (database table)
    * id
    * user_id
    * title (string varchar255 ex: Grocery List)
    * content (string varchar255 ex: milk, eggs, meat...)



### 8. API Documentation (to do later)
#### API Overview
```text
    /api
    .
    ├── /auth
    │   └── POST
    │       ├── /login
    ├── /users
    │   └── POST
    │       └── /
```

##### POST `/api/auth/login`
```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "Password1"
    }

    // res.body
    {
    "authToken": String,
        "userId": 1
    }
```

##### POST `/api/users/`
```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "123456"
    }


    // res.body
    {
        "id": 1,
        "user_name": "demo@gmail.com"
    }
```



### 9. Screenshots (to do later)
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page-screenshot.png)
Register Page
![Register Page](/github-images/screenshots/register-page-screenshot.png)



### 10. Development Roadmap (to do later)
This is v1.0 of the app, but future enhancements are expected to include:
* (Example) add more functionality



### 11. How to run it (done)
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test