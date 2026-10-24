import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { pool } from '../db/database';

export async function createReminder(
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
    const { reminder_time } = req.body;

    if (!reminder_time) {
      return res.status(400).json({
        message: 'reminder_time is required',
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

    const result = await pool.query(
      `INSERT INTO reminders (task_id, reminder_time)
       VALUES ($1, $2)
       RETURNING *`,
      [taskId, reminder_time]
    );

    return res.status(201).json({
      message: 'Reminder created successfully',
      reminder: result.rows[0],
    });

  } catch (error) {
    console.error('Create reminder error:', error);

    return res.status(500).json({
      message: 'Server error while creating reminder',
    });
  }
}

export async function getReminders(
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
      `SELECT *
       FROM reminders
       WHERE task_id = $1
       ORDER BY reminder_time ASC`,
      [taskId]
    );

    return res.status(200).json({
      reminders: result.rows,
    });

  } catch (error) {
    console.error('Get reminders error:', error);

    return res.status(500).json({
      message: 'Server error while getting reminders',
    });
  }
}

export async function getReminderById(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, reminderId } = req.params;

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
      `SELECT *
       FROM reminders
       WHERE id = $1 AND task_id = $2`,
      [reminderId, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Reminder not found',
      });
    }

    return res.status(200).json({
      reminder: result.rows[0],
    });

  } catch (error) {
    console.error('Get reminder error:', error);

    return res.status(500).json({
      message: 'Server error while getting reminder',
    });
  }
}

export async function updateReminder(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, reminderId } = req.params;
    const { reminder_time } = req.body;

    if (!reminder_time) {
      return res.status(400).json({
        message: 'reminder_time is required',
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
      `UPDATE reminders
       SET reminder_time = $1
       WHERE id = $2 AND task_id = $3
       RETURNING *`,
      [reminder_time, reminderId, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Reminder not found',
      });
    }

    return res.status(200).json({
      message: 'Reminder updated successfully',
      reminder: result.rows[0],
    });

  } catch (error) {
    console.error('Update reminder error:', error);

    return res.status(500).json({
      message: 'Server error while updating reminder',
    });
  }
}

export async function deleteReminder(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { taskId, reminderId } = req.params;

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
      `DELETE FROM reminders
       WHERE id = $1 AND task_id = $2
       RETURNING *`,
      [reminderId, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Reminder not found',
      });
    }

    return res.status(200).json({
      message: 'Reminder deleted successfully',
      reminder: result.rows[0],
    });

  } catch (error) {
    console.error('Delete reminder error:', error);

    return res.status(500).json({
      message: 'Server error while deleting reminder',
    });
  }
}