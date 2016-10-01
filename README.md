# Miyako

![Miyako](https://i.imgur.com/yeiiB.gif)

Miyako is a simple app to download photos and photo albums from various URLs.

I create this to make downloading various reference photos from Internet easier. Downloading all of them one-by-one is a complete waste of time.

Also, I want to learn React and Redux.

## Supported URLs

  - Direct link (`http://example.com/image.jpg`)
  - Facebook photo (`https://www.facebook.com/example/123/456/?type=3&theater`)
  - Facebook album (`https://www.facebook.com/example/photos/?tab=album&album_id=123`)

## Notes

  - In order to download Facebook photos, you need to login with your Facebook account. This is necessary to get access token for Facebook API.
  - It is difficult to perform client-side scraping because of various security issues, so we have to either find APIs or write a backend. I choose the former for now, but for sites like Zerochan or Deviantart (who don't have any API, as far as I am aware) I might end up creating a backend anyway.

## Todo

  - [ ] Add more URL support
    - [ ] Twitter (possible with Twitter API)
    - [ ] Zerochan
    - [ ] Deviantart
    - [ ] pixiv (there is a bunch of npm packages, but I haven't tested it yet)
  - [ ] Testing
  - [ ] Documentation

## Miyako who?

From [Hidamari Sketch](https://en.wikipedia.org/wiki/Hidamari_Sketch).

![Miyako laughing](http://www.ilbazardimari.net/wp-content/uploads/Hidamari-sketch-6.gif)

## License

[MIT License](LICENSE)
