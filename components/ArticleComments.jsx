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
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Join the Discussion</h3>
            <p className="text-blue-100">Share your thoughts and connect with the community</p>
          </div>
          <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
            <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white font-medium">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        
        {/* Comment Form */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">Add Your Voice</h4>
              <p className="text-gray-600">What are your thoughts on this article?</p>
            </div>
          </div>
          
          {!session && (
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={() => setIsAnonymous(!isAnonymous)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Comment anonymously</span>
                  </label>
                </div>
                
                {isAnonymous && (
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 px-4 py-3 rounded-xl">
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-sm font-medium text-purple-700">Your anonymous code:</span>
                    </div>
                    <div className="font-mono font-bold text-purple-800 text-lg">{anonymousCode}</div>
                    <p className="text-xs text-purple-600 mt-1">💡 Save this code to edit your comments later</p>
                  </div>
                )}
                
                <button
                  onClick={() => signIn()}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Comment
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!session && !isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    required={!session && !isAnonymous}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    required={!session && !isAnonymous}
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Will not be published
                  </p>
                </div>
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Your Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none"
                rows="5"
                required
                placeholder="Share your thoughts, insights, or questions about this article..."
              ></textarea>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">Be respectful and constructive in your comments</p>
                <span className="text-xs text-gray-400">{newComment.length}/1000</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Comment
                  </>
                )}
              </button>
              
              {newComment && (
                <button 
                  type="button"
                  onClick={() => setNewComment('')}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
      
        {/* Comments List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Start the Conversation</h4>
                <p className="text-gray-600">Be the first to share your thoughts on this article!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900">
                  {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Latest first
                </div>
              </div>
              
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div 
                    key={comment.id} 
                    className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:shadow-lg transition-all duration-300 hover:border-purple-200"
                  >
                    <div className="flex">
                      <div className="relative flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden">
                          {comment.avatar ? (
                            <img 
                              src={comment.avatar} 
                              alt={comment.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{getInitials(comment.name)}</span>
                            </div>
                          )}
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h5 className="font-bold text-gray-900">{comment.name}</h5>
                          
                          {comment.isAuthor && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Author
                            </span>
                          )}
                          
                          {comment.isAnonymous && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Anonymous
                            </span>
                          )}
                          
                          <span className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                        
                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                          <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Like
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Reply
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4a4 4 0 014-4h5l2-3h6a2 2 0 012 2v7a2 2 0 01-2 2H9l-3 3z" />
                            </svg>
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Comments */}
              {comments.length >= 10 && (
                <div className="text-center pt-8">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    Load More Comments
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}