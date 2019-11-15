import React from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
import Moment from 'react-moment';

// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const FEED_PAGE_SIZE = 5;

function Feed() {
  const [posts, setPosts] = React.useState([]);
  const [limit, setLimit] = React.useState(FEED_PAGE_SIZE);
  const [newest, setNewest] = React.useState(Date.now());
  const [newPostsAvailable, setNewPostsAvailable] = React.useState(0);

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
      setNewPostsAvailable(0);
    });
  },[limit]);

  React.useEffect(() => {
    subscribeToNewFeedPosts(newest, newPosts => {
      newPosts.map(newPost => { console.log("NEW POST: " + newPost )})
      setNewPostsAvailable(newPosts.length);
    })
  }, [newest]);

  const addNewPosts = () => {
    setNewest(Date.now());
    setLimit(limit + newPostsAvailable);
    setNewPostsAvailable(0);
  }

  // const addMorePosts = () => {
  //   setLimit(limit + FEED_PAGE_SIZE);
  // }

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        Showing stuff since <Moment>{newest}</Moment> ...

        <button
          className="Feed_new_posts_button icon_button "
          onClick={addNewPosts}
          disabled={newPostsAvailable === 0}
        >
          View {newPostsAvailable} New Posts
        </button>
      </div>

      {
        posts.map(post => (
          <FeedPost post={post} />
        ))
      }

      <div className="Feed_button_wrapper">
        <button
          onClick={() => {setLimit(limit + FEED_PAGE_SIZE)}} // just illustrating inline
          className="Feed_new_posts_button icon_button"
        >
          View More
        </button>
      </div>
    </div>
  )
}


