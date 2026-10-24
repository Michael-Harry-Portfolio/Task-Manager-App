import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { pool } from '../db/database';

export async function addLabelToTask(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId } = req.params;
    const { label_id } = req.body;

    if (!label_id) {
      return res.status(400).json({
        message: 'label_id is required',
      });
    }

    // Make sure the task belongs to the authenticated user
    const taskResult = await pool.query(
      `SELECT id
       FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [taskId, req.userId]
    );

    if (taskResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Make sure the label belongs to the authenticated user
    const labelResult = await pool.query(
      `SELECT id
       FROM labels
       WHERE id = $1 AND user_id = $2`,
      [label_id, req.userId]
    );

    if (labelResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Label not found',
      });
    }

    // Prevent the same label from being attached twice
    const existingResult = await pool.query(
      `SELECT *
       FROM task_labels
       WHERE task_id = $1 AND label_id = $2`,
      [taskId, label_id]
    );

    if (existingResult.rows.length > 0) {
      return res.status(409).json({
        message: 'Label is already attached to this task',
      });
    }

    const result = await pool.query(
      `INSERT INTO task_labels (task_id, label_id)
       VALUES ($1, $2)
       RETURNING *`,
      [taskId, label_id]
    );

    return res.status(201).json({
      message: 'Label added to task successfully',
      taskLabel: result.rows[0],
    });

  } catch (error) {
    console.error('Add label to task error:', error);

    return res.status(500).json({
      message: 'Server error while adding label to task',
    });
  }
}

export async function getTaskLabels(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId } = req.params;

    // Make sure the task belongs to the authenticated user
    const taskResult = await pool.query(
      `SELECT id
       FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [taskId, req.userId]
    );

    if (taskResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    const result = await pool.query(
      `SELECT l.*
       FROM labels l
       INNER JOIN task_labels tl
         ON l.id = tl.label_id
       WHERE tl.task_id = $1
       ORDER BY l.created_at ASC`,
      [taskId]
    );

    return res.status(200).json({
      labels: result.rows,
    });

  } catch (error) {
    console.error('Get task labels error:', error);

    return res.status(500).json({
      message: 'Server error while getting task labels',
    });
  }
}

export async function removeLabelFromTask(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, labelId } = req.params;

    // Make sure the task belongs to the authenticated user
    const taskResult = await pool.query(
      `SELECT id
       FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [taskId, req.userId]
    );

    if (taskResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    const result = await pool.query(
      `DELETE FROM task_labels
       WHERE task_id = $1 AND label_id = $2
       RETURNING *`,
      [taskId, labelId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Label is not attached to this task',
      });
    }

    return res.status(200).json({
      message: 'Label removed from task successfully',
      taskLabel: result.rows[0],
    });

  } catch (error) {
    console.error('Remove label from task error:', error);

    return res.status(500).json({
      message: 'Server error while removing label from task',
    });
  }
}
