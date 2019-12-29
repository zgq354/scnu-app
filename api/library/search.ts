import axios from 'axios';
import { NowRequest, NowResponse } from '@now/node';

module.exports = async (req: NowRequest, res: NowResponse) => {
  const { keywords, pageSize = 20, pageCount = 1 } = req.query;
  const postData = {
    searchWords: [
      {
        fieldList: [
          {
            fieldCode: '',
            fieldValue: keywords,
          },
        ],
      },
    ],
    filters: [],
    limiter: [],
    sortField: 'relevance',
    sortType: 'desc',
    pageSize,
    pageCount,
    locale: 'zh_CN',
    first: true,
  };
  const { data } = await axios.post('http://202.116.41.246:8080/opac/ajax_search_adv.php', postData);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(data);
};
