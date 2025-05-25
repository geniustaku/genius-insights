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
    
    // Comprehensive city data for African countries
    const cityData = {
      'south-africa': [
        { code: 'johannesburg', name: '🏙️ Johannesburg' },
        { code: 'cape-town', name: '🌊 Cape Town' },
        { code: 'durban', name: '🏖️ Durban' },
        { code: 'pretoria', name: '🏛️ Pretoria' },
        { code: 'port-elizabeth', name: '⚓ Port Elizabeth (Gqeberha)' },
        { code: 'bloemfontein', name: '🌸 Bloemfontein' },
        { code: 'east-london', name: '🌅 East London' },
        { code: 'nelspruit', name: '🦁 Nelspruit (Mbombela)' },
        { code: 'kimberley', name: '💎 Kimberley' },
        { code: 'polokwane', name: '🌴 Polokwane' }
      ],
      'nigeria': [
        { code: 'lagos', name: '🌆 Lagos' },
        { code: 'abuja', name: '🏛️ Abuja' },
        { code: 'port-harcourt', name: '⚡ Port Harcourt' },
        { code: 'kano', name: '🕌 Kano' },
        { code: 'ibadan', name: '🏘️ Ibadan' },
        { code: 'benin-city', name: '🎭 Benin City' },
        { code: 'jos', name: '⛰️ Jos' },
        { code: 'kaduna', name: '🚂 Kaduna' }
      ],
      'kenya': [
        { code: 'nairobi', name: '🦒 Nairobi' },
        { code: 'mombasa', name: '🏖️ Mombasa' },
        { code: 'kisumu', name: '🐟 Kisumu' },
        { code: 'nakuru', name: '🦩 Nakuru' },
        { code: 'eldoret', name: '🏃 Eldoret' },
        { code: 'thika', name: '🍍 Thika' },
        { code: 'malindi', name: '🌴 Malindi' }
      ],
      'ghana': [
        { code: 'accra', name: '🏛️ Accra' },
        { code: 'kumasi', name: '👑 Kumasi' },
        { code: 'tamale', name: '🌾 Tamale' },
        { code: 'sekondi-takoradi', name: '⚓ Sekondi-Takoradi' },
        { code: 'cape-coast', name: '🏰 Cape Coast' }
      ],
      'egypt': [
        { code: 'cairo', name: '🕌 Cairo' },
        { code: 'alexandria', name: '🌊 Alexandria' },
        { code: 'giza', name: '🔺 Giza' },
        { code: 'sharm-el-sheikh', name: '🏖️ Sharm El Sheikh' },
        { code: 'luxor', name: '🏛️ Luxor' }
      ],
      'morocco': [
        { code: 'casablanca', name: '🏙️ Casablanca' },
        { code: 'rabat', name: '🏛️ Rabat' },
        { code: 'marrakech', name: '🕌 Marrakech' },
        { code: 'fez', name: '🧵 Fez' },
        { code: 'tangier', name: '⛵ Tangier' }
      ],
      'ethiopia': [
        { code: 'addis-ababa', name: '🏛️ Addis Ababa' },
        { code: 'dire-dawa', name: '🚂 Dire Dawa' },
        { code: 'mekelle', name: '⛰️ Mekelle' },
        { code: 'gondar', name: '🏰 Gondar' },
        { code: 'hawassa', name: '🌊 Hawassa' }
      ],
      'tanzania': [
        { code: 'dar-es-salaam', name: '🏙️ Dar es Salaam' },
        { code: 'dodoma', name: '🏛️ Dodoma' },
        { code: 'arusha', name: '⛰️ Arusha' },
        { code: 'mwanza', name: '🐟 Mwanza' },
        { code: 'zanzibar', name: '🏝️ Zanzibar' }
      ],
      'uganda': [
        { code: 'kampala', name: '🏛️ Kampala' },
        { code: 'gulu', name: '🌾 Gulu' },
        { code: 'mbarara', name: '🐄 Mbarara' },
        { code: 'jinja', name: '🌊 Jinja' },
        { code: 'entebbe', name: '✈️ Entebbe' }
      ],
      'rwanda': [
        { code: 'kigali', name: '🏛️ Kigali' },
        { code: 'butare', name: '🎓 Butare' },
        { code: 'gisenyi', name: '🌊 Gisenyi' },
        { code: 'ruhengeri', name: '🦍 Ruhengeri' }
      ],
      'senegal': [
        { code: 'dakar', name: '🏛️ Dakar' },
        { code: 'thies', name: '🏭 Thiès' },
        { code: 'kaolack', name: '🥜 Kaolack' },
        { code: 'saint-louis', name: '🏰 Saint-Louis' }
      ],
      'ivory-coast': [
        { code: 'abidjan', name: '🏙️ Abidjan' },
        { code: 'yamoussoukro', name: '🏛️ Yamoussoukro' },
        { code: 'bouake', name: '🌾 Bouaké' },
        { code: 'daloa', name: '☕ Daloa' }
      ],
      'botswana': [
        { code: 'gaborone', name: '🏛️ Gaborone' },
        { code: 'francistown', name: '🏭 Francistown' },
        { code: 'molepolole', name: '🌾 Molepolole' },
        { code: 'maun', name: '🐘 Maun' }
      ],
      'mauritius': [
        { code: 'port-louis', name: '🏛️ Port Louis' },
        { code: 'beau-bassin', name: '🌸 Beau Bassin' },
        { code: 'vacoas', name: '🌴 Vacoas' },
        { code: 'curepipe', name: '⛰️ Curepipe' }
      ],
      'tunisia': [
        { code: 'tunis', name: '🏛️ Tunis' },
        { code: 'sfax', name: '🏭 Sfax' },
        { code: 'sousse', name: '🏖️ Sousse' },
        { code: 'kairouan', name: '🕌 Kairouan' }
      ],
      'zambia': [
        { code: 'lusaka', name: '🏛️ Lusaka' },
        { code: 'ndola', name: '⚒️ Ndola' },
        { code: 'kitwe', name: '🏭 Kitwe' },
        { code: 'livingstone', name: '💦 Livingstone' }
      ],
      'zimbabwe': [
        { code: 'harare', name: '🏛️ Harare' },
        { code: 'bulawayo', name: '🏭 Bulawayo' },
        { code: 'chitungwiza', name: '🏘️ Chitungwiza' },
        { code: 'mutare', name: '⛰️ Mutare' }
      ],
      'namibia': [
        { code: 'windhoek', name: '🏛️ Windhoek' },
        { code: 'swakopmund', name: '🏖️ Swakopmund' },
        { code: 'walvis-bay', name: '⚓ Walvis Bay' },
        { code: 'oshakati', name: '🌾 Oshakati' }
      ]
    };

    const cities = cityData[country] || [];
    return Response.json({ cities });
  }