# "Cocktail Party!" - Yet another Jovo V4 master template for the Alexa Platform supporting a lot of features (V1.20220725)

## What this is about

Some time ago I published a [multi featured jovo example application called "Pizza Party "which is intended to have something up and running for both Alexa and Google assistant](https://github.com/fboerncke/jovo-v4-multi-featured-master-template-cocktail-party) in short time.

Meanwhile after Google announced sunsetting of Google Action services I have been asked to publish another example focused on the Alexa platform only. Here it is:

[![Cocktail Party Jovo Example Project Template](https://github.com/fboerncke/jovo-v4-multi-featured-master-template-cocktail-party/blob/main/resources/images/cocktail-party-01.png "Cocktail Party Jovo Example Project Template")](https:www.boerncke.de)

## Feature list

This Jovo V4 example project includes the following **features**:

- Configuration prepared for stages **PROD** and **DEV**
- Support for **different product names** for PROD and DEV for **easier maintenance**
- Support for **different invocation names** for PROD and DEV for **easier testing**
- Generated code deploys to **Amazon Alexa**
- Included simple **Cocktail Party** example shows usage of **Jovo V4 component concept** (reusable YesNoChoiceComponent.ts)
- Implements **i18n** (currently "de", "en")
- Configuration prepared for **locales 'de-DE'** and **locales 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN'**
- Shows implementation for platform specific intents **AMAZON.StopIntent, AMAZON.CancelIntent, AMAZON.HelpIntent, AMAZON.RepeatIntent, AMAZON.StartOverIntent, AMAZON.YesIntent, AMAZON.NoIntent**.
- Learn how to configure **Alexa Card support**
- Localized i18n "**quick replies**" for Echo Show devices
- Shows how to add support for **APL (Alexa Presentation Language) document** documents conditionally on supporting devices only ("Good Bye" page example)
- Configuration includes preselection for all APL interfaces: simply remove what you don't need instead of copying and pasting all those variants together
- Includes some prepared examples how to define and **run locale specific test cases** using jest for some basic intents (run npm test)

## Bonus time saver

The configuration in the example shows how to maintain all those necessary entries for the Amazon marketplaces from Jovo configuration files while avoiding duplicate maintenance of settings when targeting multiple locales:

This means *less necessity for working within the developer consoles*. Instead of cloning settings and navigating between multiple browser tabs you can configure it all in one file.

## Ready to deploy
What you will find nice: **The generated code artifacts validate within the Alexa Developer Console**, so the results are technically ready for deployment: 

This means *more time for you to focus on your use case!*

## Comments & Feedback welcome!

For sure there is a lot to improve.
Let me know what you think.

frank.boerncke@gmail.com

[![Cocktail Party Jovo Example Project Template - Good Bye Page](https://github.com/fboerncke/jovo-v4-multi-featured-master-template-cocktail-party/blob/main/resources/images/cocktail-party-02.png "Cocktail Party Jovo Example Project Template - Good Bye Page")](https://www.boerncke.de)

