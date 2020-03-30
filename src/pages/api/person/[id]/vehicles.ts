import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open('./mydb.sqlite');
    const allVehicles = await db.all('select * from vehicle where ownerId = ?', [req.query.id]);
    res.json(allVehicles);
} 