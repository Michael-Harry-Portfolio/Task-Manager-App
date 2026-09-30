import { Request, Response } from 'express';
import { pool } from '../db/database';
import { AuthRequest } from '../middleware/auth.middleware';

export async function createTask(req: AuthRequest, res: Response){
    try {
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

      const { title, description, status, priority, due_date, project_id } = req.body;
      if(!title) {
        return res.status(400).json({ message: 'Title is required' });  
      }
const result = await pool.query(
      `INSERT INTO tasks
       (user_id, project_id, title, description, status, priority, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        req.userId,
        project_id || null,
        title,
        description || null,
        status || 'pending',
        priority || 'medium',
        due_date || null,
      ]
    );

    return res.status(201).json({
      message: 'Task created successfully',
      task: result.rows[0],
    });
  } catch (error) {
    console.error('Create task error:', error);

    return res.status(500).json({
      message: 'Server error while creating task',
    });
  }
}
export async function getTasks(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM tasks
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.userId]
    );

    return res.status(200).json({
      tasks: result.rows,
    });
  } catch (error) {
    console.error('Get tasks error:', error);

    return res.status(500).json({
      message: 'Server error while fetching tasks',
    });
  }
}
export async function getTaskById(
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
       FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      task: result.rows[0],
    });
  } catch (error) {
    console.error('Get task error:', error);

    return res.status(500).json({
      message: 'Server error while fetching task',
    });
  }
}
export async function updateTask(
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

    const {
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
    } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         status = COALESCE($3, status),
         priority = COALESCE($4, priority),
         due_date = COALESCE($5, due_date),
         project_id = COALESCE($6, project_id),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        title,
        description,
        status,
        priority,
        due_date,
        project_id,
        id,
        req.userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      task: result.rows[0],
    });
  } catch (error) {
    console.error('Update task error:', error);

    return res.status(500).json({
      message: 'Server error while updating task',
    });
  }
}

export async function deleteTask(
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
      `DELETE FROM tasks
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      message: 'Task deleted successfully',
      task: result.rows[0],
    });
  } catch (error) {
    console.error('Delete task error:', error);

    return res.status(500).json({
      message: 'Server error while deleting task',
    });
  }
}
