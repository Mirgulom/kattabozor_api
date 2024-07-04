import './offerlist.scss'
import { 
    useEffect, 
    useState 
} from 'react';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('https://www.kattabozor.uz/hh/test/api/v1/offers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Вывод данных в консоль для проверки

        if (Array.isArray(data.offers)) {
          setOffers(data.offers);
        } else {
          throw new Error('Fetched data does not contain an offers array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return ( 
        <div className="offerlist">
            <div className="offerlist_cards">
                <ul className="card">
                    {offers.map((offer) => (
                    <li className="card_item" key={offer.id}>
                        <img 
                            src=
                            {offer.image.url} 
                            alt={offer.name} 
                            width={offer.image.width}
                            height={offer.image.height}
                        />
                        <div className="card_title">
                        <h3>{offer.name}</h3>
                        <span> Brand: {offer.brand}</span>
                        <span>Category: {offer.category}</span>
                        <span>Merchant: {offer.merchant}</span>
                        <ul>
                            {offer.attributes.map((attribute, index) => (
                                <li key={index}>{attribute.name}: {attribute.value}</li>
                            ))}
                        </ul>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default OfferList;