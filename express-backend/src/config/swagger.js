const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crew Telegram Jobs API',
      version: '1.0.0',
      description: 'API documentation for the Crew Telegram Jobs backend',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
          },
        },
        UserProfile: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              description: 'ID of the associated User',
            },
            userType: {
              type: 'string',
              enum: ['crew', 'owner'],
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
            profilePhoto: {
              type: 'string',
              description: 'ID of the associated File (profile photo)',
            },
            location: {
              type: 'string',
            },
            isActive: {
              type: 'boolean',
            },
            telegramId: {
              type: 'string',
            },
            telegramUsername: {
              type: 'string',
            },
          },
        },
        CrewProfile: {
          type: 'object',
          properties: {
            userProfile: {
              type: 'string',
              description: 'ID of the associated UserProfile',
            },
            position: {
              type: 'string',
              enum: ['captain', 'chef', 'deckhand', 'engineer', 'stewardess', 'first_mate', 'bosun', 'second_engineer', 'other'],
            },
            experienceYears: {
              type: 'number',
            },
            bio: {
              type: 'string',
            },
            cv: {
              type: 'string',
              description: 'ID of the associated File (CV)',
            },
            availabilityStatus: {
              type: 'string',
              enum: ['available', 'busy', 'not_available'],
            },
            certifications: {
              type: 'string',
            },
            languages: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            portfolioImages: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID of the associated File (portfolio image)',
              },
            },
          },
        },
        OwnerProfile: {
          type: 'object',
          properties: {
            userProfile: {
              type: 'string',
              description: 'ID of the associated UserProfile',
            },
            companyName: {
              type: 'string',
            },
            yachtName: {
              type: 'string',
            },
            yachtSize: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            yachtType: {
              type: 'string',
              enum: ['motor_yacht', 'sailing_yacht', 'super_yacht', 'catamaran', 'other'],
            },
            operatingRegions: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        Job: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'ID of the associated OwnerProfile',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            position: {
              type: 'string',
              enum: ['captain', 'chef', 'deckhand', 'engineer', 'stewardess', 'first_mate', 'bosun', 'second_engineer', 'other'],
            },
            location: {
              type: 'string',
            },
            startDate: {
              type: 'string',
              format: 'date',
            },
            endDate: {
              type: 'string',
              format: 'date',
            },
            salaryRange: {
              type: 'string',
            },
            status: {
              type: 'string',
              enum: ['active', 'closed', 'draft'],
            },
            requirements: {
              type: 'string',
            },
            contactEmail: {
              type: 'string',
            },
            contactPhone: {
              type: 'string',
            },
            contractType: {
              type: 'string',
              enum: ['permanent', 'temporary', 'seasonal', 'day_work'],
            },
            experienceRequired: {
              type: 'number',
            },
            publishedAt: {
              type: 'string',
              format: 'date',
            },
          },
        },
        Application: {
          type: 'object',
          properties: {
            job: {
              type: 'string',
              description: 'ID of the associated Job',
            },
            crew: {
              type: 'string',
              description: 'ID of the associated CrewProfile',
            },
            status: {
              type: 'string',
              enum: ['pending', 'viewed', 'accepted', 'rejected', 'withdrawn'],
            },
            message: {
              type: 'string',
            },
            appliedAt: {
              type: 'string',
              format: 'date',
            },
            viewedAt: {
              type: 'string',
              format: 'date',
            },
            respondedAt: {
              type: 'string',
              format: 'date',
            },
            ownerNotes: {
              type: 'string',
            },
          },
        },
        File: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            alternativeText: {
              type: 'string',
            },
            caption: {
              type: 'string',
            },
            width: {
              type: 'number',
            },
            height: {
              type: 'number',
            },
            formats: {
              type: 'object',
            },
            hash: {
              type: 'string',
            },
            ext: {
              type: 'string',
            },
            mime: {
              type: 'string',
            },
            size: {
              type: 'number',
            },
            url: {
              type: 'string',
            },
            previewUrl: {
              type: 'string',
            },
            provider: {
              type: 'string',
            },
            provider_metadata: {
              type: 'object',
            },
            folder_id: {
              type: 'string',
              description: 'ID of the associated Folder',
            },
            folderPath: {
              type: 'string',
            },
          },
        },
        Role: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;