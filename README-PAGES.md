# Personal homepage and blog

- `index.html` and `index-zh.html` are the English and Chinese homepages.
- `blog/` contains generated Hexo files. The Markdown source stays in the private `hongwei-zhao/Blog` repository.
- GitHub Actions publishes the homepages, images, and blog together when `main` changes.

## Updating the blog

Download the `hexo-blog` artifact from the Blog repository's build workflow. To build locally, use Node.js 22 and Python 3 in a separate checkout or copy of the source. Install dependencies with `npm ci`, run `python tools/migrate_posts.py` and `python tools/fix_nunjucks.py`, then run `npm run clean` and `npm run build`. The output is `docs/` and the site is configured for `/blog/`.

Replace the contents of this repository's `blog/` with the generated `docs/`. Review the diff for content intended for public release, commit the replacement and push to `main`. Use the Pages workflow run to verify deployment.
