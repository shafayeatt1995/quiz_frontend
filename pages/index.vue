<template>
  <MetaHead />
  <Home>
    <HomeHero />
    <HomeHow />
    <HomeTools />
    <HomeUsages />
    <HomeProfessional />
    <HomePricing />
    <HomeFaq />
    <HomeTrial />
  </Home>
</template>
<script>
export default {
  name: "IndexPage",
  setup() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "MrQuizer",
      "image": "https://mrquizer.com/logo.png",
      "description": "MrQuizer is a SaaS tool that lets you generate quizzes from Text, PDF, YouTube Videos, or URLs. Perfect for educators, trainers, and institutions.",
      "brand": {
        "@type": "Brand",
        "name": "MrQuizer"
      },
      "sku": "MRQ-001",
      "offers": [
        {
          "@type": "Offer",
          "url": "https://mrquizer.com/#pricing",
          "priceCurrency": "USD",
          "price": "0",
          "availability": "https://schema.org/InStock",
          "name": "Free Plan",
          "description": "Try Mr. Quizer for free — no credit card required."
        },
        {
          "@type": "Offer",
          "url": "https://mrquizer.com/#pricing",
          "priceCurrency": "USD",
          "price": "10",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "10",
            "priceCurrency": "USD",
            "billingDuration": 1,
            "billingIncrement": 1,
            "unitText": "month"
          },
          "availability": "https://schema.org/InStock",
          "name": "Pro Plan - Monthly",
          "description": "Ideal for educators, coaches, and solo creators. $10 per month."
        },
        {
          "@type": "Offer",
          "url": "https://mrquizer.com/#pricing",
          "priceCurrency": "USD",
          "price": "99",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "99",
            "priceCurrency": "USD",
            "billingDuration": 1,
            "billingIncrement": 1,
            "unitText": "year"
          },
          "availability": "https://schema.org/InStock",
          "name": "Pro Plan - Yearly",
          "description": "Best for institutions managing multiple users. 2 months free included."
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "120"
      }
    };

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }
      ]
    });
  }
};
</script>
