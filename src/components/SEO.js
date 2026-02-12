import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, type = 'website' }) {
    const siteTitle = 'SNEAKR';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = 'Premium sneakers, streetwear, and accessories. Shop the latest drops from Nike, Jordan, Adidas and more.';
    const defaultKeywords = 'sneakers, streetwear, nike, jordan, adidas, shoes, clothing, accessories';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content={type} />
            {image && <meta property="og:image" content={image} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
