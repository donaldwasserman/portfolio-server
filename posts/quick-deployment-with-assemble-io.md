---
title: Quick Deployment With A Cross-Platform Static Site Generator
description: Ditch the database with Assemble.io for rapid deployment
date: 11-17-2014
post: true
id: 2
---

How often have you needed a quick, 2 or 3 page website? 

Whether it’s for an event, a new product promo, a landing page for something more full featured, I often find a need for just a few pages on the web.

Spinning up a Drupal or Wordpress installation is overkill. These projects don’t require database persistence, and short of some major design work, your Theme-forested WordPress site can look pretty dull and is limiting in what you can do.

Self-hosted solutions seem like a waste of money, especially if you already have some existing server capacity. One page is easy enough to code by hand, but managing changes in menus, footers, meta-data become a nightmare once you get up to two or three.

How great would it be if you could just type in one command into the terminal and after a few seconds, you get just clean html files, chock-a-block full of the right meta tags, images, and css/javascript files attached?

It’s really great. (Read more at [Assemble.io](http://www.assemble.io))

I faced a similar need for an easy five page marketing overview site for an existing web-app. We didn’t need hosting, or persistence. But what we needed was a quick deployment, relatively easy editing over many iterations, and a design that stood out.

A static site generator was definitely the way to go. 

Jekyll is the first option most people look at when evaluating a static-site generator. 

But I have pretty serious Windows-dependency, and didn’t want to mess with getting ruby/jekyll to play well with Windows.

Assemble is a Node.js-powered static site generator, most commonly built with Grunt.js. While the documentation isn’t great, once you get a few basics down, it makes building these simple 5-pagers or promo pages really simple. 

One of the best features is the content is written entirely through markdown (.md) files. If you can write in Microsoft Word, you can write in Markdown. ([Here’s a guide…](https://daringfireball.net/projects/markdown/basics))

Quick warning: this requires using your handy Terminal application (terminal on Mac, Git-bash on Windows). But don’t worry, if you can type, you can do this!

Once you set up all the files and folders in a system that makes sense and you match up the Gruntfile configuration, just type in “grunt” into your terminal, and the computer does all the hard work of..ahem..assembling your files. 

You can find all the [files I've included in my GitHub repo.](https://github.com/donaldwasserman/boilerplate/tree/assemble)

**The Basics - Setting Up Your Project**

There’s really no actual _programming_ involved — just some basic configuration and you’re up and running. 

Assemble’s documentation offers some basic boilerplate. Much of it centers around creating documentation from JSON or YAML files, to give more fine-grained control of building out style guides and other documentation. I’ve developed what I think is an easier template to generate an content-focused site, using those simple Markdown files.

### Directory Structure 

```
/build
/img-source
/js
/sass
/src
/templates
Gruntfile.js
```
`/build` => this is where all your files end up. Much of Assemble documentation and some tutorials will name this file “dest.” I prefer “build,” because it makes more sense to me. 
/img-source => Are you optimizing your images? I like to use [Grunt imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) to shrink the size of our images without losing quality. The original images go in here, get compressed, and dropped into an “build/images” folder.

/js => Your various javascript files, split into /lib and whatever application-specific files you’d like. Grunt will squish all of these together to minimize size and http requests. 

/sass => Our sass/scss/less files, if you do that. You can use vanilla css, or drop in a framework.

/src => This is where all of our content lives, tucked away in those nice .md files.

/templates => Our Assemble template files live in here. The partials are in the /partials folder. 

Gruntfile.js & pacakge.json => These are the configuration files that set the whole process in motion. There is a great overview to [Grunt by Chris Coyier available here.](http://24ways.org/2013/grunt-is-not-weird-and-hard/)

### The Basics

([Again, see all the code in my GitHub repo.](https://github.com/donaldwasserman/boilerplate/tree/assemble))

We’re going to create the really basic “5 pager,” a website (maybe more or less than five pages) that we need to promote a product, service, or a teaser for a new report. I added two .md files, “index.md” and “page-two.md.” Assemble will turn these files into our html pages.

YAML front matter (YFM) is the space between the dashes at the top of each markdown file. I have a basic title and description, but we can add additional information like author, categories, or anything else we want to access in our templates.

### The Templates

Our template folder holds our templates and partials. Assemble uses the handlebars.js tempting engine, so include partials is as easy as `{\{> partialName}}`.

Using information from the YAML front matter is as easy as a line like this:  `{\{this.page.title}}`.

To access the body content from the markdown file, you simply wrap a `{\{> body}}` partial reference with an opening `{\{#markdown}}` and closing  `{\{/markdown}}` tag.

Templates and partials keep everything DRY and clean, so changes are easy to make across pages.

###Pulling it all Together

Here is where Assemble pulls everything together, like your own personal website valet. All of the configuration options are stored in your Gruntfile (aka Gruntfile.js).

(This all refers to the v. 0.4.x branch of Assemble. The 0.6.x branch will operate more like generic middleware, so there isn’t a grunt dependency.)

All the configuration is relatively easy (It really is! Read the article for Grunt for people who think things like grunt are weird and hard…)

Like all Grunt tasks, Assemble’s options are organized with a set of options: {} and then configuration options for each type of pages to create. We just have “pages,” but could easily include “news,” “blog,” or “products” that have different templates or source folders.

####HERE ARE THE BASICS TO GET STARTED.

Below is the basic Grunt task for Assemble.

```javascript
Assemble: {
  options: {
    prettify: {indent: 2},
      collections: [{
        name: 'posts',
        sortby: 'postdate',
        sortorder: 'descending'
      }],
        layout: ['default.hbs'],
          layoutdir: 'templates/',
            partials: ['templates/partials/*'],
              assets: 'build/'
  },
    pages: {
      files: [{
        cwd: 'src/',
        dest: 'build/',
        expand: true,
        src: '*.md'
      }]
    }
}
```

Collections: This allows you to sort any type of content within a collection. It required defining the collection in the YFM.

Layout: This defines the default template, in our case, the only template.

Layoutdir: points to the layout directory to sort through different layouts.

Partials: points to where your partial files are saved

Assets: defines where your final production files are saved so Assemble is “aware” of assets when writing links.

The pages: {}  option defines the source and destination of the content pages. In typical Grunt structure, cwd: is the source directory, dest: is the build directory, and src: is the type of files.

####USING THE TERMINAL

Now open up your favorite terminal application and, once you've navigated to your project directory, type grunt assemble. Viola!
