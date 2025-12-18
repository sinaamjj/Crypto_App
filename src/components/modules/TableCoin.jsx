import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import { RotatingLines } from "react-loader-spinner";

import { marketChart } from "../../services/cryptoApi";

import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  coin: {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  },
  setChart,
}) => {
  const hasChange = typeof price_change === "number";
  const isPositive = hasChange && price_change > 0;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart(json);
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>

      <td>{name}</td>

      <td>
        {typeof current_price === "number"
          ? `$ ${current_price.toLocaleString()}`
          : "-"}
      </td>

      <td
        className={
          hasChange ? (isPositive ? styles.success : styles.error) : undefined
        }
      >
        {hasChange ? `% ${price_change.toFixed(2)}` : "-"}
      </td>

      <td>
        {typeof total_volume === "number" ? total_volume.toLocaleString() : "-"}
      </td>

      <td>
        {hasChange && <img src={isPositive ? chartUp : chartDown} alt="" />}
      </td>
    </tr>
  );
};
