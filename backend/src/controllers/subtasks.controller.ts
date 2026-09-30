import { Response } from 'express';
import { pool } from '../db/database';
import { AuthRequest } from '../middleware/auth.middleware';

export async function createSubtask(
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
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Title is required',
      });
    }

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
      `INSERT INTO subtasks (task_id, title)
       VALUES ($1, $2)
       RETURNING *`,
      [taskId, title]
    );

    return res.status(201).json({
      message: 'Subtask created successfully',
      subtask: result.rows[0],
    });

  } catch (error) {
    console.error('Create subtask error:', error);

    return res.status(500).json({
      message: 'Server error while creating subtask',
    });
  }
}

export async function getSubtasks(
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
      `SELECT *
       FROM subtasks
       WHERE task_id = $1
       ORDER BY created_at ASC`,
      [taskId]
    );

    return res.status(200).json({
      subtasks: result.rows,
    });

  } catch (error) {
    console.error('Get subtasks error:', error);

    return res.status(500).json({
      message: 'Server error while getting subtasks',
    });
  }
}

export async function getSubtaskById(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, subtaskId } = req.params;

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

    // Get the specific subtask
    const result = await pool.query(
      `SELECT *
       FROM subtasks
       WHERE id = $1 AND task_id = $2`,
      [subtaskId, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Subtask not found',
      });
    }

    return res.status(200).json({
      subtask: result.rows[0],
    });

  } catch (error) {
    console.error('Get subtask error:', error);

    return res.status(500).json({
      message: 'Server error while getting subtask',
    });
  }
}

export async function updateSubtask(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, subtaskId } = req.params;
    const { title, completed } = req.body;

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

    // Make sure the subtask belongs to this task
    const subtaskResult = await pool.query(
      `SELECT id
       FROM subtasks
       WHERE id = $1 AND task_id = $2`,
      [subtaskId, taskId]
    );

    if (subtaskResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Subtask not found',
      });
    }

    // Make sure at least one field is provided
    if (title === undefined && completed === undefined) {
      return res.status(400).json({
        message: 'Nothing to update',
      });
    }

    const result = await pool.query(
      `UPDATE subtasks
       SET
         title = COALESCE($1, title),
         completed = COALESCE($2, completed),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND task_id = $4
       RETURNING *`,
      [title, completed, subtaskId, taskId]
    );

    return res.status(200).json({
      message: 'Subtask updated successfully',
      subtask: result.rows[0],
    });

  } catch (error) {
    console.error('Update subtask error:', error);

    return res.status(500).json({
      message: 'Server error while updating subtask',
    });
  }
}
