describe('Mocking API', () => {
  it('Data loads correctly from API', () => {
    cy.intercept('GET', 'https://www.reddit.com/r/popular.json?limit=10', { fixture: 'interceptFixture.json' }).as('getData-fixture')  // <-- this is a reusable alias
    
    cy.visit('/');
    cy.wait('@getData-fixture')

    cy.get('.post_title').first().then(($title) => {
      const title = $title.text();
      expect(title).contains('Most Recent, Lowest Scoring, Lowest Comments Sample Post');
    })
  });

  it('Renders data correctly from a mocked post', () => {
    // ChromeDevTools => network, copy & paste. Mocking the same response as from the API, but only mocked one post as opposed to 10, changed the title 
    const stubSample = {
      "kind": "Listing", 
      "data": {
        "after": "t3_u0zuit", "dist": 10, "modhash": "", "geo_filter": null, 
        "children": [
          {
            "kind": "t3", 
            "data": {
              "approved_at_utc": null, "subreddit": "MurderedByWords", "selftext": "", "author_fullname": "t2_w96cj", "saved": false, "mod_reason_title": null, "gilded": 0, "clicked": false, "title": "Joe is fun!", "link_flair_richtext": [], "subreddit_name_prefixed": "r/MurderedByWords", "hidden": false, "pwls": 7, "link_flair_css_class": null, "downs": 0, "thumbnail_height": 110, "top_awarded_type": null, "hide_score": false, "name": "t3_u109gf", "quarantine": false, "link_flair_text_color": "dark", "upvote_ratio": 0.96, "author_flair_background_color": null, "subreddit_type": "public", "ups": 20317, "total_awards_received": 1, "media_embed": {}, "thumbnail_width": 140, "author_flair_template_id": null, "is_original_content": false, "user_reports": [], "secure_media": null, "is_reddit_media_domain": true, "is_meta": false, "category": null, "secure_media_embed": {}, "link_flair_text": null, "can_mod_post": false, "score": 20317, "approved_by": null, "is_created_from_ads_ui": false, "author_premium": true, "thumbnail": "https://b.thumbs.redditmedia.com/QPF39zxhlvERUH24gAJJ47zpJto5cmP3_f1l9LDii2c.jpg", "edited": false, "author_flair_css_class": null, "author_flair_richtext": [], "gildings": {}, "post_hint": "image", "content_categories": null, "is_self": false, "mod_note": null, "created": 1649654674.0, "link_flair_type": "text", "wls": 7, "removed_by_category": null, "banned_by": null, "author_flair_type": "text", "domain": "i.redd.it", "allow_live_comments": false, "selftext_html": null, "likes": null, "suggested_sort": "confidence", "banned_at_utc": null, "url_overridden_by_dest": "https://i.redd.it/nxb5sldq4us81.png", "view_count": null, "archived": false, "no_follow": false, "is_crosspostable": false, "pinned": false, "over_18": false, "preview": {"images": [{"source": {"url": "https://preview.redd.it/nxb5sldq4us81.png?auto=webp&amp;s=2ba7c5328b3003209c79330b69cc331361aed43d", "width": 1014, "height": 798}, "resolutions": [{"url": "https://preview.redd.it/nxb5sldq4us81.png?width=108&amp;crop=smart&amp;auto=webp&amp;s=ba567cc681b9c6da5a403411a9aa84c754bb0da7", "width": 108, "height": 84}, {"url": "https://preview.redd.it/nxb5sldq4us81.png?width=216&amp;crop=smart&amp;auto=webp&amp;s=c54cfbfe4dc0be987368db5e785cb3e7ccfb9c36", "width": 216, "height": 169}, {"url": "https://preview.redd.it/nxb5sldq4us81.png?width=320&amp;crop=smart&amp;auto=webp&amp;s=9fbf4b645fecd4877d88cb2cd7cfec91263e9c38", "width": 320, "height": 251}, {"url": "https://preview.redd.it/nxb5sldq4us81.png?width=640&amp;crop=smart&amp;auto=webp&amp;s=fd548efe4ab7004408587927a6073e2fb0d8bb60", "width": 640, "height": 503}, {"url": "https://preview.redd.it/nxb5sldq4us81.png?width=960&amp;crop=smart&amp;auto=webp&amp;s=3fe86ae0234b577fb6da65398e601e33e91f67e5", "width": 960, "height": 755}], "variants": {}, "id": "3suOpCd_RROXmbj8nAxMO5BlVmtmrxKpKwcaiqXjPsc"}], "enabled": true}, "all_awardings": [{"giver_coin_reward": null, "subreddit_id": null, "is_new": false, "days_of_drip_extension": null, "coin_price": 150, "id": "award_f44611f1-b89e-46dc-97fe-892280b13b82", "penny_donate": null, "award_sub_type": "GLOBAL", "coin_reward": 0, "icon_url": "https://i.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png", "days_of_premium": null, "tiers_by_required_awardings": null, "resized_icons": [{"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=16&amp;height=16&amp;auto=webp&amp;s=a5662dfbdb402bf67866c050aa76c31c147c2f45", "width": 16, "height": 16}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=32&amp;height=32&amp;auto=webp&amp;s=a6882eb3f380e8e88009789f4d0072e17b8c59f1", "width": 32, "height": 32}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=48&amp;height=48&amp;auto=webp&amp;s=e50064b090879e8a0b55e433f6ee61d5cb5fbe1d", "width": 48, "height": 48}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=64&amp;height=64&amp;auto=webp&amp;s=8e5bb2e76683cb6b161830bcdd9642049d6adc11", "width": 64, "height": 64}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=128&amp;height=128&amp;auto=webp&amp;s=eda4a9246f95f42ee6940cc0ec65306fd20de878", "width": 128, "height": 128}], "icon_width": 2048, "static_icon_width": 2048, "start_date": null, "is_enabled": true, "awardings_required_to_grant_benefits": null, "description": "Thank you stranger. Shows the award.", "end_date": null, "subreddit_coin_reward": 0, "count": 1, "static_icon_height": 2048, "name": "Helpful", "resized_static_icons": [{"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=16&amp;height=16&amp;auto=webp&amp;s=a5662dfbdb402bf67866c050aa76c31c147c2f45", "width": 16, "height": 16}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=32&amp;height=32&amp;auto=webp&amp;s=a6882eb3f380e8e88009789f4d0072e17b8c59f1", "width": 32, "height": 32}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=48&amp;height=48&amp;auto=webp&amp;s=e50064b090879e8a0b55e433f6ee61d5cb5fbe1d", "width": 48, "height": 48}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=64&amp;height=64&amp;auto=webp&amp;s=8e5bb2e76683cb6b161830bcdd9642049d6adc11", "width": 64, "height": 64}, {"url": "https://preview.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png?width=128&amp;height=128&amp;auto=webp&amp;s=eda4a9246f95f42ee6940cc0ec65306fd20de878", "width": 128, "height": 128}], "icon_format": null, "icon_height": 2048, "penny_price": null, "award_type": "global", "static_icon_url": "https://i.redd.it/award_images/t5_22cerq/klvxk1wggfd41_Helpful.png"}], "awarders": [], "media_only": false, "can_gild": false, "spoiler": false, "locked": false, "author_flair_text": null, "treatment_tags": [], "visited": false, "removed_by": null, "num_reports": null, "distinguished": null, "subreddit_id": "t5_3hx3r", "author_is_blocked": false, "mod_reason_by": null, "removal_reason": null, "link_flair_background_color": "", "id": "u109gf", "is_robot_indexable": true, "report_reasons": null, "author": "beerbellybegone", "discussion_type": null, "num_comments": 314, "send_replies": false, "whitelist_status": "some_ads", "contest_mode": false, "mod_reports": [], "author_patreon_flair": false, "author_flair_text_color": null, "permalink": "/r/MurderedByWords/comments/u109gf/languages_are_fun/", "parent_whitelist_status": "some_ads", "stickied": false, "url": "https://i.redd.it/nxb5sldq4us81.png", "subreddit_subscribers": 2691298, "created_utc": 1649654674.0, "num_crossposts": 1, "media": null, "is_video": false
            }
          }
        ]
      }
    }
    // use stubSample as the body in the intercepted request
    cy.intercept('GET', 'https://www.reddit.com/r/popular.json?limit=10', { body: stubSample }).as('getData-Body')  // <-- this is a reusable alias
    cy.visit('http://localhost:3000/')

    cy.get('.post_title').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('Joe is fun');
    });

    cy.get('.post_score').then(($text) => {
      const text = $text.text();
      expect(text).to.eq('20.3k');
    });

    cy.get('.post_api-data > span').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('beerbellybegone');
    });

    cy.get('.post_bottom-details-container > button > p.post_api-data').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('314');
    });

    cy.get('.post_post-img').should('exist');
    cy.get('.post_post-img').should('be.visible');
  });

  it('Renders error messages correctly for / route', () => {
    const stubSample = {}  // no body therefore no posts to render
    cy.intercept('GET', 'https://www.reddit.com/r/popular.json?limit=10', { body: stubSample }).as('getData-Body-no-data')
    cy.visit('http://localhost:3000/')

    cy.get('.post_no-posts > h1').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('We apologise! We seem to be having technical issues fetching the data for popular posts');
    });
  });

  it('Renders error messages correctly for /sport route', () => {
    cy.visit('/sport');
    const stubSample = {};  // no body therefore no posts to render
    cy.intercept('GET', 'https://www.reddit.com/search.json?q=sport%20&limit=10', { body: stubSample })

    cy.get('.post_no-posts > h1').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('We apologise! We seem to be having technical issues fetching the data for sport posts');
    });
  });

  it('Renders error messages correctly for /news route', () => {
    cy.visit('/news');
    const stubSample = {};  // no body therefore no posts to render
    cy.intercept('GET', 'https://www.reddit.com/search.json?q=news%20&limit=10', { body: stubSample })

    cy.get('.post_no-posts > h1').then(($text) => {
      const text = $text.text();
      expect(text).to.contain('We apologise! We seem to be having technical issues fetching the data for news posts');
    });
  });
});