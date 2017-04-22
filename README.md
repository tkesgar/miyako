# Miyako

![Miyako](http://i.imgur.com/RtgQlbR.gif)

Miyako is an app to download images from Facebook. It works by making API requests to Facebook Graph API to get the image URLs. For certain node types like albums, Miyako can also compress all of the images into a single ZIP file for one-click download.

I create this to make downloading various reference photos from Internet easier. Downloading all of them one-by-one is a complete waste of time.

Also, I want to learn React and Redux.

## Supported URLs

  - Currently only `photo` and `album` node type are supported.
  - API requests are subject to permission scope. The most basic scope only allows access on public nodes (Pages, for example).
  - Miyako works by extracting the node ID from the provided URL via a bunch of regexes. Since Facebook URLs are subject to change, please [submit an issue](https://github.com/tkesgar/miyako/issues) if you find a URL that Miyako cannot parse.

## Deployment

You will need these things to get started:
  - Node.js
  - npm
  - Facebook App ID with Facebook Login turned on. You might also need to configure the Site URL settings and Login Callback.

After cloning this repository, run `npm install` to install the dependencies and `npm run build` to compile the source into the `public` folder.

You can now serve the `public` folder with your favourite HTTP server with `pushState` support, for example [pushserve](https://www.npmjs.com/package/pushserve) or [pushstate-server](https://www.npmjs.com/package/pushstate-server).

## Contributing

Contributions are greatly appreciated. Feel free to check things to do below and submit a pull request. You can also find `TODO` comments in the source code, or check the [issues page](https://github.com/tkesgar/miyako/issues).

## Todo

  - **Features**
    - Add more URL support
      - Permalinks (from Facebook embed)
      - Videos
      - Facebook redirection URLs (URLs that change in-between navigations)
    - Change the filename of downloaded files.
      - We cannot do this with direct download from image URLs provided by Facebook API. As a workaround, we have to load the image into a `<canvas>` and obtain the blob data.
    - Modify the downloaded images using `<canvas>` to add some information (for example the author or image owner).
    - Better user interface and UX flow
  - **Maintenance**
    - Use markdown and compile the help page (`marked-brunch` is out of date)
    - Testing
    - Documentation
    - Better architecture (let's just say I'm still new to React 🐧)

## Miyako who?

From [Hidamari Sketch](https://en.wikipedia.org/wiki/Hidamari_Sketch).

![Miyako](http://i.imgur.com/4bgb2CA.gif)

## License

Licensed under [MIT License](LICENSE).
