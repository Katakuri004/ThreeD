const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'threed',
  user: 'postgres',
  password: 'kata'
})

async function testConnection() {
  try {
    await client.connect()
    console.log('Successfully connected to PostgreSQL')
    const result = await client.query('SELECT NOW()')
    console.log('Database time:', result.rows[0].now)
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err)
  } finally {
    await client.end()
  }
}

testConnection() 