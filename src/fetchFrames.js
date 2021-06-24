import { useEffect, useState } from 'react';
import axios from 'axios';

export default function fetchFrames() {
  const url = "https://www.aceandtate.show/torii/catalog/v1/products/exploded/frames?country-code=nl&language-code=en"
  // const url = "https://www.aceandtate.show/torii/catalog/v1/products/filter?sku=neil-satin-silver&sku=pierce-fizz&country-code=nl&language-code=en"
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [frames, setFrames] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setFrames([])
  }, [])


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log("I was fetched");
    setLoading(true);
    setError(false);

    let cancel

    axios({
      method: 'GET',
      url: `${url}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(results => {
        const { data: { data } } = results
        const availableFrames = data.filter(frame => {
         return frame
           .currentVariant
           .availability
           .isAvailableOnline === true
        });
        setFrames(prevFrames => {
          return [...prevFrames, ...availableFrames.map(frame => {
            const {
              currentVariant: {
                id,
                name,
                displayAttributes: { color },
                images: {
                  front: {
                    url: frontImageUrl,
                  } = ""
                }
              }
            } = frame
            return { id, name, color, frontImageUrl }
          })]
        })
        setLoading(false)
    }).catch(e => {
          if (axios.isCancel(e)) return
            setError(true)
    })

    return () => cancel()
  }, [])

  return { loading, error, frames }
}
