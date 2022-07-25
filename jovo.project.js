const { ProjectConfig } = require('@jovotech/cli-core');
const { AlexaCli } = require('@jovotech/platform-alexa');
const { ServerlessCli } = require('@jovotech/target-serverless');

// https://developer.amazon.com/en-US/docs/alexa/custom-skills/choose-the-invocation-name-for-a-custom-skill.html
const INVOCATION_NAME_ALEXA_DE = 'Cocktail Party';
const INVOCATION_NAME_ALEXA_EN = 'Cocktail Party';

let ALEXA_PUBLISHING_INFORMATION_DE = (suffix) => ({
  examplePhrases: [
    'Alexa, öffne ' + INVOCATION_NAME_ALEXA_DE,
    'Alexa, starte ' + INVOCATION_NAME_ALEXA_DE,
    'Alexa, frage ' + INVOCATION_NAME_ALEXA_DE + ' nach Hilfe',
  ],
  name: 'Cocktail Party - Jovo Template Projekt ' + suffix,
  summary: 'Kurze Zusammenfassung',
  description:
    'Dies ist ein Beschreibungstext - Schicke frank.boerncke@gmail.com eine Mail und erzähle ihm, was Du mit diesem Template gemacht hast. ',
  keywords: ['einige', 'tolle', 'tags'],
  smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
  largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
});

let ALEXA_PUBLISHING_INFORMATION_EN = (suffix) => ({
  examplePhrases: [
    'Alexa, open ' + INVOCATION_NAME_ALEXA_EN,
    'Alexa, launch ' + INVOCATION_NAME_ALEXA_EN,
    'Alexa, ask ' + INVOCATION_NAME_ALEXA_EN + ' for help',
  ],
  name: 'Cocktail Party - Jovo Template Project ' + suffix,
  summary: 'Some short summary text.',
  description:
    'Some description text - Send an email to frank.boernke@gmail.com and tell him what you built using this template. ',
  keywords: ['some', 'cool', 'keywords'],
  smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
  largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
});


/**
 * List of all supportable APL interfaces. This correspondns to the selection in the "Build" => "Interfaces" => "Alexa Presentation Language " area within the Alexa Developer Console
 * 
 * Simple remove what you don't need for your usecase.
 */
