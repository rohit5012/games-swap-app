const YoutubeAPIkey = import.meta.env.VITE_YOUTUBE_API_KEY;


export const fetchYouTubeTrailers = async (gameName) => {
    const searchQuery = `${gameName} trailer`;
    console.log(YoutubeAPIkey)
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&key=${YoutubeAPIkey}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch trailers: ${response.statusText}`);
      }
  
      const data = await response.json();
      const videos = data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
  
      return videos;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  