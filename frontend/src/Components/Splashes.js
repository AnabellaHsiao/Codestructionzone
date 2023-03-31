const compilingScreenSplashes = [
  "Compiling code, bit by bit, until we make a hit!",
  "Compiling code and having a blast - building skills that will last!",
  "Code compiling, wheels turning - let's get this adventure churning!",
  "Building fun with every compile, one line at a time!",
  "Compiling code, unlocking fun - let the games begin, everyone!",
  "Building blocks of code, compiling fun - learning with friends, it's always done!",
  "Compiling code with joy and glee, we're building skills for you and me!",
  "Code compiling, here we go - building skills and watching them grow!",
  "Building games, compiling code - it's a fun-filled, skill-building mode!",
  "Compiling code, what a treat - building brains while we compete!",
];

const runtimeErrorSplashes = [
  "ERROR! ERROR! Whoops, looks like your code took a wrecking ball to our system. Keep tinkering and rebuilding!",
  "ERROR! ERROR! Warning: Your code is experiencing some major demolition work. Keep your hard hat on and keep building!",
  "ERROR! ERROR! Uh oh, your code seems to be stuck in a construction site traffic jam. Keep pushing and breaking through the code!",
  "ERROR! ERROR! Looks like there's some heavy machinery in your code. Keep operating and building!",
  "ERROR! ERROR! Your code needs some serious renovation work. Keep building and upgrading!",
];

export function compilingScreenSplash() {
  return compilingScreenSplashes[
    Math.floor(Math.random() * compilingScreenSplashes.length)
  ];
}

export function runtimeErrorSplash() {
  return runtimeErrorSplashes[
    Math.floor(Math.random() * runtimeErrorSplashes.length)
  ];
}
