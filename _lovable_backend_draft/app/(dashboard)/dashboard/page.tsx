import React from 'react';
import { Card } from 'antd';

const DashboardPage = () => {
    // Sample data for the KPI cards
    const data = {
        scans: 1200,
        revenue: 35000,
        conversionRate: 5.2,
        customerStats: 500,
    };  

    return (
        <div>
            <h1>Main Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Card title="Scans" style={{ width: 240 }}>
                    <p>{data.scans}</p>
                </Card>
                <Card title="Revenue" style={{ width: 240 }}>
                    <p>${data.revenue}</p>
                </Card>
                <Card title="Conversion Rate" style={{ width: 240 }}>
                    <p>{data.conversionRate}%</p>
                </Card>
                <Card title="Customer Stats" style={{ width: 240 }}>
                    <p>{data.customerStats}</p>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
