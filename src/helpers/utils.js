// src/helpers/utils.js
export const paginate = async (pool, table, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
  
    const countResult = await pool.query(`SELECT COUNT(*) AS total FROM ${table}`);
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);
  
    const dataResult = await pool.query(
      `SELECT * FROM ${table} ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
  
    return {
      page,
      limit,
      total,
      totalPages,
      data: dataResult.rows,
    };
  };
  