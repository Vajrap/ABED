import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:7890/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'vajrap',
        password: 'Love19633'
      })
    });

    const data = await response.json();
    
    return NextResponse.json({
      status: response.status,
      data,
      error: (data as any).error || null,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

