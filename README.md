# NoteBlockchain Profit Calculator

A simple NoteBlockchain Profit calculator. Enter your hash rate, the cost per kW

## Changes made for NoteBlockchain
- [x] Get price from coingecko
- [x] Get network details from blocks.notebc.space/api
- [x] Redesign to make it cleaner & in line with NTBC brand
- [x] Add links to known pools
- [x] Display current hash rate and difficulty, so miners know how much hash to rent
- [ ] Get hash rate of each pool and compare it against the total hash rate *(currently running into CORS issues)*
- [ ] Get block reward from blocks.notebc.space/api *(No straight forward computation exists)*
- [ ] Optionally use fixed rate (like mining from MRR) to calculate profit instead of kWh rates.

## Credits
This code is based of Infamoustrey's Bitcoin profitability calculator. The webpage is built
using Bulma.css (since Bootstrap is too mainstream).

## Forking
If you like this calculator, feel free to fork and make changes. Here are some starting information to help you.

- After forking, change the logo at `public/img/icon.png`. Change the coin name on `public/index.html`
- Make navbar changes in the html file to reference your pools and sites.
- Update `public/main.js` with the reward and api URLs for your coin.
- If you want to keep this simple, remove the pool section of the HTML file