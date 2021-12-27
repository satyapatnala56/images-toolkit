---
tags: []
categories: []
title: ONLINE IMAGE COMPRESSION FOR WORDPRESS - HOW TO COMPRESS IMAGES BEFORE UPLOADING
layout: post
author: Arjyahi
image: "/uploads/output-40.png"
comments: false

---
# **ONLINE IMAGE COMPRESSION FOR WORDPRESS - HOW TO COMPRESS IMAGES BEFORE UPLOADING**

## **Introduction**

WordPress reduces the size of your photos by default to improve efficiency. You might be wondering if you can alter the picture compression settings in WordPress. We'll show you how to change the JPEG image compression in WordPress in this article.

When you publish a JPEG image to WordPress, it will automatically reduce the image's quality to 90%. This figure was further reduced to 82 percent in WordPress 4.5 to optimize site speed for mobile visitors.

You may disable picture compression in WordPress if you're a photographer who loves to show off high-resolution images on your website.

You may alter the JPEG image compression in WordPress by following our step-by-step guide. But first, let us explain what image compression is.

## **What is image compression?**

Image compression is the process of reducing the size of a graphics file in bytes without sacrificing the image's quality. More photos can be saved in a given amount of disc or memory storage because to the smaller file size. It also cuts down on the time it takes to send photos over the Internet or save them from Web pages.

## **How to compress images for WordPress?**

**How do we disable Image Compression in WordPress?**

Simply enter the following script into your theme's functions.php file or a site-specific plugin to deactivate image compression in WordPress.

add_filter('jpeg_quality', function($arg){return 100;});

If you set the value to 100, WordPress compresses the image to the finest quality possible.

If you're not a photographer or an illustrator, you're unlikely to notice a significant change in quality. The difference in quality is noticeable to individuals who work with high-resolution photos on a regular basis.

**How to Improve Image Compression in WordPress?**

Leaving the compression quality alone has performance advantages. To squeeze a few more kBs, alter the number from 100 to 80 or something lower, then write the following code:

add_filter('jpeg_quality', function($arg){return 75;});

When you make these picture quality adjustments, make sure to refresh your thumbnails as well.

But the bigger question is, how do we compress these images before uploading them. And on top of that, how do we do this without using plug-ins. This next section will define just that.

**How to compress images for WordPress without using plug-ins?**

Now before we get into the details of how to compress images without plugins, let us first give you an overview of our free online Image compression tool. We will be explaining the steps using this tool.

Safeimagekit.com's [Image Compressor tool](https://safeimagekit.com/compress-an-image) has a lot of options for shrinking an image file. Modifying the uploaded image by altering its proportions (height, width, etc.) is one of the key functions.

This picture compression tool also allows you to select a size for compression, which can be set to max or min depending on the image you've provided. For precise and rotational adjustment, this function also includes a strict mode and an orientation mode.

![](/uploads/image-compression.png)

The image compressor also allows the user to alter the image's quality and convert the image's format to their favor. After we upload an image to safeimagekit.com, the compression feature contains multiple characteristics, such as the image's name, size, kind, and so on.

The last modified parameter provides us with the time, date, and time zone of the last modification. This also gives us a progress bar after we've uploaded the image file and before we begin modifying it.

Our image compressor tool is compatible with practically all browsers and devices. No specialist is required to use our program, which is very simple to understand. It's absolutely free; you can use all of our tools without spending a dime. Our image compressor is a browser-based application that requires no further software to be downloaded to your device. None of your information is transferred to our servers, and all actions are completed within the browser. As a result, we can ensure that our users are completely safe.

So, how can we make our image files smaller?

Step 1: You can either upload the picture file or Select Dropbox/Google Drive from the drop-down menu.

Step 2: Using the choices presented, change the parameters.

Step 3: Modify the image file's alignment.

Step 4: To save your modifications, select the Save option.

Step 5: By using the download option, save the image file.

## **Benefits and drawbacks of compressing images for WordPress**

**Benefits-**

1) The most important benefit of image compression is the reduction in file size. You can keep compressing the image until it's the size you want it to be, depending on the file type you're dealing with. Unless you adjust the image's physical size with an image editor, this implies the image takes up less space on the hard disc while maintaining the same physical size. This file size compression is perfect for the web since it permits people to create image-rich sites without consuming too much bandwidth or memory.

2) Large, uncompressed photos may take a long time to load on some electronic devices, such as computers or cameras. For example, CD drives can only read data at a certain rate and cannot display huge graphics in real-time. Compressed pictures are also required for a fully functional website on some web hosts that send data slowly. Uncompressed files will also take a long time to load on other storage mediums, such as hard discs. Image compression allows data to load more quickly on slower devices.

**Drawbacks-**

1) When you reduce an image, you may see image deterioration, which means the image's resolution has deteriorated. When saving a GIF or PNG file, the data is preserved although the image quality has deteriorated. If you need to show somebody a high-quality image, whether large or little, image compression will be a detriment.

2) When a picture shrinks in size, some commonly used file types, such as JPEG, the compression tool will irreversibly discard some of the photo's data. Before you begin compressing these photos, make sure you have an uncompressed duplicate. Otherwise, the initial uncompressed image's high quality will be permanently lost.