# Help

Miyako is an app to download Facebook images from a Facebook URL by requesting the image sources from Facebook API. For certain URL types such as Albums, Miyako can help you downloading all of them at once as a ZIP file. You can also download some informations about the images.

## Facebook Login

In order to download Facebook photos, you need to login with your Facebook account. This is necessary to get access token for Facebook API. Please read the [privacy policy][policy] for more information.

## Downloadable URLs

- Only public URLs from Pages that can be downloaded by Miyako. Images and albums from personal user accounts cannot be downloaded due to limited app permission scope (even public albums).
- Miyako tries to recognize the required post, image, or album ID from the URL. However, if you encounter URLs that cannot be downloaded, please [report this to us][issues].

## Known Issues

### Firefox Tracking Protection

If you use [the integrated Tracking Protection in Firefox][ff-tracking], you might enconter errors with Miyako. This is because Miyako uses Facebook JavaScript SDK, which might be blocked by such functions. Please disable it in order to use Miyako, or use a different browser. You can read our privacy policy [here][policy].

### Large Facebook albums

Since all image downloads and ZIP processings are done in your browser, Miyako might crash when downloading Facebook albums containing thousands of images (for example, Timeline Photo albums) or many high-quality images (Miyako always picks up the highest quality images available).

## Running Miyako in your computer

You can run Miyako in your own computer or server if you want to use your own Facebook Application ID. You can read the instructions at the [GitHub repository][repo].

## Contributing

We are open for contributions. List of possible improvements are available at the [GitHub repository][repo].

## Miyako why?

Because [Hidamari Sketch](https://en.wikipedia.org/wiki/Hidamari_Sketch).

[repo]: https://github.com/tkesgar/miyako
[policy]: https://miyako.tkesgar.com/policy
[issues]: https://github.com/tkesgar/miyako/issues
[ff-tracking]: https://developer.mozilla.org/en-US/Firefox/Privacy/Tracking_Protection
