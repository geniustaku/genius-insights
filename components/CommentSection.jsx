// components/CommentSection.jsx
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CommentSection({ postSlug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch comments for this post
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/comments?postSlug=${postSlug}&sort=${sortBy}`);
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
  }, [postSlug, sortBy]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !email.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          name,
          email,
          content: newComment,
          parentId: replyTo ? replyTo.id : null,
          isSubscribed
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (replyTo) {
          // If it's a reply, update the parent comment with the new reply
          setComments(comments.map(comment => {
            if (comment.id === replyTo.id) {
              return {
                ...comment,
                replies: [...(comment.replies || []), data.comment]
              };
            }
            return comment;
          }));
          setReplyTo(null);
        } else {
          // Otherwise, add the new comment to the list
          setComments([data.comment, ...comments]);
        }
        
        setNewComment('');
        // Keep the name and email for future comments
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
  
  const handleReply = (comment) => {
    setReplyTo(comment);
    // Scroll to comment form
    document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' });
  };
  
  const cancelReply = () => {
    setReplyTo(null);
  };
  
  const handleLike = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        // Update the likes count in the UI
        setComments(comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          
          // Check in replies too
          if (comment.replies && comment.replies.length > 0) {
            const updatedReplies = comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { ...reply, likes: reply.likes + 1 };
              }
              return reply;
            });
            
            return { ...comment, replies: updatedReplies };
          }
          
          return comment;
        }));
      }
    } catch (error) {
      console.error('Error liking comment:', error);
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
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Discussion ({comments.length})</h3>
        
        <div className="flex items-center">
          <label className="text-sm text-gray-600 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded p-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Comment Form */}
      <div id="comment-form" className="mb-8 bg-gray-50 p-4 rounded-lg">
        {replyTo && (
          <div className="bg-blue-50 p-3 rounded mb-4 flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-700">
                Replying to <span className="font-medium">{replyTo.name}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">{replyTo.content.substring(0, 100)}{replyTo.content.length > 100 ? '...' : ''}</p>
            </div>
            <button 
              onClick={cancelReply}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        )}
        
        <h4 className="font-medium text-lg mb-4">{replyTo ? 'Post Your Reply' : 'Join the Discussion'}</h4>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 text-sm">Your Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Your Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
                placeholder="Your email (not displayed)"
              />
              <p className="text-xs text-gray-500 mt-1">Your email will not be published</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Your Comment <span className="text-red-500">*</span></label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="subscribe"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="subscribe" className="text-sm text-gray-700">
              Notify me of new comments on this post
            </label>
          </div>
          <div className="flex gap-3">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Posting...' : replyTo ? 'Post Reply' : 'Post Comment'}
            </button>
            {replyTo && (
              <button 
                type="button"
                onClick={cancelReply}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-500">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded">
            <p className="text-gray-500">Be the first to comment on this article!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {comment.avatar ? (
                    <Image 
                      src={comment.avatar} 
                      alt={comment.name} 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-blue-700 font-medium">{getInitials(comment.name)}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{comment.name}</p>
                      <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                    </div>
                    {comment.isAuthor && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">Author</span>
                    )}
                  </div>
                  <div className="mt-2 text-gray-700">
                    <p>{comment.content}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{comment.likes || 0}</span>
                    </button>
                    <button 
                      onClick={() => handleReply(comment)}
                      className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="border-l-2 border-gray-100 pl-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          {reply.avatar ? (
                            <Image 
                              src={reply.avatar} 
                              alt={reply.name} 
                              width={32} 
                              height={32} 
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-gray-700 text-sm font-medium">{getInitials(reply.name)}</span>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-sm">{reply.name}</p>
                              <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                            </div>
                            {reply.isAuthor && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">Author</span>
                            )}
                          </div>
                          <div className="mt-1 text-gray-700 text-sm">
                            <p>{reply.content}</p>
                          </div>
                          <div className="mt-2 flex items-center gap-4">
                            <button 
                              onClick={() => handleLike(reply.id)}
                              className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              <span>{reply.likes || 0}</span>
                            </button>
                            <button 
                              onClick={() => handleReply(comment)}
                              className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}