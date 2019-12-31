let resultInput = document.querySelector('#result');
//First function — Receiving Currency Data Asynchronously
const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get('http://www.apilayer.net/api/live?access_key=fd0e3bfec009883344992f1d39e1ebc9');
    const rate = response.data.quotes;
    const baseCurrency = response.data.source;
    const usd = 1 / rate[`${baseCurrency}${fromCurrency}`];
    const exchangeRate = usd * rate[`${baseCurrency}${toCurrency}`];
    return exchangeRate;
  } catch(error) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }
};

//Second function — Receiving Country Data Asynchronously
const getCountries = async(currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch(error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`)
  }
};

//Third and final function — Merging it all together
const convertCurrency = async(fromCurrency, toCurrency, amount) => {

  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  resultInput.innerHTML = `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You 
  can spend these in the following countries: ${countries}`;
};

document.querySelector('#convert').addEventListener('click', function (event) {
  let fromCurrencyChoose = document.querySelector('#fromCurrency').value,
    toCurrencyChoose = document.querySelector('#toCurrency').value,
    amount = document.querySelector('#amount').value;
  event.preventDefault();
  convertCurrency(fromCurrencyChoose, toCurrencyChoose, amount);
});