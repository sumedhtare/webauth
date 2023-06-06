const CREATE_USERS_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    login_time TEXT,
    last_update_time TEXT,
    last_login TEXT,
    user_ip TEXT,
    user_agent TEXT,
    register_time TEXT,
    logins_count INTEGER,
    is_online BOOLEAN DEFAULT false
  )`;

const REGISTER_QUERY = `INSERT INTO users (username, password, login_time, last_update_time, last_login, user_ip, user_agent, register_time, logins_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const USER_FROM_ID_QUERY = `SELECT * FROM users WHERE id = ?`;

const USER_FROM_USERNAME_QUERY = `SELECT * FROM users WHERE username = ?`;

const DELETE_USER_QUERY = `DELETE FROM users WHERE id = ?`;

const SET_USER_ONLINE_QUERY = `UPDATE users SET is_online = 1, login_time = ?, last_login = ?, last_update_time = ?, user_ip = ?, logins_count = logins_count + 1 WHERE id = ?`

const SET_USER_OFFLINE_QUERY = `UPDATE users SET is_online = 0 WHERE id = ?`

const LOGGEDIN_USERS_QUERY = `SELECT * FROM users WHERE is_online = 1`;

 export {
    CREATE_USERS_TABLE_QUERY,
    REGISTER_QUERY,
    USER_FROM_ID_QUERY,
    USER_FROM_USERNAME_QUERY,
    DELETE_USER_QUERY,
    SET_USER_ONLINE_QUERY,
    SET_USER_OFFLINE_QUERY,
    LOGGEDIN_USERS_QUERY
 }