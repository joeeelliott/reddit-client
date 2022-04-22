# reddit-client project

A sample Reddit application for a fictional client.

## Description

Here you will find a project I was required to complete on a Codecademy course which involved creating a sample Reddit applcation for a fictional client.

React was the Javascript library I was learning when starting this project, as well as Redux and Redux Toolkit for the state container. Key reasons for using the above are their popularity, ease of use and easy to test.

The initial project parameters were a lot less dynamic than the application I ended up with, but I thought it was a good test of my current skills and ability to add additional features in such as the search bar and filters in the sidenav, as well as the user ability to score, save, hide, report, and view the official post on the official Reddit website.

## Key Learnings

During this project I learnt to use a state management tool which covers the entire app, as opposed to using solely local state management, used in previous projects. This gave an insight into what it would be like in larger applications.

I also sharpened my skills in the general logistics of writing code by means of creating the features listed above. None of the features were planned initially, but as confidence in the project grew I decided that in an attempt to further my coding skills I would create them one by one, some in spontinuity.

Another key learning phase in this project was code testing. Having delved very briefly into testing in other Codecademy lessons, this was the first time I had used tests of any kind outside of a lesson environment. Having attempted numerous unsuccessful ways to even simply render my components in a test environment, I eventually found Kent C. Dodds adapted render method.

After struggling initially to grasp what to/not to test, my unit tests were brief as most functions relate to changes in the DOM, as opposed to having a definitive logical output. I also didn't think it was neccessary to test implementation code as advised by numerous sources. Integration tests were also fairly brief due to the same reasons. However, with the use of cypress my end-to-end tests were rather detailed, covering all user uses of the application.