# Fill in the missing word game!

## Tech Stack:

- React Native
- Typescript
- Expo
- Firebase (Firestore)

## How It Works:

- Start the app by running: npx expo start
- Press w to run on the web (or use another device if you prefer)

- User must guess the correct translation of the missing word from four possible options
- User clicks on the option they believe to be correct and presses 'check answer'
- If they are correct, the message will say "Great job!"
- If they are incorrect, they will be shown the correct answer
- There are 5 exercises in total. When the last has been shown, it resets back to the first exercise.

## Things I would like to improve with more time:

- Style

  - The styling needs tidying up in general with cleaner code, and there are some bits that aren't quite right such as:
    - Underline for the English word in question
    - Spacing between the options
    - Selected option does not 'grey over' once selected
    - Options overall do not 'grey out' once 'check answer' has been pressed (although they do disable)

- Functionality

  - Translation for German words in the sentence that are not missing - the user should be able to click on a word and see the English translation pop up above it
  - The button at the bottom should say 'continue' until the user selects an answer, then should change to 'check answer'
 
- Components

  - I also would like to have abstracted some of the code out to more broken down components for cleaner and more readable code
