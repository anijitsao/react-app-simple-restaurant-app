# react-app-simple-restaurant-app
A Simple Restaurant Application using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 4](https://webpack.js.org/concepts/). 

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to *transpile* all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

Back end is implemented using [Node JS](https://nodejs.org/docs/latest-v8.x/api/), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the *Cloud* version of [MongoDB](https://docs.mongodb.com/) is used. 


For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used. [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), the new feature of [CSS3](https://www.w3schools.com/css/) is used for layout creation purpose.

This is a *responsive web application* for viewing in both Mobile and Desktop.


## Features
<ul>
 <li> This is Simple Restaurant Application </li>
 <li> It is a Full Stack Application </li>
</ul>

- All the restaurant details namely *cusines, establishment type, address, locality, rating, cost for two persons* are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This is a *free/ shared* account on [Atlas](https://www.mongodb.com/cloud/atlas). **So Please use it wisely** 

<br/> 

<ul>
 <li> <b>Searching</b> facility using <code>locality, name</code> and <code>cuisines</code are supported </li>
  <li> <b>Searching</b> can be done from <i>two</i> places - the <i>Search box</i> and clicking on the several features of a restaurant like <i>name, locality</i> and so on </li>
  <li> <b>Sorting</b> of the searched restaurants can be done using <code>price</code> both<i> ascending and descending order</i> and <code>rating</code> in <i>descending order</i> only </li>
 <li> <strong>Filters</strong> namely <code>cost for two persons, establishment type, locality</code> can be applied on a list of searched results </li>
</ul>

<br/> 

<ul>
 <li> Viewing the details of a restaurant can be done <i>clicking the photo/ logo </i> of the restaurant or <i>clicking the View Details </i> button </li>
 <li> Viewing the details of all restaurants can be done <i>clicking the <code><-</code> </i> of the individual restaurant page </li>
 <li> Listing of restaurants both <i>all</i> and <i>individual</i> are done using <a href="https://www.npmjs.com/package/react-router-dom">React Router</a></li>
 <li> All the restaurant details are stored in the database i.e. <i>persistant</i>
 <li> All the currencies are shown in <i>INR</i> &#8377; format
</ul>

## Installation

1. Clone the repository using `git clone https://github.com/anijitsahu/react-app-simple-restaurant-app.git` from `Git Bash / Command Prompt`
2. Navigate inside the directory by `cd react-app-simple-restaurant-app`
3. Install all the necessary dependecies by using `npm install` 
4. Navigate to the directory `cd server`
5. Run the server by `node server.js`
6. Open the web browser and type`http://localhost:3000` in the address bar to load the application 
7. Search restaurants using `name`, `cuisines`, `locality` etc
8. Filter the search results by `cost for 2 persons`, `establishment type` and `locality`
9. Sort the results by `price` and `rating`
10. View details of each restaurant by clicking `View Details` button

 
*tested with <img src="screenshots/chrome.png" width="20px" title="Google Chrome">Google Chrome v70 and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">Mozilla Firefox Developer Editon*  

## Screenshots

Some screens of the application is given below for better understanding. 

Desktop as well as Mobile version of the screenshots are given side by side.

<p> Home Screen <br/> 
 <img src="screenshots/desktop 1.png" width="590px" title="Home screen"/>
 <img src="screenshots/mobile 1.png" width="190px" title="Home screen"/> 
</p>
 
 <p> Entering search text <br/> 
 <img src="screenshots/desktop 2.png" width="590px" title="Entering search text screen"/>
 <img src="screenshots/mobile 2.png" width="190px" title="Entering search text screen"/> 
</p>

<p> Loading results <br/> 
 <img src="screenshots/desktop 3.png" width="590px" title="Loading results screen"/>
 <img src="screenshots/mobile 3.png" width="190px" title="Loading results screen"/> 
</p>

<p> When results are loaded <br/> 
 <img src="screenshots/desktop 4.png" width="590px" title="When results are loaded screen"/>
 <img src="screenshots/mobile 4.png" width="190px" title="When results are loaded screen"/> 
</p>

<p> View Individual restaurant  <br/> 
 <img src="screenshots/desktop 5.png" width="590px" title="View Individual restaurant screen"/>
 <img src="screenshots/mobile 5.png" width="190px" title="View Individual restaurant screen"/> 
</p>

<p> Sorting with ascending prices <br/> 
 <img src="screenshots/desktop 6.png" width="590px" title="Sorting with ascending prices screen"/>
 <img src="screenshots/mobile 6.png" width="190px" title="Sorting with ascending prices screen"/> 
</p>

<p> Apply the filter <span> <code>bar</code> </span> <br/> 
 <img src="screenshots/desktop 7.png" width="590px" title="Apply the filter bar screen"/>
 <img src="screenshots/mobile 7.png" width="190px" title="Apply the filter bar screen"/> 
</p>

