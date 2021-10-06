const generatePairs = (options) => {
    return options.reduce(
        (acc, currValue) =>
            acc.concat(
                options
                    .filter((option) => option !== currValue)
                    .map((option) => [currValue, option])
            ),
        []
    );
};

export const getRates = async (options) => {
    const pairs = generatePairs(options);
    const today = new Date().toISOString().split("T")[0];
    let rates = JSON.parse(localStorage.getItem(today)) || [];

    if (rates && rates.length === 0) {
        for (const pair of pairs) {
            try {
                const res = await fetch(
                    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${pair[0]}/${pair[1]}.json`
                );
                const data = await res.json();
                rates = [...rates, [pair[0], pair[1], data[pair[1]]]];
            } catch (error) {
                console.error(error);
            }
        }
        localStorage.setItem(today, JSON.stringify(rates));
    }
    return rates;
};

export const getData = (currency, rates) => {
    const currencyLC = currency.toLowerCase();
    return rates
        .filter((rate) => rate.includes(currencyLC))
        .sort((a, b) => {
            if (a[2] < b[2]) return -1;
            if (a[2] > b[2]) return 1;
            return 0;
        });
};

export default {};
