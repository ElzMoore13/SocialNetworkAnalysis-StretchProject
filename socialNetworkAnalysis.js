var networkDatabase = {

  data: {
    f01: {
      name: "Alice",
      age: 15,
      follows: ["f02", "f03", "f04"]
    },
    f02: {
      name: "Bob",
      age: 20,
      follows: ["f05", "f06"]
    },
    f03: {
      name: "Charlie",
      age: 35,
      follows: ["f01", "f04", "f06"]
    },
    f04: {
      name: "Debbie",
      age: 40,
      follows: ["f01", "f02", "f03", "f05", "f06"]
    },
    f05: {
      name: "Elizabeth",
      age: 45,
      follows: ["f04"]
    },
    f06: {
      name: "Finn",
      age: 25,
      follows: ["f05"]
    },
  },


  printUser: printUser,

  printAllUsers: printAllUsers,

  getWhoUserFollows: getWhoUserFollows,

  getUserFollowers: getUserFollowers,

  whoHasMostFollowers: whoHasMostFollowers,

  getUserNumberFollowers: getUserNumberFollowers,



};

//function to print a user's data as:
    // "User f05 - Name: Elizabeth, age:45, follows: f04, followers: f02, f04, f06"
function printUser(userKey){
    var spot = this['data'][userKey];
    var theyFollow = this.getWhoUserFollows(userKey);
    var followers = this.getUserFollowers(userKey);

    console.log('User ' + userKey + ' -> Name: ' + spot['name'] + ', age:' + spot['age'] + ', follows: ' + theyFollow + ', followers: ' + followers);
};

function printAllUsers(){
  for(user in this['data']){
    this.printUser(user);
  }
}

function getWhoUserFollows(userKey){
  var spot = this['data'][userKey];
  var theyFollow = [];
  for(var i = 0; i < spot['follows'].length; i++){
    theyFollow.push(spot['follows'][i])
  }
  return theyFollow.join(', ');
};

function getUserFollowers(userKey){
  var followers = [];
  for(user in this['data']){
    var spot = this['data'][user]
    var userFollows = spot['follows'];
    for (var i = 0; i < userFollows.length; i++){
      if(userFollows[i] == userKey)
        followers.push(user);
    }
  }
  return followers.join(', ');
};

function getUserNumberFollowers(userKey){

  var followers = this.getUserFollowers(userKey);
  followers = followers.split(', ');
  return followers.length;
};

function whoHasMostFollowers(){
  var mostFollowers = 0;
  var userKey = '';
  for(user in this['data']){
    var theirFollowers = this.getUserNumberFollowers(user)
    if (theirFollowers > mostFollowers){
      userKey = user;
      mostFollowers = theirFollowers;
    }
  }
  console.log(userKey + ' has the most followers, with ' + mostFollowers);
  this.printUser(userKey);
}


//test code
networkDatabase.printAllUsers();
networkDatabase.whoHasMostFollowers();


//Functions to Implement:

// List everyone and for each of them, list the names of who they follow and who follows them
// Identify who follows the most people
// Identify who has the most followers
// Identify who has the most followers over 30
// Identify who follows the most people over 30
// List those who follow someone that doesn't follow them back
// List everyone and their reach (sum of # of followers and # of followers of followers)