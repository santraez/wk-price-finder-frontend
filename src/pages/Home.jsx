import ajaxMethod from "../helpers/ajaxMethod";
import { useState } from "react";

const Home = () => {
  const [listPricesValue, setListPricesValue] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const searchAmazon = async () => {
    setLoading(true);
    setListPricesValue([]);
    const url = 'http://localhost:4000/api/search';
    const inputSplit = Array.from(input.split("\n"));
    const inputFilter = inputSplit.filter((item) => item !== '');
    const body = { codes: inputFilter };
    const { data: { listPrices } } = await ajaxMethod(url, 'POST', body);
    if (listPrices) {
      setLoading(false);
      return setListPricesValue(listPrices);
    } else {
      setLoading(false);
      return setListPricesValue("error");
    };
  };
  return (
    <div>
      <h1>BUSCADOR EAN</h1>
      <textarea onChange={(e) => setInput(e.target.value)} />
      <button onClick={searchAmazon}>ENVIAR</button>
      {loading && <p>Cargando...</p>}
      {(listPricesValue.length > 0) && <pre>{JSON.stringify(listPricesValue, null, 2)}</pre>}
    </div>
  );
};

export default Home;
