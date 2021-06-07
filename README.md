# CASE STUDY 3: DATA VISUALISER

Semester: October 2020
Coursework: CM1010 Final Assignment
Candidate Number: WP0838

## EXTENSIONS CREATED

There are a total of 7 visualizations within this project. The first 2 visuals are new extensions based on a COVID19 dataset. The other 5 visuals are enhancements to the template provided in the course.

There was an application wide modification of code structure, which allowed all charts to have options for users to interact with and manipulate the visuals being displayed on the canvas. I also added an option for users to download the visual as a JPEG file, a feature that was inspired by another application covered in this course. All visuals also now have consistent formatting of titles and positioning.

The codes were restructured to modularize the constructors responsible for creating charts, versus constructors responsible for customizing the elements of the visual for the requirements of the specific dataset being analyzed. This allows a single chart template to be used across multiple datasets.

The “Pay gap: Over the Years” and “Climate Change” visuals use the same chart template but is customized to the input data. For these extensions, I have added a button to toggle grids on/off. I have also implemented animation, time filters, and gradient shades under the chart for both the visuals, which was a combination and enhancement of features from the templates.

A similar visual, the COVID19 weekly timeseries chart, is a new extension created. I leveraged on the code template that plots a single line chart but enhanced it to plot multiple lines for each category. I have also added animation to the plot and user interactions to allow row level data of points to be displayed when a user hovered over certain points. I made sure that the Y-axis was also nicely formatted to the nearest 100,000 cases. Furthermore, I am only displaying countries that had a week with at least 100,000 cases to avoid over-cluttering at the bottom of the chart.   

The COVID19 Geographical extension leverages on a similar code from the template to plot a bubble chart. However, this was enhanced by merging the “country” information within a dataset to another dataset containing its respective longitudinal and latitudinal coordinates and maps them onto an Equirectangular map. I have also added a slider filter to allow users to modify the number of countries to be displayed on the chart.  

The gender inequality by job type chart was enhanced from the template. I added colors to the bubbles, labeled the axis, and allowed row-level data to be viewed when a user hovers over each point. I also added a drop-down filter so that users can see how job inequality looks like for a specific job type / industry, with the ability to revert to the unfiltered view if needed.

Minimal modifications were made to the tech diversity visuals. I added options to change the appearances of the charts. The changes made were mainly aesthetic - no additional options were added to manipulate these input 2 datasets.

For more information on how to use the application, please view the user guide document in documentation/user-guide.html

## PLAN EFFECTIVENESS
Throughout this project, I had kept up with the timelines I had set out (as submitted in the mid-term assignment). I was able to break up my tasks into modular activities to ensure that each week’s work builds on to the application in an undisruptive way, with the ability to integrate them together. The planned schedule kept me on track to meeting the deadline.
Nevertheless, there were some roadblocks that I had faced along the way. In week 14, I was supposed to complete the extension of time series charts. However, I took longer than anticipated to tackle the plot animation with my new code structure. As a result, this task had to be pushed forward, shifting my timelines back by a week. This left me with less time for my report. I also could not work fully on implementing changes I would have loved to based on feedback I had gathered from my user test. Therefore, moving forward, I would be sure to keep such time buffers in mind.

## PRODUCT COMPLETION AND EFFECTIVENESS
I performed both system and user testing on the application. The system unit test cases that I have developed helped me uncover some issues with the interactive functionalities within the application.  These issues have been resolved. The user test cases helped me uncover issues that users - especially users with little experience on the application, will encounter. There were some modifications made to the codes to counter several of them (see progress log for more details). However, due to time constraints, I was not able to make the changes on all feedbacks received. Here are some modifications I would make for future versions of the application:
1. Make categorization of visuals clearer.
2. For the COVID19 geographical chart, change the scale scroll to an input box with input validation as that will enable users to easily manipulate the graph to their exact preference.
3. For the COVID19 weekly chart, provide users with a drop-down list to select countries of interest, and add a permanent label of country to the side of the line drawn for ease of identification.
4. For the stacked bar chart, add functionality to move the reference line by clicking and dragging it along the chart.
5. For the boxed bubble chart, change the labeling of the chart from the axis to region of the box so users can identify what each segment of the chart indicates.
6. I would also set aside more time in the future to work on user-driven changes to the application.

## REFERENCES
Equirectangular map:
https://commons.wikimedia.org/wiki/File:Equirectangular-projection-topographic-world.jpg
Data Source:
https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide
https://www.kaggle.com/paultimothymooney/latitude-and-longitude-for-every-country-and-state
Codes:
https://www.geeksforgeeks.org/p5-js-createbutton-function/
https://www.w3schools.com/jsref/prop_element_children.asp
https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
https://stackoverflow.com/questions/10563352/link-to-index-page-of-website
https://p5js.org/examples/form-pie-chart.html
https://p5js.org/reference/#/p5.Table
https://p5js.org/reference/#/p5/color
Libraries
https://p5js.org/download/
