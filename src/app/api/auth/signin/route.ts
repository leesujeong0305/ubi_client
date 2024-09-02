import { NextRequest, NextResponse } from 'next/server';
import api from '../../api'
import axios from 'axios';

export async function POST(request: NextRequest) {
  //try {
  //   const { username, password } = await request.json();
  //   const response = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/auth/signin', { username, password });
  //   console.log('정상진행', response.data);
    
  //   return NextResponse.json({
  //     accessToken: response.data.accessToken,
  //     refreshToken: response.data.refreshToken,
  //   }, { status: 200 });//NextResponse.json(response.data.id, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  //}
}

// export async function GET(request: NextRequest) {
//   try {
//     console.log('wlssss');
    
//     const accessToken = localStorage.getItem('accessToken');
//     const response = await api.get('http://localhost:4050/auth/', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // AccessToken을 헤더에 포함
//     },
//     });
//     console.log('정상진행', response.data);
    
//     return NextResponse.json({
//       accessToken: response.data.accessToken,
//       refreshToken: response.data.refreshToken,
//     }, { status: 200 });//NextResponse.json(response.data.id, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//   }
// }