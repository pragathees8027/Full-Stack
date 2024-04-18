let API_KEY:string = 'bdb3ba092e9c01c69fdd6ebc';

function exchangeCurrency(currencyFrom:string, currencyTo:string, currencyIn:number) {
    let currencyOut:number = 0;
    let exchangeRate:number = 0;
    let rate = fetch('https://v6.exchangerate-api.com/v6/'+ API_KEY +'/pair/'+ currencyFrom + '/' + currencyTo);
    rate.then(res =>
        res.json()).then(d => {
            exchangeRate = d.conversion_rate;
            console.log("\n" + currencyFrom + ":");
            console.log(currencyIn);
            console.log("Exchange Rate (" + currencyFrom + " to " + currencyTo +"):");
            console.log(exchangeRate);
            currencyOut = currencyIn * exchangeRate;
            console.log(currencyTo + ":");
            console.log(currencyOut);
        })
}

exchangeCurrency('USD','INR',3);
exchangeCurrency('INR','EUR',500);
exchangeCurrency('USD','EUR',54);