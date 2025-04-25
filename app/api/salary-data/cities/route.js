// app/api/salary-data/cities/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    
    if (!country) {
      return Response.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      );
    }
    
    // Default South African cities
    if (country === 'south-africa') {
      return Response.json({
        cities: [
          { code: 'johannesburg', name: 'Johannesburg' },
          { code: 'cape-town', name: 'Cape Town' },
          { code: 'durban', name: 'Durban' },
          { code: 'pretoria', name: 'Pretoria' },
          { code: 'port-elizabeth', name: 'Port Elizabeth (Gqeberha)' },
          { code: 'bloemfontein', name: 'Bloemfontein' },
          { code: 'east-london', name: 'East London' },
          { code: 'nelspruit', name: 'Nelspruit (Mbombela)' },
          { code: 'kimberley', name: 'Kimberley' },
          { code: 'polokwane', name: 'Polokwane' }
        ]
      });
    } else if (country === 'nigeria') {
      return Response.json({
        cities: [
          { code: 'lagos', name: 'Lagos' },
          { code: 'abuja', name: 'Abuja' },
          { code: 'port-harcourt', name: 'Port Harcourt' },
          { code: 'kano', name: 'Kano' },
          { code: 'ibadan', name: 'Ibadan' }
        ]
      });
    } else if (country === 'kenya') {
      return Response.json({
        cities: [
          { code: 'nairobi', name: 'Nairobi' },
          { code: 'mombasa', name: 'Mombasa' },
          { code: 'kisumu', name: 'Kisumu' },
          { code: 'nakuru', name: 'Nakuru' },
          { code: 'eldoret', name: 'Eldoret' }
        ]
      });
    } else {
      return Response.json({ cities: [] });
    }
  }