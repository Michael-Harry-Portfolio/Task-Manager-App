import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { pool } from "../db/database";
export async function createLabel(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Label name is required',
      });
    }

    const result = await pool.query(
      `INSERT INTO labels (user_id, name)
       VALUES ($1, $2)
       RETURNING *`,
      [req.userId, name]
    );

    return res.status(201).json({
      message: 'Label created successfully',
      label: result.rows[0],
    });

  } catch (error) {
    console.error('Create label error:', error);

    return res.status(500).json({
      message: 'Server error while creating label',
    });
  }
}

export async function getLabels(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM labels
       WHERE user_id = $1
       ORDER BY created_at ASC`,
      [req.userId]
    );

    return res.status(200).json({
      labels: result.rows,
    });

  } catch (error) {
    console.error('Get labels error:', error);

    return res.status(500).json({
      message: 'Server error while getting labels',
    });
  }
}

export async function getLabelById(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM labels
       WHERE id = $1 AND user_id = $2`,
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Label not found',
      });
    }

    return res.status(200).json({
      label: result.rows[0],
    });

  } catch (error) {
    console.error('Get label error:', error);

    return res.status(500).json({
      message: 'Server error while getting label',
    });
  }
}
export async function updateLabel(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;
    const { name } = req.body;

    if (name === undefined) {
      return res.status(400).json({
        message: 'Nothing to update',
      });
    }

    const result = await pool.query(
      `UPDATE labels
       SET name = $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [name, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Label not found',
      });
    }

    return res.status(200).json({
      message: 'Label updated successfully',
      label: result.rows[0],
    });

  } catch (error) {
    console.error('Update label error:', error);

    return res.status(500).json({
      message: 'Server error while updating label',
    });
  }
}
export async function deleteLabel(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM labels
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Label not found',
      });
    }

    return res.status(200).json({
      message: 'Label deleted successfully',
      label: result.rows[0],
    });

  } catch (error) {
    console.error('Delete label error:', error);

    return res.status(500).json({
      message: 'Server error while deleting label',
    });
  }
}