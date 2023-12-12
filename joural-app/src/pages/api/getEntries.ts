// pages/api/getEntries.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';

interface NotebookRow {
  title: string;
  // Include other properties of the notebook if needed
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { notebookId } = req.query;

    if (!notebookId) {
      res.status(400).json({ message: 'Notebook ID is required' });
      return;
    }

    // Fetching the notebook title
    const notebookSql = 'SELECT title FROM notebook WHERE id = ?';
    db.get(notebookSql, [notebookId], (notebookErr, notebookRow: NotebookRow | undefined) => {
      if (notebookErr) {
        res.status(500).json({ message: 'Error fetching notebook title' });
        return;
      }

      if (!notebookRow) {
        res.status(404).json({ message: 'Notebook not found' });
        return;
      }

      const notebookTitle = notebookRow.title;

      // Fetching entries for the notebook
      const entriesSql = 'SELECT id, title, content FROM entry WHERE notebook_id = ?';
      db.all(entriesSql, [notebookId], (entriesErr, entriesRows) => {
        if (entriesErr) {
          res.status(500).json({ message: 'Error fetching entries' });
          return;
        }

        res.status(200).json({
          notebookTitle,
          entries: entriesRows,
        });
      });
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
