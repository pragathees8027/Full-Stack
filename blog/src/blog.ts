type Post = {  // type alias 
    id: number;
    title: string;
    content: string;
    author: string;
    date: Date;
  }

interface Blog {  //interface
    id:number;
    posts: Post[];
    addPost(post: Post): void;
    displayPosts(): void;
  }

class MyBlog implements Blog {
    id:number;
    constructor(id:number) {
        this.id = id;
    }
    posts: Post[] = [];
    addPost(post: Post) {
      this.posts.push(post);
    }
    displayPosts() {
      console.log("\nBlog id: "+this.id);
      this.posts.forEach(post => {
        console.log("\nTitle: " + post.title);
        console.log("Author: " + post.author);
        console.log("Date: "+post.date.toDateString());
        console.log("Content: "+post.content);
      });
    }
  }

let myBlog = new MyBlog(1);

  myBlog.addPost({
    id: 1,
    title: "Introduction to TypeScript",
    content: "TypeScript is a superset of JavaScript.",
    author: "8027",
    date: new Date("2020-01-01")
  });

  myBlog.addPost({
    id: 2,
    title: "JavaScript",
    content: "JavaScript is a scripting language.",
    author: "8027",
    date: new Date("2020-01-01")
  });

myBlog.displayPosts();
