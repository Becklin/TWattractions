// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from './data.json'

export default function handler(req, res) {
  if(req.method == 'GET') {
    res.status(200).json(data);
  } else {

  }
  res.status(200).json(data)
}

