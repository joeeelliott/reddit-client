# reddit-client project

A sample Reddit application for a fictional client.

## Description

Here you will find a project I began on a Codecademy course which involved creating a sample Reddit applcation for a fictional client.

React was the Javascript library I was learning when starting this project, as well as Redux and Redux Toolkit for the state container. Key reasons for using the above are their popularity, ease of use and easy to test.

The initial project parameters were a lot less dynamic than the application I ended up with, but I thought it was a good test of my current skills and ability to add additional features in such as the search bar and filters in the sidenav, as well as the user ability to score, save, hide, report, and view the official post on the official Reddit website.

The application is an extremely brief and simple mimic of the Reddit website. On page load, users can choose to see popular, sport, or news posts, of which 10 of each are fetched.

## Key Learnings and Challenges

During this project I learnt to use a state management tool which covers the entire app, as opposed to using solely local state management, used in smaller previous projects. This gave an insight into what it would be like in larger applications.

I also sharpened my skills in the general logistics of writing code by means of creating the features listed above. None of the features were planned initially, but as confidence in the project grew I decided that in an attempt to further my coding skills I would create them one by one, some in spontinuity.

Another key learning phase in this project was code testing. Having delved very briefly into testing in other Codecademy lessons, this was the first time I had used tests of any kind outside of a lesson environment, and on my own code. Having attempted numerous unsuccessful ways to even simply render my components in a test environment, I eventually found Kent C. Dodds adapted render method.

After struggling initially to grasp what to/not to test, my unit tests were brief as most functions relate to changes in the DOM, as opposed to having a definitive logical output. I also didn't think it was neccessary to test implementation code as advised by numerous sources. Integration tests were also fairly brief due to the same reasons. However, with the use of cypress my end-to-end tests were rather detailed, covering all user uses of the application.

The main challenge was testing of the application. Having not tested previously, and leaving it until the app was at completion it was difficult to begin with. Through many tutorials, docs, and stack overflow i managed to test my code at unit, integration and end-to-end level.

The other key challenge, or i suppose could be viewed as an opportunity, was the parameters of the project. I wanted to go above and beyond what was outlined in the initial project scope, but a bit more prior planning would have helped me with timings, focus, and productivity.  

## Features

- Search

Users can search through the fetched posts by title.
- Filters

Users can filter through the posts fetched on render. Posts can be filtered through the type of post, or a post specific filter, or both together. The number of posts within the brackets next to each post filter are dynamically adjusted.
- View Post

Users can choose to view each post on the official Reddit website. This is made clear to the user in a pop-up modal in which they are given a choice to stay on the sample site or leave for the official Reddit site.
- Score

Users are able to upscore or downscore posts.
- Save, Hide, Report

Users can use the save, hide, or report features on each post. Saved posts are simply added to the saved posts filtered page but remain on the original timeline. Hidden posts are hidden from the timeline but also added to the hidden posts filtered page, and reported posts remain on the timeline but congregate in the reported posts filtered page. All hidden posts can be immediately be restored to the timeline via the eye icon at the bottom of the sidenav.

## Future Features

To further expand and improve this project, there are a few of additions and features that could be added.

- Users are able to check multiple or all Post filters.
- Login feature
- The search feature can search for author names as well as titles.
- More API calls to different endpoints for a wider range of posts.
- Greater attention to detail on the enlargement of post images (the use of photoshop or something similar).

## Testing 

    npm run test-jest
    npm run test-cypress