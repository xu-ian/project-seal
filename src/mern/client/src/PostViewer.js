import React from "react";
import PostWrite from './PostWrite.js';
import Post from './Post.js'

class PostViewer extends React.Component {
  render () {
    return (
      <div>
        <div class="PostWrite">
          <PostWrite />
        </div>
        <div className="Posts">
          <nav>
            <ul>
                <a href = "/posts/post"><Post/></a>
                <a href = "/posts/post"><Post/></a>
                <a href = "/posts/post"><Post/></a>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default PostViewer;