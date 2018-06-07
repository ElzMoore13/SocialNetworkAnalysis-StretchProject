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

  getUserNumTheyFollow: getUserNumTheyFollow,

  whoFollowsMost: whoFollowsMost,

  unrequitedFollowers: unrequitedFollowers,



};

//function to print a user's data as:
    // "User f05 - Name: Elizabeth, age:45, follows: f04, followers: f02, f04, f06"
function printUser(userKey){
    var spot = this['data'][userKey];
    var theyFollow = this.getWhoUserFollows(userKey);
    var followers = this.getUserFollowers(userKey);

    console.log('User ' + userKey + ' -> Name: ' + spot['name'] + ', age:' + spot['age'] + ', follows: ' + theyFollow + ', followers: ' + followers);
};

//function to print all users in database:
function printAllUsers(){
  for(user in this['data']){
    this.printUser(user);
  }
}

//function to get all of a given users followers
function getWhoUserFollows(userKey){
  var spot = this['data'][userKey];
  var theyFollow = [];
  for(var i = 0; i < spot['follows'].length; i++){
    theyFollow.push(spot['follows'][i])
  }
  return theyFollow.join(', ');
};

//function to get number of how many users a given user follows
function getUserNumTheyFollow(userKey){

  var follows = this.getWhoUserFollows(userKey);
  follows = follows.split(', ');
  return follows.length;
}

//function to get all followers for a given user
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

//function to get the number of people who follow a given user
function getUserNumberFollowers(userKey){

  var followers = this.getUserFollowers(userKey);
  followers = followers.split(', ');
  return followers.length;
};

//function to get the user who has the most followers
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

//function to get the user who follows the most people
function whoFollowsMost(){
  var follows = 0;
  var userKey = '';
  for(user in this['data']){
    var theyFollow = this.getUserNumTheyFollow(user);
    if (theyFollow > follows){
      userKey = user;
      follows = theyFollow;
    }
  }
  console.log(userKey + ' follows the most users, with ' + follows);
  this.printUser(userKey);
}

//function to get a list of users that follow someone who doesn't follow them back
function unrequitedFollowers(){
  var output = {};
  for(var user in this['data']){
    var theyFollow = this.getWhoUserFollows(user).split(', ');
    var theirFollowers = this.getUserFollowers(user).split(', ');

    for(follower in theirFollowers){
      var currUser = theirFollowers[follower];
      if(! theyFollow.includes(currUser)){
        if (output[currUser] != undefined)
          output[currUser].push(user);
        else
          output[currUser] = [user];
      }
    }
  }

  for(var key in output){
    var printStatement = 'User: ' + key + " unrequitedly follows users: " + output[key];
    console.log(printStatement);
  }
  return output;

}




//


//test code
// networkDatabase.printAllUsers();
// networkDatabase.whoHasMostFollowers();
//networkDatabase.whoFollowsMost('f04');
networkDatabase.unrequitedFollowers();


//Main Functions Implemented:

// List everyone and for each of them, list the names of who they follow and who follows them
// Identify who follows the most people
// Identify who has the most followers
// List those who follow someone that doesn't follow them back



//not yet implemented,,,,but maybe soon...
  // List everyone and their reach (sum of # of followers and # of followers of followers)








