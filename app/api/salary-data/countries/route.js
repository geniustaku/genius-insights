// app/api/salary-data/countries/route.js
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT 
        country_code as code, 
        country_name as name 
      FROM country_data 
      WHERE is_active = 1 
      ORDER BY country_name ASC
    `;
    
    const rows = await executeQuery(query);
    
    // If database isn't set up yet, return default data
    if (!rows || rows.length === 0) {
      return Response.json({
        countries: [
          { code: 'south-africa', name: 'South Africa' },
          { code: 'nigeria', name: 'Nigeria' },
          { code: 'kenya', name: 'Kenya' },
          { code: 'ghana', name: 'Ghana' },
          { code: 'egypt', name: 'Egypt' },
          { code: 'tanzania', name: 'Tanzania' },
          { code: 'ethiopia', name: 'Ethiopia' },
          { code: 'uganda', name: 'Uganda' },
          { code: 'morocco', name: 'Morocco' },
          { code: 'rwanda', name: 'Rwanda' }
        ]
      });
    }
    
    return Response.json({ countries: rows });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to load country data' },
      { status: 500 }
    );
  }
}