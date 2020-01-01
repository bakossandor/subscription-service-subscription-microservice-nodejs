const { Pool } = require('pg');
const pool = new Pool();

async function dbAddSubscriber(uri, first_name, last_name, email) {
  const queryString = 'INSERT INTO subscribers (newsletter_id, first_name, last_name, email) VALUES ((SELECT id FROM newsletters WHERE uri = $1), $2, $3, $4)';
  await pool.query(queryString, [...arguments]);
}

async function dbRemoveSubscriber(newsletterId, email) {
  const queryString = 'DELETE FROM subscribers WHERE (newsletter_id = (SELECT id FROM newsletters WHERE uri = $1)) AND (email = $2)';
  await pool.query(queryString, [...arguments]);
}

module.exports = {
  dbAddSubscriber,
  dbRemoveSubscriber
};
