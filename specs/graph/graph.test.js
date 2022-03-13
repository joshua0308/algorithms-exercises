// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  // plan:
  // get user with id
  // get the job
  // enqueue the person's connections
  // iterate through the queue
  // dequeue first person
  // get the person's job
  // enqueue the person's connections
  // iteration number = degrees of separation

  const titleCount = {};
  let queue = [myId];
  let idSet = new Set(queue);

  for (let i = 0; i <= degreesOfSeparation; i += 1) {
    const queueSize = queue.length;
    for (let i = 0; i < queueSize; i += 1) {
      const id = queue.shift();
      const user = getUser(id);
      const title = user.title;

      if (titleCount[title]) {
        titleCount[title] += 1;
      } else {
        titleCount[title] = 1;
      }

      const idsToQueue = user.connections.filter((id) => {
        const isInSet = idSet.has(id);
        idSet.add(id);
        return !isInSet;
      });
      queue = queue.concat(idsToQueue);
    }
  }

  let maxCount = 0;
  let mostCommonTitle;

  for (const [title, count] of Object.entries(titleCount)) {
    if (count > maxCount) {
      mostCommonTitle = title;
      maxCount = count;
    }
  }

  return mostCommonTitle;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  // the getUser function and data comes from this CodePen: https://codepen.io/btholt/pen/NXJGwa?editors=0010

  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
