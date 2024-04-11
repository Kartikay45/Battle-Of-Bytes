

/*
  Step 1 - Global variables
*/
let timerInterval;
let currentTimer = 10; // 1 minute
let playerIndex = -1;

/*
  Step 2 - Basic players rendring
*/

/*
  Players object with player info
*/
const players = [
  {
    name: "Kartik Sharma",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Tanishq Sharma",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Manasvi Dubey",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Charul Chaudhary",
    year: "2nd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Utkarsh Sharma",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Dhruv khandelwal",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Bhumika Gupta",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Siddharth Singh Rathore",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Rahul Gauisaiwal",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Arjit Aggarwal",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10
  },
  {
    name: "Tanishq Rawat",
    year: "3rd Year",
    stack: "developer",
    basePrice: 10,

  }

];

/*
  Functon to render players
*/
function renderPlayers() {
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = "";

  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.className = "player-item";
    li.id = `player${index}`;

    const playerDetails = document.createElement("div");
    playerDetails.className = "player-details";
    playerDetails.textContent = `${index + 1}. ${player.name} - ${
      player.country
    } - ${player.category} - Base Price: $${player.basePrice}`;

    const startBidButton = document.createElement("button");
    startBidButton.className = "start-bid-button";
    startBidButton.textContent = "Start Bid";
    startBidButton.addEventListener("click", () => startBid(index));

    li.appendChild(playerDetails);
    li.appendChild(startBidButton);
    playersList.appendChild(li);
  });
}
renderPlayers(); // Function call

/*
  Step 3 - Basic teams rendring
*/

/*
  Teams object with team info
*/
const teams = {
  team1: { name: "Ruby Royals", budget: 400, players: [], bids: [] },
  team2: { name: "Python Pacers", budget: 400, players: [], bids: [] },
  team3: { name: "Tech Troopers", budget: 400, players: [], bids: [] },
  team4: { name: "Logic Legends", budget: 400, players: [], bids: [] },
  team5: { name: "Coding Ninjas", budget: 400, players: [], bids: [] },
};

/*
  Function to render team widgets
*/
function renderTeamWidgets() {
  for (const teamId in teams) {
    const teamWidget = document.getElementById(teamId);
    teamWidget.querySelector("h2").textContent = teams[teamId].name;
    updateTeamBudget(teamId, teams[teamId].budget);

    const bidButton = teamWidget.querySelector(".bid-now-button");
    bidButton.addEventListener("click", () => teamBid(teamId));
  }
}

function updateTeamBudget(teamId, budget) {
  document.getElementById(`budget-${teamId}`).textContent = `$${budget}`;
}

renderTeamWidgets(); // Function call

/*
  Step 4 - Start Bid function (all teams allowed to bid)
*/
function startBid(i) {
  playerIndex = i; // Set the player index
  clearInterval(timerInterval); // Clear previous timer if any
  currentTimer = 4320; // Reset the timer to 60 seconds
  timerInterval = setInterval(updateTimer, 1000); // Start the timer

  // Call functions to show timer and enable bidding buttons
  showTimerContainer();
  enableAllBidButtons();
}

/*
  Function to update the timer
*/
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = currentTimer;
  if (currentTimer === 0) {
    clearInterval(timerInterval);
    disableAllBidButtons();
    hideTimerContainer();
    sellPlayer();
  }
  currentTimer--;
}

// Function to announce sold player using text-to-speech

// Other JavaScript functionalities (player rendering, bidding logic, etc.) remain the same

/*
  Function to show the timer & sold button
*/
function showTimerContainer() {
  const timerContainer = document.querySelector(".timer-container");
  timerContainer.style.display = "block";

  const soldContainer = document.querySelector(".sold-container");
  soldContainer.style.display = "block";
}

/*
  Function to hide the timer & sold button
*/
function hideTimerContainer() {
  const timerContainer = document.querySelector(".timer-container");
  timerContainer.style.display = "none";

  const soldContainer = document.querySelector(".sold-container");
  soldContainer.style.display = "none";
}

/*
  Function to enable all Bid Now buttons
*/
function enableAllBidButtons() {
  const bidButtons = document.querySelectorAll(".bid-now-button");
  bidButtons.forEach(button => {
    button.disabled = false;
  });
}

/*
  Function to disable all Bid Now buttons
*/
function disableAllBidButtons() {
  const bidButtons = document.querySelectorAll(".bid-now-button");
  bidButtons.forEach(button => {
    button.disabled = true;
  });
}

/*
  Step 5 - Bidding by the TEAMS
*/

