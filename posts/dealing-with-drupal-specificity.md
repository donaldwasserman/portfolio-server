---
title: Dealing With Drupal Contrib's CSS Hyper-Specificity
description: Contributed Drupal modules often have extremely high CSS specificity scores. Here is a toolset and strategy I use for manageable theming.
date: 4-28-2015
post: true
mainImg: flyingfish.jpg
id: 6
---

One of the great parts of the Drupal Community is the wealth of contributed modules providing outstanding functionality that (hopefully) works great and is customizable.

What's not so great for front-end developers is over-specificity in the required CSS files.

Despite these complains, module developers face a tricky balancing act when authoring CSS. On one hand, selectors need to be strong enough to "withstand" styles from Drupal Core, other modules, and unintentional theming.

CSS specificity is a core concept to understand css. Rules with the highest specificity take precedent, regardless of where they fall in the source order of the stylessheet.

(The canonical _[Smashing Magazine](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/)_ outlines more.)

Keegan Street's [CSS Specificity Calculator](https://github.com/keeganstreet/specificity) enumerates each selector's specificity. More selectors, the higher specificity, the more specificity your selector needs to override the style.

#### Close Enough for Hand Grenades

Although it's hard to complain about a product you get for free, re-writing a contributed module's css file just so you can override it later is a face-to-keyboard moment.

The first problem is some selectors aren't aiming at the right target, but they work anyway.

![But it works!](http://38.media.tumblr.com/b8cb167b2938d75922dce023e4992947/tumblr_inline_mmjciibel51qz4rgp.jpg)

A [great Jonathan Snook article](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/) outlines this "shoot to kill problem".

Selectors closely tied to specific markup structures like this one:

```css
.module-name fieldset ul li a {
    /*
    * Critical styling here!
    */
    background: yellow;
    color: maroon;
}
```

THis markup-specific code is extremely brittle and if my theme requires updating the markup for layout purposes, will break the critical maroon-on-yellow styling.

#### Too Much Specificity
The main problem is too much specificity in selectors. A few examples of this from a recent project:

![div specificity](/images/div-specificity.png)

Rather than using only a class selector, this author chose to tie the class directly to the html element, in this case a `div`. This doubles the specificity and requires the themer to look at the actual module css rather than writing:

```css
.form-builder-placeholder {
    width: 98%;
}

.form-builder-placeholder-hover {
    border: 2px solid #ccc;
}
```

![ID specificity](/images/media-selector.png)

In this case, ID selectors are stacked on top of each other, making it doubly hard to override.

I'm not all negative -- the [FAQ module](http://www.drupal.org/project/faq) has great, flat, themeable CSS.


### Tools and Strategies

Today, with any module that requires additional themeing, I almost always unset the css first, either in the theme's `.info` file or in `template.php`.

You can also use the [CSS specificty graph](https://github.com/pocketjoso/specificity-graph) to find offending CSS files, drop them into your sass build, and start your re-write!
