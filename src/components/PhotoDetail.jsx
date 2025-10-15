import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

/**
 * PhotoDetail Component
 * Displays detailed information about a specific photo
 */
const PhotoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Fetch specific photo details from Lorem Picsum API
   * API Endpoint: https://picsum.photos/id/{id}/info
   */
  useEffect(() => {
    const fetchPhotoDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`https://picsum.photos/id/${id}/info`)
        
        if (!response.ok) {
          throw new Error('Photo not found')
        }
        
        const data = await response.json()
        setPhoto(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching photo details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotoDetail()
  }, [id])

  // Generate placeholder text for description
  const generateDescription = (author) => {
    return `This stunning photograph was captured by ${author}. The image showcases exceptional composition and lighting, demonstrating the photographer's keen eye for detail and artistic vision. Each element in the frame contributes to a harmonious visual narrative that draws the viewer in.`
  }

  // Generate a creative title based on photo ID
  const generateTitle = (id, author) => {
    const titles = [
      `Moment ${id}`,
      `Captured Beauty #${id}`,
      `${author}'s Vision`,
      `Frame ${id}`,
      `Artistic Expression #${id}`,
      `Through the Lens ${id}`,
      `Snapshot ${id}`,
      `Visual Story #${id}`
    ]
    return titles[parseInt(id) % titles.length]
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photo details...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/photos"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  // No Photo Found
  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Photo Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The photo you're looking for doesn't exist.
          </p>
          <Link
            to="/photos"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/photos')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </button>
        </div>
      </nav>

      {/* Photo Detail Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Photo Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {generateTitle(photo.id, photo.author)}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center text-gray-600 mb-6">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="font-semibold">Photographed by {photo.author}</span>
          </div>

          {/* Full-Size Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src={`https://picsum.photos/id/${photo.id}/${photo.width}/${photo.height}`}
              alt={`Photo by ${photo.author}`}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Photo Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Description Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {generateDescription(photo.author)}
              </p>
            </div>

            {/* Technical Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Technical Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Photo ID:</span>
                  <span className="text-gray-800 font-semibold">{photo.id}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Dimensions:</span>
                  <span className="text-gray-800 font-semibold">
                    {photo.width} × {photo.height}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Author:</span>
                  <span className="text-gray-800 font-semibold">{photo.author}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">URL:</span>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-semibold flex items-center"
                  >
                    View Source
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://picsum.photos/id/${photo.id}/${photo.width}/${photo.height}`}
              download
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Full Size
            </a>
            
            <Link
              to="/photos"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Browse More Photos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetail
