import { query as q } from 'faunadb';
import { faunaClient } from '../../lib/fauna';

export default async (req, res) => {
  if (req.method == 'POST') {
    const body = JSON.parse(req.body);
    let query = await faunaClient.query(
      q.Update(
        q.Select(
          ['ref'],
          q.Get(q.Match(q.Index('shows_by_title'), body.title))
        ),
        {
          data: {
            watched: body.watched,
          },
        }
      )
    );
    res.status(200).json({ data: query });
  }
};
