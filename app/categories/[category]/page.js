import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/db';
import { executeQuery } from '@/lib/db';
import ArticleCard from '@/components/ArticleCard';
import CategoryResources from '@/components/CategoryResources';

export const revalidate = 3600; // Revalidate this page every hour

// Get category data from database
async function getCategoryBySlug(slug) {
  try {
    const query = `
      SELECT * FROM categories
      WHERE slug = @param0
    `;
    
    const categories = await executeQuery(query, [slug]);
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// Create metadata for the category page
export async function generateMetadata({ params }) {
  const { category } = params;
  
  // Try to fetch the category from the database
  const categoryData = await getCategoryBySlug(category);
  
  // Use database data if available, otherwise fallback to formatting the slug
  const categoryName = categoryData ? categoryData.name : category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${categoryName} Career Guidance | Genius Insights`,
    description: categoryData?.description || `Explore career paths, salary insights, and professional growth opportunities in ${categoryName} in South Africa.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  // Get the category data from database
  const categoryData = await getCategoryBySlug(category);
  
  // If category doesn't exist, show 404
  if (!categoryData) {
    notFound();
  }
  
  // Get articles for this category
  const articles = await getArticlesByCategory(category, 20);
  
  // Format the category name for display (use database value if available)
  const categoryName = categoryData.name;
  
  // Category descriptions - use database description if available, otherwise fallback to mapped descriptions
  const categoryDescriptions = {
    'software-development': 'Explore career paths, salary expectations, and growth opportunities in software development in South Africa. From frontend to backend, mobile to web, discover how to advance your tech career in the local market.',
    'data-science': 'Navigate the world of data science careers in South Africa with insights on roles, required skills, certifications, and ZAR salary trends. Learn how to build a successful career working with data in the South African context.',
    'cloud-computing': 'Discover cloud computing career paths, certification roadmaps, and salary information for the South African market. From cloud architects to DevOps engineers, find your path in this rapidly growing field locally.'
  };
  
  // Get the appropriate description - prioritize database description
  const description = categoryData.description || categoryDescriptions[category] || `Explore career guidance, salary insights, and professional growth opportunities in ${categoryName} tailored for the South African job market.`;
  
  // Icon mapping
  const categoryIcons = {
    'software-development': '💻',
    'data-science': '📊',
    'cloud-computing': '☁️'
  };
  
  // Get the appropriate icon or use a generic one
  const icon = categoryIcons[category] || '📈';
  
  // Color mapping
  const categoryColors = {
    'software-development': 'from-blue-600 to-indigo-700',
    'data-science': 'from-green-600 to-teal-700',
    'cloud-computing': 'from-purple-600 to-indigo-700'
  };
  
  // Get the appropriate color or use a default one
  const colorGradient = categoryColors[category] || 'from-blue-600 to-indigo-700';
  
  return (
    <div>
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${colorGradient} text-white rounded-xl p-8 md:p-12 mb-12`}>
        <div className="max-w-3xl">
          <div className="text-3xl mb-4">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {categoryName} Careers
          </h1>
          <p className="text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
      
      {articles.length > 0 ? (
        <>
          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {/* If there are lots of articles, we could add pagination here */}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">No articles found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any articles in this category. Please check back later.
          </p>
          <Link 
            href="/articles" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Browse All Articles
          </Link>
        </div>
      )}
      
      {/* Dynamic Category Resources Section */}
      <CategoryResources categorySlug={category} />
    </div>
  );
}