// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'
// import { type CookieOptions, createServerClient,  } from '@supabase/ssr'
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { NextRequest } from 'next/server';
// import { Database } from '@/lib/types/supabase';

// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url);
//   const isAuth  
//   const code = requestUrl.searchParams.get('code');

//   if (code) {
//       const supabase = createRouteHandlerClient<Database>({ cookies });
//       await supabase.auth.exchangeCodeForSession(code);
//   }
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}`)
  


//   // return the user to an error page with instructions
//  // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}/auth/auth-code-error`)
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
export async function GET(request: Request) {
	// const requestUrl = new URL(request.url);
	// const isAuth = cookies().get("supabase-auth-token");

	// if (isAuth) {
	// 	return NextResponse.redirect(requestUrl.origin);
	// }

	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	// const next = searchParams.get("next") ?? "/";

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					get(name: string) {
						return cookieStore.get(name)?.value;
					},
					set(name: string, value: string, options: CookieOptions) {
						cookieStore.set({ name, value, ...options });
					},
					remove(name: string, options: CookieOptions) {
						cookieStore.set({ name, value: "", ...options });
					},
				},
			}
		);

		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
		console.log(process.env.NEXT_PUBLIC_LITTER_URL)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}`)

			// return NextResponse.redirect(requestUrl.origin + next);
		} else {
			console.log("error: ", error);
		}
	} else {
		console.log("no code?");
	}

	// return the user to an error page with instructions
	// return NextResponse.redirect(requestUrl.origin + "/auth/error");
 return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}/auth/auth-code-error`)

}