import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:7890/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser' + Date.now(),
        password: 'testpass123',
        email: 'test@test.com',
        lastNewsReceived: 'news_000'
      })
    });

    const data = await response.json();
    
    return NextResponse.json({
      status: response.status,
      data,
      // Show error details if available
      error: (data as any).error || null,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