/*
  Team bid function
*/
function teamBid(teamId) {
  const bidAmount = parseFloat(
    prompt(
      `Enter bidding amount for ${players[playerIndex].name}:`,
      players[playerIndex].basePrice
    )
  );

  if (isNaN(bidAmount) || bidAmount < players[playerIndex].basePrice) {
    alert("Invalid bid amount.");
    return;
  }

  // Check if the team has enough balance to place the bid
  if (bidAmount > teams[teamId].budget) {
    alert("Team does not have enough budget to place this bid.");
    return;
  }

  // Store the bidding information in an array or within the teams object
  const biddingInfo = {
    teamId: teamId,
    playerIndex: playerIndex,
    bidAmount: bidAmount
  };

  // If the team has already bid on this player, update the bidding information
  if (!teams[teamId].bids) {
    teams[teamId].bids = [];
  }
  teams[teamId].bids[playerIndex] = biddingInfo;
}

/*
  Step 6 - Sell Player to the team

*/


/*
  Function to sell the player to the highest bidder
*/
function sellPlayer() {
  const highestBidder = getHighestBidder();
  if (highestBidder !== null) {
    const teamId = highestBidder.teamId;
    const bidAmount = highestBidder.bidAmount;
    const player = players[playerIndex];


    // Deduct the bid amount from the team's budget
    teams[teamId].budget -= bidAmount;

    // Update the UI to show the player is sold to the team
    const playerListItem = document.getElementById(`player${playerIndex}`);
    playerListItem.classList.add("sold");
    playerListItem.querySelector(".start-bid-button").style.display = "none";
    const soldTo = document.createElement("span");
    soldTo.textContent = `SOLD to: ${teams[teamId].name} for $${bidAmount}`;
    playerListItem.appendChild(soldTo);

    // Function to announce the sold player using text-to-speech
function announceSoldPlayer(playerName) {
  // Check browser support for speech synthesis
  if ('speechSynthesis' in window) {
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${playerName} is sold!`;

    // Set voice options if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0]; // Set the voice
    }

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported in this browser.');
  }
}








    // Add the player to the purchased list of the team
    const purchasedList = document.getElementById(`players-${teamId}`);
    const purchasedItem = document.createElement("li");
    purchasedItem.textContent = `${player.name} - $${bidAmount}`;
    purchasedList.appendChild(purchasedItem);



    // Update the team's budget on the UI
    updateTeamBudget(teamId, teams[teamId].budget);

    // Reset items
    hideTimerContainer();
    disableAllBidButtons();
    playerIndex = -1;
  }
}



/*
  Function to get the highest bidder for the player
*/
function getHighestBidder() {
  let highestBidder = null;
  for (const teamId in teams) {
    if (teams[teamId].bids && teams[teamId].bids[playerIndex]) {
      const bidAmount = teams[teamId].bids[playerIndex].bidAmount;
      if (!highestBidder || bidAmount > highestBidder.bidAmount) {
        highestBidder = teams[teamId].bids[playerIndex];
      }
    }
  }
  return highestBidder;
}

// Function to announce sold player using text-to-speech
function announceSoldPlayer(playerName) {
  // Check browser support for speech synthesis
  if ('speechSynthesis' in window) {
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${playerName} is sold!`;

    // Set voice options if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[0]; // Set the voice
    }

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported in this browser.');
  }
}

/*
  Step 6 - Sell Player to the team
*/

/*
  Function to sell the player to the highest bidder
*/
function sellPlayer() {
  const highestBidder = getHighestBidder();
  if (highestBidder !== null) {
    const teamId = highestBidder.teamId;
    const bidAmount = highestBidder.bidAmount;
    const player = players[playerIndex];

    // Deduct the bid amount from the team's budget
    teams[teamId].budget -= bidAmount;

    // Update the UI to show the player is sold to the team
    const playerListItem = document.getElementById(`player${playerIndex}`);
    playerListItem.classList.add("sold");
    playerListItem.querySelector(".start-bid-button").style.display = "none";
    const soldTo = document.createElement("span");
    soldTo.textContent = `SOLD to: ${teams[teamId].name} for $${bidAmount}`;
    playerListItem.appendChild(soldTo);

    // Announce the sold player using text-to-speech
    announceSoldPlayer(player.name);

    // Add the player to the purchased list of the team
    const purchasedList = document.getElementById(`players-${teamId}`);
    const purchasedItem = document.createElement("li");
    purchasedItem.textContent = `${player.name} - $${bidAmount}`;
    purchasedList.appendChild(purchasedItem);

    // Update the team's budget on the UI
    updateTeamBudget(teamId, teams[teamId].budget);

    // Reset items
    hideTimerContainer();
    disableAllBidButtons();
    playerIndex = -1;
  }
}

function createFirework(x, y) {
  const firework = document.createElement('div');
  firework.className = 'firework';
  firework.style.left = `${x}px`;
  firework.style.top = `${y}px`;
  document.body.appendChild(firework);

  setTimeout(() => {
    firework.remove();
  }, 1000);
}


