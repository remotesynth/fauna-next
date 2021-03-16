import { query as q } from 'faunadb';
import { faunaClient } from '../../lib/fauna';

export default async (req, res) => {
  if (req.method == 'POST') {
    const body = JSON.parse(req.body);
    let query = await faunaClient.query(
      q.Create(q.Collection('shows'), {
        data: { title: body.title, watched: false },
      })
    );
    res.status(200).json({ data: query });
  }
};
