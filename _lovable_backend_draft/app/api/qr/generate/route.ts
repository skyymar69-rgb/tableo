import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request) {
    try {
        const menu = await request.json();
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(menu));
        return NextResponse.json({ qrCodeDataUrl });
    } catch (error) {
        return NextResponse.error();
    }
}