import { getJson } from 'serpapi';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchQuery, location } = await request.json();

    const params = {
      api_key: process.env.SERPAPI_KEY,
      engine: 'google',
      q: searchQuery,
      location: location,
      google_domain: 'google.com',
      gl: 'us',
      hl: 'en',
      num: 20
    };

    const response = await getJson(params);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}
