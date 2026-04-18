import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, menuItems } = body;

        // Validate input data
        if (!name || !Array.isArray(menuItems)) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Create new restaurant entry
        const restaurant = await prisma.restaurant.create({
            data: {
                name,
            },
        });

        // Saving menu items associated with the restaurant
        for (const item of menuItems) {
            await prisma.menuItem.create({
                data: {
                    name: item.name,
                    price: item.price,
                    restaurantId: restaurant.id,
                },
            });
        }

        return NextResponse.json({ message: 'Restaurant published successfully', restaurant }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to publish restaurant' }, { status: 500 });
    }
}