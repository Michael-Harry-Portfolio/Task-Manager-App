import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { pool } from '../db/database';

export async function getPreferences(
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
       FROM task_preferences
       WHERE user_id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task preferences not found',
      });
    }

    return res.status(200).json({
      preferences: result.rows[0],
    });

  } catch (error) {
    console.error('Get preferences error:', error);

    return res.status(500).json({
      message: 'Server error while getting preferences',
    });
  }
}

export async function createPreferences(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { default_priority, default_task_view } = req.body;

    const result = await pool.query(
      `INSERT INTO task_preferences (
        user_id,
        default_priority,
        default_task_view
      )
      VALUES ($1, COALESCE($2, 'medium'), COALESCE($3, 'list'))
      RETURNING *`,
      [
        req.userId,
        default_priority,
        default_task_view
      ]
    );

    return res.status(201).json({
      message: 'Task preferences created successfully',
      preferences: result.rows[0],
    });

  } catch (error) {
    console.error('Create preferences error:', error);

    return res.status(500).json({
      message: 'Server error while creating preferences',
    });
  }
}

export async function updatePreferences(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { default_priority, default_task_view } = req.body;

    if (
      default_priority === undefined &&
      default_task_view === undefined
    ) {
      return res.status(400).json({
        message: 'Nothing to update',
      });
    }

    const result = await pool.query(
      `UPDATE task_preferences
       SET
         default_priority = COALESCE($1, default_priority),
         default_task_view = COALESCE($2, default_task_view)
       WHERE user_id = $3
       RETURNING *`,
      [
        default_priority,
        default_task_view,
        req.userId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task preferences not found',
      });
    }

    return res.status(200).json({
      message: 'Task preferences updated successfully',
      preferences: result.rows[0],
    });

  } catch (error) {
    console.error('Update preferences error:', error);

    return res.status(500).json({
      message: 'Server error while updating preferences',
    });
  }
}

export async function deletePreferences(
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
      `DELETE FROM task_preferences
       WHERE user_id = $1
       RETURNING *`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task preferences not found',
      });
    }

    return res.status(200).json({
      message: 'Task preferences deleted successfully',
      preferences: result.rows[0],
    });

  } catch (error) {
    console.error('Delete preferences error:', error);

    return res.status(500).json({
      message: 'Server error while deleting preferences',
    });
  }
}
