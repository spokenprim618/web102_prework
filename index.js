/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i=0;i<=games.length-1;i++){
       let newDiv= document.createElement("div");
        newDiv.classList.add("game-card");
        newDiv.innerHTML=
        `
            <h1>${games[i].name}</h1>
            <p>${games[i].description}</p>
            <img src= "${games[i].img}" class="game-img">
        `
        gamesContainer.append(newDiv);
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, contribution)=>{
    return acc + contribution.backers;
},0)

contributionsCard.innerHTML=`<p>${totalContributions.toLocaleString('en-US')}</p>`;
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, raised)=>{
    return acc + raised.pledged;
},0)

raisedCard.innerHTML=`<p>$${totalRaised.toLocaleString('en-US')}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length

gamesCard.innerHTML=`<p>${totalGames.toLocaleString('en-US')}</p>`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const listOfUnfunded = GAMES_JSON.filter((unfunded)=>{
        return unfunded.pledged < unfunded.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const listOfFunded = GAMES_JSON.filter((funded)=>{
        return funded.pledged > funded.goal;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFunded)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly)
fundedBtn.addEventListener("click",filterFundedOnly)
allBtn.addEventListener("click",showAllGames)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnFunded = GAMES_JSON.reduce((acc,unfunded)=>{

    return acc + (unfunded.pledged < unfunded.goal);
},0)

// create a string that explains the number of unfunded games using the ternary operator
const explanation = `In total $${totalContributions.toLocaleString('en-US')} has been made for ${totalGames}. Currently ${totalUnFunded>0?totalUnFunded+" remains unfunded. We need your help to fund these remaining games": totalUnFunded+" remain unfunded. We appreciate your support for these amazing games."}`
// create a new DOM element containing the template string and append it to the description container
let newExplanation = document.createElement("p");
newExplanation.innerText=`${explanation}`;
descriptionContainer.append(newExplanation);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item