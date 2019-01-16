import React, { Component } from "react";
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import Navigation from './Navigation'
import Posts from './Posts';
import NewPost from "./NewPost";
import moment from 'moment';

const CONFIG = {
  apiKey: "AIzaSyAaoc14KWicffzc60_pj86fy4GzKNudorw",
  authDomain: "react-thought-wall.firebaseapp.com",
  databaseURL: "https://react-thought-wall.firebaseio.com",
  projectId: "react-thought-wall",
  storageBucket: "react-thought-wall.appspot.com",
  messagingSenderId: "706528468658"
};
if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG);
}

class App extends Component {
  db = firebase.database();
  state = {
    email: "",
    password: "",
    user: "",
    posts:[],
    filter:{filterLast10:false}
  };
 // Method to add a post to your state.
/*   addPost = (post) => {

    post.id = Math.random();
    post.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    let posts = [...this.state.posts, post];
    this.setState({
      posts: posts,
    })
  } */
  addPost = (props) => {
    // Post entry
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
      author: this.state.user.email || "Anonymous", // Not sure if works
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      content:props.content,
      key:newPostKey
    };

    // Adds the post entry to the posts inside of state
    let posts = [...this.state.posts, postData];
    this.setState({
      posts:posts
    })
    // Adds the post entry to the database

       // Write the new post's data simultaneously in the posts list and the user's post list.
       var updates = {};
       updates['/posts/' + newPostKey] = postData;

       return firebase.database().ref().update(updates)
  }

  componentDidMount(){

      this.db.ref('posts/').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          // Iterating through the posts in database

          //Saving new firebase-key and the items we iterating through
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let newObj = {
            content: childData.content,
            author:childData.author,
            date:childData.date}
          let posts = [...this.state.posts, newObj];
          this.setState({
            posts:posts
          })
          // iterate and set to state, to display all posts on render
        });
      });
  

    firebase.auth()
      .onAuthStateChanged((user) => {
        if(user){
          this.setState({ user: user});
        } else {
          this.setState({ user: ''});
        }
      });
  }



  componentWillUnmount(){
    this.db.ref().off();
    recentPostsRef.off();
  }

  // AUTHORIZATION METHODS 

// Method to login

onFilterThree = () => {

  this.db.ref('posts/').limitToLast(3).once('value', (snapshot) => {
    this.setState({
      posts:[]
    })
    snapshot.forEach((childSnapshot) => {
      // Iterating through the posts in database

      //Saving new firebase-key and the items we iterating through
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      let newObj = {
        content: childData.content,
        author:childData.author,
        date:childData.date};
      let posts = [...this.state.posts,newObj]
      this.setState({
        posts:posts
      })
      // iterate and set to state, to display all posts on render
    });
  });
  
}

onFilterFive = () => {

  this.db.ref('posts/').limitToLast(5).once('value', (snapshot) => {
    this.setState({
      posts:[]
    })
    snapshot.forEach((childSnapshot) => {
      // Iterating through the posts in database

      //Saving new firebase-key and the items we iterating through
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      let newObj = {
        content: childData.content,
        author:childData.author,
        date:childData.date};
      let posts = [...this.state.posts,newObj]
      this.setState({
        posts:posts
      })
      // iterate and set to state, to display all posts on render
    });
  });
  
}

onFilterTen = () => {

  this.db.ref('posts/').limitToLast(10).once('value', (snapshot) => {
    this.setState({
      posts:[]
    })
    snapshot.forEach((childSnapshot) => {
      // Iterating through the posts in database

      //Saving new firebase-key and the items we iterating through
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();

      let newObj = {
        content: childData.content,
        author:childData.author,
        date:childData.date};
      let posts = [...this.state.posts,newObj]
      this.setState({
        posts:posts
      })
      // iterate and set to state, to display all posts on render
    });
  });
  
}
  onLogin = () => {
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => alert(error))
  }
// Method to logout
  onLogout = () => {
    firebase.auth()
      .signOut();
  }
// Method to POST your details and create a user.
  onSubmit = e => {
    e.preventDefault();
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(alert("Created User!"))
      .catch(error => console.log(error));
  }
  onChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    return (
      <div>
        <header> Welcome! You're posts will be signed with {this.state.user ? this.state.email:'"Anonymous"'} </header>
        <form onSubmit={this.onSubmit}>
          <div>
            <input type="text" name="email" placeholder="Your email" value={this.state.email} onChange={this.onChange}/>
            <input type="password" name="password" placeholder="Your password" value={this.state.password} onChange={this.onChange}/>
          </div>
          <input type="submit" value="Register" className="btn btn-reg"/>
        </form>
        

    {/* If user is NOT logged in, render this */}
        {!this.state.user &&
        <div>
          <button onClick={this.onLogin} className="btn btn-login"> Login</button>
          <button onClick={this.onFilterThree} className="btn btn-login"> Last 3 posts</button>
          <button onClick={this.onFilterFive} className="btn btn-login"> Last 5 posts</button>
          <button onClick={this.onFilterTen} className="btn btn-login"> Last 10 posts</button>
          
          <NewPost postAuthor= "Anonymous" addPost={this.addPost}/>
          <Posts posts={this.state.posts}/>
        </div>}


    {/* If user IS logged in, render following instead */}
        { this.state.user && 
        <div>
          <button onClick={this.onLogout} className="btn btn-logout"> Logout </button>
          <button onClick={this.onFilterThree} className="btn btn-login"> Last 3 posts</button>
          <button onClick={this.onFilterFive} className="btn btn-login"> Last 5 posts</button>
          <button onClick={this.onFilterTen} className="btn btn-login"> Last 10 posts</button>
          <NewPost postAuthor={this.state.user.email || "Anonymous"} addPost={this.addPost}/>
          <Posts postAuthor={this.state.user.email || "Anonymous"} posts={this.state.posts}/>
          
        </div>
        }
          </div>
    );
  }
}

export default App;