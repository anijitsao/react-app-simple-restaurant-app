# react-app-simple-restaurant-app
A Simple Restaurant Application using [React JS](https://react.dev/learn), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses **component oriented UI** creation paradigm. All components are written in [JSX](https://react.dev/learn/writing-markup-with-jsx) and ES6 style and are combined to get a single build for production purpose using [Webpack 5](https://webpack.js.org/concepts/).

[Babel](https://babeljs.io/docs/) is used to _transpile_ all [JSX](https://react.dev/learn/writing-markup-with-jsx) code to vanilla JavaScript. For UI creation [HTML5](https://www.w3schools.com/html/html5_intro.asp) and [CSS3](https://www.w3schools.com/css/) are used.

This is a _responsive web application_ for viewing in both Mobile and Desktop.

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).


## Features
- Code is rewritten with latest version of [React JS](https://react.dev/learn) and [Node JS](https://nodejs.org/en/docs/).
- Latest features of JavaScript i.e. **ESNext** is used.


<br/>

<ul>
 <li> This is Full Stack  Simple Restaurant Application. </li>

</ul>

- All the restaurant details namely *cusines, establishment type, address, locality, rating, cost for two persons* are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). This example uses a _free/ shared_ account. **So Please use it wisely**.

<br/> 

<ul>
 <li> <b>Searching</b> facility using <code>locality, name</code> and <code>cuisines</code are supported. </li>
  <ul>
    <li> <b>Searching</b> can be done from <i>two</i> places - the <i>Search box</i> and clicking on the several features of a restaurant like <i>name, locality</i> and so on. </li>
  </ul>
  <li> <b>Sorting</b> of the searched restaurants can be done using <code>price</code> both<i> ascending and descending order</i> and <code>rating</code> in <i>descending order</i> only. </li>
 <li> <strong>Filters</strong> namely <code>cost for two persons, establishment type, locality</code> can be applied on a list of searched results. </li>
  <ul>
   <li> Only one filter can be selected from a particular category. </li>
   <li> Click on an active filter will deselect the filter.</li>
  </ul>
</ul>

<br/> 

<ul>
 <li> Viewing the details of <i>a</i> restaurant can be done <i>clicking the photo/ logo </i> of the restaurant or <i>clicking the View Details </i> button. </li>
 <li> Viewing the details of <i>all</i> restaurants can be done by <i>clicking the <code><-</code> </i> of the individual restaurant page. </li>
 <li> Listing of restaurants both <i>all</i> and <i>individual</i> are done using <a href="https://reactrouter.com/en/main/start/tutorial">React Router</a>.</li>
 <li> All the restaurant details are stored in the database i.e. <i>persistant</i>. </li>
 <li> All the currencies are shown in <i>INR</i> &#8377; format. </li>
</ul>

## Installation

Clone the repository: 
```bash
$ git clone https://github.com/anijitsao/react-app-simple-restaurant-app.git
``` 
Navigate inside the directory and install all the necessary dependecies:

```bash
$ cd react-app-simple-restaurant-app


# Install all the dependencies
$ npm install
``` 

Now, Run the server

```bash
$ npm run server
```
Open the web browser and type`http://localhost:3000` in the address bar to load the application 


### Search

1. Search restaurants using `name`, `cuisines`, `locality` etc
2. Filter the search results by `cost for 2 persons`, `establishment type` and `locality`
3. Sort the results by `price` and `rating`
4. View details of each restaurant by clicking `View Details` button

 
*tested with latest version of <img src="screenshots/chrome.png" width="20px" title="Google Chrome">[Google Chrome](https://www.google.com/chrome/) and <img src="screenshots/firefox.png" width="25px" title="Firefox Developer edition">[Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)*  

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

