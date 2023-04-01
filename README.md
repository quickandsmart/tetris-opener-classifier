# Tetris Opener Classifier 

## Project Description

The Project is meant to be a classification model for different tetris openers. I had to manually collect all the openers I planned on using, trying to add a good variety by including the openers being built on different games. I created, trained, and tested a convolutional neural network(CNN) to classify each of the openers. I then grabbed said model and created a python flask server to host the model and a website where you can easily classify openers. 

## Overview of Tetris Openers and Dataset

In Multiplayer Tetris you compete against one or more players to try to top out your opponent by sending them lines. Most modern games have a 7 bag system which makes it so you get all 7 pieces in a randomized order every 7 consequtive pieces. This 7 bag system has allowed for players to create different openers that are easy and quick to build and put you in a good position against your opponents. The 5 openers I decided to classify were Albatross Opener, Hachispin Opener, SDPC/Stickspin Openers(These two are different openers but have a near identical 1st bag), Perfect Clear Opener(PCO), and TKI opener. These 5 openers were choosen because the setup of the opener only requires the first bad, or the first 7 pieces, which potentially allows for them to be more distinguishable and easier for a model to train from. I had to collect images of these openers since there was no dataset available, so I grabbed different sized images of the openers and their slightly different varients, and did so for 4 different tetris games(Tetr.io, Jstris, Tetris Effect, and Puyo Puyo tetris) to allow a greater variety in the dataset and how the openers look.

## Dependencies and How to Run 

Once you've downloaded the files first make sure you have the correct package versions. To do so open up the command prompt and move the **'server'** directory, then run the command **'pip install -r requirements.txt'** and wait for all of the packages to finish installing. Then you should be able to run the command 'python server.py' which will start running the local flask server for you. After that, open up the **'client'** folder and open up the app.html file. This should open up a website for you to do your predictions. Just upload a picture you have of any of the 5 openers shown and it will try to classify which opener and then show the probability the model gave of it being each opener.

## Future Work

One of the major issues I ran into was the lack of available data I can use for training. Manually collecting the data took a long time but if I want a stronger model I would need to collect more images for training. Some ways to increase variety in the dataset would be using different tetris skins for the openers and different quality settings for the games. I might also try to attempt adding more openers later, potentially openers that require more than 1 bag to setup to add more challenge. Lastly I plan on adding additonal quality of life features on the website such as giving a brief description of each opener and they're usefulness after doing the classification.
