const splashes = [
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

export function compilingScreenSplash() {
  return splashes[Math.floor(Math.random() * splashes.length)];
}
