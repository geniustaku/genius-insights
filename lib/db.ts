// lib/db.ts
import sql from 'mssql';

// Define a type for your config
interface DbConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  port: number;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

// Validate environment variables and create config
function getConfig(): DbConfig {
  const server = process.env.AZURE_SQL_SERVER;
  const database = process.env.AZURE_SQL_DATABASE;
  const user = process.env.AZURE_SQL_USERNAME;
  const password = process.env.AZURE_SQL_PASSWORD;

  if (!server || !database || !user || !password) {
    throw new Error('Missing required database configuration');
  }

  return {
    server,
    database,
    user,
    password,
    port: 1433,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  };
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const pool = await sql.connect(getConfig());
    const request = pool.request();
    
    // Add parameters if any
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to execute database query');
  }
}

export async function getArticles(limit = 10, offset = 0, category: string | null = null) {
  let query = `
    SELECT id, title, slug, excerpt, category, author, published_at, reading_time, featured_image
    FROM articles
    WHERE is_published = 1
  `;
  
  const params: string[] = [];
  
  // Add category filter if provided
  if (category) {
    query += ` AND category = @param${params.length}`;
    params.push(category);
  }
  
  query += `
    ORDER BY published_at DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${limit} ROWS ONLY
  `;
  
  return executeQuery(query, params);
}

export async function getArticleBySlug(slug: string) {
  const query = `
    SELECT id, title, slug, excerpt, content, category, author, published_at, is_published, reading_time, featured_image
    FROM articles
    WHERE slug = @param0 AND is_published = 1
  `;
  
  const results = await executeQuery(query, [slug]);
  return results[0];
}

export async function getArticlesByCategory(categorySlug: string, limit = 10, offset = 0) {
    try {
      // First, get the category name from the slug
      const categoryQuery = `
        SELECT name FROM categories
        WHERE slug = @param0
      `;
      
      const categoryResult = await executeQuery(categoryQuery, [categorySlug]);
      
      if (categoryResult.length === 0) {
        return []; // Category not found
      }
      
      const categoryName = categoryResult[0].name;
      
      // Then, get articles for this category
      const articlesQuery = `
        SELECT id, title, slug, excerpt, category, author, published_at, 
               is_published, reading_time, featured_image
        FROM articles
        WHERE category = @param0 AND is_published = 1
        ORDER BY published_at DESC
        OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
      `;
      
      return await executeQuery(articlesQuery, [categoryName]);
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      throw new Error('Failed to fetch articles by category');
    }
  }

export async function getTotalArticlesCount(category: string | null = null) {
  let query = `
    SELECT COUNT(*) as total
    FROM articles
    WHERE is_published = 1
  `;
  
  const params: string[] = [];
  
  // Add category filter if provided
  if (category) {
    query += ` AND category = @param${params.length}`;
    params.push(category);
  }
  
  const result = await executeQuery(query, params);
  return result[0].total;
}

export async function getRecentArticles(limit = 5) {
    const query = `
      SELECT id, title, slug, excerpt, category, author, published_at, reading_time, featured_image
      FROM articles
      WHERE is_published = 1
      ORDER BY published_at DESC
      OFFSET 0 ROWS
      FETCH NEXT ${limit} ROWS ONLY
    `;
    
    return executeQuery(query);
  }
  
  export async function getRelatedArticles(categoryName: any, currentArticleId: any, limit = 3) {
    const query = `
      SELECT id, title, slug, excerpt, category, author, published_at, reading_time, featured_image
      FROM articles
      WHERE category = @param0 
      AND id != @param1
      AND is_published = 1
      ORDER BY published_at DESC
      OFFSET 0 ROWS
      FETCH NEXT ${limit} ROWS ONLY
    `;
    
    return executeQuery(query, [categoryName, currentArticleId]);
  }
  
  export async function getCategories() {
    const query = `
      SELECT *
      FROM categories
      ORDER BY name ASC
    `;
    
    return executeQuery(query);
  }
  
  export async function getFeaturedArticle() {
    const query = `
      SELECT TOP 1 id, title, slug, excerpt, category, author, published_at, reading_time, featured_image
      FROM articles
      WHERE is_published = 1
      ORDER BY published_at DESC
    `;
    
    const results = await executeQuery(query);
    return results[0];
  }