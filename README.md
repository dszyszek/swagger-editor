## Swagger editor
A simple text editor you can use to write valid JSON file! <br>
See DEMO: [here](https://json-lint.herokuapp.com/)

## Technologies

<b>Main technologies used to develop this project</b>
- React
- Redux

## Features
The editor helps you with several things:
- Writing valid JSON file
- Checking if your JSON sticks to OpenAPI Specification 2

<b>Linting</b>

One of the most notable features of editor is tree view of JSON input
Sometimes you can see a dot next to name of label in tree view. That means editor detected a mistake in you JSON.
Editor distinguish two serverity levels of mistakes in edited file:
- error
- warn

If you see a **yellow** dot: consider yourself as oficially warned! In this case click on **status** button to check what happened. After the button was clicked, you will see a list with every mistake the editor detected.
Every label will contain two information: path to error (look for it in tree view) and name of the warning.
Please mind the fact that parent label of the one with mistake will also contain one (from every mistake in child labels, so there is a possibility that one parent label will contain several dots). 

<b>Validation</b>

If your file contain critical error (e.g syntax) there will be explicit information about that in tree view section. But not only that! Editor will check where exactly error occurred, write that information and highlight the part of text where error probably exists (+- 30 characters).

<b>Other</b>

There are also some features created to improve user experience (UX): you can change font size and use tab key to fasten writing process. Also status button will contain info about amount of catched errors (in case there are no left, you will see OK status)

## Installation

For everyone who wants to run editor locally: process is nice and easy!

Just clone the repo: <br>
```$ git clone editor.bundle ./```<br>
and change directory

Or you can download .zip file and unpack it wherever you want.
Then just write in termianl window (make sure you are in proper directory!): <br>
```$ npm i``` <br>
Thats it! From now you have everything you need to experiment with Swagger editor!
Wants to run it in your browser? Just write in terminal: <br>
```$ npm start``` <br>
And in your browser (in the url section) write: <br>
```http://localhost:9000``` <br>
Simple as that.

## Credits
Credits to [stoplightio](https://github.com/stoplightio) for creating [spectral](https://github.com/stoplightio/spectral) package (used to lint JSON input in this project).

## Future 

I'm looking forward to create some features that will improve UX and UI! Frist of all: code highlighting (and I mean the syntax of JSON you input). Second will be more linting options (not just OAS 2). And for development purposes some tests will be added. That's all for now!

## Author

[dszyszek](https://github.com/dszyszek)