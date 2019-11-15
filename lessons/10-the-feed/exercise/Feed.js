import React from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const FEED_PAGE_SIZE = 5;

function Feed() {
  const [posts, setPosts] = React.useState([]);
  const [limit, setLimit] = React.useState(FEED_PAGE_SIZE);
  const [newest, setNewest] = React.useState(Date.now());

  // React.useEffect(() => {
  //   loadFeedPosts(Date.now(), 3).then (posts => {
  //     dispatch({ type: "LOAD_FEED", posts })
  //   });
  //   setLoaded(true);
  //   console.log(feedPosts);
  // }, [feedPosts, loaded]);

  React.useEffect(() => {
    loadFeedPosts(newest, limit).then(posts => {
      setPosts(posts);
    });
  },[limit]);

  React.useEffect(() => {
    subscribeToNewFeedPosts(newest, posts => {
      posts.map(post => { console.log("NEW POST: " + post )})
    })
  }, [newest]);

  const addNewPosts = () => {
    setNewest(Date.now())
    setLimit(limit + FEED_PAGE_SIZE)
  }

  const addMorePosts = () => {
    setLimit(limit + FEED_PAGE_SIZE);
  }

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button" onClick={addNewPosts}>
          View {FEED_PAGE_SIZE} New Posts
        </button>
      </div>

      {
        posts.map(post => (
          <FeedPost post={post} />
        ))
      }

      <div className="Feed_button_wrapper">
        <button
          onClick={addMorePosts}
          className="Feed_new_posts_button icon_button"
        >
          View More
        </button>
      </div>
    </div>
  )
}


