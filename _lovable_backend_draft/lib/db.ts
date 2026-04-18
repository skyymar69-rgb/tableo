// lib/db.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

const disconnectFromDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log('Disconnected from the database.');
    } catch (error) {
        console.error('Error during disconnection:', error);
    }
};

export { prisma, connectToDatabase, disconnectFromDatabase };