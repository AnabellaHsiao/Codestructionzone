# Codestruction Zone

## Project Title and Team Name 

**Team Name:** Dark Web Illuminati

**Project Title:** Codestruction Zone

## Our Focus

We will be **front-end focused**: making a 3D platform for children to learn basic coding (JavaScript) with fun games. There would be single, or duo-player (versus and teamwork) options.

## Team Members

**Anabelle Hsiao** - 1007648770

**Nevin Wong** - 1005391434

**Shu Sun** - 1005948487

## Description of Web Application

> "Codestruction Zone: A real-time 3D platform for children to learn basic coding (JavaScript) with fun games."

- The application is a 3D platform for children to learn basic coding (JavaScript) with fun games.

- The platform offers both single and duo-player options.

- In the single player mode, the user solves the code by themselves.

- In the duo player mode, two mini users compete or cooperate to solve coding puzzles.

    - **Versus mode:** We will give the two mini users the same puzzle; whoever gets it first wins
    
    - **Teamwork mode:**  Given a *harder* code puzzle, the mini users need to learn how to cooperate with each other and solve the questions together

- Accomplishment badges are given to the mini users to motivate them.

- The platform is built with React Flow for basic frontend design and Three.js for 3D platform production.

## Complexity Points  
- **Three.js (2 points)**

    - Used to develop kid-friendly animations and interactive features to engage and stimulate children while they complete coding challenges.

    - Will be utilized to create a 3D environment in which mini users can solve coding puzzles.

- **Judge0 (1 point)**

    - Judge0 will be used for compiling code from the browser.
    
    - When the user runs their code, the code will be sent to the backend using the Judge0 API, which will compile the code and return it to the frontend.

- **Monaco Editor (1 point)**
    
    - Versatile code editor that will be used for the coding challenges.
    
    - Provides a user-friendly interface for users to write and test their code.

    - The editor will be used to compile the code and provide feedback on the correctness of the user's solution.

- **Auth0 (1 point)**

    - Auth0 will be used for usser authentication and management.

    - The platform will allow users to create their own profiles, track their progress, and earn badges for completing coding challenges.

    - This will be especially important for protecting children's personal information and ensuring a safe and secure learning environment.

- **Socket.io (2 points)**

    - Simple and efficient way to establish bidirectional communication channels between web clients and servers.

    - With Socket.io, the platform can support real-time updates and messaging, enabling the mini users to see each other's progress and communicate with each other in real-time during the versus mode.

## Complexity Points to be Attempted as a Bonus

- **OpenAI (1 point)**

    - OpenAI will be used to provide interactive hints for users when they are stuck on a coding challenge.

    - Using machine learning algorithms, OpenAI can analyze the code being written and suggest possible solutions or provide feedback on the user's code.

    - Will be especially helpful for younger users who may need more guidance in the learning process.

- **Sentry (1 point)**


## Features by Alpha Version

**Focus:** Front-end implemented

- [ ] Basic animations and game mechanics implemented using Three.js

- [ ] React Flow integrated for interactive node-based UIs

- [ ] Basic logic and structure of the platform developed

- [ ] Basic coding challenges for single player mode created

## Features by Beta Version

**Focus:** Pseudo-backend implemented

- [ ] User authentication system set up using Auth0

- [ ] Pseudo-backend developed to handle game logic for single player mode

- [ ] Pseudo-backend developed to handle communication between two mini users in duo mode, using Twilio

- [ ] Additional coding challenges for both single and duo player modes created

- [ ] Basic system for accomplishment badges added

- [ ] Basic server infrastructure set up and tested

## Features by Final version

**Focus:** Database, servers implemented and up

- [ ] ShareDB integrated for real-time database storage, basic database schema designed and implemented

- [ ] Stores challenges based on difficulty, topic, and other parameters

- [ ] User information database created to store user profiles, achievements, and progress

- [ ] Accomplishment badge system improved with more badges and levels

- [ ] Code challenges can be loaded and served dynamically from server

- [ ] Integration with OpenAI for providing interactives hints for mini-users

- [ ] Integration with Web Audio API for improved sound and music quality

---

Now let's start the Codestruction! 👷🚧🐱‍💻

