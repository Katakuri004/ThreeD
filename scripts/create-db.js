const { Client } = require('pg')

async function createDatabase() {
  // Connect to default postgres database first
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'kata'
  })

  try {
    await client.connect()
    console.log('Connected to PostgreSQL')

    // Check if database exists
    const res = await client.query(
      "SELECT datname FROM pg_database WHERE datname = 'threed'"
    )

    if (res.rowCount === 0) {
      // Create the database
      await client.query('CREATE DATABASE threed')
      console.log('Database "threed" created successfully')
    } else {
      console.log('Database "threed" already exists')
    }
  } catch (err) {
    console.error('Error:', err)
  } finally {
    await client.end()
  }
}

createDatabase() 