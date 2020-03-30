import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { secret } from '../../../api/secret';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'POST') {
    const person = await db.get('select * from person where email = ?', [
      req.body.email
    ]);

    compare(req.body.password, person.password, function(err, result) {
      if (!err && result) {
        const claims = { sub: person.id, myPersonEmail: person.email };
        const jwt = sign(claims, secret, { expiresIn: '1h' });
        res.json({ authToken: jwt });
      } else {
        res.json({ message: 'Ups, something went wrong!' });
      }
    });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}
