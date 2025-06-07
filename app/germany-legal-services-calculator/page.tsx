'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GermanyLegalServicesCalculator() {
  type LegalServiceType = 'arbeitsrecht' | 'personenschaden' | 'unternehmensrecht' | 'familienrecht' | 'mietrecht' | 'strafrecht' | 'erbrecht' | 'sozialrecht' | 'verkehrsrecht' | 'steuerrecht';
  type LawyerType = 'fachanwalt' | 'rechtsanwalt' | 'spezialist' | 'kanzlei' | 'notar';
  type CaseComplexity = 'einfach' | 'mittel' | 'komplex' | 'sehr-komplex';

  const [formData, setFormData] = useState({
    serviceType: 'arbeitsrecht' as LegalServiceType,
    lawyerType: 'fachanwalt' as LawyerType,
    caseComplexity: 'mittel' as CaseComplexity,
    disputeValue: 10000,
    consultationHours: 2,
    courtProceeding: false,
    urgentCase: false,
    city: 'berlin',
    clientType: 'privat',
    insuranceCover: false
  });

  const [results, setResults] = useState({
    consultationCost: 0,
    totalLegalCosts: 0,
    courtCosts: 0,
    lawyerFees: 0,
    additionalCosts: 0,
    insuranceCoverage: 0,
    finalCost: 0,
    recommendation: '',
    nextSteps: '',
    timeEstimate: ''
  });

  const [comparisonResults, setComparisonResults] = useState<any[]>([]);

  const legalServices = {
    'arbeitsrecht': 'Arbeitsrecht (Employment Law)',
    'personenschaden': 'Personenschäden (Personal Injury)',
    'unternehmensrecht': 'Unternehmensrecht (Business Law)',
    'familienrecht': 'Familienrecht (Family Law)',
    'mietrecht': 'Mietrecht (Tenancy Law)',
    'strafrecht': 'Strafrecht (Criminal Law)',
    'erbrecht': 'Erbrecht (Inheritance Law)',
    'sozialrecht': 'Sozialrecht (Social Security Law)',
    'verkehrsrecht': 'Verkehrsrecht (Traffic Law)',
    'steuerrecht': 'Steuerrecht (Tax Law)'
  };

  const lawyerTypes = {
    'fachanwalt': 'Fachanwalt (Specialist Lawyer)',
    'rechtsanwalt': 'Rechtsanwalt (General Lawyer)',
    'spezialist': 'Spezialist (Subject Expert)',
    'kanzlei': 'Große Kanzlei (Large Firm)',
    'notar': 'Notar (Notary)'
  };

  const complexityLevels = {
    'einfach': 'Einfach (Simple)',
    'mittel': 'Mittel (Medium)',
    'komplex': 'Komplex (Complex)',
    'sehr-komplex': 'Sehr Komplex (Very Complex)'
  };

  const germanCities = {
    'berlin': 'Berlin',
    'munich': 'München',
    'hamburg': 'Hamburg',
    'cologne': 'Köln',
    'frankfurt': 'Frankfurt am Main',
    'stuttgart': 'Stuttgart',
    'dusseldorf': 'Düsseldorf',
    'dortmund': 'Dortmund',
    'essen': 'Essen',
    'leipzig': 'Leipzig'
  };

  const legalScenarios = [
    {
      name: 'Kündigung durch Arbeitgeber',
      description: 'Unrechtmäßige Kündigung - Klage auf Weiterbeschäftigung',
      estimatedCost: '€2,500 - €8,000',
      type: 'arbeitsrecht',
      successRate: '75%'
    },
    {
      name: 'Verkehrsunfall mit Personenschaden',
      description: 'Schadensersatzforderung nach schwerem Autounfall',
      estimatedCost: '€3,000 - €15,000',
      type: 'personenschaden',
      successRate: '85%'
    },
    {
      name: 'Unternehmensgründung',
      description: 'GmbH Gründung mit Gesellschaftsvertrag',
      estimatedCost: '€1,500 - €5,000',
      type: 'unternehmensrecht',
      successRate: '95%'
    },
    {
      name: 'Scheidungsverfahren',
      description: 'Einvernehmliche Scheidung mit Vermögensaufteilung',
      estimatedCost: '€2,000 - €6,000',
      type: 'familienrecht',
      successRate: '90%'
    },
    {
      name: 'Mieterhöhung anfechten',
      description: 'Widerspruch gegen unrechtmäßige Mieterhöhung',
      estimatedCost: '€800 - €3,000',
      type: 'mietrecht',
      successRate: '70%'
    },
    {
      name: 'Strafverteidigung',
      description: 'Verteidigung in Strafverfahren wegen Betrugsvorwurf',
      estimatedCost: '€5,000 - €25,000',
      type: 'strafrecht',
      successRate: '80%'
    }
  ];

  const calculateLegalCosts = () => {
    const { serviceType, lawyerType, caseComplexity, disputeValue, consultationHours, courtProceeding, urgentCase, city, clientType, insuranceCover } = formData;

    // Base hourly rates for different lawyer types (€ per hour)
    const hourlyRates = {
      'fachanwalt': 280,
      'rechtsanwalt': 220,
      'spezialist': 320,
      'kanzlei': 450,
      'notar': 180
    };

    // Service type multipliers
    const serviceMultipliers = {
      'arbeitsrecht': 1.1,
      'personenschaden': 1.3,
      'unternehmensrecht': 1.4,
      'familienrecht': 1.0,
      'mietrecht': 0.9,
      'strafrecht': 1.5,
      'erbrecht': 1.2,
      'sozialrecht': 0.8,
      'verkehrsrecht': 1.1,
      'steuerrecht': 1.3
    };

    // Complexity multipliers
    const complexityMultipliers = {
      'einfach': 0.8,
      'mittel': 1.0,
      'komplex': 1.4,
      'sehr-komplex': 2.0
    };

    // City cost factors
    const cityFactors = {
      'berlin': 1.1,
      'munich': 1.3,
      'hamburg': 1.2,
      'cologne': 1.1,
      'frankfurt': 1.4,
      'stuttgart': 1.2,
      'dusseldorf': 1.2,
      'dortmund': 1.0,
      'essen': 0.9,
      'leipzig': 0.8
    };

    const baseHourlyRate = hourlyRates[lawyerType];
    const serviceMultiplier = serviceMultipliers[serviceType];
    const complexityMultiplier = complexityMultipliers[caseComplexity];
    const cityFactor = cityFactors[city as keyof typeof cityFactors] || 1.0;
    const urgencyFactor = urgentCase ? 1.3 : 1.0;

    // Calculate consultation costs
    const consultationRate = baseHourlyRate * serviceMultiplier * cityFactor;
    const consultationCost = consultationRate * consultationHours;

    // Calculate RVG fees based on dispute value (German lawyer fees regulation)
    let lawyerFees = 0;
    if (disputeValue <= 2000) {
      lawyerFees = 467;
    } else if (disputeValue <= 5000) {
      lawyerFees = 721;
    } else if (disputeValue <= 10000) {
      lawyerFees = 1005;
    } else if (disputeValue <= 25000) {
      lawyerFees = 1456;
    } else if (disputeValue <= 50000) {
      lawyerFees = 1963;
    } else if (disputeValue <= 100000) {
      lawyerFees = 2652;
    } else {
      lawyerFees = disputeValue * 0.03; // 3% for higher values
    }

    // Apply multipliers to lawyer fees
    lawyerFees *= complexityMultiplier * urgencyFactor;

    // Court costs calculation
    let courtCosts = 0;
    if (courtProceeding) {
      if (disputeValue <= 2000) {
        courtCosts = 58;
      } else if (disputeValue <= 5000) {
        courtCosts = 118;
      } else if (disputeValue <= 10000) {
        courtCosts = 178;
      } else if (disputeValue <= 25000) {
        courtCosts = 298;
      } else if (disputeValue <= 50000) {
        courtCosts = 478;
      } else {
        courtCosts = disputeValue * 0.01; // 1% for higher values
      }
    }

    // Additional costs (expert witnesses, translations, etc.)
    const additionalCosts = courtProceeding ? lawyerFees * 0.2 : lawyerFees * 0.1;

    // Insurance coverage calculation
    let insuranceCoverage = 0;
    if (insuranceCover) {
      insuranceCoverage = Math.min((lawyerFees + courtCosts + additionalCosts) * 0.8, 100000);
    }

    const totalLegalCosts = consultationCost + lawyerFees + courtCosts + additionalCosts;
    const finalCost = Math.max(0, totalLegalCosts - insuranceCoverage);

    // Generate recommendations
    let recommendation = '';
    let nextSteps = '';
    let timeEstimate = '';

    switch(serviceType) {
      case 'arbeitsrecht':
        recommendation = 'Für Arbeitsrecht empfiehlt sich ein Fachanwalt für Arbeitsrecht. Prüfen Sie zunächst Ihre Rechtsschutzversicherung.';
        nextSteps = '1. Dokumente sammeln 2. Fristen prüfen 3. Erstberatung vereinbaren 4. Ggf. außergerichtliche Einigung versuchen';
        timeEstimate = courtProceeding ? '6-18 Monate' : '2-6 Monate';
        break;
      case 'personenschaden':
        recommendation = 'Bei Personenschäden sollten Sie schnell handeln. Dokumentieren Sie alle Schäden und Behandlungskosten.';
        nextSteps = '1. Ärztliche Behandlung sichern 2. Schäden dokumentieren 3. Rechtsanwalt beauftragen 4. Schadensersatz geltend machen';
        timeEstimate = courtProceeding ? '12-36 Monate' : '3-12 Monate';
        break;
      case 'unternehmensrecht':
        recommendation = 'Für Unternehmensgründungen ist eine sorgfältige rechtliche Beratung essentiell für den späteren Erfolg.';
        nextSteps = '1. Rechtsform wählen 2. Gesellschaftsvertrag erstellen 3. Handelsregister-Anmeldung 4. Gewerbeanmeldung';
        timeEstimate = '1-3 Monate';
        break;
      case 'familienrecht':
        recommendation = 'Familienrechtliche Angelegenheiten erfordern Fingerspitzengefühl. Eine Mediation kann oft hilfreich sein.';
        nextSteps = '1. Trennungsjahr einhalten 2. Vermögen auflisten 3. Kindeswohl berücksichtigen 4. Scheidungsantrag stellen';
        timeEstimate = courtProceeding ? '8-24 Monate' : '3-8 Monate';
        break;
      default:
        recommendation = 'Lassen Sie sich von einem spezialisierten Rechtsanwalt beraten, um Ihre Erfolgsaussichten zu bewerten.';
        nextSteps = '1. Sachverhalt prüfen 2. Rechtslage klären 3. Strategie entwickeln 4. Rechtsmittel einsetzen';
        timeEstimate = courtProceeding ? '6-18 Monate' : '2-6 Monate';
    }

    setResults({
      consultationCost: Math.round(consultationCost),
      totalLegalCosts: Math.round(totalLegalCosts),
      courtCosts: Math.round(courtCosts),
      lawyerFees: Math.round(lawyerFees),
      additionalCosts: Math.round(additionalCosts),
      insuranceCoverage: Math.round(insuranceCoverage),
      finalCost: Math.round(finalCost),
      recommendation,
      nextSteps,
      timeEstimate
    });

    generateComparison();
  };

  const generateComparison = () => {
    const alternatives = Object.entries(lawyerTypes).map(([key, name]) => {
      if (key === formData.lawyerType) return null;

      const hourlyRates = {
        'fachanwalt': 280,
        'rechtsanwalt': 220,
        'spezialist': 320,
        'kanzlei': 450,
        'notar': 180
      };

      const baseRate = hourlyRates[key as LawyerType];
      const currentRate = hourlyRates[formData.lawyerType];
      const costDifference = (baseRate - currentRate) * formData.consultationHours;

      return {
        lawyerType: name,
        hourlyRate: baseRate,
        costDifference: Math.round(costDifference),
        estimatedTotal: Math.round(results.finalCost + costDifference),
        advantages: getLawyerAdvantages(key as LawyerType, formData.serviceType),
        rating: Math.random() * 1.5 + 3.5
      };
    }).filter(Boolean);

    setComparisonResults(alternatives.sort((a, b) => (a?.estimatedTotal || 0) - (b?.estimatedTotal || 0)));
  };

  const getLawyerAdvantages = (lawyerType: LawyerType, serviceType: LegalServiceType): string[] => {
    const advantages: { [key: string]: { [key: string]: string[] } } = {
      'fachanwalt': {
        'arbeitsrecht': ['Spezialisiert auf Arbeitsrecht', 'Hohe Erfolgsquote', 'Aktuelle Rechtsprechung'],
        'personenschaden': ['Erfahrung mit Versicherungen', 'Medizinische Kenntnisse', 'Schadensberechnung'],
        'unternehmensrecht': ['Gesellschaftsrecht-Expertise', 'Steuerliche Aspekte', 'Vertragsgestaltung']
      },
      'rechtsanwalt': {
        'arbeitsrecht': ['Gutes Preis-Leistungs-Verhältnis', 'Flexible Terminvergabe', 'Persönliche Betreuung'],
        'personenschaden': ['Lokale Kenntnisse', 'Günstige Konditionen', 'Schnelle Bearbeitung'],
        'unternehmensrecht': ['Umfassende Beratung', 'Moderate Kosten', 'Langfristige Betreuung']
      },
      'spezialist': {
        'arbeitsrecht': ['Höchste Expertise', 'Komplexe Fälle', 'Präzedenzfälle'],
        'personenschaden': ['Schwere Verletzungen', 'Internationale Fälle', 'Maximale Entschädigung'],
        'unternehmensrecht': ['M&A Transaktionen', 'Börsenrecht', 'Compliance']
      }
    };

    return advantages[lawyerType]?.[serviceType] || ['Professionelle Beratung', 'Rechtssicherheit', 'Interessenvertretung'];
  };

  const simulateScenario = (scenario: any) => {
    const impact = calculateScenarioImpact(scenario, formData);
    alert(`Rechtsszenario: ${scenario.name}\n\nBeschreibung: ${scenario.description}\n\nVoraussichtliche Kosten: ${scenario.estimatedCost}\nErfolgsaussichten: ${scenario.successRate}\n\n${impact}`);
  };

  const calculateScenarioImpact = (scenario: any, currentFormData: typeof formData) => {
    switch(scenario.name) {
      case 'Kündigung durch Arbeitgeber':
        return `Mit Ihrem gewählten ${lawyerTypes[currentFormData.lawyerType]} haben Sie gute Chancen. Bei erfolgreicher Klage: Weiterbeschäftigung + Gehaltsnachzahlung. Alternativ: Abfindung von 0,5-1,0 Monatsgehältern pro Beschäftigungsjahr.`;
      case 'Verkehrsunfall mit Personenschaden':
        return `Personenschäden erfordern schnelles Handeln. Ihr Anwalt wird Schmerzensgeld, Verdienstausfall und Behandlungskosten geltend machen. Bei schweren Verletzungen: €10,000-€100,000+ möglich.`;
      case 'Unternehmensgründung':
        return `Eine GmbH-Gründung dauert 2-6 Wochen. Ihr Anwalt erstellt den Gesellschaftsvertrag, übernimmt die Handelsregister-Anmeldung und berät zu Haftungsfragen. Stammkapital: €25,000 erforderlich.`;
      case 'Scheidungsverfahren':
        return `Bei einvernehmlicher Scheidung genügt ein Anwalt. Ihr Rechtsbeistand regelt Vermögensaufteilung, Unterhalt und Sorgerecht. Versorgungsausgleich wird automatisch durchgeführt.`;
      case 'Mieterhöhung anfechten':
        return `Mieterhöhungen müssen begründet und ortsüblich sein. Ihr Anwalt prüft die Rechtmäßigkeit anhand des Mietspiegels. Bei Erfolg: Mieterhöhung unwirksam + Kostenerstattung.`;
      case 'Strafverteidigung':
        return `In Strafverfahren ist schnelle anwaltliche Vertretung entscheidend. Ihr Verteidiger prüft Beweise, führt Verhöre und entwickelt die Verteidigungsstrategie. Schweigen Sie bis zur Anwaltskonsultation!`;
      default:
        return 'Ihr Rechtsanwalt wird den Fall individuell bewerten und eine maßgeschneiderte Strategie entwickeln.';
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    calculateLegalCosts();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-yellow-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-yellow-600 rounded-b-3xl">
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
              <span className="text-white/90 font-medium text-sm tracking-wide">🇩🇪 Deutschland Rechtsberatung</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Anwalt Kostenrechner <br/>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Deutschland 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Berechnen Sie Anwaltskosten für Arbeitsrecht, Personenschäden, Unternehmensrecht und mehr. 
              Fachanwalt finden • RVG Gebühren • Kostenvoranschlag
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Anwaltskosten Rechner Deutschland</h2>
            <p className="text-gray-600 text-lg">Berechnen Sie Rechtsanwaltsgebühren nach RVG • Kostenvoranschlag • Fachanwalt Vergleich</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechtsgebiet
                </label>
                <select 
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                >
                  {Object.entries(legalServices).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anwaltstyp
                  </label>
                  <select 
                    value={formData.lawyerType}
                    onChange={(e) => handleInputChange('lawyerType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(lawyerTypes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fallkomplexität
                  </label>
                  <select 
                    value={formData.caseComplexity}
                    onChange={(e) => handleInputChange('caseComplexity', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(complexityLevels).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Streitwert (€)
                  </label>
                  <input
                    type="number"
                    value={formData.disputeValue}
                    onChange={(e) => handleInputChange('disputeValue', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beratungsstunden
                  </label>
                  <input
                    type="number"
                    value={formData.consultationHours}
                    onChange={(e) => handleInputChange('consultationHours', parseFloat(e.target.value) || 0)}
                    min="0.5"
                    max="20"
                    step="0.5"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stadt
                  </label>
                  <select 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    {Object.entries(germanCities).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mandantentyp
                  </label>
                  <select 
                    value={formData.clientType}
                    onChange={(e) => handleInputChange('clientType', e.target.value)}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-black"
                  >
                    <option value="privat">Privatperson</option>
                    <option value="unternehmen">Unternehmen</option>
                    <option value="freiberufler">Freiberufler</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="courtProceeding"
                    checked={formData.courtProceeding}
                    onChange={(e) => handleInputChange('courtProceeding', e.target.checked)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="courtProceeding" className="ml-3 text-sm font-medium text-gray-700">
                    Gerichtsverfahren erforderlich
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgentCase"
                    checked={formData.urgentCase}
                    onChange={(e) => handleInputChange('urgentCase', e.target.checked)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="urgentCase" className="ml-3 text-sm font-medium text-gray-700">
                    Eilfall (Zuschlag 30%)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="insuranceCover"
                    checked={formData.insuranceCover}
                    onChange={(e) => handleInputChange('insuranceCover', e.target.checked)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="insuranceCover" className="ml-3 text-sm font-medium text-gray-700">
                    Rechtsschutzversicherung vorhanden
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kostenvoranschlag</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Rechtsgebiet:</span>
                  <span className="font-semibold text-black">{legalServices[formData.serviceType]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Anwalt:</span>
                  <span className="font-semibold text-black">{lawyerTypes[formData.lawyerType]}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Streitwert:</span>
                  <span className="font-semibold text-black">€{formData.disputeValue.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Erstberatung:</span>
                  <span className="font-semibold text-blue-600">€{results.consultationCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Anwaltsgebühren (RVG):</span>
                  <span className="font-semibold text-green-600">€{results.lawyerFees.toLocaleString()}</span>
                </div>

                {formData.courtProceeding && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Gerichtskosten:</span>
                    <span className="font-semibold text-orange-600">€{results.courtCosts.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Nebenkosten:</span>
                  <span className="font-semibold text-purple-600">€{results.additionalCosts.toLocaleString()}</span>
                </div>

                {formData.insuranceCover && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Versicherungsdeckung:</span>
                    <span className="font-semibold text-green-600">-€{results.insuranceCoverage.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between py-3 bg-red-50 rounded-lg px-4">
                  <span className="text-gray-900 font-medium">Ihre Kosten:</span>
                  <span className="font-bold text-red-600 text-xl">€{results.finalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Empfehlung</h4>
                <p className="text-sm text-green-800">{results.recommendation}</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Nächste Schritte</h4>
                <p className="text-sm text-blue-800">{results.nextSteps}</p>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Zeitrahmen</h4>
                <p className="text-sm text-orange-800">Voraussichtliche Verfahrensdauer: {results.timeEstimate}</p>
              </div>
            </div>
          </div>

          {/* Lawyer Type Comparison */}
          {comparisonResults.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Anwaltstypen Vergleich</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonResults.slice(0, 6).map((comparison, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 mb-2">{comparison.lawyerType}</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">€{comparison.hourlyRate}/Stunde</div>
                    <div className="text-sm text-blue-600 mb-3">
                      Gesamtkosten: €{comparison.estimatedTotal.toLocaleString()}
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(comparison.rating))}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - Math.floor(comparison.rating))}</span>
                      <span className="ml-2 text-sm text-gray-600">{comparison.rating.toFixed(1)}</span>
                    </div>
                    <div className="space-y-1">
                      {comparison.advantages.map((advantage: string, i: number) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {advantage}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Scenarios Simulation */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Rechtsfälle Simulator</h3>
            <p className="text-gray-600 text-center mb-8">Simulieren Sie typische deutsche Rechtsfälle und verstehen Sie Kosten und Erfolgsaussichten</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalScenarios.map((scenario, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{scenario.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-red-600 font-medium">{scenario.estimatedCost}</span>
                    <span className="text-sm text-green-600 font-medium">{scenario.successRate} Erfolg</span>
                  </div>
                  <button
                    onClick={() => simulateScenario(scenario)}
                    className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Fall Simulieren
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* German Legal System Information */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Deutsches Rechtssystem 2025</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Rechtsanwälte</h4>
                <div className="text-2xl font-bold text-red-600 mb-2">165,000+</div>
                <p className="text-sm text-gray-600">Zugelassene Rechtsanwälte in Deutschland</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Fachanwälte</h4>
                <div className="text-2xl font-bold text-yellow-600 mb-2">45,000+</div>
                <p className="text-sm text-gray-600">Spezialisierte Fachanwälte</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">RVG Gebühren</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">€150-500</div>
                <p className="text-sm text-gray-600">Durchschnittliche Erstberatung</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Erfolgsquote</h4>
                <div className="text-2xl font-bold text-green-600 mb-2">75%</div>
                <p className="text-sm text-gray-600">Durchschnittliche Erfolgsquote</p>
              </div>
            </div>
          </div>

          {/* SEO Keywords Section */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Häufige Rechtsbereiche</h4>
            <div className="flex flex-wrap gap-3">
              {[
                'Anwalt für Arbeitsrecht', 'Fachanwalt Personenschäden', 'Rechtsanwalt Unternehmensrecht',
                'Anwalt Familienrecht', 'Mietrecht Beratung', 'Strafverteidiger', 'Anwalt Erbrecht',
                'Sozialrecht Anwalt', 'Verkehrsrecht', 'Steuerrecht Beratung', 'Rechtsschutzversicherung',
                'RVG Gebühren', 'Anwaltskosten berechnen', 'Erstberatung Anwalt'
              ].map((keyword, index) => (
                <span key={index} className="px-3 py-2 bg-white text-gray-700 rounded-lg text-sm border border-gray-200">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}