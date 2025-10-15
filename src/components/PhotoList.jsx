import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * PhotoList Component
 * Displays a grid of photos from Lorem Picsum API with infinite scroll functionality
 */
const PhotoList = () => {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  
  const observer = useRef()
  const lastPhotoRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  /**
   * Fetch photos from Lorem Picsum API
   * API Endpoint: https://picsum.photos/v2/list
   * Parameters: page (pagination), limit (items per page)
   */
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const limit = 20 // Number of photos per page
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos')
        }
        
        const data = await response.json()
        
        // If no data returned, we've reached the end
        if (data.length === 0) {
          setHasMore(false)
        } else {
          setPhotos(prevPhotos => {
            // Avoid duplicates by checking if photo already exists
            const newPhotos = data.filter(
              newPhoto => !prevPhotos.some(photo => photo.id === newPhoto.id)
            )
            return [...prevPhotos, ...newPhotos]
          })
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching photos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [page])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Photo Gallery
        </h1>
        <p className="text-gray-600">
          Explore beautiful photos from Lorem Picsum
        </p>
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          const isLastPhoto = photos.length === index + 1
          
          return (
            <Link
              key={photo.id}
              to={`/photos/${photo.id}`}
              ref={isLastPhoto ? lastPhotoRef : null}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Photo Thumbnail */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={`https://picsum.photos/id/${photo.id}/400/400`}
                  alt={`Photo by ${photo.author}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              {/* Photo Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-semibold text-sm truncate">
                  {photo.author}
                </p>
                <p className="text-gray-300 text-xs">
                  {photo.width} × {photo.height}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading more photos...</span>
        </div>
      )}

      {/* End of List Message */}
      {!hasMore && photos.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 font-semibold">
            You've reached the end! 🎉
          </p>
        </div>
      )}

      {/* No Photos Message */}
      {!loading && photos.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No photos found.</p>
        </div>
      )}
    </div>
  )
}

export default PhotoList
