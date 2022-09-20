export const getCountries = (country: string) => {
  console.log('url used', `https://restcountries.com/v3.1/name/${country}`);
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(res => {
      return res;
    });
};
