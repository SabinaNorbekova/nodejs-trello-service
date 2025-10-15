// src/controllers/base.controller.js
import pool from "../config/database.js"
import { paginate } from "../helpers/utils.js";

export default class baseController {
  constructor(tableName) {
    this.tableName = tableName;
  }


  getAll = async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await paginate(pool, this.tableName, page, limit);
      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }


  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1`,
        [id]
      );
      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ success: false, message: `${this.tableName} not found` });

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  }


  create = async (req, res, next) => {
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


  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

      const query = `
        UPDATE ${this.tableName}
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *
      `;

      const result = await pool.query(query, [...values, id]);

      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ success: false, message: `${this.tableName} not found` });

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  }


  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `DELETE FROM ${this.tableName} WHERE id = $1`,
        [id]
      );

      if (result.rowCount === 0)
        return res
          .status(404)
          .json({ success: false, message: `${this.tableName} not found` });

      res
        .status(200)
        .json({
          success: true,
          message: `${this.tableName} deleted successfully`,
        });
    } catch (err) {
      next(err);
    }
  }
}


// export const createBaseController = (tableName) => ({
//     getAll: async (req, res, next) => {
//         try {
//             const { page = 1, limit = 10 } = req.query;
//             const result = await paginate(pool, tableName, page, limit);
//             res.status(200).json({ success: true, ...result });
//         } catch (err) {
//             next(err);
//         }
//     },

//     getById: async (req, res, next) => {
//         try {
//             const { id } = req.params
//             const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id])
//             if (result.rows.length === 0)
//                 return res.status(404).json({ success: false, message: `${tableName} not found` })
//             res.status(200).json({ success: true, data: result.rows[0] })
//         } catch (err) {
//             next(err)
//         }
//     },

//     create: async (req, res, next) => {
//         try {
//             const fields = Object.keys(req.body)
//             const values = Object.values(req.body)
//             const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ")

//             const query = `INSERT INTO ${tableName} (${fields.join(", ")})
//                      VALUES (${placeholders}) RETURNING *`

//             const result = await pool.query(query, values)
//             res.status(201).json({ success: true, data: result.rows[0] })
//         } catch (err) {
//             next(err)
//         }
//     },

//     update: async (req, res, next) => {
//         try {
//             const { id } = req.params
//             const fields = Object.keys(req.body)
//             const values = Object.values(req.body)
//             const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ")

//             const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`
//             const result = await pool.query(query, [...values, id])

//             if (result.rows.length === 0)
//                 return res.status(404).json({ success: false, message: `${tableName} not found` })

//             res.status(200).json({ success: true, data: result.rows[0] })
//         } catch (err) {
//             next(err)
//         }
//     },

//     remove: async (req, res, next) => {
//         try {
//             const { id } = req.params
//             const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id])
//             if (result.rowCount === 0)
//                 return res.status(404).json({ success: false, message: `${tableName} not found` })

//             res.status(200).json({ success: true, message: `${tableName} deleted successfully` })
//         } catch (err) {
//             next(err)
//         }
//     },
// })
