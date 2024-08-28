import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const response = await axios.post('http://localhost:4050/auth/signin', { username, password });
    console.log('정상진행', response.data);
    
    return NextResponse.json({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    }, { status: 200 });//NextResponse.json(response.data.id, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}