import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const range = searchParams.get('range') || 'week';
        const restaurantId = searchParams.get('restaurantId');

        if (!restaurantId) {
            return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 });
        }

        const now = new Date();
        let startDate = new Date();
        switch (range) {
            case 'day':
                startDate.setDate(now.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            default:
                startDate.setDate(now.getDate() - 7);
        }

        const analyticsData = [
            { date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), views: 1240, orders: 85, revenue: 4250 },
            { date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), views: 1450, orders: 98, revenue: 4890 },
            { date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), views: 1320, orders: 92, revenue: 4560 },
            { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), views: 1680, orders: 115, revenue: 5750 },
            { date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), views: 1890, orders: 128, revenue: 6450 },
            { date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), views: 2120, orders: 145, revenue: 7200 },
            { date: now, views: 2450, orders: 167, revenue: 8350 },
        ];

        const totalViews = analyticsData.reduce((sum, a) => sum + a.views, 0);
        const totalOrders = analyticsData.reduce((sum, a) => sum + a.orders, 0);
        const totalRevenue = analyticsData.reduce((sum, a) => sum + a.revenue, 0);
        const conversionRate = totalViews > 0 ? ((totalOrders / totalViews) * 100).toFixed(2) : '0';

        return NextResponse.json({
            success: true,
            data: analyticsData,
            summary: {
                totalViews,
                totalOrders,
                totalRevenue: totalRevenue.toFixed(2),
                conversionRate: conversionRate + '%',
                averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0',
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Analytics fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}