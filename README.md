# London Mock Exchange Frontend
This is a frontend static react webpage application for mock investments. It provides a user interface for signing up, in and out, for creating porfolios, listing portfolios and deleting portfolios, for creating transactions within these portolfolios and displaying a newsfeed of current financial articles. 
For a compatible django backend API, checkout [this London Mock Exchange API](https://github.com/arabellaknowles/london-mock-exchange-backend)

## Set up
1) Clone this repository.
2) To install required dependencies, in your terminal run:
```
$ npm install
```
3) If you want to run this app locally, in your terminal run:
```
$ npm start
```
then go to localhost:3000 in your brower.
4) To run a build of this app and deploy to surge, in your terminal run:
```
$ npm run deploy
```
Then visit: http://londonmockexchange.surge.sh/

## Technologies Used
- React
- Javascript
- HTML
- CSS
- Used data from the Market Stack API and the Guardian API
- Used a css stylesheet from Bootstrap

## Future Improvements
**App:**  

- Leaderboard comparing portfolio net earnings
- Users can follow eachother  

**Code:**   
- Refactoring of code
  - Focussing on encapsulation and SRP
- Testing the code - Jest and cypress.