const interfaces = [
  {
    supportedViewports: [
      {
        maxHeight: 540,
        maxWidth: 960,
        minHeight: 540,
        minWidth: 960,
        mode: 'TV',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 599,
        maxWidth: 599,
        minHeight: 100,
        minWidth: 100,
        mode: 'HUB',
        shape: 'ROUND',
      },
      {
        maxHeight: 959,
        maxWidth: 1279,
        minHeight: 600,
        minWidth: 960,
        mode: 'HUB',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 1279,
        maxWidth: 1920,
        minHeight: 600,
        minWidth: 1280,
        mode: 'HUB',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 599,
        maxWidth: 1279,
        minHeight: 100,
        minWidth: 960,
        mode: 'HUB',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 1279,
        maxWidth: 2560,
        minHeight: 960,
        minWidth: 1920,
        mode: 'HUB',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 2560,
        maxWidth: 1279,
        minHeight: 1920,
        minWidth: 960,
        mode: 'HUB',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 1920,
        maxWidth: 959,
        minHeight: 320,
        minWidth: 600,
        mode: 'MOBILE',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 1920,
        maxWidth: 1279,
        minHeight: 320,
        minWidth: 960,
        mode: 'MOBILE',
        shape: 'RECTANGLE',
      },
      {
        maxHeight: 1920,
        maxWidth: 1920,
        minHeight: 320,
        minWidth: 1280,
        mode: 'MOBILE',
        shape: 'RECTANGLE',
      },
    ],
    type: 'ALEXA_PRESENTATION_APL',
  },
];

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  plugins: [
    // "Stageless" configuration for Alexa: Map 'de' model to 'de-DE'
    // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
    new AlexaCli({ locales: { de: ['de-DE'], en: ['en-US', 'en-AU', 'en-IN', 'en-GB', 'en-CA'] } }),

    // "Stageless" configuration for Serverless
    // @see https://www.jovo.tech/marketplace/target-serverless
    new ServerlessCli({
      service: 'cocktail-party',
      provider: {
        runtime: 'nodejs14.x',
        iam: {
          role: {
            statements: [
              {
                Effect: 'Allow',
                Action: [
                  // @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations.html
                  'dynamodb:CreateTable',
                  'dynamodb:DescribeTable',
                  'dynamodb:Query',
                  'dynamodb:Scan',
                  'dynamodb:GetItem',
                  'dynamodb:PutItem',
                  'dynamodb:UpdateItem',
                  'dynamodb:DeleteItem',
                ],
                Resource: 'arn:aws:dynamodb:*:*:table/*',
              },
            ],
          },
        },
      },
      functions: {
        handler: {
          url: true, // @see https://www.serverless.com/blog/aws-lambda-function-urls-with-serverless-framework
          timeout: 7, // Sets the timeout to 7 seconds
        },
      },
    }),
  ],

  // @see https://www.jovo.tech/docs/project-config#staging
  defaultStage: 'dev',
  stages: {
    dev: {
      // @see https://www.jovo.tech/docs/webhook
      endpoint: '${JOVO_WEBHOOK_URL}',

      languageModel: {
        de: {
          invocation: INVOCATION_NAME_ALEXA_DE.toLowerCase() + ' test',
        },
        en: {
          invocation: INVOCATION_NAME_ALEXA_EN.toLowerCase() + ' test',
        },
      },

      plugins: [
        // Dev config for Alexa, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
        new AlexaCli({
          skillId: process.env.ALEXA_SKILL_ID_DEV,
          askProfile: process.env.ALEXA_ASK_PROFILE_DEV,

          // Overrides the skill.json to change the Skill name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          files: {
            'skill-package/skill.json': {
              manifest: {
                publishingInformation: {
                  locales: {
                    'de-DE': ALEXA_PUBLISHING_INFORMATION_DE('TEST'),
                    'en-US': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-AU': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-GB': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-CA': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                    'en-IN': ALEXA_PUBLISHING_INFORMATION_EN('TEST'),
                  },
                  automaticDistribution: {
                    isActive: false,
                  },
                  isAvailableWorldwide: true,
                  testingInstructions: 'handle with care',
                  // https://developer.amazon.com/en-US/docs/alexa/smapi/skill-manifest.html#category-enum
                  category: 'EDUCATION_AND_REFERENCE',
                  distributionMode: 'PUBLIC',
                  distributionCountries: [],
                },

                apis: {
                  custom: {
                    interfaces,
                  },
                },
                privacyAndCompliance: {
                  locales: {
                    'de-DE': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-US': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-CA': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-IN': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-AU': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-GB': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                  },
                  allowsPurchases: false,
                  containsAds: false,
                  isExportCompliant: true,
                  isChildDirected: false,
                  usesPersonalInfo: false,
                },
              },
            },
          },
        }),
      ],
    },
    prod: {
      languageModel: {
        de: {
          invocation: INVOCATION_NAME_ALEXA_DE.toLowerCase(),
        },
        en: {
          invocation: INVOCATION_NAME_ALEXA_EN.toLowerCase(),
        },
      },

      plugins: [
        // Prod config for Alexa, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/platform-alexa/project-config
        new AlexaCli({
          skillId: process.env.ALEXA_SKILL_ID_PROD,
          askProfile: process.env.ALEXA_ASK_PROFILE_PROD,
          endpoint: process.env.LAMBDA_ARN_PROD,

          // Overrides the skill.json to change the Skill name
          // @see https://www.jovo.tech/marketplace/platform-alexa/project-config#files
          files: {
            'skill-package/skill.json': {
              manifest: {
                publishingInformation: {
                  locales: {
                    'de-DE': ALEXA_PUBLISHING_INFORMATION_DE('PROD'),
                    'en-US': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-AU': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-GB': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-CA': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                    'en-IN': ALEXA_PUBLISHING_INFORMATION_EN('PROD'),
                  },
                  automaticDistribution: {
                    isActive: false,
                  },
                  isAvailableWorldwide: true,
                  testingInstructions: 'handle with care',
                  // https://developer.amazon.com/en-US/docs/alexa/smapi/skill-manifest.html#category-enum
                  category: 'EDUCATION_AND_REFERENCE',
                  distributionMode: 'PUBLIC',
                  distributionCountries: [],
                },
                apis: {
                  custom: {
                    interfaces,
                  },
                },
                privacyAndCompliance: {
                  locales: {
                    'de-DE': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-US': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-CA': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-IN': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-AU': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                    'en-GB': {
                      privacyPolicyUrl: '',
                      termsOfUseUrl: '',
                    },
                  },
                  allowsPurchases: false,
                  containsAds: false,
                  isExportCompliant: true,
                  isChildDirected: false,
                  usesPersonalInfo: false,
                },
              },
            },
          },
        }),

        // Prod config for Serverless, gets merged into the stageless config
        // @see https://www.jovo.tech/marketplace/target-serverless
        new ServerlessCli({
          provider: {
            stage: 'prod',
            environment: {
              DYNAMODB_TABLE_NAME: 'cocktail-party-db',
            },
          },
          functions: {
            handler: {
              events: [
                {
                  alexaSkill: process.env.ALEXA_SKILL_ID_PROD,
                },
              ],
            },
          },
        }),
      ],
    },
  },
});

module.exports = project;
