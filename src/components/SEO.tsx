import { config } from '../assets/seo';

const SEO = () => {
  const title = config.title;
  const siteTitle = config.title;
  const author = config.author;
  const description = config.description;
  const keywords = config.keywords;

  return (
    <>
      <title>{`${siteTitle}`}</title>
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
    </>
  );
};

export default SEO;
