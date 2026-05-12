import { NextResponse } from 'next/server';
import { getHolidaysForYears } from '@/lib/holidays';

export async function GET() {
  const currentYear = new Date().getFullYear();
  const holidays = getHolidaysForYears([currentYear - 1, currentYear, currentYear + 1, currentYear + 2]);
  
  return NextResponse.json(holidays);
}
