import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default function BlogId({ blog }) {
    
    return (
        
        <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <p className={styles.publishedAt}>ホーム&gt;{blog.category}</p>
            <div><h3 dangerouslySetInnerHTML={{__html: `${blog.subtitle}`}}  className={styles.subtitle}></h3></div>
            <img src={blog.thumbnail.url} width="800" />
            
            <div dangerouslySetInnerHTML={{__html:`${blog.body}`}} className={styles.post}></div>
        </main>
        
    )
}