import { PrismaClient } from '@prisma/client'

const prismaErrorCodes = {
  P1001: 'Connection failed',
  P2002: 'Duplicate entry',
  P2025: 'Invalid foreign key'
}

const prisma = new PrismaClient()

const handlePrismaError = (error) => {
  const { code } = error

  return {
    code,
    message: prismaErrorCodes[code] || 'Unknown error'
  }
}

export {
  prisma,
  handlePrismaError
}
