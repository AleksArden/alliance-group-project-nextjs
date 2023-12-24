import styles from './InstagramGallery.module.scss';
import InstaFeed from './instaFeed/InstaFeed';

const InstagramGallery = ({ feeds }: { feeds: any }) => {
  console.log(feeds);
  return (
    <>
      <h2>Instagram Gallery</h2>
      <ul>
        {feeds &&
          feeds.map((feed: any) => <InstaFeed key={feed.id} feed={feed} />)}
      </ul>
    </>
  );
};
export default InstagramGallery;
