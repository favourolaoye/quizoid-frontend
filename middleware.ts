import { NextResponse } from "next/server"

export default function middleware(request: any) {
    const token = request.cookies.get('token')?.value;
    console.log(token);

    if(!token) {   
        return NextResponse.redirect( new URL('/auth/admin/login', request.url)); 
    }
    return NextResponse.next();
  
}
export const config = {
 matcher: ['/dashboard']
}