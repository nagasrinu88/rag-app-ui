import { NextResponse } from 'next/server';
import { generateHMACSignature } from '../../utils/security-utils';

export async function POST(request) {
  try {
    // Parse the request body
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateHMACSignature({
      secretKey: process.env.API_SECRET_KEY,
      timestamp,
      params: {},
      body: { query }
    });
    // console.log("Signature is", signature);
    const response = await fetch(`${process.env.API_BASE_URL}/api/v0/query`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json',
        'x-signature': signature,
        'x-timestamp': timestamp,
      },
      body: JSON.stringify({ query })
      // body: { query }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from the server' },
        { headers: response.headers, status: response.status }
      )
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: response.headers
    })

  } catch (error) {
    console.error('RAG API error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { headers: response.headers, status: 500 }
    )
  }
}