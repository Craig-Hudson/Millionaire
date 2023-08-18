# Millionaire Quiz

------------
[Link to live site here](https://craig-hudson.github.io/Millionaire/  "Link to live site here")

![Am I responsive image]()

## Table of Contents

- [Millionaire Quiz](#millionaire-quiz)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [User Experience (UX)](#user-experience-ux)
    - [User Stories (US)](#user-stories-us)
    - [Design](#design)
    - [Accessability](#accessability)
  - [Features](#features)
    - [Favicon](#favicon)
    - [Home Page](#home-page)
    - [Home Page modals](#home-page-modals)
    - [Input Name Page](#input-name-page)
    - [Game Page](#game-page)
    - [pop up modal messages when user interacts with life lines.](#pop-up-modal-messages-when-user-interacts-with-life-lines)
    - [End Game Page](#end-game-page)
    - [Thank You Page](#thank-you-page)
    - [Footer](#footer)
  - [Technologies Used](#technologies-used)
    - [Languages Used](#languages-used)
    - [Frameworks, Libraries \& Programs Used](#frameworks-libraries--programs-used)
  - [Deployment \& Local Development](#deployment--local-development)
    - [Deployment](#deployment)
    - [Local Development](#local-development)
      - [How to Fork](#how-to-fork)
      - [How to Clone](#how-to-clone)
  - [Testing](#testing)
    - [Automated Testing](#automated-testing)
      - [W3C Validator](#w3c-validator)
      - [Lighthouse](#lighthouse)
      - [Wave](#wave)
    - [manual Testing](#manual-testing)
      - [Testing User Stories](#testing-user-stories)
      - [Full Testing](#full-testing)
        - [Full Page Testing](#full-page-testing)
    - [Bugs](#bugs)
      - [Solved bugs](#solved-bugs)
      - [Known Bugs](#known-bugs)
  - [Credits](#credits)
    - [Code Used](#code-used)
    - [Content](#content)
    - [media](#media)
    - [Acknowledgments](#acknowledgments)

## Introduction

Here we have a quiz similar to the game show who wants to be a millionaire, which consists of players
trying to answer up to a maximum of 15 questions, being able to win up to £ 1,000,000.
The app I have constructed will be based on some of the concepts of the game show, including answering up to 15 general knowledge questions, but the user will need to be wary because if they answer a question wrong before the first safe haven at £1000 they could walk away with nothing, and being able to use life lines along the way to help the user answer any questions they may be stuck on. As well as the user being able to keep track of their high scores that will be on the home page.

## User Experience (UX)

### User Stories (US)

- **First time visitor goals**
    1. As a first time visitor I want to be able to easily identify what the purpose of the app is
    2. As a first time visitor I want instructions on how to play the quiz
    3. As a first time visitor I want to be able to easily find where to start the quiz.
    4. As a first time visitor I want to be able to keep track on where I am on the money ladder, with the option to bank money on questions I may be unsure of.

  - **Returning Visitor goals**
    1. As a returning Visitor I want to be able to keep track of my previous high scores locally.
    2. As a returning Visitor I want the life lines to not always give the correct answers especially on the questions later on in the quiz.
    3. As a returning visitor I want to be able to contact form to provide feedback, or any errors that may occur on the webpage.

  - **Frequent visitor goals**
  - 1. As a frequent visitor I want to be able to keep track of my highscore even if I exit the page.
  - 2. As a frequent visitor I want to be able to see the highscores of users from all over the

### Design

![color pallette](./assets/images/readme-images/color-palette.png)

- I will be using #14213D which is a ~ Indanthrone Blue PC 208 colour, for background colors.
- I will be using #FCA311 which is a ~ Sand PC 940 colour, this will be used on correct answer buttons and also to highlight the score the user is currently on.
- I will be using #000000 and a mix off #E5E5E5 for backgrounds on modals and the colours of the buttons.
  
  - **typography**
  - font-family: 'Kanit', sans-serif; will be used through out all pages titles and ordinary text, its easy to read, It's looks very elegant and clean and it will appeal to users who take part in the quiz.

  - **Structure**
    - The structure of the quiz app consists of a home page which contains a page title, a logo and 4 buttons, Start quiz, how to play, high scores and contact us.The how to play, high scores, and contact us will be a pop on modal on desktop tablet and mobile. The start quiz button will take the user to an area that will require the user to enter their name.Then the quiz area will appear once the user has submitted their name.  The question area will consist of the question area with 4 possible answers, 3 life lines, a bank option,and a money ladder so the user can track their progress. On mobile devices the 3 life lines, bank option and money ladder will be hidden in a side panel which can pop out for the user to be able to view and track their progress, along side being able to user the 3 life lines and bank option.

  - **Imagery**
    - I have only used one image for the webpage thus far. which was taken from [Vecteezy](https://www.vecteezy.com/), and is used through out the quiz app as the background image.

  - **Wireframes**

 [View wire frames here](./assets/images/wireframe-images/)

### Accessability

I have been attentive to make the website as accessible-friendly as possible through the following measures:

- Utilizing semantic HTML to provide meaningful structure and enhance accessibility.
- Incorporating descriptive alt attributes for images on the site to provide alternative text for screen readers.
- I also tested my website using wave which reports back to me any errors/contrast errors that may occur.
  
By implementing them few points above I have made my webpage as accessible and user friendly as possible taking into account those who may be visually impaired and require screen readers for assistance.

## Features

- The Millionaire quiz contains the homepage, which has 4 buttons and a title, the buttons consist of
  start quiz, how to play, high scores and contact us. The high scores button will display a pop up
  modal to display the users high scores that will be saved in local storage and the highs scores will be ranked from highest to lowest.
  The how to play section again will be a pop up modal which has an overflow scroll to display the
  rules of the game to the user.
  The contact us button again will be a pop up modal which will give the user the chance to fill in a form, to contact if they encounter any problems with the game, or any general enquires.
  The start quiz button will then redirect the user to the quiz game page, which consists of the scores which also has the life lines for the user to interact with, this section runs down the left side of the page, and then the quiz area next to it, which consists of the page title, a home button, the quiz questions and answers.
  For mobile users the scores and the lifelines will be hidden in a side panel, which the user will be able to interact with for the user to view their score and use the lifelines.
  Then when the quiz is over the user will be taken to the end game section, which will display messages based on how the user has performed, and then give the user the chance to either play again, or return home to view their high scores, or to be able to contact us if any issues arise.

### Favicon

- A favicon in the browser tab
  
![Favicon Image](/assets/images/site-images/favicon-m.webp)

### Home Page

![Home Page](assets/images/readme-images/home-page.webp)

### Home Page modals

- How to play Modal has a scroll effect to fit the content in, and thats fors desktop, tablet and mobile, and will then list and give the user information on how to play the quiz.

![How to play modal](assets/images/readme-images/how-to-play-modal.webp)

- High Score Modal will store the high scores of the user, I have used local storage to achieve this, so the user will be able to view their own high scores, high scores are also listed highest to lowest and if the user scores higher and they've reached the maximum amount of high scores (50), the lowest score will be replaced and the newer high score added into the high score display.

![High scores modal](assets/images/readme-images/highscore-modal.webp)

- Contact us Modal a simple for for the user to fill in for any general enquires and any bugs/errors found, which will then take the user to a thank you page.

![Contact us modal](assets/images/readme-images/contact-modal.webp)

### Input Name Page

- Input Name Section

![Input Name page](assets/images/readme-images/input-name-section.webp)

### Game Page

- Game Page
  ![game page](assets/images/readme-images/game-page.webp)

### pop up modal messages when user interacts with life lines.

- Phone a friend pop up
![Phone a friend](assets/images/readme-images/phone-a-friend-pop-up-message.webp)

- Ask the Audience
![Ask the audience](assets/images/readme-images/ask-the-audience-pop-up-message.webp)

### End Game Page

- End Game Section
- The end game section will display a message to the user depending on how the user has performed on the quiz, which also includes the score the user achieved on the quiz, and then the options to play again or return home to be able to view their high scores.
- ![End Game Section](assets/images/readme-images/end-game-section.webp)

### Thank You Page

-Thank You Page

![Thank You Page](assets/images/readme-images/thank-you-page.webp)

### Footer

- A footer at the bottom of the page with the copyright and navigation links for social networks
![Footer](/assets/images/readme-images/footer.webp)

## Technologies Used

### Languages Used

HTML, CSS and JavaScript have been used for this project.

### Frameworks, Libraries & Programs Used

Git - For version control.
​

[Github](https://github.com/Craig-Hudson) - To save and store the files for the website.

​
[Google Fonts](https://fonts.google.com/) - To import the fonts used on the website.

​
[Font Awesome](https://fontawesome.com/) - For the iconography on the website.

​Chrome Dev Tools - To troubleshoot and test features, solve issues with responsiveness and styling.

[Convert png to webp](https://www.freeconvert.com/) - I converted my images to webp using this site.

[tiny.png](https://tinypng.com/) - To reduce the file size of my images for better website performance

[Image resizer](https://www.resizepixel.com/) - To reduce any unnecessary height and width on photos, also minimizing file size.

Balsamiq - I used Balsamiq wireframes from a desktop app for my wireframes,

[W3School](https://www.w3schools.com/) To refer to anything Java script related that i may have been unsure of.

[Vecteezy](https://www.vecteezy.com/) - I used this website to get the image for my background

VsCode - I have used vscode as my ide

## Deployment & Local Development

### Deployment

Github Pages was used to deploy the live website. The instructions to achieve this are below:
​

1. Log in (or sign up) to Github.
2. Find the repository for this project here > [Millionaire](<https://github.com/Craig-Hudson/Millionaire>)
3. Click on the Settings link.
4. Click on the Pages link in the left hand side navigation bar.
5. In the Source section, choose main from the drop down select branch menu. Select Root from the drop down select folder menu.
6. Click Save. Your live Github Pages site is now deployed at the URL shown.
​

### Local Development

#### How to Fork

​
To fork The Millionaire repository:
​

1. Log in (or sign up) to Github.
2. Go to the repository for this project, Millionaire !(<https://github.com/Craig-Hudson/Millionaire.git>)
3. Click the Fork button in the top right corner.
​

#### How to Clone

​
To clone The Millionaire repository:
​

1. Log in (or sign up) to GitHub.
2. Go to the repository for this project.
3. Click on the code button, select whether you would like to clone with HTTPS !(<https://github.com/Craig-Hudson/Millionaire.git>) and copy the link shown.
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
5. Type 'git clone' into the terminal and then paste the link you copied in step 3. Press enter.
​

## Testing

### Automated Testing

#### W3C Validator

- index.html file no errors or infos reported
  
![html file](assets/readme-images/2023-06-05-1.png)

- CSS file contains one warning with regards too google imports, no errors
- Custom CSS
![CSS File](assets/readme-images/css-validator.png)

- CSS Coming from bootstrap contains 215 warnings. [Link to CSS Jigsaw validator here](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fcraig-hudson.github.io%2FThe-SmokeHouse%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

#### Lighthouse

- **Desktop Report**
- First desktop report
![Desktop Lighthouse first report](assets/readme-images/deskptop-lightouse-report1.png)

- Final desktop report
![Desktop Lighthouse second report](assets/readme-images/deskptop-lightouse-report1-update.png)

- **Mobile Report**
- First Mobile report
![Mobile Lighthouse first report](assets/readme-images/mobile-lighthouse-report.png)
- Final mobile report
![Mobile Lighthouse second report](assets/readme-images/mobile-lighthouse-report-update.png)

#### Wave

- I have conducted a wave report of my website there are no errors, no contrast errors,
  but there are 7 alerts, 6 for Suspicious alternative text and one for a possible heading on my image carousel text.

![Wave Test Report](assets/readme-images/wave-report.png)

### manual Testing

#### Testing User Stories

|  First Time Visitors |   |
| ------------ | ------------ |
|  Goals | How They are achieved  |
| As a first time visitor i want a nice clean site that is easy to navigate.  |  This was achieved with a clear navigation bar at the top of the page, and the use of a hamburger menu for navigation on devices with a less than 768px
| As a first time visitor i want to be able to easily identify where to find the menu  | This was achieved by having a link in the navigation bar at the top of the page which would take a user directly to the menu section, also there is a link for the menu on the first carousel image which would take a user to the menu  |
|  As a first time visitor i want to be able to easily find the whereabouts of the restaurant | This was achieved by having the location of the restaurant in the our story section of the page.  
| Returning Visitor goals  |   |
| As a returning Visitor i want to be able to easily reserve a table.  | This was achieved by keeping to the single page theme and adding a pop up modal when the user clicks on the reservation navigation link, and also in the book now link that is in the carousel.  
|  As a returning visitor i want to be able to easily find contact information for any queries.  |  This was achieved by adding a contacts section under the our story section that contains the contact information of the restaurant|

#### Full Testing

Full testing was done on the following devices:

- laptop
  - HP Pavilion plus laptop (14inch)

- Mobile
  - Oppo find x5 lite (6.42inch)

Full testing was done on the following browsers:

- Google Chrome
- Firefox

##### Full Page Testing

|  Feature | Expected Outcome  | Testing Performed  | Result  | Pass/Fail  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Home nav link  | Page to reload  | Click home link  | Page Reloaded  | Pass  |
| Menu nav link  | To take me to the menu  | click menu link  | Took me to menu section  | Pass  |
| Our story nav link | To take me to our story section  | click out story link  | Took me to our story section  | Pass   |
| Reservation nav link | For modal to pop up  | Click reservation link  |  Modal popped up | Pass  |
| Testimonials nav link  | To take me to testimonials section  | Click testimonial link  | Took me to testimonial section  | Pass  |
| Modal close button  | For modal to close  | Click close button  | Modal was closed |  Pass  |
| carousel menu link  | To take me to menu   | Click menu link   | Took me to Menu section   | Pass   |
| Carousel Book a table link   | To take me to reservation booking form   | Click Link   | Took me to booking form   | Pass  |
| hover effect navbar links  | To change color when cursor is over each link   | Hover cursor over links  | links changed colour   |Pass  |
|  Carousel automatic start  |  for carousel to automatically start without clicking next or prev buttons  | Reload page to see if automatic carousel started   |  Carousel automatically started  |  Pass   |
|  Carousel Manual scroll  |  when next and previous buttons are clicked it will go through the images  | Click next and previous buttons   | both next and previous buttons work and go through the images  | Pass   |
| font awesome icon links   | for each link to take me to its intended destination   | Click link   |  All links took me intended destination  | Pass |
| 404 page | if a link is broken or incorrect i be directed to the 404 page and be able to return back to the main website   |  enter incorrect link and see if there is a easy way to get back to the website| Entered broken link which took me to the 404page, and there is a clear button to click which took me back to my website |Pass |

### Bugs

#### Solved bugs

|  no   | Bug  | How i Solved the bug|
| ------------ | ----------- | -------------- |
| 1 | On wider screen widths the menu alignment got far to stretched and looked off  | I noticed i had the bootstrap class container-fluid set as the container which gives the container the full width of the screen, so i changed the bootstrap class to container, which will only allow the width on the container to be as wide as the content inside of it  |
| 2 |  On Different screen widths the testimonial sections alignment of the images and the star ratings would not align horizontally  | I had a play around with different flexbox properties and i ended up aligning the container of the testimonial section to align-items: flex-start as they aligned the images and the star ratings  |
|3 |In the menu section when i hit the 992px breakpoint the menu would shrink to 50% width but all still be in one column,it would only turn into 50% width when it hits 993px and turns into two columns side by side| I used chrome developer tools and played around with my code on their until i found the culprit was in the wrong media query so i just swapped the code over into the correct media query, and all seems to be working well since the fix.  |
|4 | In the Our story section where there is contact information, the email address ending up spanning onto two lines when it should only be on one line between screen width of 992px and 1200px| I played around with margins for the row that contained the email address until the email was completely on one line and then entered a min-width / max width media query to solve this issue  |

#### Known Bugs

|  known bugs | Bug issue  | Plan to resolve  |
| ------------ | ------------ | ------------ |
| 1  | On wider screen widths the menu alignment got far to stretched and looked off  | I plan to ensure that the container is only as wide as it needs to be  |
| 2 | On Different screen widths the testimonial sections alignment of the images and the star ratings would not align horizontally  | I plan to use flexbox to resolve this issue.  |

## Credits

### Code Used

- The code from the function below tas taken from [Stack Overflow](https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript)
![Sanitize Function](assets/images/readme-images/sanitize-function.webp)


- The code for both of these functions which are used for getting the users scores into local storage was used by using a video tutorial from this [youtube tutorial](https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=9)
![Highscore function in the game file](assets/images/readme-images/highscore-game-js.webp)
![highscore funciton in the home file](assets/images/readme-images/highscore-home-js.webp)

### Content

The use of the bootstrap library was used to create the carousel,hamburger menu and the modal thats used reservation booking form.

The other content for this project was written by Craig Hudson

### media

- All Images for the site were all taken from [pexels](https://www.pexels.com/)

### Acknowledgments

I would like to acknowledge the following people who helped me along the way in completing this project:

- My code institute mentor Narender Singh for all his help and patience with me !
- My partner for having the patience with me and allowing me more time to work on projects.
- My fellow classmates Ross and dan for any hints and tips that they have given me over the last few weeks.
- Other family who have helped test my quiz application and given me constructive feedback, and ideas that I would be able to improve the quiz application