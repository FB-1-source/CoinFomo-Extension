import React, { useState, useEffect } from "react";
import axios from "axios";

function Main() {
  const [coin, setcoin] = useState([]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setcoin(response.data);
      });
  });

  return (
    <div className="full">
      <div className="whole">
        <h1 className="title">Crypto Prices</h1>
        <div className="coins2">
              <h1 className="coin-name2">Name</h1>
              <h1 className="coin-nick2">Price</h1>
              <h1 className="coin-price2">24h Change</h1>
          </div>
        {coin.map((val) => {
          return (
            <div className="coins">
              <div className="sec1">
                <img src={val.image}></img>
                <div className="names">
                <h2 className="coin-nick">{val.symbol.toUpperCase()}</h2>
                <div className="coin-name">{val.name}</div>
                </div>
              </div>
              <h1 className="coin-price">
                {formatter.format(val.current_price)}
              </h1>
              {val.price_change_percentage_24h.toFixed(2) > 0 ? (
                <h1 className="positive">
                  {val.price_change_percentage_24h.toFixed(2)}%
                </h1>
              ) : (
                <h1 className="negative">
                  {val.price_change_percentage_24h.toFixed(2)}%
                </h1>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
