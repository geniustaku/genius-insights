'use client'
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function ArticleComments({ articleSlug }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousCode, setAnonymousCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch comments for this article
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/comments?articleSlug=${articleSlug}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          setError('Failed to load comments. Please refresh the page.');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [articleSlug]);
  
  // Generate anonymous code if needed
  useEffect(() => {
    if (isAnonymous && !anonymousCode) {
      const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };
      
      setAnonymousCode(generateCode());
    }
  }, [isAnonymous, anonymousCode]);
  
  // Pre-fill user info if logged in
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newComment.trim()) {
      setError('Please enter a comment.');
      return;
    }
    
    if (!session && !isAnonymous && (!name.trim() || !email.trim())) {
      setError('Please provide your name and email or comment anonymously.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const payload = {
        articleSlug,
        content: newComment,
        isAnonymous,
      };
      
      // Add different fields based on auth method
      if (session?.user) {
        // Logged in user
        payload.userId = session.user.id;
      } else if (isAnonymous) {
        // Anonymous user
        payload.anonymousCode = anonymousCode;
        payload.name = 'Anonymous';
      } else {
        // Guest with name/email
        payload.name = name;
        payload.email = email;
      }
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Add the new comment to the list
        setComments([data.comment, ...comments]);
        setNewComment('');
        
        if (isAnonymous) {
          // Store anonymous code in localStorage
          localStorage.setItem(`comment_code_${articleSlug}`, anonymousCode);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to post comment. Please try again.');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Comment Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h4 className="font-medium text-lg mb-4">Join the conversation</h4>
        
        {!session && (
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="mr-2"
              />
              <label htmlFor="anonymous" className="text-sm">
                Comment anonymously
              </label>
            </div>
            
            {isAnonymous && (
              <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                Your anonymous code: <span className="font-mono font-medium">{anonymousCode}</span>
                <div className="text-xs text-gray-600">Save this code to edit your comments later</div>
              </div>
            )}
            
            <div className="ml-auto">
              <button
                onClick={() => signIn()}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Log in to comment with your account
              </button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!session && !isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Your Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required={!session && !isAnonymous}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Your Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required={!session && !isAnonymous}
                />
                <p className="text-xs text-gray-500 mt-1">Will not be published</p>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block mb-1 text-sm">Your Comment <span className="text-red-500">*</span></label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
              placeholder="What are your thoughts on this article?"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-500">Loading comments...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded">
            <p className="text-gray-500">Be the first to comment on this article!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {comment.avatar ? (
                    <img 
                      src={comment.avatar} 
                      alt={comment.name} 
                      className="rounded-full w-10 h-10"
                    />
                  ) : (
                    <span className="text-blue-700 font-medium">{getInitials(comment.name)}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <p className="font-semibold">{comment.name}</p>
                    {comment.isAnonymous && (
                      <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        Anonymous
                      </span>
                    )}
                    {comment.isAuthor && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Author
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                  <div className="mt-2">
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}