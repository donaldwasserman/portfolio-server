---
title: Cleanly Add Classes to Drupal Admin Theme Buttons Based on Button Text With HOOK_element_alter
date: 06-01-2015
post: true
description: Globally applying buttons classes in administrative themes can be tricky.
id: 4
---

The easiest way in Drupal to apply a consistent button class to form buttons is to use a custom `HOOK_preprocess_button()` function in the `template.php` that adds button and button variant classes (like the classic Bootstrap `btn` `btn-VARIANT` pattern).

As outlined [here](http://shomeya.com/articles/adding-the-button-class-to-drupal-submit-buttons), this is a very easy pattern to implement. This works great for non-administration themes.

However, theme-level `pre_preocess_` functions are called last. This implementation can wipeout transformations needed by [Ctools](http://www.drupal.org/project/ctools) to create administration interfaces.

I couldn't find a good example using `hook_element_info_alter()` to create this, so I thought I would post it here.

We will find the current button elements on the page, check to make sure they're not hidden, then use a `#process` callback function to apply [Bootstrap](http://www.getbootstrap.com) button classes based on the text of the button.

Just drop all of these into your `template.php` (or a file included it in.)

### Step one: Call hook_element_info_alter()

```php
  function theme_name_element_info_alter(&$type) {
    foreach ($type as &$element) {
      if (isset($element['#type'])) {
        if ($element['#type'] === 'button' || $element['#type'] === 'submit' ||  $element['#type'] === 'image_button') {
          $element['#process'][] = 'fixup_buttons_process';
        }
      }
   }
 }
```

### Create '`fixup_buttons_process()`' Callback

This is easy: take the current element and process it.

```php
function fixup_buttons_process($element) {
  button_process($element);
  return $element;
}
```
sadfadsds

### Create function to process button elements

This function checks the class array of the current element, if it doesn't contain our list of classes, it runs processes the current value of the button and adds the right class.

```php
function button_process(&$item) {
  if (!is_array($item) || empty($item['#type'])) {
    return;
  }

  if (isset($item['#attributes']['class']) && btn_class_exists($item['#attributes']['class'])) {
    return;
  } else {
    $item['#attributes']['class'][] = 'btn';
    $item['#attributes']['class'][] = color_button($item['#value']);
  }
}
```

### Check to see if there are existing classes, and then create them based on a library of words/class values

First we create a function checking the array of classes, which returns a boolean value.

```php
function btn_class_exists($class_arr) {
  //load up our classes we want to check
  $classes = array(
      'btn-default',
      'btn-primary',
      'btn-success',
      'btn-info',
      'btn-warning',
      'btn-danger',
      //add as many as you'd like here!
  );

  if (empty($class_arr)) {
    return false;
  }

  $class_exists = array_intersect($classes, $class_arr);

  if (count($class_exists)) {
    return true;
  } else {
    return false;
  }

}
```

Now let's finally color the button!

_Note: there are probably many more efficient ways of doing the checking for buttons, but I kept it simple here._

```php
function color_button($string) {
   $values = array(
        'Save features'         => 'primary',
        'Mark as completed'     => 'primary',
        t('Create')             => 'success',
        t('Save')               => 'success',
        t('Write')              => 'success',
        'Unpublish'             => 'warning',
        t('Delete')             => 'danger',
        t('Remove')             => 'danger',
        //etc etc
    );

    $btn = ucfirst(strtolower($string));

    if (array_key_exists($btn, $texts)) {
      return 'btn-'.strtolower($texts[$btn]);
    } else {
      return 'btn-default';
    }
}
```
