// src/controllers/base.controller.js
import pool from "../config/database.js"
import { paginate } from "../helpers/utils.js"

export default class BaseController {
  constructor(tableName) {
    this.tableName = tableName
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query
      let userId = null
      if (this.tableName !== 'users' && req.user) {
        userId = req.user.id
      }
      const result = await paginate(pool, this.tableName, page, limit, userId)
      if (this.tableName === 'users' && req.user) {
        result.data = result.data.filter(user => user.id === req.user.id)
      }
      res.status(200).json({ success: true, ...result })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params
      let selectFields = '*'
      if (this.tableName === 'users') {
        selectFields = 'id, name, email'
      }
      const result = await pool.query(
        `SELECT ${selectFields} FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      if (result.rows.length === 0)
        return res.status(404).json({ success: false, message: `${this.tableName} not found` });
      res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

      const query = `
        INSERT INTO ${this.tableName} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *
      `;

      const result = await pool.query(query, values);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const fields = Object.keys(req.body)
      const values = Object.values(req.body)
      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

      const query = `
        UPDATE ${this.tableName}
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *
      `;

      const result = await pool.query(query, [...values, id]);

      if (result.rows.length === 0)
        return res.status(404).json({ success: false, message: `${this.tableName} not found` });

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`,
        [id]
      )

      if (result.rowCount === 0)
        return res.status(404).json({ success: false, message: `${this.tableName} not found` })

      res.status(200).json({
        success: true,
        message: `${this.tableName} deleted successfully`,
      })
    } catch (err) {
      next(err)
    }
  }
}