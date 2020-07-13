import axios from 'axios';

export default function ColorService(props) {
  const { color: query } = props;
  const url = 'https://www.colourlovers.com/api/colors';

  const searchColors = async(query, filters) => {
    let params = {};
    for (let key in filters) {
      params.key = filters[key];
    }
    params.keywords = query;
    params.jsonCallback = '?';

    await axios({
      method: 'get',
      baseURL: url,
      params: params,
      responseType: 'json',
      'Access-Control-Allow-Origin': 'https://www.colourlovers.com',
      'Access-Control-Allow-Methods': 'GET'
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  return searchColors(query);
}
