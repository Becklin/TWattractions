// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from './data.json'

export default (req, res) => {
    const atr = data.filter(atr => atr.slug === req.query.slug);
  if(req.method == 'GET') {
    res.status(200).json(atr);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${resq.method} is not allowed`});
  }
}



