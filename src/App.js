import React from "react";
import { Block } from "./Block";
import "./App.scss";

function App() {
  const ratesRef = React.useRef({});
  const [fromCurrency, setFromCurrency] = React.useState("PLN");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  React.useEffect(() => {
    fetch(
      "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_k20ajlQJEBaS1EvgNL0D9XqjNtrjP3nefM6b9zOF"
    )
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.data;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err.message);
        alert(err.message);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
