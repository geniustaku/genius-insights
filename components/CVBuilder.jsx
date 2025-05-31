'use client'
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: ''
    },
    experience: [
      {
        id: 1,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }
    ],
    skills: [],
    languages: [],
    certifications: [],
    projects: []
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cvPreviewRef = useRef(null);

  const templates = [
    { id: 'modern', name: 'Modern Professional', color: 'indigo' },
    { id: 'creative', name: 'Creative Designer', color: 'purple' },
    { id: 'corporate', name: 'Corporate Executive', color: 'gray' },
    { id: 'tech', name: 'Tech Professional', color: 'green' },
    { id: 'minimal', name: 'Minimal Clean', color: 'blue' }
  ];

  const steps = [
    { id: 1, name: 'Template', icon: '🎨' },
    { id: 2, name: 'Personal Info', icon: '👤' },
    { id: 3, name: 'Experience', icon: '💼' },
    { id: 4, name: 'Education', icon: '🎓' },
    { id: 5, name: 'Skills', icon: '⚡' },
    { id: 6, name: 'Preview', icon: '👁️' }
  ];

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newId = Math.max(...cvData.experience.map(exp => exp.id)) + 1;
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: newId,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newId = Math.max(...cvData.education.map(edu => edu.id)) + 1;
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: newId,
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    if (skill.trim() && !cvData.skills.includes(skill.trim())) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const element = cvPreviewRef.current;
      if (!element) {
        throw new Error('CV preview element not found');
      }

      // Wait a moment to ensure all content is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create canvas with safe options
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: false,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ignoreElements: (element) => {
          // Ignore any problematic elements
          return element.tagName === 'SCRIPT' || 
                 element.tagName === 'STYLE' ||
                 element.classList?.contains('ignore-pdf');
        },
        onclone: (clonedDoc, element) => {
          // Clean up the cloned document
          const clonedElement = clonedDoc.querySelector('[data-html2canvas-ignore]') || element;
          
          // Remove any external stylesheets that might cause CORS issues
          const links = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          links.forEach(link => {
            if (link.href && !link.href.startsWith(window.location.origin)) {
              link.remove();
            }
          });
          
          // Apply inline styles to avoid CSS parsing issues
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach(el => {
            // Remove any classes that might cause issues
            if (el.className && typeof el.className === 'string') {
              const classList = el.className.split(' ');
              const filteredClasses = classList.filter(cls => 
                !cls.includes('gradient') && 
                !cls.includes('from-') && 
                !cls.includes('to-') && 
                !cls.includes('via-')
              );
              el.className = filteredClasses.join(' ');
            }
            
            // Ensure text is visible
            if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'SPAN') {
              if (!el.style.color) {
                el.style.color = '#000000';
              }
            }
          });
          
          return clonedElement;
        }
      });
      
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add margin
      const marginX = 10;
      const marginY = 10;
      
      let heightLeft = imgHeight;
      let position = marginY;
      
      // Add first page
      pdf.addImage(imgData, 'JPEG', marginX, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - 2 * marginY);
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + marginY;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', marginX, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 2 * marginY);
      }
      
      // Generate filename
      const fileName = `${(cvData.personalInfo.fullName || 'MyCV').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
      
      // Save PDF
      pdf.save(fileName);
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Unable to generate PDF. ';
      
      if (error.message?.includes('CORS')) {
        errorMessage += 'Please ensure you have a stable internet connection and try again.';
      } else if (error.message?.includes('403')) {
        errorMessage += 'There was a permission issue. Please refresh the page and try again.';
      } else if (error.message?.includes('Network')) {
        errorMessage += 'Network error. Please check your connection and try again.';
      } else {
        errorMessage += 'Please try again in a few moments.';
      }
      
      alert(errorMessage);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your CV Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-full h-32 bg-gradient-to-br from-${template.color}-400 to-${template.color}-600 rounded-lg mb-4 flex items-center justify-center`}>
                    <span className="text-white text-4xl">📄</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600">Professional and clean design</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={cvData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="+27 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={cvData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="Cape Town, South Africa"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={cvData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={cvData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
              <textarea
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                rows={4}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                placeholder="Brief professional summary highlighting your key skills and experience..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
              <button
                onClick={addExperience}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Add Experience</span>
              </button>
            </div>
            
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Experience #{index + 1}</h4>
                  {cvData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Software Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Cape Town, SA"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">I currently work here</span>
                    </label>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              <button
                onClick={addEducation}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Add Education</span>
              </button>
            </div>
            
            {cvData.education.map((edu, index) => (
              <div key={edu.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Education #{index + 1}</h4>
                  {cvData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">School/University *</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="University of Cape Town"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="Cape Town, SA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Date</label>
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">GPA/Grade (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                      placeholder="3.8/4.0 or First Class Honours"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills & Additional Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {cvData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="skillInput"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-black bg-white"
                  placeholder="Add a skill (e.g., JavaScript, Project Management)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('skillInput');
                    addSkill(input.value);
                    input.value = '';
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">CV Preview</h3>
              <button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <span>📄</span>
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
            
            <div ref={cvPreviewRef} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <CVPreview data={cvData} template={selectedTemplate} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 overflow-x-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-300 min-w-0 flex-1 ${
              currentStep === step.id
                ? 'text-indigo-600'
                : currentStep > step.id
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                currentStep === step.id
                  ? 'bg-indigo-100 border-2 border-indigo-600'
                  : currentStep > step.id
                  ? 'bg-green-100 border-2 border-green-600'
                  : 'bg-gray-100 border-2 border-gray-300'
              }`}
            >
              {currentStep > step.id ? '✅' : step.icon}
            </div>
            <span className="text-sm font-medium text-center">{step.name}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        <span className="text-sm text-gray-500">
          Step {currentStep} of {steps.length}
        </span>

        <button
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

// CV Preview Component
function CVPreview({ data, template }) {
  const templateColors = {
    modern: { bg: '#4f46e5', text: '#4f46e5', accent: '#e0e7ff' },
    creative: { bg: '#9333ea', text: '#9333ea', accent: '#f3e8ff' },
    corporate: { bg: '#4b5563', text: '#4b5563', accent: '#f9fafb' },
    tech: { bg: '#16a34a', text: '#16a34a', accent: '#f0fdf4' },
    minimal: { bg: '#2563eb', text: '#2563eb', accent: '#eff6ff' }
  };

  const colorScheme = templateColors[template] || templateColors.modern;

  return (
    <div className="font-sans text-black leading-relaxed bg-white">
      {/* Header */}
      <div style={{ backgroundColor: colorScheme.bg }} className="text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-2 text-white">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white">
          {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.website || data.personalInfo.linkedin) && (
          <div className="flex flex-wrap gap-4 text-sm mt-2 text-white">
            {data.personalInfo.website && <span>🌐 {data.personalInfo.website}</span>}
            {data.personalInfo.linkedin && <span>💼 {data.personalInfo.linkedin}</span>}
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <div>
            <h2 style={{ color: colorScheme.text, borderBottomColor: colorScheme.accent }} className="text-xl font-bold mb-3 border-b-2 pb-1">
              Professional Summary
            </h2>
            <p className="text-black leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience[0].jobTitle && (
          <div>
            <h2 style={{ color: colorScheme.text, borderBottomColor: colorScheme.accent }} className="text-xl font-bold mb-3 border-b-2 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                exp.jobTitle && (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-black">{exp.jobTitle}</h3>
                        <p style={{ color: colorScheme.text }} className="font-medium">{exp.company}</p>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {exp.startDate && (
                          <p>
                            {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {' '}
                            {exp.current ? 'Present' : exp.endDate ? 
                              new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                          </p>
                        )}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-black text-sm leading-relaxed ml-0">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education[0].degree && (
          <div>
            <h2 style={{ color: colorScheme.text, borderBottomColor: colorScheme.accent }} className="text-xl font-bold mb-3 border-b-2 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                edu.degree && (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-black">{edu.degree}</h3>
                        <p style={{ color: colorScheme.text }} className="font-medium">{edu.school}</p>
                        {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                        {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                      </div>
                      {edu.graduationDate && (
                        <div className="text-right text-sm text-gray-600">
                          <p>{new Date(edu.graduationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 style={{ color: colorScheme.text, borderBottomColor: colorScheme.accent }} className="text-xl font-bold mb-3 border-b-2 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: colorScheme.accent, color: colorScheme.text }}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}