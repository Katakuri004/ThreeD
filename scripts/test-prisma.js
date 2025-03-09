const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Test connection
    await prisma.$connect()
    console.log('Connected to database')

    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        points: {
          create: {
            amount: 10000
          }
        }
      },
      include: {
        points: true
      }
    })

    console.log('Created test user:', user)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 