const axios = require('axios');
const cheerio = require('cheerio');

async function getProfileData(username) {
  const url = `https://www.instagram.com/${username}/`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });

    const $ = cheerio.load(data);

    // Extract profile image
    const profileImage = $('meta[property="og:image"]').attr('content');

    // Extract followers count and username
    let followers = null;
    let fullName = null;

    const scriptTags = $('script[type="text/javascript"]').toArray();
    scriptTags.forEach((script) => {
      const content = $(script).html();
      if (content && content.includes('edge_followed_by')) {
        const followersMatch = content.match(/"edge_followed_by":\{"count":(\d+)\}/);
        if (followersMatch) followers = parseInt(followersMatch[1], 10);

        const nameMatch = content.match(/"full_name":"(.*?)"/);
        if (nameMatch) fullName = nameMatch[1];
      }
    });

    return { profileImage, followers, fullName: fullName || username };
  } catch (error) {
    console.error(`Error scraping ${username}:`, error);
    throw new Error('Failed to scrape data');
  }
}

module.exports = { getProfileData };