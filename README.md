# Codestruction Zone

## Project Title and Team Name

**Team Name:** Dark Web Illuminati

**Project Title:** Codestruction Zone
![image](https://user-images.githubusercontent.com/77652973/230238490-d89ad8d8-0a95-4331-ad2b-71fe743d31db.png)

## Our Focus

Our project was **front-end focused**: making a platform with 3D interactives/animations for children to learn basic coding (JavaScript) through fun games. There is a single-player and duo-player (versus) mode.

## Team Members

**Shu Sun** - 1005948487

**Nevin Wong** - 1005391434

**Anabelle Hsiao** - 1007648770 [unfortunately, Anabelle was unable to continue working on the project due to an injury]

## Application URL

https://client.codestruction.live/

Our project was deployed via an AWS Lightsail VM.

_Note_: the 3D animations may require a bit of time to load, but they'll eventually appear.

## Video Presentation

- https://www.youtube.com/watch?v=jekK6Y8DgtU

## Description of Web Application

> "Codestruction Zone: A 3D-animated platform for children to learn basic coding (JavaScript) with fun games."

- The application is a 3D-animated interactive platform for children to learn basic programming.

- The exercises cover the basics of programming, including printing, arithmetic, conditionals, loops, and arrays.

- The platform offers both single and duo-player options.

- In the single player mode, the user solves the code by themselves.

- In the duo player mode, two mini users compete to solve coding puzzles. We give the two mini users the same set of puzzles; whoever is the first to pass all of them wins!

- Players share a room code to their opponent to play together.

- The platform is built with the React framework, and uses Three.js for visually stimulating 3D animations/interactives.

## Complexity Points

- **Three.js (2 points)**

  - Used to develop kid-friendly animations and interactive features to engage and stimulate childrens' brains while they complete coding challenges (e.g. title animation, compiling animation).

  - Utilized to imbue a 3D kid-friendly environment in which they can solve coding puzzles.

- **Judge0 (1 point)**

  - Judge0 is used for compiling code the browser's code.

  - When the user runs their code, the code is sent to the backend using the Judge0 API, which santizes and compiles the code, then returns its output to the frontend.

  - Errors in the users' code is also caught by Judge0 and error information is sent back to the frontend.

- **Monaco Editor (1 point)**

  - Versatile code editor used for the coding challenges (same one used to power VS Code)

  - Provides a user-friendly interface for users to write and test their code.

  - The editor is used to visualize the code and provide feedback on the correctness of the user's solution.

- **Auth0 (1 point)**

  - Auth0 is used for user authentication and management.

  - The platform allows users to create their own profiles via email.

  - This will be especially important for protecting children's personal information, and ensuring a safe and secure learning environment.

- **Socket.io (2 points)**

  - Simple and efficient way to establish bidirectional communication channels between web clients and servers.

  - With Socket.io, the platform supports real-time updates, enabling the mini users to see each other's progress (e.g. what level they are on, whether they've won or lost) in real-time during the versus mode.

  - A Redis adapter was used with Socket.io to enable horizontal scaling.

## Complexity Points that were Attempted as a Bonus

Although we attempted to incorporate OpenAI and Sentry into our project, the work completed on project regarding these points remains partially done (as can be seen in the code), and isn't functional to the user. As such, we cannot consider these complexity points completed, but will give an overview of what we attempted to do.

- **OpenAI (1 point)**

  - OpenAI was meant to be used to provide interactive hints for users when they were stuck on a coding challenge.

  - Would have powered _ConstructionHatGPT_, a digital assistant that takes the form of an anthropomorphic 3D-animated construction hat.

  - The chat bot would give the child hints using encouraging and friendly language.

  - Using machine learning algorithms, OpenAI was meant to analyze the code being written and suggest possible solutions or provide feedback on the user's code.

  - Would have been especially helpful for younger users who may need more guidance in the learning process.

- **Sentry (1 point)**

  - Sentry was intended to be used as a tool for error tracking and monitoring.

  - Would have helped in identifying and fixing errors that occur during runtime, before they impact the user experience.

Although we were unable to fully implement these complexity points, we gained valuable experience in attempting to incorporate them.

## Features by Alpha Version

**Focus:** Front-end implemented

- [x] Basic logic and structure of the platform developed

- [x] Basic animations and interactives implemented using Three.js

- [x] Monaco code editor and Judge0 integrated, code editing and compiling possible

- [x] Basic coding challenges for single player mode created

## Features by Beta Version

**Focus:** Backend implemented

- [x] Basic server infrastructure set up and tested

- [x] User authentication system set up using Auth0

- [x] Backend developed to handle game logic for fully functional single-player mode

- [x] Full set of coding challenges for both single and duo player modes created

## Features by Final version

**Focus:** Versus mode implemented, application deployed

- [x] Full frontend styling using creating an aesthetic, responsive, elegant design

- [x] Backend developed to handle communication between two mini users in versus mode, using Socket.io and the Redis adapter

- [x] Landing page 3D animations and design integrated

- [x] Game room functioning (generation of game room codes, storing game room data using backend) implemented

- [x] Versus mode implementation completed and tested on frontend (Socket.io)

- [x] Application deployed via AWS Lightsail VM, and a DNS domain from name.com.

---

We had a blast with the Codestruction of our project! 👷🚧🐱‍💻
